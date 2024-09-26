import { cartModel } from "../../../database/models/cart.model.js"
import { couponModel } from "../../../database/models/coupon.model.js"
import { productModel } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { statusCode } from "../../utils/statusCode.js"

//* Add to Cart
const addToCart = catchError(async (req, res, next) => {
    // Find the product by ID
    let product = await productModel.findById(req.body.product);
    if (!product) {
        return next(new AppError("Product not found!", statusCode.NOT_FOUND));
    }

    // Check if the requested quantity exceeds the available product quantity
    if (req.body.quantity > product.quantity) {
        return next(new AppError("Quantity exceeds the available quantity!", statusCode.BAD_REQUEST));
    }

    req.body.user = req.user.id;
    req.body.price = product.price;

    // Check if the user already has a cart
    let isCartExist = await cartModel.findOne({ user: req.user.id });

    // If no cart exists, create a new one
    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user.id,
            cartItems: [{
                product: req.body.product,
                quantity: req.body.quantity,
                price: product.price
            }],
            totalPrice: product.price * req.body.quantity // Set total price for the new cart
        });
        await cart.save();

        return res.status(statusCode.CREATED).json({ message: "Cart created successfully ✅", cart });
    }

    // If the user has an existing cart
    let existingItem = isCartExist.cartItems.find(item => item.product.toString() === req.body.product);

    // If the product is already in the cart, update its quantity and price
    if (existingItem) {
        let newQuantity = existingItem.quantity + req.body.quantity || 1;

        // Ensure the new quantity doesn't exceed available stock
        if (newQuantity > product.quantity) {
            return next(new AppError("Quantity exceeds the available quantity!", statusCode.BAD_REQUEST));
        }

        existingItem.quantity = newQuantity;
        existingItem.price = product.price; // Update the price based on the product's price

    } else {
        // If the product doesn't exist in the cart, add it as a new item
        isCartExist.cartItems.push({
            product: req.body.product,
            quantity: req.body.quantity,
            price: product.price
        });
    }

    //! Update the total price of the cart OR we can make with for each
    isCartExist.totalPrice = isCartExist.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Save the updated cart
    await isCartExist.save();

    res.status(statusCode.OK).json({ message: "Cart updated successfully ✅", cart: isCartExist });
});

//! Delete item from the cart
const deleteItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { cartItems: { _id: req.params.id } } },
        { new: true }
    );
    if (!cart) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Cart Not Found!" });
    }
    // Update the total price of the cart (only if the cart exists)
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    await cart.save();
    return res.status(statusCode.OK).json({ message: "Cart Item Deleted Successfully ✅", cart });
});


const updateCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Cart Not Found!" });
    }
    let item = cart.cartItems.find(item => item._id.toString() === req.params.id);
    if (!item) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Item Not Found!" });
    }
    item.quantity = req.body.quantity;
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    await cart.save();
    return res.status(statusCode.OK).json({ message: "Cart Updated Successfully ✅", cart });
});

// Get Logged In User Cart
const getLoggedInUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    !cart && res.status(statusCode.NOT_FOUND).json({ message: "Cart Not Found!" })
    cart && res.status(statusCode.OK).json({ message: "Cart Found Successfully ✅", cart: cart })
})

//clear user cart
const clearUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndDelete({ user: req.user._id });
    !cart && res.status(statusCode.NOT_FOUND).json({ message: "Cart Not Found!" });
    cart && res.status(statusCode.OK).json({ message: "Cart Deleted Successfully ✅", cart });
});

//! Apply Coupon
const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.code, expiry: { $gte: Date.now() } });
    if (!coupon) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Coupon Not Found!" });
    }
    let cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Cart Not Found!" });
    }
    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
    cart.totalPrice = totalPriceAfterDiscount;
    cart.discount = coupon.discount;
    await cart.save();
    return res.status(statusCode.OK).json({ message: "Coupon Applied Successfully ✅", cart });
})

export {
    addToCart,
    deleteItemFromCart,
    updateCart,
    getLoggedInUserCart,
    clearUserCart,
    applyCoupon
}