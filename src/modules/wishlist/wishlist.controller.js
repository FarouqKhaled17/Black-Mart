import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { statusCode } from "../../utils/statusCode.js"
import { userModel } from "../../../database/models/user.model.js"

//* Add to Wishlist
const addToWishlist = catchError(async (req, res, next) => {
    let wishlist = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true }).populate('wishlist')
    !wishlist && res.status(statusCode.NOT_FOUND).json({ message: "Wishlist Not Found!" })
    wishlist && res.status(statusCode.OK).json({ message: "Wishlist Updated Successfully ✅", wishlist: wishlist.wishlist })
})

//! Remove From Wishlist
const removeFromWishlist = catchError(async (req, res, next) => {
    let wishlist = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } }, { new: true }).populate('wishlist')
    !wishlist && res.status(statusCode.NOT_FOUND).json({ message: "Wishlist Not Found!" })
    wishlist && res.status(statusCode.OK).json({ message: "Wishlist Deleted Successfully ✅", wishlist })
})

// Get All Wishlists
const getAllWishlists = catchError(async (req, res, next) => {
    let wishlists = await userModel.find().sort({ createdAt: -1 }).populate('wishlist')
    !wishlists && res.status(statusCode.NOT_FOUND).json({ message: "Wishlists Not Found!" })
    wishlists && res.status(statusCode.OK).json({ message: "Wishlists Found Successfully ✅", wishlists: wishlists.map(wishlist => wishlist.wishlist) })
})

// Get Logged In User Wishlist
const getLoggedInUserWishlist = catchError(async (req, res, next) => {
    let wishlist = await userModel.findById(req.user._id).populate('wishlist')
    !wishlist && res.status(statusCode.NOT_FOUND).json({ message: "Wishlist Not Found!" })
    wishlist && res.status(statusCode.OK).json({ message: "Wishlist Found Successfully ✅", wishlist: wishlist.wishlist })
})


export {
    addToWishlist,
    removeFromWishlist,
    getAllWishlists,
    getLoggedInUserWishlist
}