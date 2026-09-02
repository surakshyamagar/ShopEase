// import express from "express";
// import { cancelOrder, createOrder, getMyOrder, getMyOrders, updateOrderStatus } from "../controllers/order/orderController.js";
// import authenticateUser from "../middleware/authMiddleware.js";


// const router = express.Router();


// // Create order from cart
// router.post(
//     "/",
//     authenticateUser,
//     createOrder
// );


// // Get logged-in user's orders
// router.get(
//     "/",
//     authenticateUser,
//     getMyOrders
// );


// // Get one order
// router.get(
//     "/:id",
//     authenticateUser,
//     getMyOrder
// );


// // Update order status
// router.put(
//     "/:id",
//     authenticateUser,
//     updateOrderStatus
// );


// // Cancel order
// router.delete(
//     "/:id",
//     authenticateUser,
//     cancelOrder
// );



// export default router;

import express from "express";

import {
    cancelOrder,
    createOrder,
    getMyOrder,
    getMyOrders,
    getAllOrders,
    getAdminOrder,
    updateOrderStatus,
} from "../controllers/order/orderController.js";

import authenticateUser from "../middleware/authMiddleware.js";

import adminOnly from "../middleware/adminMiddleware.js";


const router = express.Router();


// =====================================================
// CUSTOMER
// =====================================================


// Create order
router.post(
    "/",
    authenticateUser,
    createOrder
);


// Get logged-in user's orders
router.get(
    "/my-orders",
    authenticateUser,
    getMyOrders
);


// Get one logged-in user's order
router.get(
    "/my-orders/:id",
    authenticateUser,
    getMyOrder
);


// Cancel customer's order
router.delete(
    "/my-orders/:id",
    authenticateUser,
    cancelOrder
);


// =====================================================
// ADMIN
// =====================================================


// Get ALL customer orders
router.get(
    "/admin",
    authenticateUser,
    adminOnly,
    getAllOrders
);


// Get ANY order
router.get(
    "/admin/:id",
    authenticateUser,
    adminOnly,
    getAdminOrder
);


// Update order status
router.put(
    "/admin/:id/status",
    authenticateUser,
    adminOnly,
    updateOrderStatus
);


export default router;