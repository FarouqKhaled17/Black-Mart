import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSpecificUser, updateUser } from "./user.controller.js";
import { addNewUserVal, getSpecificUserVal, updateUserVal } from "./user.validation.js";

const userRouter = express.Router();

config();

userRouter
    .route("/")
    .post(addUser)
    .get(getAllUsers)
userRouter
    .route("/:id")
    .put(validation(updateUserVal), updateUser)
    .delete(deleteUser)
    .get(validation(getSpecificUserVal), getSpecificUser)

export default userRouter;