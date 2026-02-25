import { config } from "dotenv";
config();

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥');
    console.log(err, err.message);
});

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/modules/index.routes.js";
import { globalError } from "./src/middleware/globalError.js";
import cors from "cors";
import { AppError } from "./src/utils/AppError.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

dbConnection();
bootstrap(app);

app.use('*', (req, res, next) => {
    const error = new AppError(`Can't find ${req.originalUrl} on this server!`);
    error.statusCode = 404;
    next(error);
});

app.use(globalError);

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
});

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server running on port ${port} 👌`);
    });
}

export default app;
