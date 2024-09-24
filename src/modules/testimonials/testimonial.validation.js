import joi from 'joi';

//validation for createing a new testimonial
const addTestimonialVal = joi.object({
    testimonial: joi.string().required().min(2).max(100).trim(),
})

//validation for deleting a testimonial
const deleteTestimonialVal = joi.object({
    id: joi.string().required().hex().length(24),
})

//validation for updating a testimonial
const updateTestimonialVal = joi.object({
    id: joi.string().required().hex().length(24),
    testimonial: joi.string().min(2).max(100).trim(),
})

//validation for accepting or rejecting a testimonial
const acceptRejectTestimonialVal = joi.object({
    id: joi.string().required().hex().length(24),
    status: joi.string().valid('approved', 'rejected').required(),
})




export {
    addTestimonialVal,
    deleteTestimonialVal,
    updateTestimonialVal,
    acceptRejectTestimonialVal
}