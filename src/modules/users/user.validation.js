import joi from 'joi';

//validation for createing a new brand
const addNewUserVal = joi.object({
    username: joi.string().required().min(2).max(100).trim(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(100).trim().pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/),
    confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'password and confirm password must be same' }),
})
//validation for getting a specific brand
const getSpecificUserVal = joi.object({
    id: joi.string().required().hex().length(24),
})
//validation for deleting a brand
const deleteUserVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a brand
const updateUserVal = joi.object({
    id: joi.string().required().hex().length(24),
    username: joi.string().min(2).max(100).trim(),
    email: joi.string().email(),
    password: joi.string().min(6).max(100).trim().pattern(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/),
    confirmPassword: joi.valid(joi.ref('password')).messages({ 'any.only': 'password and confirm password must be same' }),
})




export {
    addNewUserVal,
    getSpecificUserVal,
    deleteUserVal,
    updateUserVal
}