import { PackageOpen } from "lucide-react";

function EmptyState({
    title = "Nothing here",
    message = "There is nothing to display.",
    buttonText,
    onButtonClick,
}) {

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">

            <div
                className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                "
            >
                <PackageOpen
                    size={30}
                    className="text-emerald-600"
                />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
                {title}
            </h2>

            <p className="mt-2 text-gray-500">
                {message}
            </p>

            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="
                        mt-5
                        rounded-lg
                        bg-emerald-600
                        px-5
                        py-2.5
                        font-medium
                        text-white
                        transition
                        hover:bg-emerald-700
                    "
                >
                    {buttonText}
                </button>
            )}

        </div>
    );
}

export default EmptyState;