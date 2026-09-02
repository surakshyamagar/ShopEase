import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";




import {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../../services/reviewService";


import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { useAuth } from "../../context/AuthContext";


function ProductDetails() {

    const { id } = useParams();

    const { user } = useAuth();


    // ==========================================
    // PRODUCT
    // ==========================================

    const [product, setProduct] = useState(null);


    // ==========================================
    // REVIEWS
    // ==========================================

    const [reviews, setReviews] = useState([]);


    // ==========================================
    // REVIEW FORM
    // ==========================================

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");


    // ==========================================
    // EDIT REVIEW
    // ==========================================

    const [editingReview, setEditingReview] = useState(null);


    // ==========================================
    // LOADING / ERROR
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [reviewLoading, setReviewLoading] = useState(false);


    // ==========================================
    // LOAD PRODUCT + REVIEWS
    // ==========================================

    useEffect(() => {

        loadData();

    }, [id]);


    const loadData = async () => {

        try {

            setLoading(true);

            setError("");


            const productData = await getProduct(id);

            const reviewsData = await getProductReviews(id);


            setProduct(productData);

            setReviews(reviewsData);


        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load product"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = async () => {

        try {

            await addToCart(id, 1);

            alert("Product added to cart");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        }

    };


    // ==========================================
    // SUBMIT REVIEW
    // ==========================================

    const handleSubmitReview = async (e) => {

        e.preventDefault();


        if (!rating || !comment.trim()) {

            alert("Rating and comment are required");

            return;

        }


        try {

            setReviewLoading(true);


            // ==================================
            // UPDATE REVIEW
            // ==================================

            if (editingReview) {

                const updatedReview = await updateReview(
                    editingReview._id,
                    {
                        rating,
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


            }

            // ==================================
            // CREATE REVIEW
            // ==================================

            else {

                const newReview = await createReview({

                    product: id,

                    rating,

                    comment,

                });


                setReviews([
                    newReview,
                    ...reviews,
                ]);

            }


            // Clear form

            setRating(5);

            setComment("");


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to save review"
            );

        } finally {

            setReviewLoading(false);

        }

    };


    // ==========================================
    // START EDITING REVIEW
    // ==========================================

    const handleEdit = (review) => {

        setEditingReview(review);

        setRating(review.rating);

        setComment(review.comment);

    };


    // ==========================================
    // CANCEL EDIT
    // ==========================================

    const handleCancelEdit = () => {

        setEditingReview(null);

        setRating(5);

        setComment("");

    };


    // ==========================================
    // DELETE REVIEW
    // ==========================================

    const handleDelete = async (reviewId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteReview(reviewId);


            setReviews(
                reviews.filter(
                    (review) => review._id !== reviewId
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

        return <p>Loading product...</p>;

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div>

                <p>{error}</p>

                <Link to="/products">
                    Back to Products
                </Link>

            </div>

        );

    }


    // ==========================================
    // PRODUCT NOT FOUND
    // ==========================================

    if (!product) {

        return <p>Product not found.</p>;

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div>

            {/* ==================================
                NAVIGATION
            ================================== */}

            <nav>

                <Link to="/customer/dashboard">
                    Dashboard
                </Link>

                {" | "}

                <Link to="/products">
                    Products
                </Link>

                {" | "}

                <Link to="/cart">
                    Cart
                </Link>

                {" | "}

                <Link to="/orders">
                    Orders
                </Link>

            </nav>


            <hr />


            {/* ==================================
                PRODUCT
            ================================== */}

            <section className="max-w-5xl mx-auto p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* PRODUCT IMAGE */}
                    <div className="bg-gray-100 rounded-2xl overflow-hidden">

                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[450px] object-cover"
                            />
                        ) : (
                            <div className="w-full h-[450px] flex items-center justify-center text-gray-400">
                                No image available
                            </div>
                        )}

                    </div>


                    {/* PRODUCT INFORMATION */}
                    <div className="flex flex-col justify-center">

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mb-6">
                            {product.description}
                        </p>

                        <p className="text-2xl font-bold text-emerald-600 mb-4">
                            ${product.price}
                        </p>

                        <p className="text-gray-600 mb-6">
                            Stock: {product.stock}
                        </p>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </button>

                    </div>

                </div>

            </section>


            <hr />


            {/* ==================================
                REVIEWS
            ================================== */}

            <section>

                <h2>
                    Reviews
                </h2>


                {reviews.length === 0 ? (

                    <p>
                        No reviews yet.
                    </p>

                ) : (

                    reviews.map((review) => (

                        <div key={review._id}>

                            <h3>
                                {review.user?.name || "User"}
                            </h3>


                            <p>
                                Rating: {review.rating}/5
                            </p>


                            <p>
                                {review.comment}
                            </p>


                            {/* =========================
                                ONLY SHOW ACTIONS FOR
                                CURRENT USER
                            ========================= */}

                            {review.user?._id === user?._id && (

                                <div>

                                    <button
                                        onClick={() =>
                                            handleEdit(review)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(review._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            )}

                            <hr />

                        </div>

                    ))

                )}

            </section>


            {/* ==================================
                ADD / EDIT REVIEW
            ================================== */}

            <section>

                <h2>

                    {editingReview
                        ? "Edit Review"
                        : "Add Review"}

                </h2>


                <form onSubmit={handleSubmitReview}>

                    {/* Rating */}

                    <div>

                        <label>
                            Rating:
                        </label>


                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(
                                    Number(e.target.value)
                                )
                            }
                        >

                            <option value={1}>
                                1
                            </option>

                            <option value={2}>
                                2
                            </option>

                            <option value={3}>
                                3
                            </option>

                            <option value={4}>
                                4
                            </option>

                            <option value={5}>
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
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={reviewLoading}
                    >

                        {reviewLoading
                            ? "Saving..."
                            : editingReview
                                ? "Update Review"
                                : "Submit Review"}

                    </button>


                    {editingReview && (

                        <button
                            type="button"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </section>


            <hr />


            <Link to="/products">
                Back to Products
            </Link>

        </div>

    );

}


export default ProductDetails;