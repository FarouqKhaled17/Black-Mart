import slugify from "slugify"
import { categoryModel } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"

//? Add Category
const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    req.body.img = req.file.filename
    let newCategory = new categoryModel(req.body)
    // check if category already exists
    const category = await categoryModel.findOne({ name: req.body.name })
    category && res.status(409).json({ message: "Category Already Exists!" })
    !category && newCategory.save() && res.status(201).json({ message: "Category Added Successfully ✅", newCategory })
})

//* Update Category
const updateCategory = catchError(async (req, res, next) => {
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.img = req.file.filename
    let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !category && res.status(404).json({ message: "Category Not Found!" })
    category && res.status(200).json({ message: "Category Updated Successfully ✅", category })
})

//! Delete Category
const deleteCategory = catchError(async (req, res, next) => {
    let category = await categoryModel.findByIdAndDelete(req.params.id)
    !category && res.status(404).json({ message: "Category Not Found!" })
    category && res.status(200).json({ message: "Category Deleted Successfully ✅", category })
})

// Get All Categories
const getAllCategories = catchError(async (req, res, next) => {
    categoryModel.find().sort({ createdAt: -1 })
        .then(categories => res.status(200).json({ message: "Categories Found Successfully ✅", categories }))
        .catch(err => res.status(404).json({ message: "Categories Not Found!" }))
})

// Get Specific Category
const getSpecificCategory = catchError(async (req, res, next) => {
    let category = await categoryModel.findOne({ _id: req.params.id })
    !category && res.status(404).json({ message: "Category Not Found!" })
    category && res.status(200).json({ message: "Category Found Successfully ✅", category })
})

export {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getSpecificCategory
}