import mongoose, { Schema } from "mongoose"

const categorySchema = new mongoose.Schema({
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
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })

categorySchema.post('init',function(doc){
    doc.img=process.env.BASE_URL+'/uploads/'+doc.img
})

export const categoryModel = mongoose.model('category', categorySchema)