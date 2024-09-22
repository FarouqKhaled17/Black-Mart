import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct } from "./product.controller.js";
import { addNewProductVal, updateProductVal } from "./product.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const productRouter = express.Router();

config();

productRouter
    .route("/")
    .post(protectedRoutes, allowedTo('admin'), uploadFields([
        { name: "imgCover", maxcout: 1 },
        { name: "images", maxcout: 10 }
    ]), validation(addNewProductVal), addProduct)
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllProducts)
productRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('admin'), uploadFields([
        { name: "imgCover", maxcout: 1 },
        { name: "images", maxcout: 10 }
    ]), validation(updateProductVal), updateProduct)
    .delete(protectedRoutes, allowedTo('admin'), deleteProduct)
    .get(protectedRoutes, allowedTo('user', 'admin'), getSpecificProduct)

export default productRouter;