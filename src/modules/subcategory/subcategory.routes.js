import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import { addSubcategory, deleteSubcategory, getAllSubcategories, getSpecificSubcategory, updateSubcategory } from "./subcategory.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subcategoryRouter = express.Router();

config();

subcategoryRouter
    .route("/")
    .post(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'), addSubcategory)
    .get(getAllSubcategories)
subcategoryRouter
    .route("/:id")
    .put(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'), updateSubcategory)
    .delete(protectedRoutes, allowedTo('admin'), deleteSubcategory)
    .get(protectedRoutes, allowedTo('user', 'admin'), getSpecificSubcategory)

export default subcategoryRouter;