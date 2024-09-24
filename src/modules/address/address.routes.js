import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, deleteAddress, getAllAddress, getLoggedInUserAddress } from "./address.controller.js";
import { addAddressVal, deleteAddressVal } from "./address.validation.js";


const addressRouter = express.Router();

config();

addressRouter
    .route("/")
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllAddress)
    .patch(protectedRoutes, allowedTo('user', 'admin'), validation(addAddressVal), addAddress)

addressRouter
    .route("/log")
    .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedInUserAddress)
addressRouter
    .route("/:id")
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(deleteAddressVal), deleteAddress)


export default addressRouter;