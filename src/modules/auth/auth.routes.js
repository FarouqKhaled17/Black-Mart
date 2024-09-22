import { config } from "dotenv";
import express from "express";
import { changeUserPassword, login, protectedRoutes, signup } from "./auth.controller.js";
import { emailExist } from "../../middleware/emailExist.js";
import { validation } from "../../middleware/validation.js";
import { changeUserPassVal, loginVal, signupVal } from "./auth.validation.js";

const authRouter = express.Router();

config();

authRouter
    .route("/signup")
    .post(emailExist, validation(signupVal), signup)

authRouter
    .route("/login")
    .post(validation(loginVal), login)
authRouter
    .route("/changePassword")
    .patch(protectedRoutes, validation(changeUserPassVal), changeUserPassword)

export default authRouter;
