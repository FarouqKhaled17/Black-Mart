import joi from 'joi';

//validation for createing a new subcategory
const addNewSubcategoryVal = joi.object({
    name: joi.string().required().min(2).max(100).trim(),
})
//validation for getting a specific subcategory
const getSpecificSubcategoryVal = joi.object({
    id: joi.string().required().hex().length(24),
})
//validation for deleting a subcategory
const deleteSubcategoryVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a subcategory
const updateSubcategoryVal = joi.object({
    id: joi.string().required().hex().length(24),
    name: joi.string().min(2).max(100).trim()
})




export {
    addNewSubcategoryVal,
    getSpecificSubcategoryVal,
    deleteSubcategoryVal,
    updateSubcategoryVal
}