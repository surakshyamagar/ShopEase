const adToCart = async (req, res) => {
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


        // Find the cart that belongs to this logged-in user.
        let cart = await Cart.findOne({
            user: userId,
        });

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
    } catch (error) {

    }
}