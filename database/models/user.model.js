import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'name must be at least 2 characters']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password must be at least 6 characters']
    },
    mobileNubmer:{
        type: String,
        trim: true,
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
    }
}, { timestamps: true })

export const userModel = mongoose.model('user', userSchema)