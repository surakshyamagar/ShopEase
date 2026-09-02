import { Link } from "react-router-dom";

import OrderStatus from "./OrderStatus";


function OrderCard({ order }) {

    return (

        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                    <p className="text-sm text-gray-500">
                        Order ID
                    </p>

                    <p className="font-semibold text-gray-900 break-all">
                        {order._id}
                    </p>

                </div>


                <OrderStatus status={order.status} />

            </div>


            {/* ==============================
                ORDER INFO
            ============================== */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">

                <div>

                    <p className="text-sm text-gray-500">
                        Items
                    </p>

                    <p className="font-semibold text-gray-900">
                        {order.items?.length || 0}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Total
                    </p>

                    <p className="font-semibold text-gray-900">
                        ${Number(order.totalAmount).toFixed(2)}
                    </p>

                </div>


                <div>

                    <p className="text-sm text-gray-500">
                        Date
                    </p>

                    <p className="font-semibold text-gray-900">

                        {new Date(
                            order.createdAt
                        ).toLocaleDateString()}

                    </p>

                </div>

            </div>


            {/* ==============================
                ACTION
            ============================== */}

            <div className="mt-5 pt-4 border-t border-gray-100">

                <Link
                    to={`/orders/${order._id}`}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    View Order
                </Link>

            </div>

        </div>

    );
}


export default OrderCard;