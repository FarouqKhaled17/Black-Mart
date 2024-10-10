import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from "../../../database/models/user.model.js"

//? Add User
const addUser = catchError(async (req, res, next) => {
    // Check if the required fields are provided
    if (!req.body.email || !req.body.username) {
        return res.status(400).json({ message: "Email and username are required!" });
    }

    // Check if user already exists based on email or username
    const existingUser = await userModel.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    });

    if (existingUser) {
        return res.status(409).json({ message: "User with the same username or email already exists!" });
    }

    // Create and save the new user
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({ message: "User Added Successfully ✅", newUser });
});


//* Update User
const updateUser = catchError(async (req, res, next) => {
    if (req.file) req.body.img = req.file.filename
    let user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !user && res.status(404).json({ message: "User Not Found!" })
    user && res.status(200).json({ message: "User Updated Successfully ✅", user })
})

//! Delete User
const deleteUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndDelete(req.params.id)
    !user && res.status(404).json({ message: "User Not Found!" })
    user && res.status(200).json({ message: "User Deleted Successfully ✅", user })
})

// Get All Users
const getAllUsers = catchError(async (req, res, next) => {
    userModel.find().sort({ createdAt: -1 })
        .then(users => res.status(200).json({ message: "Users Found Successfully ✅", users }))
        .catch(err => res.status(404).json({ message: "Users Not Found!" }))
})

// Get Specific User
const getSpecificUser = catchError(async (req, res, next) => {
    let user = await userModel.findOne({ _id: req.params.id })
    !user && res.status(404).json({ message: "User Not Found!" })
    user && res.status(200).json({ message: "User Found Successfully ✅", user })
})

//Block User
const blockUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true })
    !user && res.status(404).json({ message: "User Not Found!" })
    user && res.status(200).json({ message: "User Blocked Successfully ✅", user })
})

//Unblock User
const unBlockUser = catchError(async (req, res, next) => {
    let user = await userModel.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true })
    !user && res.status(404).json({ message: "User Not Found!" })
    user && res.status(200).json({ message: "User Unblocked Successfully ✅", user })
})

export {
    addUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getSpecificUser,
    blockUser,
    unBlockUser
}