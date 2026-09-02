function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) {

    const variants = {
        primary:
            "bg-emerald-600 hover:bg-emerald-700 text-white",

        secondary:
            "bg-gray-100 hover:bg-gray-200 text-gray-700",

        danger:
            "bg-red-500 hover:bg-red-600 text-white",

        outline:
            "border border-emerald-600 text-emerald-600 hover:bg-emerald-50",

        white:
            "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-4 py-2.5
                rounded-lg
                font-medium
                transition
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;