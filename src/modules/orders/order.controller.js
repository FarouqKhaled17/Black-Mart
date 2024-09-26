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
    let order = await orderModel.findOne({ user: req.user._id }).populate("orderItems.product");
    if (!order) return next(new AppError("Order not found!", statusCode.NOT_FOUND));
    res.status(statusCode.OK).json({ message: "Order found successfully ✅", order });
});

//get all orders
const getAllOrders = catchError(async (req, res, next) => {
    let orders = await orderModel.find().populate("orderItems.product");
    if (!orders) return next(new AppError("Orders not found!", statusCode.NOT_FOUND));
    res.status(statusCode.OK).json({ message: "Orders found successfully ✅", orders });
});


export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders
}