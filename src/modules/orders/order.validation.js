import Joi from 'joi';

//validation for creating a cash order
const createCashOrderVal = Joi.object({
    id: Joi.string().required().hex().length(24),
    shippingAddress: Joi.object({
        street: Joi.string().required().min(2).max(200).trim(),
        city: Joi.string().required().min(2).max(200).trim(),
        phone: Joi.string().required().min(2).max(200).trim(),
    }).required()
})


export {
    createCashOrderVal,
}