import joi from 'joi';

//validation for createing a new category
const addReviewVal = joi.object({
    review: joi.string().required().min(2).max(100).trim(),
    rating: joi.number().min(0).max(5).required(),
    product: joi.string().required().hex().length(24),
})

//validation for deleting a category
const deleteReviewVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a category
const updateReviewVal = joi.object({
    id: joi.string().required().hex().length(24),
    review: joi.string().min(2).max(100).trim(),
    rating: joi.number().min(0).max(5),
    product: joi.string().hex().length(24),
})




export {
    addReviewVal,
    deleteReviewVal,
    updateReviewVal
}