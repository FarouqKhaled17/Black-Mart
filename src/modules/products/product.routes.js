import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { uploadFields } from "../../services/fileUploads/fileUpload.js";
import { addProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct } from "./product.controller.js";
import { addNewProductVal, updateProductVal } from "./product.validation.js";

const productRouter = express.Router();

config();

productRouter
    .route("/")
    .post(uploadFields([
        { name: "imgCover", maxcout: 1 },
        { name: "images", maxcout: 10 }
    ]), validation(addNewProductVal), addProduct)
    .get(getAllProducts)
productRouter
    .route("/:id")
    .put(uploadFields([
        { name: "imgCover", maxcout: 1 },
        { name: "images", maxcout: 10 }
    ]), validation(updateProductVal), updateProduct)
    .delete(deleteProduct)
    .get(getSpecificProduct)

export default productRouter;