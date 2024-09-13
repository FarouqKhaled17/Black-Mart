import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { statusCode } from "../../utils/statusCode.js";
import { AppError } from "../../utils/AppError.js";
//!signup
const signup = catchError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    let token = jwt.sign({
        userId: user._id,
        email: user.email,
        role: user.role
    }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(statusCode.CREATED).json({
        message: "User Created Successfully"
    })
});

//!login
const login = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        res.status(statusCode.OK).json({
            message: "Login Successful",
            token
        })
    } else {
        next(new AppError("Invalid email or password", statusCode.UNAUTHORIZED))
    }
});

export {
    signup,
    login
}