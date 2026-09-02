import { X } from "lucide-react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
}) {

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                p-4
            "
            onClick={onClose}
        >

            <div
                className="
                    w-full
                    max-w-md
                    rounded-xl
                    bg-white
                    shadow-xl
                "
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-gray-200
                        px-5
                        py-4
                    "
                >

                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-600
                        "
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* CONTENT */}

                <div className="p-5">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Modal;