import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Order from "../../models/Order.js";

// =====================================================
// GET ADMIN DASHBOARD STATS
// =====================================================

const getAdminDashboardStats = async (req, res) => {
    try {

        // =================================================
        // TOTAL CUSTOMERS
        // Only normal users, not admins
        // =================================================

        const totalCustomers = await User.countDocuments({
            role: "USER",
        });


        // =================================================
        // TOTAL PRODUCTS
        // =================================================

        const totalProducts = await Product.countDocuments();


        // =================================================
        // TOTAL ORDERS
        // =================================================

        const totalOrders = await Order.countDocuments();


        // =================================================
        // TOTAL REVENUE
        // Exclude cancelled orders
        // =================================================

        const revenueResult = await Order.aggregate([
            {
                $match: {
                    status: {
                        $ne: "Cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);


        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;


        // =================================================
        // LOW STOCK PRODUCTS
        // 1 to 5 units
        // =================================================

        const lowStockProducts = await Product.countDocuments({
            stock: {
                $gt: 0,
                $lte: 5,
            },
        });


        // =================================================
        // OUT OF STOCK PRODUCTS
        // =================================================

        const outOfStockProducts = await Product.countDocuments({
            stock: 0,
        });


        // =================================================
        // TOTAL STOCK
        // =================================================

        const inventoryResult = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalStock: {
                        $sum: "$stock",
                    },
                },
            },
        ]);


        const totalStock =
            inventoryResult.length > 0
                ? inventoryResult[0].totalStock
                : 0;


        // =================================================
        // SEND RESPONSE
        // =================================================

        res.status(200).json({
            success: true,

            data: {
                totalCustomers,
                totalProducts,
                totalOrders,
                totalRevenue,
                lowStockProducts,
                outOfStockProducts,
                totalStock,
            },
        });

    } catch (error) {

        console.error(
            "Get admin dashboard stats error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load admin dashboard statistics",
        });
    }
};


export default getAdminDashboardStats;