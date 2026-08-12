import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        description:{
            type: String,
            required: [true, "Product description is required"],
            trim: true,
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price can't be negative"],
        },

        stock:{
            type: Number,
            required: [true, "Stock is required"],
            min: [0, "Stock can't be negative"],
            default:0,
        },

        image: {
            type: String,
            trim: true,
        },

        category: {
            // value stored in category must be a MongoDB ObjectId.
            type: mongoose.Schema.Types.ObjectId,
            // ObjectId refers to a document from the Category model.
            ref: "Category",
            required: [true, "Category is required"],
        },
    },

    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;