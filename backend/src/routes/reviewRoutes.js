import express from "express";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../controllers/review/reviewController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();


// Create review
router.post(
    "/add",
    authenticateUser,
    createReview
);


// Get reviews for product
router.get(
    "/product/:productId",
    getProductReviews
);


// Update my review
router.put(
    "/update/:id",
    authenticateUser,
    updateReview
);


// Delete my review
router.delete(
    "/delete/:id",
    authenticateUser,
    deleteReview
);


export default router;