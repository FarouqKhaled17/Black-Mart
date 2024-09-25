import { couponModel } from "../../../database/models/coupon.model.js"
import { catchError } from "../../middleware/catchError.js"
import { statusCode } from "../../utils/statusCode.js"

//? Add Coupon
const addCoupon = catchError(async (req, res, next) => {
    let isCouponExist = await couponModel.findOne({ code: req.body.code })
    if (isCouponExist) {
        return res.status(statusCode.CONFLICT).json({ message: "You have already added this coupon before!" })
    }
    let newCoupon = new couponModel(req.body)
    await newCoupon.save()
    res.status(statusCode.CREATED).json({ message: "Coupon Added Successfully ✅", newCoupon })
})

//* Update Coupon
const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    !coupon && res.status(statusCode.NOT_FOUND).json({ message: "Coupon Not Found!" })
    coupon && res.status(statusCode.OK).json({ message: "Coupon Updated Successfully ✅", coupon })
})

//! Delete Coupon
const deleteCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOneAndDelete({ _id: req.params.id })
    !coupon && res.status(statusCode.NOT_FOUND).json({ message: "Coupon Not Found!" })
    coupon && res.status(statusCode.OK).json({ message: "Coupon Deleted Successfully ✅", coupon })
})

//! Get All Coupons
const getAllCoupons = catchError(async (req, res, next) => {
    let coupons = await couponModel.find().sort({ createdAt: -1 })
    !coupons && res.status(statusCode.NOT_FOUND).json({ message: "Coupons Not Found!" })
    coupons && res.status(statusCode.OK).json({ message: "Coupons Found Successfully ✅", coupons })
})

// Get Logged User Coupons
const getLoggedUserCoupons = catchError(async (req, res, next) => {
    let coupons = await couponModel.find({ userID: req.user._id }).sort({ createdAt: -1 });
    if (!coupons || coupons.length === 0) {
        return res.status(statusCode.NOT_FOUND).json({ message: "No Coupons Found for this User!" });
    }
    res.status(statusCode.OK).json({ message: "User Coupons Found Successfully ✅", coupons });
});


export {
    addCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    getLoggedUserCoupons
}