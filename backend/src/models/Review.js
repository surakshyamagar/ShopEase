import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        // which user wrote it?
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // wich product is beign reviewd?
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;