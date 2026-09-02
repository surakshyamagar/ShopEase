import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../services/reviewService";


function ProductReviews({ productId }) {

    const { user } = useAuth();

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const [editingReview, setEditingReview] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD REVIEWS
    // ==========================================

    useEffect(() => {
        loadReviews();
    }, [productId]);


    const loadReviews = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getProductReviews(productId);

            setReviews(data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load reviews"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CREATE REVIEW
    // ==========================================

    const handleCreateReview = async (e) => {

        e.preventDefault();

        try {

            const newReview = await createReview({
                product: productId,
                rating: Number(rating),
                comment,
            });

            setReviews([
                newReview,
                ...reviews,
            ]);

            setRating("");
            setComment("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create review"
            );

        }

    };


    // ==========================================
    // START EDIT
    // ==========================================

    const handleEdit = (review) => {

        setEditingReview(review);

        setRating(review.rating);
        setComment(review.comment);

    };


    // ==========================================
    // UPDATE REVIEW
    // ==========================================

    const handleUpdateReview = async (e) => {

        e.preventDefault();

        try {

            const updatedReview = await updateReview(
                editingReview._id,
                {
                    rating: Number(rating),
                    comment,
                }
            );


            setReviews(
                reviews.map((review) =>
                    review._id === updatedReview._id
                        ? updatedReview
                        : review
                )
            );


            setEditingReview(null);

            setRating("");
            setComment("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update review"
            );

        }

    };


    // ==========================================
    // DELETE REVIEW
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteReview(id);


            setReviews(
                reviews.filter(
                    (review) => review._id !== id
                )
            );

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete review"
            );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div>

                <h2>
                    Reviews
                </h2>

                <p>
                    Loading reviews...
                </p>

            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div>

                <h2>
                    Reviews
                </h2>

                <p>
                    {error}
                </p>

            </div>
        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div>

            <h2>
                Product Reviews
            </h2>


            {/* ==================================
                ADD / EDIT REVIEW
            ================================== */}

            <section>

                <h3>
                    {editingReview
                        ? "Edit Your Review"
                        : "Write a Review"}
                </h3>


                <form
                    onSubmit={
                        editingReview
                            ? handleUpdateReview
                            : handleCreateReview
                    }
                >

                    {/* Rating */}

                    <div>

                        <label>
                            Rating:
                        </label>

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Rating
                            </option>

                            <option value="1">
                                1
                            </option>

                            <option value="2">
                                2
                            </option>

                            <option value="3">
                                3
                            </option>

                            <option value="4">
                                4
                            </option>

                            <option value="5">
                                5
                            </option>

                        </select>

                    </div>


                    {/* Comment */}

                    <div>

                        <label>
                            Comment:
                        </label>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Write your review..."
                            required
                        />

                    </div>


                    <button type="submit">

                        {editingReview
                            ? "Update Review"
                            : "Submit Review"}

                    </button>


                    {editingReview && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditingReview(null);
                                setRating("");
                                setComment("");

                            }}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </section>


            <hr />


            {/* ==================================
                REVIEW LIST
            ================================== */}

            <section>

                <h3>
                    All Reviews ({reviews.length})
                </h3>


                {reviews.length === 0 ? (

                    <p>
                        No reviews yet.
                    </p>

                ) : (

                    <div>

                        {reviews.map((review) => {

                            /*
                             * Backend uses:
                             *
                             * .populate("user", "name")
                             *
                             * So review.user is:
                             *
                             * {
                             *    _id,
                             *    name
                             * }
                             */

                            const isMyReview =
                                review.user?._id === user?._id;


                            return (

                                <div
                                    key={review._id}
                                >

                                    <p>
                                        <strong>
                                            {review.user?.name ||
                                                "User"}
                                        </strong>
                                    </p>


                                    <p>
                                        Rating: {review.rating}/5
                                    </p>


                                    <p>
                                        {review.comment}
                                    </p>


                                    <p>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </p>


                                    {/* MY REVIEW ACTIONS */}

                                    {isMyReview && (

                                        <div>

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        review
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        review._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    )}

                                    <hr />

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>

        </div>

    );

}


export default ProductReviews;