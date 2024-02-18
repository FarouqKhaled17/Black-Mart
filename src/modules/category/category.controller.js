import slugify from "slugify"
import { categoryModel } from "../../../database/models/category.model.js"

//? Add Category
const addCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    let category = new categoryModel(req.body)
    // check if category already exists
    const categoryExists = await categoryModel.findOne({ name: req.body.name })
    if (categoryExists) {
        return res.status(409).json({
            message: 'Category already exists'
        })
    }
    category.save()
        .then((result) => {
            res.status(201).json(result)
        })
}

//* Update Category
const updateCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    let existCategory = await categoryModel.findOne({ _id: req.params.id })
    if (!existCategory) {
        return res.status(404).json({
            message: 'Category not found'
        })
    }
    categoryModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((result) => {
            res.status(200).json({ message: 'Category Updated Successfully ✅', result })
        })
}

//! Delete Category
const deleteCategory = async (req, res, next) => {
    let existCategory = await categoryModel.findOne({ _id: req.params.id })
    if (!existCategory) {
        return res.status(404).json({
            message: 'Category not found'
        })
    }
    categoryModel.findOneAndDelete({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({ message: 'Category Deleted Successfully ✅', result })
        })
}

// Get All Categories
const getAllCategories = async (req, res, next) => {
    categoryModel.find()
        .then((result) => {
            res.status(200).json(result)
        })
}

// Get Specific Category
const getSpecificCategory = async (req, res, next) => {
    let existCategory = await categoryModel.findOne({ _id: req.params.id })
    if (!existCategory) {
        return res.status(404).json({
            message: 'Category not found'
        })
    }
    res.status(200).json({ message: 'Category Found Successfully ✅', existCategory })
}

export {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getSpecificCategory
}