import { Trash2, Package } from "lucide-react";

import QuantityControl from "./QuantityControl";

function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {

    const product = item.product;

    const itemTotal =
        product.price * item.quantity;


    return (

        <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white border border-gray-200 rounded-xl">

            {/* Image */}

            <div className="w-full sm:w-28 h-28 bg-gray-100 rounded-lg overflow-hidden">

                {product.image ? (

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />

                ) : (

                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package size={30} />
                    </div>

                )}

            </div>


            {/* Product Info */}

            <div className="flex-1">

                <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    ${product.price} each
                </p>


                {/* Quantity */}

                <div className="mt-4">

                    <QuantityControl
                        quantity={item.quantity}
                        onIncrease={() =>
                            onIncrease(product._id)
                        }
                        onDecrease={() =>
                            onDecrease(product._id)
                        }
                    />

                </div>

            </div>


            {/* Right Side */}

            <div className="flex sm:flex-col items-center sm:items-end justify-between">

                <p className="text-lg font-bold text-gray-900">
                    ${itemTotal.toFixed(2)}
                </p>


                <button
                    onClick={() =>
                        onRemove(product._id)
                    }
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >

                    <Trash2 size={16} />

                    Remove

                </button>

            </div>

        </div>

    );
}

export default CartItem;