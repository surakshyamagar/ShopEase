import { Minus, Plus } from "lucide-react";

function QuantityControl({
    quantity,
    onDecrease,
    onIncrease,
}) {

    return (

        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">

            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                <Minus size={16} />
            </button>


            <span className="px-4 font-medium text-gray-900">
                {quantity}
            </span>


            <button
                onClick={onIncrease}
                className="p-2 hover:bg-gray-100"
            >
                <Plus size={16} />
            </button>

        </div>

    );
}

export default QuantityControl;