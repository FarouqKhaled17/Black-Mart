import { globalError } from "../middleware/globalError.js"
import categoryRouter from "./category/category.routes.js"

export const bootstrap=(app)=>{
    app.use("/api/v1/categories",categoryRouter)
    app.use(globalError)
}