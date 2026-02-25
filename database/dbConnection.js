import { config } from "dotenv";
import mongoose from "mongoose";

let isConnected = false;

export const dbConnection = async () => {
    if (isConnected) return;
    config();
    try {
        await mongoose.connect(process.env.DB_ONLINE, {
        });
        console.log('Connected to DB 🚀');
        isConnected = true;
    } catch (err) {
        console.log('Error connecting to DB 😭', err);
        throw err; 
    }
};