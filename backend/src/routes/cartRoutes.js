import express from "express";



import authenticateUser from "../middleware/authMiddleware.js";
import { addToCart, clearCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart/cartController.js";

const router = express.Router();


// Add product to cart
router.post(
    "/",
    authenticateUser,
    addToCart
);


// Get current user's cart
router.get(
    "/",
    authenticateUser,
    getCart
);


// Update product quantity
router.put(
    "/",
    authenticateUser,
    updateCartItem
);


// Remove one product from cart
router.delete(
    "/:productId",
    authenticateUser,
    removeFromCart
);


// Clear cart all
router.delete(
    "/",
    authenticateUser,
    clearCart
);


export default router;