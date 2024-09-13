import joi from 'joi';

//validation for createing a new brand
const addNewBrandval = joi.object({
    name: joi.string().required().min(2).max(100).trim(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/png', 'image/jpg', 'image/jpeg').required(),
        size: joi.number().max(5242880).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    }).required()
})
//validation for getting a specific brand
const getSpecificBrandVal = joi.object({
    id: joi.string().required().hex().length(24),
})
//validation for deleting a brand
const deleteBrandVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a brand
const updateBrandVal = joi.object({
    id: joi.string().required().hex().length(24),
    name: joi.string().min(2).max(100).trim(),
    image: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/png', 'image/jpg', 'image/jpeg').required(),
        size: joi.number().max(5242880).required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
    })
})




export {
    addNewBrandval,
    getSpecificBrandVal,
    deleteBrandVal,
    updateBrandVal
}