import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCoupon, deleteCoupon, getAllCoupons, getLoggedUserCoupons, updateCoupon } from "./coupon.controller.js";
import { addCouponVal, deleteCouponVal, updateCouponVal } from "./coupon.validation.js";

const couponRouter = express.Router();

config();

couponRouter
    .route("/")
    .post(protectedRoutes, allowedTo('admin'), validation(addCouponVal), addCoupon)
    .get(protectedRoutes, allowedTo('admin'), getAllCoupons)

couponRouter
    .route("/log")
    .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedUserCoupons)

couponRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('admin'), validation(updateCouponVal), updateCoupon)
    .delete(protectedRoutes, allowedTo('admin'), validation(deleteCouponVal), deleteCoupon)


export default couponRouter;