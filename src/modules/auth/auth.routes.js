import { config } from "dotenv";
import express from "express";
import { login, signup } from "./auth.controller.js";
import { emailExist } from "../../middleware/emailExist.js";
import { numberExist } from "../../middleware/numberExist.js";
import { validation } from "../../middleware/validation.js";
import { loginVal, signupVal } from "./auth.validation.js";

const authRouter = express.Router();

config();

authRouter
    .route("/signup")
    .post(emailExist, numberExist, validation(signupVal), signup)

authRouter
    .route("/login")
    .post(validation(loginVal), login)

export default authRouter;
