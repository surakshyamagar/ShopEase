import express from "express";
import { cancelOrder, createOrder, getMyOrder, getOrders, updateOrderStatus } from "../controllers/order/orderController.js";
import authenticateUser from "../middleware/authMiddleware.js";


const router = express.Router();


// Create order from cart
router.post(
    "/",
    authenticateUser,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/",
    authenticateUser,
    getMyOrder
);


// Get one order
router.get(
    "/:id",
    authenticateUser,
    getOrders
);


// Update order status
router.put(
    "/:id",
    authenticateUser,
    updateOrderStatus
);


// Cancel order
router.delete(
    "/:id",
    authenticateUser,
    cancelOrder
);


export default router;