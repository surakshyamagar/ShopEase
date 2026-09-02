import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

const getUserDashboard = async (req, res) => {
    try {

        // =====================================================
        // LOGGED-IN USER
        // =====================================================

        const userId = req.user.id;

        // =====================================================
        // TOTAL ORDERS
        // =====================================================

        const totalOrders = await Order.countDocuments({
            user: userId,
        });

        // =====================================================
        // CART
        // =====================================================

        const cart = await Cart.findOne({
            user: userId,
        });

        const cartItems = cart?.items || [];

        const cartItemCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        // =====================================================
        // RECENT ORDERS
        // =====================================================

        const recentOrders = await Order.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("items totalAmount status createdAt")
            .populate(
                "items.product",
                "name image"
            );

        // =====================================================
        // TOTAL SPENT
        // Cancelled orders are excluded
        // =====================================================

        const totalSpentResult = await Order.aggregate([
            {
                $match: {
                    user: userId,
                    status: {
                        $ne: "Cancelled",
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount",
                    },
                },
            },
        ]);

        const totalSpent =
            totalSpentResult.length > 0
                ? totalSpentResult[0].total
                : 0;

        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(200).json({
            success: true,

            data: {
                totalOrders,
                cartItemCount,
                totalSpent,
                recentOrders,
            },
        });

    } catch (error) {

        console.error(
            "Get user dashboard error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to load user dashboard",
        });
    }
};

export default getUserDashboard;