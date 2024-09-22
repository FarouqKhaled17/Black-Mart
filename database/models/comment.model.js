const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'comment must be at least 10 characters'],
        maxLength: [200, 'comment must be at most 200 characters'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const Comment = mongoose.model('Comment', commentSchema)