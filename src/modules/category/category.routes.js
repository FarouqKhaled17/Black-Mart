import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { addNewCategoryVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";

const categoryRouter = express.Router();

config();

categoryRouter
    .route("/")
    .post(uploadSingleFile('img'), validation(addNewCategoryVal), addCategory)
    .get(getAllCategories)
categoryRouter
    .route("/:id")
    .put(uploadSingleFile('img'), validation(updateCategoryVal), updateCategory)
    .delete(deleteCategory)
    .get(getSpecificCategory)

export default categoryRouter;