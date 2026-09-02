function Loader({ text = "Loading..." }) {

    return (
        <div className="flex min-h-[200px] flex-col items-center justify-center">

            <div
                className="
                    h-10
                    w-10
                    animate-spin
                    rounded-full
                    border-4
                    border-gray-200
                    border-t-emerald-600
                "
            />

            <p className="mt-4 text-sm text-gray-500">
                {text}
            </p>

        </div>
    );
}

export default Loader;