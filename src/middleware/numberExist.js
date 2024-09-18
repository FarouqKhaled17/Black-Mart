import { userModel } from "../../database/models/user.model.js"
import { statusCode } from "../utils/statusCode.js"

export const numberExist = async (req, res, next) => {
    let user = await userModel.findOne({ mobileNumber: req.body.mobileNumber })
    if (user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: "Mobile Number already exists" })
    }
    next()
}