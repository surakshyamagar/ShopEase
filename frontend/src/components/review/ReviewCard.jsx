import { Star, Pencil, Trash2 } from "lucide-react";


function ReviewCard({
    review,
    currentUserId,
    onEdit,
    onDelete,
}) {

    const isOwner =
        review.user?._id === currentUserId ||
        review.user === currentUserId;


    return (

        <div className="bg-white border border-gray-200 rounded-xl p-5">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <p className="font-semibold text-gray-900">
                        {review.user?.name || "User"}
                    </p>

                    <div className="flex items-center gap-1 mt-1">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <Star
                                key={star}
                                size={16}
                                className={
                                    star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                }
                            />

                        ))}

                    </div>

                </div>


                <p className="text-xs text-gray-400">

                    {review.createdAt &&
                        new Date(
                            review.createdAt
                        ).toLocaleDateString()}

                </p>

            </div>


            {/* ==============================
                COMMENT
            ============================== */}

            <p className="text-gray-600 mt-4 leading-relaxed">
                {review.comment}
            </p>


            {/* ==============================
                OWNER ACTIONS
            ============================== */}

            {isOwner && (

                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">

                    <button
                        onClick={() => onEdit(review)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >

                        <Pencil size={15} />

                        Edit

                    </button>


                    <button
                        onClick={() => onDelete(review._id)}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                    >

                        <Trash2 size={15} />

                        Delete

                    </button>

                </div>

            )}

        </div>

    );
}


export default ReviewCard;