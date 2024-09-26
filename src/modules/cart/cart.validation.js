import joi from 'joi';

//validation for adding to cart
const addToCartVal = joi.object({
    product: joi.string().required().hex().length(24),
    quantity: joi.number().min(1).options({ convert: false }),
    price: joi.number().min(1).options({ convert: false }),
})

//validation for gettting specific cart
const getCartVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for removing from cart
const removeItemFromCartVal = joi.object({
    id: joi.string().required().hex().length(24),
    quantity: joi.number().min(1),
})

//validation for removing from cart
const updateCartVal = joi.object({
    id: joi.string().required().hex().length(24),
    quantity: joi.number().required().min(1),
})

//validation for applying coupon
const applyCouponVal = joi.object({
    code: joi.string().required(),
})

export {
    addToCartVal,
    updateCartVal,
    getCartVal,
    removeItemFromCartVal,
    applyCouponVal
}