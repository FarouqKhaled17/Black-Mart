import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    orderItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
        },
        quantity: Number,
        price: Number,
    }],
    totalOrderPrice: Number,
    shippingAddress: {
        street: String,
        city: String,
        phone: String,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'paypal', 'stripe'],
        default: 'cash'
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    }
}, { timestamps: true })

export const orderModel = mongoose.model('order', orderSchema)