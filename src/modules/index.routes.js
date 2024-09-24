import { globalError } from "../middleware/globalError.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brands/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./products/product.routes.js"
import reviewRouter from "./reviews/review.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import testimonialRouter from "./testimonials/testimonial.routes.js"
import userRouter from "./users/user.routes.js"

export const bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/subcategory", subcategoryRouter)
    app.use("/api/v1/product", productRouter)
    app.use("/api/v1/brand", brandRouter)
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/review", reviewRouter)
    app.use("/api/v1/testimonial", testimonialRouter)
    app.use(globalError)
}