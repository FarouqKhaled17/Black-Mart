import joi from 'joi'

//validation for registering a new user
const signupVal = joi.object(
    {
        username: joi.string().required().min(2).max(100).trim(),
        email: joi.string().required().min(2).max(100).trim().pattern(/^[a-zA-Z0-9._%+-]+@blackmart\.com$/), // Regex to check domain
        Gmail: joi.string().email().required().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
        mobileNumber: joi.string().required().length(11).trim().pattern(/^0\d{10}$/),
        password: joi.string().required().min(6).max(100).trim().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
        confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'password and confirm password must be same' }),
        age: joi.number().required().min(18).max(100),
    }
)

//validation for login
const loginVal = joi.object(
    {
        email: joi.string().required().min(2).max(100).trim().pattern(/^[a-zA-Z0-9._%+-]+@blackmart\.com$/), // Regex to check domain
        Gmail: joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/), // Correct regex pattern for Gmail addresses
        password: joi.string().required().min(6).max(100).trim().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
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
const updatePasswordVal = joi.object(
    {
        oldPassword: joi.string().required().min(6).max(100).trim().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
        newPassword: joi.string().required().min(6).max(100).trim().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
        confirmPassword: joi.valid(joi.ref('newPassword')).required().messages({ 'any.only': 'new password and confirm password must be same' }),
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
        password: joi.string().required().min(6).max(100).trim().pattern(/^[A-Z][a-z0-9A-Z]{8,}$/),
        confirmPassword: joi.valid(joi.ref('password')).required().messages({ 'any.only': 'password and confirm password must be same' }),
    }
)

export {
    signupVal,
    loginVal,
    updateUserVal,
    updatePasswordVal,
    forgotPasswordVal,
    resetPasswordVal
}