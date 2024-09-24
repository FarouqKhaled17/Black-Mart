import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { reviewModel } from "../../../database/models/review.model.js"
import { statusCode } from "../../utils/statusCode.js"

//? Add Review
const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isReviewExist = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (isReviewExist) {
        return res.status(statusCode.CONFLICT).json({ message: "You have already reviewed this product!" })
    }
    let newReview = new reviewModel(req.body)
    await newReview.save()
    res.status(statusCode.CREATED).json({ message: "Review Added Successfully ✅", newReview })
})

//* Update Review
const updateReview = catchError(async (req, res, next) => {
    let review = await reviewModel.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    !review && res.status(statusCode.NOT_FOUND).json({ message: "Review Not Found!" })
    review && res.status(statusCode.OK).json({ message: "Review Updated Successfully ✅", review })
})

//! Delete Review
const deleteReview = catchError(async (req, res, next) => {
    let review = await reviewModel.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    !review && res.status(statusCode.NOT_FOUND).json({ message: "Review Not Found!" })
    review && res.status(statusCode.OK).json({ message: "Review Deleted Successfully ✅", review })
})

// Get All Reviews
const getAllReviews = catchError(async (req, res, next) => {
    let reviews = await reviewModel.find().sort({ createdAt: -1 })
    !reviews && res.status(statusCode.NOT_FOUND).json({ message: "Reviews Not Found!" })
    reviews && res.status(statusCode.OK).json({ message: "Reviews Found Successfully ✅", reviews })
})

// Get Logged User Reviews
const getLoggedUserReviews = catchError(async (req, res, next) => {
    let reviews = await reviewModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    if (!reviews || reviews.length === 0) {
        return res.status(statusCode.NOT_FOUND).json({ message: "No Reviews Found for this User!" });
    }
    res.status(statusCode.OK).json({ message: "User Reviews Found Successfully ✅", reviews });
});


export {
    addReview,
    updateReview,
    deleteReview,
    getAllReviews,
    getLoggedUserReviews
}