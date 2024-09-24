import joi from 'joi'

const passwordPattern = /^[A-Z][a-zA-Z0-9!@#$%^&*()_+]{8,}$/;



//validation for registering a new user
const signupVal = joi.object(
    {
        username: joi.string().required().min(2).max(100).trim(),
        email: joi.string().required().min(2).max(100).trim().pattern(/^[a-zA-Z0-9._%+-]+@blackmart\.com$/),
        password: joi.string().required().min(6).max(100).trim().pattern(passwordPattern),
        confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'password and confirm password must be same' }),
    }
)

//validation for login
const loginVal = joi.object(
    {
        email: joi.string().required().min(2).max(100).trim().pattern(/^[a-zA-Z0-9._%+-]+@blackmart\.com$/),
        Gmail: joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        password: joi.string().required().min(6).max(100).trim().pattern(passwordPattern),
    }
)

//validation for updating user
const updateUserVal = joi.object(
    {
        name: joi.string().min(2).max(100).trim(),
        email: joi.string().email(),
        age: joi.number().min(18).max(100),
    }
)

//validation for updating password
const changeUserPassVal = joi.object(
    {
        password: joi.string().required().min(6).max(100).trim().pattern(passwordPattern),
        newPassword: joi.string().required().min(6).max(100).trim().pattern(passwordPattern),
    }
)

//validation for forgot password
const forgotPasswordVal = joi.object(
    {
        email: joi.string().email().required(),
    }
)

//validation for reset password
const resetPasswordVal = joi.object(
    {
        password: joi.string().required().min(6).max(100).trim().pattern(passwordPattern),
        confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'password and confirm password must be same' }),
    }
)

export {
    signupVal,
    loginVal,
    updateUserVal,
    changeUserPassVal,
    forgotPasswordVal,
    resetPasswordVal
}