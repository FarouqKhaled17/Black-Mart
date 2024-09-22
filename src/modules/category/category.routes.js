import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { addNewCategoryVal, updateCategoryVal } from "./category.validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = express.Router();

config();

categoryRouter
    .route("/")
    .post(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'), validation(addNewCategoryVal), addCategory)
    .get(protectedRoutes, allowedTo('user', 'admin'), getAllCategories)
categoryRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'), validation(updateCategoryVal), updateCategory)
    .delete(protectedRoutes, allowedTo('user', 'admin'), deleteCategory)
    .get(protectedRoutes, allowedTo('user', 'admin'), getSpecificCategory)

export default categoryRouter;