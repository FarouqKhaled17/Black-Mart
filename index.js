//for handliing errors outside of express errors that should be handled by the globalError middleware
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥');
    console.log(err, err.message);
})

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import { bootstrap } from "./src/modules/index.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middleware/globalError.js";
const app = express();
app.use(express.json());
app.use('/uploads',express.static('uploads'))

dbConnection();
bootstrap(app);

//! .ENV Variables
config();
const port = process.env.PORT || 5000;

//? Error Handling
app.use('*', (req, res, next) => {
    const error = new AppError(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = 404;
    next(error);
});

app.use(globalError)

//? Error Handling with Unhandled Rejection Error Messages (Unhandled Rejection Error Messages are not handled by the globalError middleware)
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
});

app.listen(port, () => {
    console.log(`Server running on port ${port} 👌`);
});
