import { config } from "dotenv";
import express from "express";
import { login, signup } from "./auth.controller.js";
import { emailExist } from "../../middleware/emailExist.js";
import { numberExist } from "../../middleware/numberExist.js";

const authRouter = express.Router();

config();

authRouter
    .route("/signup")
    .post(emailExist, numberExist, signup)

authRouter
    .route("/login")
    .post(login)

export default authRouter;
