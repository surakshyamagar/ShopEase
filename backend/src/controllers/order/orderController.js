import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";


// ======================================
// CREATE ORDER
// ======================================

const createOrder = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            fullName,
            address,
            city,
            phone,
        } = req.body;


        // 1. Check shipping information
        if (!fullName || !address || !city || !phone) {

            return res.status(400).json({
                success: false,
                message: "All shipping information is required",
            });

        }


        // 2. Find user's cart
        const cart = await Cart.findOne({
            user: userId,
        });


        if (!cart || cart.items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });

        }


        // 3. Prepare order items
        const orderItems = [];

        let totalAmount = 0;


        // 4. Check every cart item
        for (const item of cart.items) {

            const product = await Product.findById(
                item.product
            );


            // Product no longer exists
            if (!product) {

                return res.status(404).json({
                    success: false,
                    message: "One of the products no longer exists",
                });

            }


            // Check stock
            if (item.quantity > product.stock) {

                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${product.name}`,
                });

            }


            // Calculate price
            const itemTotal =
                product.price * item.quantity;


            totalAmount += itemTotal;


            // Save product information in order
            orderItems.push({

                product: product._id,

                name: product.name,

                price: product.price,

                quantity: item.quantity,

            });

        }


        // 5. Create order
        const order = await Order.create({

            user: userId,

            items: orderItems,

            totalAmount: totalAmount,

            shippingAddress: {
                fullName,
                address,
                city,
                phone,
            },

        });


        // 6. Reduce product stock
        for (const item of cart.items) {

            const product = await Product.findById(
                item.product
            );

            product.stock -= item.quantity;

            await product.save();

        }


        // 7. Clear cart
        cart.items = [];

        await cart.save();


        // 8. Return order
        res.status(201).json({

            success: true,

            message: "Order created successfully",

            data: order,

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};


// ======================================
// GET MY ORDERS
// ======================================

// GET orders & filter by status
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get status from URL query
        const { status } = req.query;

        // Start with logged-in user's orders
        const filter = {
            user: userId,
        };

        // If status is provided, add it to filter
        if (status) {
            filter.status = status;
        }

        const orders = await Order.find(filter).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// GET ONE ORDER
// ======================================

const getMyOrder = async (req, res) => {

    try {

        const userId = req.user.id;

        const orderId = req.params.id;


        const order = await Order.findOne({

            _id: orderId,

            user: userId,

        }).populate("items.product");


        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }


        res.status(200).json({

            success: true,

            message: "Order fetched successfully",

            data: order,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};


// ======================================
// UPDATE ORDER STATUS
// ======================================

const updateOrderStatus = async (req, res) => {

    try {

        const orderId = req.params.id;

        const { status } = req.body;


        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];


        // Check status
        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({

                success: false,

                message: "Invalid order status",

            });

        }


        // Find order
        const order = await Order.findById(orderId);


        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }


        // Update status
        order.status = status;

        await order.save();


        res.status(200).json({

            success: true,

            message: "Order status updated successfully",

            data: order,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};


// ======================================
// CANCEL ORDER
// ======================================

const cancelOrder = async (req, res) => {

    try {

        const userId = req.user.id;

        const orderId = req.params.id;


        // Find user's order
        const order = await Order.findOne({

            _id: orderId,

            user: userId,

        });


        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order not found",

            });

        }


        // Don't cancel completed order
        if (
            order.status === "Delivered" ||
            order.status === "Cancelled"
        ) {

            return res.status(400).json({

                success: false,

                message: "Order cannot be cancelled",

            });

        }


        // Change status
        order.status = "Cancelled";


        await order.save();


        res.status(200).json({

            success: true,

            message: "Order cancelled successfully",

            data: order,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};




export {
    createOrder,
    getMyOrder,
    getOrders,
    updateOrderStatus,
    cancelOrder,
};