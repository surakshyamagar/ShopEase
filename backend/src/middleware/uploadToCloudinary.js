import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (req, res, next) => {

    console.log("FILE RECEIVED:", req.file);

    if (!req.file) {
        console.log("❌ No file received by Multer");
        return next();
    }

    const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: "shopease/products",
            resource_type: "image",
        },
        (error, result) => {

            if (error) {
                console.error("❌ Cloudinary upload error:", error);
                return next(error);
            }

            console.log("✅ Cloudinary upload successful");
            console.log("Cloudinary URL:", result.secure_url);

            req.cloudinaryResult = result;

            next();
        }
    );

    streamifier
        .createReadStream(req.file.buffer)
        .pipe(uploadStream);
};

export default uploadToCloudinary;