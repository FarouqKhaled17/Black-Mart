import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { statusCode } from "../../utils/statusCode.js";
import { AppError } from "../../utils/AppError.js";
import validator from "validator";


//!signup
const signup = catchError(async (req, res, next) => {
    console.log(req.body);  // Log the incoming request body
    if (!validator.isStrongPassword(req.body.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return next(new AppError('Password is not strong enough!', statusCode.BAD_REQUEST));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    let user = new userModel(req.body);
    await user.save();
    let token = jwt.sign({
        userId: user._id,
        email: user.email,
        Gmail: user.Gmail,
        role: user.role
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(statusCode.CREATED).json({
        message: "User Created Successfully",
        token
    });
});


//!login
const login = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    // Check if the user exists
    if (!user) {
        return next(new AppError("Invalid email or password", statusCode.UNAUTHORIZED));
    }
    //TODO Check if the user's email is verified
    // if (!user.confirmEmail) {
    //     return next(new AppError("Please verify your email", statusCode.UNAUTHORIZED));
    // }
    // Check if the password matches
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return next(new AppError("Invalid email or password", statusCode.UNAUTHORIZED));
    }
    let token = jwt.sign({
        userId: user._id,
        email: user.email,
        Gmail: user.Gmail,
        username: user.username,
        role: user.role
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    //update the status to online
    await userModel.updateOne({ _id: user._id }, { status: "online" });
    res.status(statusCode.OK).json({
        message: "Login Successful",
        token,
        Payload: {
            userId: user._id,
            username: user.username,
            email: user.email,
            Gmail: user.Gmail,
            role: user.role
        }
    });
});

const changeUserPassword = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new AppError("User not found", statusCode.NOT_FOUND));
    }
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return next(new AppError("Invalid password", statusCode.UNAUTHORIZED));
    }
    if (req.body.password === req.body.newPassword) {
        return next(new AppError('New password cannot be the same as the current password', statusCode.BAD_REQUEST));
    }
    const hashedNewPassword = bcrypt.hashSync(req.body.newPassword, 10);
    if (!validator.isStrongPassword(req.body.newPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return next(new AppError('New password is not strong enough', statusCode.BAD_REQUEST));
    }
    //updating the password and the time changed at
    user.password = hashedNewPassword;
    user.passwordChangedAt = Date.now();
    await user.save();
    let token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            Gmail: user.Gmail,
            username: user.username,
            role: user.role,
        },
        process.env.SECRET_KEY,
    );
    res.status(statusCode.OK).json({
        message: "Password updated successfully",
        token,
        Payload: {
            userId: user._id,
            username: user.username,
            email: user.email,
            Gmail: user.Gmail,
            role: user.role,
        },
    });
});

//!Protected Routes
const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return next(new AppError("Token not found", statusCode.UNAUTHORIZED));
    }

    let decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);

    let user = await userModel.findById(decode.userId);
    if (!user) {
        return next(new AppError("User not found", statusCode.NOT_FOUND));
    }
    if (user.passwordChangedAt) {
        let changedPasswordTime = parseInt(user.passwordChangedAt.getTime() / 1000);
        if (changedPasswordTime > decode.iat) {
            return next(new AppError("Password changed, please login again", statusCode.UNAUTHORIZED));
        }
    }
    req.user = user;
    next();
})

//?Authorization
const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You are not authorized to perform this action", statusCode.FORBIDDEN));
        }
        next();
    })
}




export {
    signup,
    login,
    changeUserPassword,
    protectedRoutes,
    allowedTo
}