import { useEffect, useState } from "react";
import { Star } from "lucide-react";


function ReviewForm({
    productId,
    review = null,
    onSubmit,
    onCancel,
    loading = false,
}) {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");


    // ==========================================
    // LOAD REVIEW WHEN EDITING
    // ==========================================

    useEffect(() => {

        if (review) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRating(review.rating);
            setComment(review.comment);

        } else {

            setRating(5);
            setComment("");

        }

    }, [review]);


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();


        const reviewData = {

            rating,
            comment,

        };


        // Product is required only when creating
        if (!review) {

            reviewData.product = productId;

        }


        onSubmit(reviewData);

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl p-6"
        >

            <h2 className="text-lg font-semibold text-gray-900">

                {review
                    ? "Edit Your Review"
                    : "Write a Review"}

            </h2>


            {/* ==================================
                RATING
            ================================== */}

            <div className="mt-5">

                <p className="text-sm font-medium text-gray-700 mb-2">
                    Rating
                </p>


                <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1"
                        >

                            <Star
                                size={25}
                                className={
                                    star <= rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }
                            />

                        </button>

                    ))}

                </div>

            </div>


            {/* ==================================
                COMMENT
            ================================== */}

            <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                </label>

                <textarea
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    placeholder="Write your review..."
                    rows="4"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

            </div>


            {/* ==================================
                ACTIONS
            ================================== */}

            <div className="flex gap-3 mt-5">

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-5 py-2.5 rounded-lg font-medium transition"
                >

                    {loading
                        ? "Saving..."
                        : review
                            ? "Update Review"
                            : "Submit Review"}

                </button>


                {review && (

                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>

                )}

            </div>

        </form>

    );
}


export default ReviewForm;