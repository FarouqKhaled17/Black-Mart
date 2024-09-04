import multer from "multer"
import { AppError } from "../../utils/AppError.js"
import { statusCode } from "../../utils/statusCode.js"

export const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }
        else {
            cb(new AppError("Please upload an image file", statusCode.BAD_REQUEST), false)
        }
    }
    return multer({ storage, fileFilter });
}

// Middleware to upload a single file
export const uploadSingleFile = fieldName => {
    return fileUpload().single(fieldName);
};

// Middleware to upload multiple files
export const uploadMultipleFiles = fieldName => {
    return fileUpload().array(fieldName, 10);  // Limit to 10 files
};

// Middleware to upload files with specific field names
export const uploadFields = fields => {
    return fileUpload().fields(fields);
};