import joi from "joi";

//validation for createing a new category
const addNewProductVal = joi.object({
  name: joi.string().required().min(2).max(200).trim(),
  description: joi
    .string()
    .required()
    .min(20)
    .max(1000)
    .trim()
    .message("Please enter a description with at least 20 characters"),
  price: joi.number().min(0).required(),
  priceAterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).required(),
  category: joi.string().required().hex().length(24),
  subCategory: joi.string().required().hex().length(24),
  brand: joi.string().min(2).max(100).trim().required(),
  // typeof: joi.string(),
  // style: joi.string(),
  // color: joi.string(),

  // Marking `typeof`, `style`, `discount` as optional
  typeof: joi.string().optional(), // Optional field
  style: joi.string().optional(), // Optional field
  discount: joi.number().min(0).max(100).optional(), // Optional field

  color: joi.array().items(joi.string()).min(1),
  size: joi.array().items(joi.string()).min(1),
  createdBy: joi.string().hex().length(24).optional(),
});
//validation for getting a specific category
const getSpecificProductVal = joi.object({
  id: joi.string().required().hex().length(24),
});
//validation for deleting a category
const deleteProductVal = joi.object({
  id: joi.string().required().hex().length(24),
});

//validation for updating a category
const updateProductVal = joi.object({
  id: joi.string().required().hex().length(24),
  name: joi.string().required().min(2).max(200).trim(),
  description: joi.string().required().min(2).max(1000).trim(),
  price: joi.number().min(0).required(),
  priceAterDiscount: joi.number().min(0).optional(),
  quantity: joi.number().min(0).required(),
  category: joi.string().required().hex().length(24),
  subcategory: joi.string().required().hex().length(24),
  brand: joi.string().min(2).max(100).trim(),
  typeof: joi.string().optional(), // Optional field
  style: joi.string().optional(), // Optional field
  discount: joi.number().min(0).max(100).optional(), // Optional field
  color: joi.array().items(joi.string()).min(1),
  size: joi.array().items(joi.string()).min(1),
  createdBy: joi.string().hex().length(24).optional(),
});

export {
  addNewProductVal,
  getSpecificProductVal,
  deleteProductVal,
  updateProductVal,
};
