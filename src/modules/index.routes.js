import { globalError } from "../middleware/globalError.js"
import brandRouter from "./brands/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./products/product.routes.js"
import subcategoryRouter from "./subcategory/subcategory.routes.js"

export const bootstrap=(app)=>{
    app.use("/api/v1/categories",categoryRouter)
    app.use("/api/v1/subcategory",subcategoryRouter)
    app.use("/api/v1/product",productRouter)
    app.use("/api/v1/brand",brandRouter)
    app.use(globalError)
}