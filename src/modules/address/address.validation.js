import joi from 'joi';

//validation for adding an address
const addAddressVal = joi.object({
    street: joi.string().required().min(2).max(100).trim(),
    city: joi.string().required().min(2).max(100).trim(),
    phone: joi.string().required().min(2).max(100).trim(),
    country: joi.string().required().min(2).max(100).trim()
})

//validation for deleting an address
const deleteAddressVal = joi.object({
    id: joi.string().required().hex().length(24),
    street: joi.string().min(2).max(100).trim(),
    city: joi.string().min(2).max(100).trim(),
    phone: joi.string().min(2).max(100).trim(),
    country: joi.string().min(2).max(100).trim()
})

export {
    addAddressVal,
    deleteAddressVal,
}