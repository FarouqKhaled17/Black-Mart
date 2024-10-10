import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { brandModel } from "../../../database/models/brand.model.js"

//? Add Brand
const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    if (req.file) req.body.img = req.file.filename
    let newBrand = new brandModel(req.body)
    // check if brand already exists
    const brand = await brandModel.findOne({ name: req.body.name })
    brand && res.status(409).json({ message: "Brand Already Exists!" })
    !brand && newBrand.save() && res.status(201).json({ message: "Brand Added Successfully ✅", newBrand })
})

//* Update Brand
const updateBrand = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.img = req.file.filename
    let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !brand && res.status(404).json({ message: "Brand Not Found!" })
    brand && res.status(200).json({ message: "Brand Updated Successfully ✅", brand })
})

//! Delete Brand
const deleteBrand = catchError(async (req, res, next) => {
    let brand = await brandModel.findByIdAndDelete(req.params.id)
    !brand && res.status(404).json({ message: "Brand Not Found!" })
    brand && res.status(200).json({ message: "Brand Deleted Successfully ✅", brand })
})

// Get All Brands
const getAllBrands = catchError(async (req, res, next) => {
    brandModel.find().sort({ createdAt: -1 })
        .then(brands => res.status(200).json({ message: "Brands Found Successfully ✅", brands }))
        .catch(err => res.status(404).json({ message: "Brands Not Found!" }))
})

// Get Specific Brand
const getSpecificBrand = catchError(async (req, res, next) => {
    let brand = await brandModel.findOne({ _id: req.params.id })
    !brand && res.status(404).json({ message: "Brand Not Found!" })
    brand && res.status(200).json({ message: "Brand Found Successfully ✅", brand })
})

export {
    addBrand,
    updateBrand,
    deleteBrand,
    getAllBrands,
    getSpecificBrand
}