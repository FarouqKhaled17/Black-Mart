import { userModel } from "../../database/models/user.model.js"
import { statusCode } from "../utils/statusCode.js"

export const emailExist = async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: "Email already exists" })
    }
    next()
}