import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { statusCode } from "../../utils/statusCode.js";
import { AppError } from "../../utils/AppError.js";


//!signup
const signup = catchError(async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt); // hash the password
    let user = new userModel(req.body);
    await user.save();
    let token = jwt.sign({
        userId: user._id,
        email: user.email,
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
        username: user.username,
        role: user.role
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(statusCode.OK).json({
        message: "Login Successful",
        token,
        Payload: {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
});


export {
    signup,
    login
}