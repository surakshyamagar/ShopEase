import Review from "../../models/Review.js";

const createReview = async(req, res) => {
    try{
        const userId = req.user.id;

        const {product, rating, comment} = req.body;

        if (!product || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Product, rating and comment are required",
            });
        }

        // create review
        const review = await Review.create({
            user: userId,
            product,
            rating,
            comment,
        });


        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET REVIEWS FOR ONE PRODUCT
const getProductReviews = async (req, res) => {
    try{
        // Take the id from the URL and store it in a variable called id.
        const productId = req.params.productId;

        const reviews = await Review.find({
            // find reviews for product whose id equals to product 
            // id
            product: productId,
        })
        // from user filed (model) go to User collection and bring out name along with id
        // populte = same as include in postgres
        .populate("user", "name")
        // put newesrt reviews first
        .sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// UPDATE MY REVIEW
const updateReview = async(req, res) => {
    try{
        // get loggedin user id
        //  comes from authentication middleware
        // Because a user should only be able to update their own review.
        const userId = req.user.id;
        const reviewId = req.params.id;

        const {rating, comment} = req.body;

        const review = await Review.findOneAndUpdate(
            //    we give 3 objects
            // first: for search condition where reviewId, and userId matches
            {
                _id: reviewId,
                user: userId,
            }, 
            // second: what should be updated
            {
                rating,
                comment,
            },
            // third: instruction for mongoose
            // new: give new updated data , without it gives old
            {
                new: true,
                // Run the Review model's validators when updating.
                runValidators: true,
            }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });


    } catch(error) {
         res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE MY REVIEW
const deleteReview = async (req, res) => {
    try{
        const userId = req.user.id;
        const reviewId = req.params.id;

        const review = await Review.findOneAndDelete({
            _id: reviewId,
            user: userId,
        });

         if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: review,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
};