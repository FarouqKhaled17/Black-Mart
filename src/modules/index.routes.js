import { globalError } from "../middleware/globalError.js"
import addressRouter from "./address/address.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brands/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupons/coupon.routes.js"
import orderRouter from "./orders/order.routes.js"
import productRouter from "./products/product.routes.js"
import reviewRouter from "./reviews/review.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import testimonialRouter from "./testimonials/testimonial.routes.js"
import userRouter from "./users/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"

export const bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/subcategory", subcategoryRouter)
    app.use("/api/v1/product", productRouter)
    app.use("/api/v1/brand", brandRouter)
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/review", reviewRouter)
    app.use("/api/v1/testimonial", testimonialRouter)
    app.use("/api/v1/wishlist", wishlistRouter)
    app.use("/api/v1/address", addressRouter)
    app.use("/api/v1/coupon", couponRouter)
    app.use("/api/v1/cart", cartRouter)
    app.use("/api/v1/order", orderRouter)
    app.use(globalError)
}