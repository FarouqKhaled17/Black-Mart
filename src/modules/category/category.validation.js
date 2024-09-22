import joi from 'joi';

//validation for createing a new category
const addNewCategoryVal = joi.object({
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
//validation for getting a specific category
const getSpecificCategoryVal = joi.object({
    id: joi.string().required().hex().length(24),
})
//validation for deleting a category
const deleteCategoryVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a category
const updateCategoryVal = joi.object({
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
    }).required()
})




export {
    addNewCategoryVal,
    getSpecificCategoryVal,
    deleteCategoryVal,
    updateCategoryVal
}