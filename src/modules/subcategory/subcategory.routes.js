import express from "express";
import { config } from "dotenv";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../services/fileUploads/fileUpload.js";
import { addSubcategory, deleteSubcategory, getAllSubcategories, getSpecificSubcategory, updateSubcategory } from "./subcategory.controller.js";

const subcategoryRouter = express.Router();

config();

subcategoryRouter
    .route("/")
    .post( addSubcategory)
    .get(getAllSubcategories)
    subcategoryRouter
    .route("/:id")
    .put(updateSubcategory)
    .delete(deleteSubcategory)
    .get(getSpecificSubcategory)

export default subcategoryRouter;