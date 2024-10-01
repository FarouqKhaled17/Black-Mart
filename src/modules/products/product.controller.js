import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { productModel } from "../../../database/models/product.model.js"
import { statusCode } from "../../utils/statusCode.js"

//? Add Product
const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name.toLowerCase().split(' ').join('-'));
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.images = req.files.images.map(img => img.filename);

    // Check if product already exists
    const existingProduct = await productModel.findOne({ name: req.body.name });
    if (existingProduct) {
        return res.status(statusCode.CONFLICT).json({ message: "Product Already Exists!" });
    }

    // Save the new product to the database
    const newProduct = await new productModel(req.body).save();

    // Retrieve the product with populated fields
    const populatedProduct = await productModel.findById(newProduct._id)
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('subCategory', 'name');

    return res.status(statusCode.CREATED).json({ message: "Product Added Successfully ✅", product: populatedProduct });
});


//* Update Product
const updateProduct = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map(img => img.filename)
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(statusCode.NOT_FOUND).json({ message: "Product Not Found!" })
    product && res.status(statusCode.OK).json({ message: "Product Updated Successfully ✅", product })
})

//! Delete Product
const deleteProduct = catchError(async (req, res, next) => {
    let product = await productModel.findByIdAndDelete(req.params.id)
    !product && res.status(statusCode.NOT_FOUND).json({ message: "Product Not Found!" })
    product && res.status(statusCode.OK).json({ message: "Product Deleted Successfully ✅", product })
})

// Get All Products
const getAllProducts = catchError(async (req, res, next) => {
    let products = await productModel.find()
        .sort({ createdAt: -1 })
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('subCategory', 'name')
    !products && res.status(statusCode.NOT_FOUND).json({ message: "Products Not Found!" })
    products && res.status(statusCode.OK).json({ message: "Products Found Successfully ✅", products })
})

// Get Specific Product
const getSpecificProduct = catchError(async (req, res, next) => {
    let product = await productModel.findOne({ _id: req.params.id })
    !product && res.status(statusCode.NOT_FOUND).json({ message: "Product Not Found!" })
    product && res.status(statusCode.OK).json({ message: "Product Found Successfully ✅", product })
})

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSpecificProduct
}