/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    getAdminOrder,
    updateOrderStatus,
} from "../../services/orderService";

import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    User,
    MapPin,
    Phone,
    ShoppingBag,
    RefreshCw,
} from "lucide-react";


function AdminOrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updating, setUpdating] = useState(false);


    // =====================================================
    // LOAD ORDER
    // =====================================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadOrder();

    }, [id]);


    const loadOrder = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAdminOrder(id);

            setOrder(data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load order"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const handleStatusChange = async (e) => {

        const newStatus = e.target.value;

        try {

            setUpdating(true);

            const updatedOrder =
                await updateOrderStatus(
                    id,
                    newStatus
                );

            setOrder(updatedOrder);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdating(false);

        }

    };


    // =====================================================
    // STATUS STYLE
    // =====================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return "bg-amber-50 text-amber-600 border-amber-200";

            case "Processing":
                return "bg-blue-50 text-blue-600 border-blue-200";

            case "Shipped":
                return "bg-purple-50 text-purple-600 border-purple-200";

            case "Delivered":
                return "bg-emerald-50 text-emerald-600 border-emerald-200";

            case "Cancelled":
                return "bg-red-50 text-red-600 border-red-200";

            default:
                return "bg-gray-50 text-gray-600 border-gray-200";

        }

    };


    const getStatusIcon = (status) => {

        switch (status) {

            case "Pending":
                return <Clock size={16} />;

            case "Processing":
                return <Package size={16} />;

            case "Shipped":
                return <Truck size={16} />;

            case "Delivered":
                return <CheckCircle size={16} />;

            case "Cancelled":
                return <XCircle size={16} />;

            default:
                return null;

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <div className="text-center">

                    <RefreshCw
                        size={24}
                        className="mx-auto animate-spin text-emerald-500"
                    />

                    <p className="mt-3 text-sm text-gray-500">
                        Loading order...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !order) {

        return (

            <div className="min-h-screen bg-gray-50 p-5 sm:p-8">

                <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-sm">

                    <XCircle
                        size={30}
                        className="mx-auto text-red-500"
                    />

                    <h1 className="mt-4 text-xl font-bold">
                        Order not found
                    </h1>

                    <p className="mt-2 text-sm text-red-500">
                        {error || "This order does not exist."}
                    </p>

                    <Link
                        to="/admin/orders"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
                    >

                        <ArrowLeft size={16} />

                        Back to Orders

                    </Link>

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">

            <main className="p-5 sm:p-8">

                <div className="mx-auto max-w-6xl">


                    {/* HEADER */}

                    <div className="mb-8">

                        <Link
                            to="/admin/orders"
                            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-emerald-600"
                        >

                            <ArrowLeft size={17} />

                            Back to Orders

                        </Link>


                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <div className="flex items-center gap-3">

                                    <h1 className="text-3xl font-bold tracking-tight">
                                        Order Details
                                    </h1>

                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >

                                        {getStatusIcon(
                                            order.status
                                        )}

                                        {order.status}

                                    </span>

                                </div>

                                <p className="mt-2 text-sm text-gray-500">

                                    Order #{order._id}

                                </p>

                            </div>


                            <select
                                value={order.status}
                                onChange={handleStatusChange}
                                disabled={updating}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            >

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* PROGRESS */}

                    <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                        <h2 className="mb-6 font-bold">
                            Order Progress
                        </h2>

                        <div className="grid grid-cols-4 gap-2">

                            {[
                                "Pending",
                                "Processing",
                                "Shipped",
                                "Delivered",
                            ].map((step, index) => {

                                const statuses = [
                                    "Pending",
                                    "Processing",
                                    "Shipped",
                                    "Delivered",
                                ];

                                const currentIndex =
                                    statuses.indexOf(
                                        order.status
                                    );

                                const completed =
                                    index <= currentIndex;

                                return (

                                    <div
                                        key={step}
                                        className="text-center"
                                    >

                                        <div
                                            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                                                completed
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-gray-100 text-gray-400"
                                            }`}
                                        >

                                            {index === 0 && (
                                                <Clock size={17} />
                                            )}

                                            {index === 1 && (
                                                <Package size={17} />
                                            )}

                                            {index === 2 && (
                                                <Truck size={17} />
                                            )}

                                            {index === 3 && (
                                                <CheckCircle size={17} />
                                            )}

                                        </div>

                                        <p
                                            className={`mt-2 text-xs font-semibold ${
                                                completed
                                                    ? "text-emerald-600"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {step}
                                        </p>

                                    </div>

                                );

                            })}

                        </div>

                    </div>


                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


                        {/* LEFT */}

                        <div className="space-y-6 lg:col-span-2">


                            {/* ITEMS */}

                            <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

                                <div className="border-b border-gray-100 p-6">

                                    <div className="flex items-center gap-2">

                                        <ShoppingBag
                                            size={19}
                                            className="text-emerald-500"
                                        />

                                        <h2 className="font-bold">
                                            Order Items
                                        </h2>

                                    </div>

                                </div>


                                <div className="divide-y divide-gray-100">

                                    {order.items?.map((item) => (

                                        <div
                                            key={item._id}
                                            className="flex items-center justify-between gap-4 p-6"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">

                                                    <Package size={23} />

                                                </div>

                                                <div>

                                                    <h3 className="font-semibold">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">

                                                        ${Number(
                                                            item.price
                                                        ).toFixed(2)}

                                                        {" × "}

                                                        {item.quantity}

                                                    </p>

                                                </div>

                                            </div>


                                            <p className="font-bold">

                                                $
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toFixed(2)}

                                            </p>

                                        </div>

                                    ))}

                                </div>


                                <div className="border-t border-gray-100 p-6">

                                    <div className="flex justify-between text-lg font-bold">

                                        <span>
                                            Total
                                        </span>

                                        <span className="text-emerald-600">

                                            $
                                            {Number(
                                                order.totalAmount
                                            ).toFixed(2)}

                                        </span>

                                    </div>

                                </div>

                            </section>


                            {/* CUSTOMER */}

                            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center gap-2">

                                    <User
                                        size={19}
                                        className="text-emerald-500"
                                    />

                                    <h2 className="font-bold">
                                        Customer Information
                                    </h2>

                                </div>


                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <div className="rounded-xl bg-gray-50 p-4">

                                        <p className="text-xs font-medium text-gray-400">
                                            Name
                                        </p>

                                        <p className="mt-1 font-semibold">

                                            {order.user?.name ||
                                                "Customer"}

                                        </p>

                                    </div>


                                    <div className="rounded-xl bg-gray-50 p-4">

                                        <p className="text-xs font-medium text-gray-400">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all font-semibold">

                                            {order.user?.email ||
                                                "-"}

                                        </p>

                                    </div>

                                </div>

                            </section>

                        </div>


                        {/* RIGHT */}

                        <div className="space-y-6">


                            {/* SHIPPING */}

                            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                                <div className="mb-5 flex items-center gap-2">

                                    <MapPin
                                        size={19}
                                        className="text-emerald-500"
                                    />

                                    <h2 className="font-bold">
                                        Shipping Information
                                    </h2>

                                </div>


                                <div className="space-y-4 text-sm">

                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Full Name
                                        </p>

                                        <p className="mt-1 font-medium">

                                            {order.shippingAddress?.fullName ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-xs text-gray-400">
                                            Address
                                        </p>

                                        <p className="mt-1 font-medium">

                                            {order.shippingAddress?.address ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-xs text-gray-400">
                                            City
                                        </p>

                                        <p className="mt-1 font-medium">

                                            {order.shippingAddress?.city ||
                                                "-"}

                                        </p>

                                    </div>


                                    <div className="flex items-center gap-2">

                                        <Phone
                                            size={15}
                                            className="text-gray-400"
                                        />

                                        <span>

                                            {order.shippingAddress?.phone ||
                                                "-"}

                                        </span>

                                    </div>

                                </div>

                            </section>


                            {/* ORDER INFO */}

                            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                                <h2 className="font-bold">
                                    Order Information
                                </h2>


                                <div className="mt-5 space-y-4 text-sm">

                                    <div className="flex justify-between gap-4">

                                        <span className="text-gray-500">
                                            Order ID
                                        </span>

                                        <span className="max-w-[180px] truncate font-medium">
                                            {order._id}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Date
                                        </span>

                                        <span className="font-medium">

                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}

                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Items
                                        </span>

                                        <span className="font-medium">
                                            {order.items?.length || 0}
                                        </span>

                                    </div>


                                    <div className="flex justify-between border-t border-gray-100 pt-4">

                                        <span className="font-semibold">
                                            Total
                                        </span>

                                        <span className="font-bold text-emerald-600">

                                            $
                                            {Number(
                                                order.totalAmount
                                            ).toFixed(2)}

                                        </span>

                                    </div>

                                </div>

                            </section>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}


export default AdminOrderDetails;