import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import categoryRouter from "./src/modules/category/category.routes.js";
const app = express();
app.use(express.json());

dbConnection();

app.use(categoryRouter);
//! .ENV Variables
config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 👌`);
});
