import mongoose from "mongoose"
import { productModel } from "./product.model.js";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'category name must be unique'],
        minLength: [2, 'category name must be at least 2 characters']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    img: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })

subCategorySchema.post('init', function (doc) {
    doc.img = process.env.BASE_URL + '/uploads/' + doc.img
})

subCategorySchema.pre('findOneAndDelete', async function (next) {
    const subCategory = await this.model.findOne(this.getQuery());
    if (subCategory) {
        await productModel.deleteMany({ subCategory: subCategory._id });
    }
    next();
});
export const subCategoryModel = mongoose.model('subCategory', subCategorySchema)