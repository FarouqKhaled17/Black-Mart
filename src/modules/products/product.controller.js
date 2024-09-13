import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { productModel } from "../../../database/models/product.model.js"

//? Add Product
const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'))
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    let newProduct = new productModel(req.body)
    // check if product already exists
    const product = await productModel.findOne({ name: req.body.name })
    product && res.status(409).json({ message: "Product Already Exists!" })
    !product && newProduct.save() && res.status(201).json({ message: "Product Added Successfully ✅", newProduct })
})

//* Update Product
const updateProduct = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map(img => img.filename)
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(404).json({ message: "Product Not Found!" })
    product && res.status(200).json({ message: "Product Updated Successfully ✅", product })
})

//! Delete Product
const deleteProduct = catchError(async (req, res, next) => {
    let product = await productModel.findByIdAndDelete(req.params.id)
    !product && res.status(404).json({ message: "Product Not Found!" })
    product && res.status(200).json({ message: "Product Deleted Successfully ✅", product })
})

// Get All Products
const getAllProducts = catchError(async (req, res, next) => {
    productModel.find().sort({ createdAt: -1 })
        .then(products => res.status(200).json({ message: "Products Found Successfully ✅", products }))
        .catch(err => res.status(404).json({ message: "Products Not Found!" }))
})

// Get Specific Product
const getSpecificProduct = catchError(async (req, res, next) => {
    let product = await productModel.findOne({ _id: req.params.id })
    !product && res.status(404).json({ message: "Product Not Found!" })
    product && res.status(200).json({ message: "Product Found Successfully ✅", product })
})

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSpecificProduct
}