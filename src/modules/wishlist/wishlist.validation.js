import joi from 'joi';

//validation for adding to wishlist
const addToWishlistVal = joi.object({
    product: joi.string().required().hex().length(24),
})

//validation for removing from wishlist
const removeFromWishlistVal = joi.object({
    id: joi.string().required().hex().length(24),
})




export {
    addToWishlistVal,
    removeFromWishlistVal,
}