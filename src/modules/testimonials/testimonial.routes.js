import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { acceptRejectTestimonialVal, addTestimonialVal, deleteTestimonialVal, updateTestimonialVal } from "./testimonial.validation.js";
import { acceptOrRejectTestimonials, addTestimonial, deleteTestimonial, getAllTestimonials, updateTestimonial } from "./testimonial.controller.js";

const TestimonialRouter = express.Router();

config();

TestimonialRouter
    .route("/")
    .post(protectedRoutes, allowedTo('user', 'admin'), validation(addTestimonialVal), addTestimonial)
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllTestimonials)

TestimonialRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('user', 'admin'), validation(updateTestimonialVal), updateTestimonial)
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(deleteTestimonialVal), deleteTestimonial)
    .patch(protectedRoutes, allowedTo('user', 'admin'), validation(acceptRejectTestimonialVal), acceptOrRejectTestimonials)


export default TestimonialRouter;