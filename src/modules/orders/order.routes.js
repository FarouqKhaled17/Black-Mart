import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";
import { createCashOrderVal } from "./order.validation.js";


const orderRouter = express.Router();

config();

orderRouter
    .route('/')
    .get(protectedRoutes, allowedTo('user', 'admin'), getSpecificOrder)

orderRouter
    .route('/allorder')
    .get(protectedRoutes, allowedTo('admin'), getAllOrders)

orderRouter
    .route("/:id")
    .post(protectedRoutes, allowedTo('user', 'admin'), validation(createCashOrderVal), createCashOrder)

orderRouter
    .route("/checkout/:id")
    .post(protectedRoutes, allowedTo('user', 'admin'), createCheckoutSession)


export default orderRouter;