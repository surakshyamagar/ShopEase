import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";


const addToCart = async (req, res) => {
    try{
        // get logged in user
        const userId = req.user.id;

        // get productId and quantity from frontend
        const {productId, quantity} = req.body;

        // 1. Did the user tell me which product they want? productId
        if (!productId) {
            return res.status(400).json({
                success: true,
                message: "Product Id is required",
            });
        }

        // 2. Check quantity
        // Convert quantity into a number. If they didn't give one, use 1
        const itemQuantity = Number(quantity) || 1;

        if (itemQuantity < 1){
            return res.status(400).json({
                success: true,
                message: "Quantity must be atleast 1",
            });
        }

        // 3. Find product in DB
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }

        // 4. Check stock
        if (product.stock < itemQuantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock",
            });

        }


        // 5. Find user's cart
        // Find the cart that belongs to this logged-in user.
        let cart = await Cart.findOne({
            user: userId,
        });

        // 6. If cart doesn't exist, create it
        // No cart → create cart + put product inside it.
        if(!cart){
            cart = await Cart.create({
                user: userId,

                items: [
                    {
                        product: productId,
                        quantity: itemQuantity,
                    },
                ],
            });

        // But what if the user already has a cart?
        } else {
            // 7. Check if product already exists in cart
            const existingItem = cart.items.find(
                // Take each item from the array one by one and temporarily call it item.
                // item.product = gets productid
                    // converts the MongoDB ObjectId into a string.
                    // === productId = Now compare it with the product the user wants to add:("ABC123" === "ABC123" )
                (item) => item.product.toString() === productId
            );

            // if we find product in cart then,
            // Add the new quantity to the quantity already in the cart.
            if (existingItem) {
                existingItem.quantity += itemQuantity;

                // Then check stock
                if (existingItem.quantity > product.stock) {
                    return res.status(400).json({
                        success: false,
                        message: "Not enough stock",
                    });
                }
            // if not found, .push() means: Add something to the array.
            } else {
                cart.items.push({
                    product: productId,
                    quantity: itemQuantity,
                });
            }

            // Save the changes we just made to MongoDB.
            await cart.save();
        }
        // 8. Return updated cart
        // Find this user's cart, and also give me the full product information for every product inside the cart.
        const updatedCart = await Cart.findOne({
            user: userId,
            // product information
            // poulate is a mongose function/method : for putting info
        }).populate("items.product");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: updatedCart,
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
// GET CART
// ======================================

const getCart = async (req, res) => {

    try {

        const userId = req.user.id;


        const cart = await Cart.findOne({
            user: userId,
        }).populate("items.product");


        // No cart yet
        if (!cart) {

            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                data: {
                    items: [],
                },
            });

        }


        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ======================================
// UPDATE QUANTITY
// ======================================

const updateCartItem = async (req, res) => {

    try {

        const userId = req.user.id;

        const { productId, quantity } = req.body;


        // 1. Validate quantity
        const newQuantity = Number(quantity);

        if (!newQuantity || newQuantity < 1) {

            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });

        }


        // 2. Find product
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }


        // 3. Check stock
        if (newQuantity > product.stock) {

            return res.status(400).json({
                success: false,
                message: "Not enough stock",
            });

        }


        // 4. Find cart
        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });

        }


        // 5. Find item
        const item = cart.items.find(
            (item) =>
                item.product.toString() === productId
        );


        if (!item) {

            return res.status(404).json({
                success: false,
                message: "Product is not in cart",
            });

        }


        // 6. Update quantity
        item.quantity = newQuantity;


        // 7. Save
        await cart.save();


        // 8. Get updated cart
        const updatedCart = await Cart.findOne({
            user: userId,
        }).populate("items.product");


        res.status(200).json({
            success: true,
            message: "Cart quantity updated",
            data: updatedCart,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ======================================
// REMOVE ITEM FROM CART
// ======================================

const removeFromCart = async (req, res) => {
    try{
        const userId = req.user.id;

        const {productId} = req.params;

        // 1. Find cart
        const cart = await Cart.findOne({
            user: userId,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        // 2. Find product in cart
        const itemExists = cart.items.some(
            (item) => item.product.toString() === productId
        );

        if (!itemExists) {

            return res.status(404).json({
                success: false,
                message: "Product is not in cart",
            });

        }

        // 3. Remove item
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        // 4. Save
        await cart.save();


        // 5. Return updated cart
        const updatedCart = await Cart.findOne({
            user: userId,
        }).populate("items.product");


        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            data: updatedCart,
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// CLEAR CART
// ======================================
const clearCart = async (req, res) => {

    try {

        const userId = req.user.id;


        const cart = await Cart.findOne({
            user: userId,
        });


        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });

        }


        // Remove all items
        cart.items = [];


        await cart.save();


        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            data: cart,
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};