import { Link } from "react-router-dom";

function CartSummary({ cart }) {

    const total = cart?.items?.reduce(
        (sum, item) =>
            sum +
            item.product.price *
            item.quantity,
        0
    ) || 0;


    return (

        <div className="bg-white border border-gray-200 rounded-xl p-6">

            <h2 className="text-xl font-semibold text-gray-900">
                Order Summary
            </h2>


            <div className="flex justify-between mt-6 text-gray-600">

                <span>
                    Subtotal
                </span>

                <span>
                    ${total.toFixed(2)}
                </span>

            </div>


            <div className="flex justify-between mt-3 text-gray-600">

                <span>
                    Shipping
                </span>

                <span className="text-green-600">
                    Free
                </span>

            </div>


            <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">

                <span className="text-lg font-semibold">
                    Total
                </span>

                <span className="text-xl font-bold">
                    ${total.toFixed(2)}
                </span>

            </div>


            <Link
                to="/checkout"
                className="block text-center w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
                Proceed to Checkout
            </Link>


            <Link
                to="/products"
                className="block text-center mt-3 text-sm text-blue-600 hover:text-blue-700"
            >
                Continue Shopping
            </Link>

        </div>

    );
}

export default CartSummary;