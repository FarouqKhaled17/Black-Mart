import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCart, applyCoupon, clearUserCart, deleteItemFromCart, getLoggedInUserCart, updateCart } from "./cart.controller.js";
import { addToCartVal, applyCouponVal, removeItemFromCartVal, updateCartVal } from "./cart.validation.js";


const cartRouter = express.Router();

config();

cartRouter
    .route("/")
    .post(protectedRoutes, allowedTo('user', 'admin'), validation(addToCartVal), addToCart)
    .delete(protectedRoutes, allowedTo('user', 'admin'), clearUserCart)

cartRouter
    .route("/coupon")
    .post(protectedRoutes, allowedTo('user', 'admin'), validation(applyCouponVal), applyCoupon)

cartRouter
    .route("/log")
    .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedInUserCart)
cartRouter
    .route("/:id")
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(removeItemFromCartVal), deleteItemFromCart)
    .patch(protectedRoutes, allowedTo('user', 'admin'), validation(updateCartVal), updateCart)


export default cartRouter;