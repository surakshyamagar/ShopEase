import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});


const orderSchema = new mongoose.Schema(
    {
        // Who placed the order?
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Products purchased
        items: [orderItemSchema],

        // Total price of the order
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        // Where should the order be delivered?
        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },
        },

        // Current order status
        status: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },

    {
        timestamps: true,
    }
);


const Order = mongoose.model("Order", orderSchema);

export default Order;