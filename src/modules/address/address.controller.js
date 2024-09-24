import { catchError } from "../../middleware/catchError.js"
import { statusCode } from "../../utils/statusCode.js"
import { userModel } from "../../../database/models/user.model.js"

//* Add to Address
const addAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { address: req.body } }, { new: true })
    !address && res.status(statusCode.NOT_FOUND).json({ message: "Address Not Found!" })
    address && res.status(statusCode.OK).json({ message: "Address Updated Successfully ✅", address: address })
})

//! Delete Address
const deleteAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.params.id } } }, { new: true })
    !address && res.status(statusCode.NOT_FOUND).json({ message: "Address Not Found!" })
    address && res.status(statusCode.OK).json({ message: "Address Deleted Successfully ✅", address })
})

// Get All Addresss
const getAllAddress = catchError(async (req, res, next) => {
    let addresss = await userModel.find().sort({ createdAt: -1 })
    !addresss && res.status(statusCode.NOT_FOUND).json({ message: "Addresss Not Found!" })
    addresss && res.status(statusCode.OK).json({ message: "Addresss Found Successfully ✅", addresss: addresss.map(address => address.address) })
})

// Get Logged In User Address
const getLoggedInUserAddress = catchError(async (req, res, next) => {
    let address = await userModel.findById(req.user._id)
    !address && res.status(statusCode.NOT_FOUND).json({ message: "Address Not Found!" })
    address && res.status(statusCode.OK).json({ message: "Address Found Successfully ✅", address: address.address })
})


export {
    getAllAddress,
    addAddress,
    deleteAddress,
    getLoggedInUserAddress
}