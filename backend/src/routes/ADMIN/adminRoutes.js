import express from "express";
import authenticateUser from "../../middleware/authMiddleware.js";
import adminOnly from "../../middleware/adminMiddleware.js";
import getAdminDashboardStats from "../../controllers/ADMIN/adminController.js";


const router = express.Router();


// =====================================================
// ADMIN DASHBOARD
// =====================================================

router.get(
    "/dashboard",
    authenticateUser,
    adminOnly,
    getAdminDashboardStats
);


export default router;