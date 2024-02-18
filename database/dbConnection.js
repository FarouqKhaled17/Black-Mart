import { config } from "dotenv"
import mongoose from "mongoose"

export const dbConnection = () => {
    config()
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log('Connected to database 🚀'))
        .catch((err) => console.log('Error connecting to database 😭', err))
}