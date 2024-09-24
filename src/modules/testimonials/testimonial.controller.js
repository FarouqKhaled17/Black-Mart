import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { statusCode } from "../../utils/statusCode.js"
import { testimonialModel } from "../../../database/models/testimonial.model.js"

//? Add Testimonial
const addTestimonial = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let newTestimonial = new testimonialModel(req.body)
    await newTestimonial.save()
    res.status(statusCode.CREATED).json({ message: "Testimonial Added Successfully ✅", newTestimonial })
})

//* Update Testimonial
const updateTestimonial = catchError(async (req, res, next) => {
    let testimonial = await testimonialModel.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    !testimonial && res.status(statusCode.NOT_FOUND).json({ message: "Testimonial Not Found!" })
    testimonial && res.status(statusCode.OK).json({ message: "Testimonial Updated Successfully ✅", testimonial })
})

//! Delete Testimonial
const deleteTestimonial = catchError(async (req, res, next) => {
    let testimonial = await testimonialModel.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    !testimonial && res.status(statusCode.NOT_FOUND).json({ message: "Testimonial Not Found!" })
    testimonial && res.status(statusCode.OK).json({ message: "Testimonial Deleted Successfully ✅", testimonial })
})

// Get All Testimonials
const getAllTestimonials = catchError(async (req, res, next) => {
    let testimonials = await testimonialModel.find().sort({ createdAt: -1 })
    !testimonials && res.status(statusCode.NOT_FOUND).json({ message: "Testimonials Not Found!" })
    testimonials && res.status(statusCode.OK).json({ message: "Testimonials Found Successfully ✅", testimonials })
})

//!Accept or reject testimonials -->Admin Only
const acceptOrRejectTestimonials = catchError(async (req, res, next) => {
    let testimonial = await testimonialModel.findById(req.params.id);
    if (!testimonial) {
        return res.status(statusCode.NOT_FOUND).json({ message: "Testimonial Not Found!" });
    }
    if (req.body.status === 'approved' || req.body.status === 'rejected') {
        let updatedTestimonial = await testimonialModel.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        }, { new: true });
        return res.status(statusCode.OK).json({ message: `Testimonial ${req.body.status} Successfully ✅`, updatedTestimonial });
    }
    return res.status(statusCode.BAD_REQUEST).json({ message: "Please provide a valid status for the testimonial (approved or rejected)." });
});







export {
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getAllTestimonials,
    acceptOrRejectTestimonials
}