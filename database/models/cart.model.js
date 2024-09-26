import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    cartItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    totalPriceWithDiscount: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export const cartModel = mongoose.model('cart', cartSchema)