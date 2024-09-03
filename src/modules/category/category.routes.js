import express from "express";
import { addCategory, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { config } from "dotenv";

const categoryRouter = express.Router();

config();

categoryRouter
    .route("/")
    .post(addCategory)
    .get(getAllCategories)
categoryRouter
    .route("/:id")
    .put(updateCategory)
    .delete(deleteCategory)
    .get(getSpecificCategory)

export default categoryRouter;