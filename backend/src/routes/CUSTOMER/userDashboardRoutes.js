import express from "express";

import authenticateUser from "../../middleware/authMiddleware.js";
import getUserDashboard from "../../controllers/CUSTOMER/userDashboardController.js";

const router = express.Router();

// =====================================================
// GET USER DASHBOARD
// Final endpoint:
// GET /api/user/dashboard
// =====================================================

router.get(
    "/dashboard",
    authenticateUser,
    getUserDashboard
);

export default router;