import Category from "../../models/Category.js";

// CREATE docs
const createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;
        
        const category = await Category.create({
                // pass object fields directly
                name, 
                description,
        });

        res.status(201).json({
            success: true,
            message: "Category created succesfully",
            data: category,
        });

    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal error",
        });
    }
};

// GET all
const getCategories = async(req, res) => {
    try{
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            message: "Categories fecthed successfully",
            data: categories,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET 1
const getCategory = async(req, res) => {
    try{
        // no parseInt (keep string beacuse in monngose its like this 68a5f9c2e123456789abcd12) is an objectId _id 
        const id = req.params.id

        // takes id directly
        const category = await Category.findById(id)

        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
       
    } catch (error) {
         console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// UPDATE
const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                description,
            },
            // return updated document otherwise old
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        // 1. Find category
        const category = await Category.findById(id);

        // 2. Check if category exists
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        // 3. Delete category
        const deletedCategory = await Category.findByIdAndDelete(id);

        // 4. Send response
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: deletedCategory,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory

}