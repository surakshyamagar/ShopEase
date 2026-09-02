import User from "../../models/User.js";

// GET all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "USER" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    getCustomers,
};