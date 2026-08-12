import Product from "../../models/Product.js";

const createProduct = async(req, res) => {
    try{
        const {name, description, price, stock, image, category} = req.body;

        const product = await Product.create({
            name,
            description,
            price, 
            stock, 
            image,
            category,
        })

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch(error){
         res.status(500).json({
            success: false,
            message: "Internal error",
        });
    }
};


// GET all
const getProducts = async (req, res) => {
    try{
        const product = await Product.find();

        res.status(200).json({
            success: true,
            message: "Products fecthed successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET 1
const getProduct = async(req, res) => {
    try{
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
         console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    };
}

const updateProduct = async (req, res) => {
    try{
        const id = req.params.id;
        const {name, description, price, stock, image, category} = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name, 
                description,
                price,
                stock,
                image,
                category,
            },
            { 
                new: true,
                // makes sure those schema validation rules are applied during the update too.
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Find Product
        const product = await Product.findById(id);

        // 2. Check if Product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }

        // 3. Delete Product
        const deletedProduct = await Product.findByIdAndDelete(id);

        // 4. Send response
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}