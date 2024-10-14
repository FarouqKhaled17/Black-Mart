import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "product name must be unique"],
      minLength: [2, "product name must be at least 2 characters"],
      maxLength: [200, "product name must be at most 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: [20, "product description must be at least 20 characters"],
      maxLength: [500, "product description must be at most 500 characters"],
    },
    // style: [
    //   {
    //     type: String,
    //   },
    // ],
    // color: [
    //   {
    //     type: String,
    //   },
    // ],
    // typeof: String,

    // style: String,
    size: [],
    color: [],
    // typeof: String,
    imgCover: String,
    images: [],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratingsAvg: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    rateCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
    },
    // brand: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'brand',
    // },
    brand: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.post('init', function (doc) {
    doc.imgCover = process.env.BASE_URL + '/uploads/' + doc.imgCover,
        doc.images = doc.images.map((img) =>
            process.env.BASE_URL + '/uploads/' + img)
})

productSchema.virtual('myreviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product'
})

productSchema.pre(/^find/, function () {
    this.populate('myreviews');
});

export const productModel = mongoose.model('product', productSchema)