import mongoose from "mongoose"

const testimonialSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'message must be at least 10 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const testimonialModel = mongoose.model('testimonial', testimonialSchema)