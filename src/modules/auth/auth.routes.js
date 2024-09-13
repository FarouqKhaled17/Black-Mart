import { config } from "dotenv";
import express from "express";
import { login, signup } from "./auth.controller.js";

const authRouter = express.Router();

config();

authRouter
    .route("/signup")
    .post(signup)

authRouter
    .route("/login")
    .post(login)

export default authRouter;
