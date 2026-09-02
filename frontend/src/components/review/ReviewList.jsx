import ReviewCard from "./ReviewCard";


function ReviewList({
    reviews,
    currentUserId,
    onEdit,
    onDelete,
}) {

    if (!reviews || reviews.length === 0) {

        return (

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">

                <p className="text-gray-500">
                    No reviews yet.
                </p>

                <p className="text-sm text-gray-400 mt-1">
                    Be the first to review this product.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-4">

            {reviews.map((review) => (

                <ReviewCard
                    key={review._id}
                    review={review}
                    currentUserId={currentUserId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>

    );
}


export default ReviewList;