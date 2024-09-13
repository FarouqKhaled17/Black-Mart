import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { addNewBrandval, getSpecificBrandVal, updateBrandVal } from "./brand.validation.js";

const brandRouter = express.Router();

config();

brandRouter
    .route("/")
    .post(uploadSingleFile('img'), validation(addNewBrandval), addBrand)
    .get(getAllBrands)
brandRouter
    .route("/:id")
    .put(uploadSingleFile('img'), validation(updateBrandVal), updateBrand)
    .delete(deleteBrand)
    .get(validation(getSpecificBrandVal), getSpecificBrand)

export default brandRouter;