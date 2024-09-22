import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSpecificUser, updateUser } from "./user.controller.js";
import { addNewUserVal, getSpecificUserVal, updateUserVal } from "./user.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const userRouter = express.Router();

config();

userRouter
    .route("/")
    .post(protectedRoutes, allowedTo('admin'), addUser)
    .get(protectedRoutes, allowedTo('admin'), getAllUsers)
userRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('admin'), validation(updateUserVal), updateUser)
    .delete(protectedRoutes, allowedTo('admin'), deleteUser)
    .get(protectedRoutes, allowedTo('admin'), validation(getSpecificUserVal), getSpecificUser)

export default userRouter;