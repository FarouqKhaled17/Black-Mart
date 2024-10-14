import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { statusCode } from "../../utils/statusCode.js"

//! Create a Cash Order
const createCashOrder = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id);
    if (!cart) return next(new AppError("Order not found!", statusCode.NOT_FOUND));
    //get the total order price
    let totalOrderPrice = cart.totalPriceWithDiscount ? cart.totalPriceWithDiscount : cart.totalPrice
    //?create the order
    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalOrderPrice,
        paymentMethod: "cash",
        shippingAddress: req.body.shippingAddress
    });
    await order.save();
    //?increment sold & decremented the quantity
    let options = cart.cartItems.map(item => ({
        updateOne: {
            filter: { _id: item.product },
            update: { $inc: { sold: item.quantity, quantity: -item.quantity } }
        }
    }))
    await productModel.bulkWrite(options);
    //clear the cart after a successful order
    await cartModel.findByIdAndDelete(req.params.id);
    res.status(statusCode.CREATED).json({ message: "Order created successfully ✅", order });
});

//get specific order
const getSpecificOrder = catchError(async (req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id }).populate("orderItems.product");
    if (!orders.length) {
        return next(new AppError("No orders found for this user!", statusCode.NOT_FOUND));
    }
    const totalPriceOfAllOrders = orders.reduce((acc, order) => acc + order.totalOrderPrice, 0);
    res.status(statusCode.OK).json({
        message: "Orders found successfully ✅",
        orders,
        totalPriceOfAllOrders
    });
});

//get all orders
const getAllOrders = catchError(async (req, res, next) => {
    let orders = await orderModel.find().populate("orderItems.product");
    if (!orders) return next(new AppError("Orders not found!", statusCode.NOT_FOUND));
    res.status(statusCode.OK).json({ message: "Orders found successfully ✅", orders });
});

//!Create Checkout Session
const createCheckoutSession = catchError(async (req, res, next) => {
    let cart = await cartModel.findById(req.params.id);
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found. Please check the cart ID and try again.",
            statusCode: 404
        });
    }

    let totalOrderPrice = cart.totalPriceWithDiscount ? cart.totalPriceWithDiscount : cart.totalPrice;
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "egp",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.username,  // Add a fallback name
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/orders/success`,
        cancel_url: `${req.protocol}://${req.get("host")}/orders/cancel`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress,
    });

    return res.status(statusCode.OK).json({ session });
});


export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckoutSession
}