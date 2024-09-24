import mongoose from "mongoose"

const testimonialSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    testimonial: {
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

testimonialSchema.pre(/^find/, function () {
    this.populate('user', 'username')
})

export const testimonialModel = mongoose.model('testimonial', testimonialSchema)