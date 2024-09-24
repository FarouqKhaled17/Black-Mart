import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'name must be at least 2 characters']
    },
    //login with the default email like ----@blackmart.com
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'email must be unique']
    },
    Gmail: {
        type: String,
        trim: true,
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password must be at least 6 characters']
    },
    img: {
        type: String,
    },
    mobileNumber: {
        type: String,
        unique: [true, 'mobile number must be unique']
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        default: null
    },
    passwordChangedAt: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
    },
    wishlist: [{
        type: mongoose.Types.ObjectId,
        ref: 'product'
    }],
    address: [{
        street: String,
        city: String,
        phone: String,
        country: String,
    }],
}, { timestamps: true })

userSchema.post('init', function (doc) {
    doc.img = process.env.BASE_URL + '/uploads/' + doc.img
})

export const userModel = mongoose.model('user', userSchema)