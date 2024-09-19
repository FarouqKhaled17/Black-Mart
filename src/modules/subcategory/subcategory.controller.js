import slugify from "slugify"
import { subCategoryModel } from "../../../database/models/subCategory.model.js"
import { catchError } from "../../middleware/catchError.js"

//? Add Subcategory
const addSubcategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    req.body.img = req.file.filename
    let newSubcategory = new subCategoryModel(req.body)
    // check if subcategory already exists
    const subcategory = await subCategoryModel.findOne({ name: req.body.name })
    subcategory && res.status(409).json({ message: "Subcategory Already Exists!" })
    !subcategory && newSubcategory.save() && res.status(201).json({ message: "Subcategory Added Successfully ✅", newSubcategory })
})

//* Update Subcategory
const updateSubcategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.img = req.file.filename
    let subcategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subcategory && res.status(404).json({ message: "Subcategory Not Found!" })
    subcategory && res.status(200).json({ message: "Subcategory Updated Successfully ✅", subcategory })
})

//! Delete Subcategory
const deleteSubcategory = catchError(async (req, res, next) => {
    let subcategory = await subCategoryModel.findByIdAndDelete(req.params.id)
    !subcategory && res.status(404).json({ message: "Subcategory Not Found!" })
    subcategory && res.status(200).json({ message: "Subcategory Deleted Successfully ✅", subcategory })
})

// Get All Categories
const getAllSubcategories = catchError(async (req, res, next) => {
    subCategoryModel.find().sort({ createdAt: -1 })
        .then(categories => res.status(200).json({ message: "Categories Found Successfully ✅", categories }))
        .catch(err => res.status(404).json({ message: "Categories Not Found!" }))
})

// Get Specific Subcategory
const getSpecificSubcategory = catchError(async (req, res, next) => {
    let subcategory = await subCategoryModel.findOne({ _id: req.params.id })
    !subcategory && res.status(404).json({ message: "Subcategory Not Found!" })
    subcategory && res.status(200).json({ message: "Subcategory Found Successfully ✅", category })
})

export {
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getAllSubcategories,
    getSpecificSubcategory
}

