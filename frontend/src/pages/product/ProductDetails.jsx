import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    Star,
    Pencil,
    Trash2,
    User,
    MessageSquare,
    Send,
    X,
    ShoppingCart,
} from "lucide-react";

import {
    getProductReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../../services/reviewService";

import { getProduct } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { useAuth } from "../../context/AuthContext";

import UserNavbar from "../../components/layout/UserNavbar";


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

    const [cartLoading, setCartLoading] = useState(false);


    // ==========================================
    // LOAD PRODUCT + REVIEWS
    // ==========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadData();

    }, [id]);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            // ==================================
            // LOAD PRODUCT
            // ==================================

            const productData = await getProduct(id);

            setProduct(productData);


            // ==================================
            // LOAD REVIEWS SEPARATELY
            // ==================================
            // If reviews fail, product should
            // still be displayed.

            try {

                const reviewsData = await getProductReviews(id);

                setReviews(reviewsData || []);

            } catch (reviewError) {

                console.error(
                    "Failed to load reviews:",
                    reviewError
                );

                setReviews([]);

            }

        } catch (error) {

            console.error(
                "Failed to load product:",
                error
            );

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

            setCartLoading(true);

            await addToCart(id, 1);

            alert("Product added to cart");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        } finally {

            setCartLoading(false);

        }

    };


    // ==========================================
    // SUBMIT / UPDATE REVIEW
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

                await updateReview(
                    editingReview._id,
                    {
                        rating,
                        comment: comment.trim(),
                    }
                );

                alert("Review updated successfully");

            }


            // ==================================
            // CREATE REVIEW
            // ==================================

            else {

                await createReview({
                    product: id,
                    rating,
                    comment: comment.trim(),
                });

                alert("Review added successfully");

            }


            // ==================================
            // RELOAD REVIEWS
            // ==================================

            const reviewsData =
                await getProductReviews(id);

            setReviews(reviewsData || []);


            // ==================================
            // CLEAR FORM
            // ==================================

            setEditingReview(null);

            setRating(5);

            setComment("");

        } catch (error) {

            console.error(error);

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

        setRating(Number(review.rating));

        setComment(review.comment || "");


        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });

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


            // Reload reviews

            const reviewsData =
                await getProductReviews(id);

            setReviews(reviewsData || []);


            // Clear editing state if necessary

            if (
                editingReview?._id === reviewId
            ) {

                setEditingReview(null);

                setRating(5);

                setComment("");

            }


            alert("Review deleted successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete review"
            );

        }

    };


    // ==========================================
    // REVIEW SUMMARY
    // ==========================================

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (total, review) =>
                        total + Number(review.rating),
                    0
                ) / reviews.length
            ).toFixed(1)
            : "0.0";


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <UserNavbar />

                <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

                        <p className="font-medium text-gray-600">
                            Loading product...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50">

                <UserNavbar />

                <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">

                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

                        <h2 className="mb-3 text-xl font-bold text-red-600">
                            Something went wrong
                        </h2>

                        <p className="mb-6 text-gray-600">
                            {error}
                        </p>

                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Back to Products
                        </Link>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // PRODUCT NOT FOUND
    // ==========================================

    if (!product) {

        return (

            <div className="min-h-screen bg-gray-50">

                <UserNavbar />

                <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

                    <div className="text-center">

                        <h2 className="mb-4 text-xl font-bold text-gray-800">
                            Product not found
                        </h2>

                        <Link
                            to="/shop"
                            className="font-semibold text-emerald-600 hover:underline"
                        >
                            Back to Products
                        </Link>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50">


            {/* ==================================
                USER NAVBAR
            ================================== */}

            <UserNavbar />


            {/* ==================================
                PRODUCT SECTION
            ================================== */}

            <section className="mx-auto max-w-6xl px-6 py-10">


                {/* BREADCRUMB */}

                <div className="mb-8 flex items-center gap-2 text-sm">

                    <Link
                        to="/customer/dashboard"
                        className="text-gray-400 transition hover:text-emerald-600"
                    >
                        Dashboard
                    </Link>

                    <span className="text-gray-300">
                        /
                    </span>

                    <Link
                        to="/shop"
                        className="text-gray-400 transition hover:text-emerald-600"
                    >
                        Products
                    </Link>

                    <span className="text-gray-300">
                        /
                    </span>

                    <span className="max-w-[200px] truncate font-medium text-gray-700">
                        {product.name}
                    </span>

                </div>


                {/* PRODUCT GRID */}

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">


                    {/* ==================================
                        PRODUCT IMAGE
                    ================================== */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {product.image ? (

                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[450px] w-full object-cover"
                            />

                        ) : (

                            <div className="flex h-[450px] w-full items-center justify-center bg-gray-100 text-gray-400">
                                No image available
                            </div>

                        )}

                    </div>


                    {/* ==================================
                        PRODUCT INFORMATION
                    ================================== */}

                    <div className="flex flex-col justify-center">

                        <p className="mb-2 text-sm font-semibold text-emerald-600">
                            ShopEase Product
                        </p>


                        <h1 className="mb-4 text-4xl font-bold text-gray-900">
                            {product.name}
                        </h1>


                        <p className="mb-6 leading-7 text-gray-600">
                            {product.description}
                        </p>


                        {/* PRODUCT RATING */}

                        <div className="mb-5 flex items-center gap-2">

                            <div className="flex items-center gap-1">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <Star
                                            key={star}
                                            size={18}
                                            className={
                                                star <=
                                                Math.round(
                                                    Number(
                                                        averageRating
                                                    )
                                                )
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />

                                    )
                                )}

                            </div>


                            <span className="text-sm font-semibold text-gray-700">
                                {averageRating}
                            </span>


                            <span className="text-sm text-gray-400">

                                ({reviews.length}{" "}

                                {reviews.length === 1
                                    ? "review"
                                    : "reviews"}

                                )

                            </span>

                        </div>


                        {/* PRICE */}

                        <p className="mb-4 text-3xl font-bold text-emerald-600">
                            ${product.price}
                        </p>


                        {/* STOCK */}

                        <div className="mb-7">

                            {product.stock > 0 ? (

                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">

                                    {product.stock} items in stock

                                </span>

                            ) : (

                                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">

                                    Out of stock

                                </span>

                            )}

                        </div>


                        {/* ADD TO CART */}

                        <button
                            onClick={handleAddToCart}
                            disabled={
                                product.stock === 0 ||
                                cartLoading
                            }
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400 md:w-auto"
                        >

                            <ShoppingCart size={18} />

                            {cartLoading
                                ? "Adding..."
                                : product.stock === 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}

                        </button>

                    </div>

                </div>

            </section>


            {/* ==================================
                REVIEWS
            ================================== */}

            <section className="mx-auto max-w-6xl px-6 py-12">


                {/* REVIEW HEADER */}

                <div className="mb-8">

                    <div className="mb-2 flex items-center gap-3">

                        <MessageSquare
                            size={28}
                            className="text-emerald-600"
                        />

                        <h2 className="text-3xl font-bold text-gray-900">
                            Customer Reviews
                        </h2>

                    </div>

                    <p className="text-gray-500">
                        See what other customers think about this product.
                    </p>

                </div>


                {/* REVIEW SUMMARY */}

                <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">


                        {/* AVERAGE */}

                        <div className="text-center sm:text-left">

                            <p className="text-5xl font-bold text-gray-900">
                                {averageRating}
                            </p>


                            <div className="mt-2 flex items-center justify-center gap-1 sm:justify-start">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <Star
                                            key={star}
                                            size={20}
                                            className={
                                                star <=
                                                Math.round(
                                                    Number(
                                                        averageRating
                                                    )
                                                )
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />

                                    )
                                )}

                            </div>


                            <p className="mt-2 text-sm text-gray-500">

                                Based on {reviews.length}{" "}

                                {reviews.length === 1
                                    ? "review"
                                    : "reviews"}

                            </p>

                        </div>


                        {/* DIVIDER */}

                        <div className="hidden h-20 w-px bg-emerald-200 sm:block" />


                        {/* DESCRIPTION */}

                        <div>

                            <h3 className="mb-1 font-semibold text-gray-900">

                                {reviews.length === 0
                                    ? "Be the first to review this product"
                                    : "What customers are saying"}

                            </h3>

                            <p className="text-sm text-gray-600">

                                Your feedback helps other customers make
                                better purchasing decisions.

                            </p>

                        </div>

                    </div>

                </div>


                {/* REVIEW LIST */}

                {reviews.length === 0 ? (

                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">

                        <MessageSquare
                            size={42}
                            className="mx-auto mb-4 text-gray-300"
                        />

                        <h3 className="text-lg font-semibold text-gray-800">
                            No reviews yet
                        </h3>

                        <p className="mt-1 text-gray-500">
                            Be the first customer to share your experience.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {reviews.map((review) => (

                            <div
                                key={review._id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                            >

                                {/* USER + RATING */}

                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100">

                                            <User
                                                size={21}
                                                className="text-emerald-600"
                                            />

                                        </div>


                                        <div>

                                            <h3 className="font-semibold text-gray-900">
                                                {review.user?.name || "User"}
                                            </h3>

                                            <p className="text-xs text-gray-400">

                                                {review.createdAt
                                                    ? new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )
                                                    : ""}

                                            </p>

                                        </div>

                                    </div>


                                    {/* RATING */}

                                    <div className="flex items-center gap-1">

                                        {[1, 2, 3, 4, 5].map(
                                            (star) => (

                                                <Star
                                                    key={star}
                                                    size={17}
                                                    className={
                                                        star <=
                                                        Number(
                                                            review.rating
                                                        )
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }
                                                />

                                            )
                                        )}

                                    </div>

                                </div>


                                {/* COMMENT */}

                                <p className="mt-5 leading-7 text-gray-600">
                                    {review.comment}
                                </p>


                                {/* CURRENT USER ACTIONS */}

                                {review.user?._id === user?._id && (

                                    <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(review)
                                            }
                                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                                        >

                                            <Pencil size={15} />

                                            Edit

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(
                                                    review._id
                                                )
                                            }
                                            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                        >

                                            <Trash2 size={15} />

                                            Delete

                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* ==================================
                ADD / EDIT REVIEW
            ================================== */}

            <section className="mx-auto max-w-6xl px-6 pb-12">

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">


                    {/* FORM HEADER */}

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-2xl font-bold text-gray-900">

                                {editingReview
                                    ? "Edit Your Review"
                                    : "Write a Review"}

                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Share your experience with this product.
                            </p>

                        </div>


                        {editingReview && (

                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                                title="Cancel editing"
                            >

                                <X size={20} />

                            </button>

                        )}

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmitReview}
                        className="space-y-6"
                    >


                        {/* RATING */}

                        <div>

                            <label className="mb-3 block text-sm font-semibold text-gray-700">
                                Your Rating
                            </label>


                            <div className="flex items-center gap-2">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            className="transition-transform hover:scale-110"
                                            aria-label={`Rate ${star} out of 5`}
                                        >

                                            <Star
                                                size={32}
                                                className={
                                                    star <= rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300 hover:text-yellow-300"
                                                }
                                            />

                                        </button>

                                    )
                                )}


                                <span className="ml-2 text-sm font-semibold text-gray-600">
                                    {rating}/5
                                </span>

                            </div>

                        </div>


                        {/* COMMENT */}

                        <div>

                            <label
                                htmlFor="review-comment"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Your Review
                            </label>


                            <textarea
                                id="review-comment"
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                placeholder="Tell other customers about your experience..."
                                rows={5}
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                            />


                            <p className="mt-2 text-xs text-gray-400">
                                Please share an honest and helpful review.
                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div className="flex flex-col gap-3 sm:flex-row">

                            <button
                                type="submit"
                                disabled={reviewLoading}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >

                                {reviewLoading ? (

                                    "Saving..."

                                ) : (

                                    <>

                                        <Send size={17} />

                                        {editingReview
                                            ? "Update Review"
                                            : "Submit Review"}

                                    </>

                                )}

                            </button>


                            {editingReview && (

                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                                >

                                    <X size={17} />

                                    Cancel

                                </button>

                            )}

                        </div>

                    </form>

                </div>

            </section>


            {/* ==================================
                BACK TO PRODUCTS
            ================================== */}

            <div className="mx-auto max-w-6xl px-6 pb-12">

                <Link
                    to="/shop"
                    className="inline-flex items-center font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                    ← Back to Products
                </Link>

            </div>

        </div>

    );

}


export default ProductDetails;