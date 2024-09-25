import joi from 'joi';

//validation for createing a new category
const addCouponVal = joi.object({
    code: joi.string().min(2).max(100).trim(),
    discount: joi.number().min(0).required(),
    expiry: joi.date().required(),
})

//validation for deleting a category
const deleteCouponVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a category
const updateCouponVal = joi.object({
    id: joi.string().required().hex().length(24),
    code: joi.string().min(2).max(100).trim(),
    discount: joi.number().min(0),
    expiry: joi.date(),
})




export {
    addCouponVal,
    deleteCouponVal,
    updateCouponVal
}