function ErrorMessage({
    message = "Something went wrong.",
    onRetry,
}) {

    return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">

            <p className="font-medium text-red-600">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="
                        mt-3
                        rounded-lg
                        bg-red-500
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-red-600
                    "
                >
                    Try Again
                </button>
            )}

        </div>
    );
}

export default ErrorMessage;