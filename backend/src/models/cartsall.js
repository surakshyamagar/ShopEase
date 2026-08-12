import mongoose from "mongoose";

// items
// One items: many
// eg {product: "shoe_id, quantity:3"}
const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    
    // cart having own id
    {
        _id: true,
    }
);

// user: who owns this cart (user & items)
// whole Cart
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            // ONE USER → ONE CART (prevents one user from having multiple Cart documents.)
            unique: true,
        },

        // items is an array, and every object inside that array must follow the cartItemSchema structure.
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;