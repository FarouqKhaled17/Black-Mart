import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addReview, deleteReview, getAllReviews, getLoggedUserReviews, updateReview } from "./review.controller.js";
import { addReviewVal, deleteReviewVal, updateReviewVal } from "./review.validation.js";

const reviewRouter = express.Router();

config();

reviewRouter
    .route("/")
    .post(protectedRoutes, allowedTo('user','admin'), validation(addReviewVal), addReview)
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllReviews)

reviewRouter
    .route("/log")
    .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedUserReviews)

reviewRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('user', 'admin'), validation(updateReviewVal), updateReview)
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(deleteReviewVal), deleteReview)


export default reviewRouter;