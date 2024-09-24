import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishlist, getAllWishlists, getLoggedInUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { addToWishlistVal, removeFromWishlistVal } from "./wishlist.validation.js";


const wishlistRouter = express.Router();

config();

wishlistRouter
    .route("/")
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllWishlists)
    .patch(protectedRoutes, allowedTo('user', 'admin'), validation(addToWishlistVal), addToWishlist)

wishlistRouter
    .route("/log")
    .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedInUserWishlist)
wishlistRouter
    .route("/:id")
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(removeFromWishlistVal), removeFromWishlist)


export default wishlistRouter;