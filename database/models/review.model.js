import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        minLength: [2, 'review text must be at least 2 characters']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

export const reviewModel = mongoose.model('review', reviewSchema)