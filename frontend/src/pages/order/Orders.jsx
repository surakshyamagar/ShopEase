import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getMyOrders,
    cancelOrder,
} from "../../services/orderService";

import {
    Package,
    ArrowRight,
    ShoppingBag,
    ShoppingCart,
    LayoutDashboard,
    XCircle,
    CalendarDays,
    Receipt,
    RefreshCw,
    ChevronRight,
} from "lucide-react";


function Orders() {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD ORDERS
    // ==========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);


    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMyOrders(status);

            setOrders(data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // CANCEL ORDER
    // ==========================================

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }


        try {

            await cancelOrder(id);

            loadOrders();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to cancel order"
            );

        }

    };


    // ==========================================
    // STATUS STYLE
    // ==========================================

    const getStatusStyle = (orderStatus) => {

        switch (orderStatus) {

            case "Pending":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "Processing":
                return "bg-blue-50 text-blue-700 border-blue-200";

            case "Shipped":
                return "bg-purple-50 text-purple-700 border-purple-200";

            case "Delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            case "Cancelled":
                return "bg-red-50 text-red-700 border-red-200";

            default:
                return "bg-gray-50 text-gray-600 border-gray-200";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                {/* Header */}

                <header className="border-b border-gray-200 bg-white">

                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

                        <Link
                            to="/customer/dashboard"
                            className="flex items-center gap-2"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                                <ShoppingBag size={22} />

                            </div>

                            <h1 className="text-xl font-bold tracking-tight">

                                Shop
                                <span className="text-emerald-500">
                                    Ease
                                </span>

                            </h1>

                        </Link>

                    </div>

                </header>


                {/* Loading */}

                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

                    <div className="animate-pulse">

                        <div className="h-8 w-48 rounded bg-gray-200" />

                        <div className="mt-3 h-4 w-72 rounded bg-gray-200" />

                        <div className="mt-8 h-20 rounded-2xl bg-white" />

                        <div className="mt-6 space-y-4">

                            <div className="h-40 rounded-2xl bg-white" />
                            <div className="h-40 rounded-2xl bg-white" />

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50">

                <header className="border-b border-gray-200 bg-white">

                    <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8">

                        <Link
                            to="/customer/dashboard"
                            className="flex items-center gap-2"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                                <ShoppingBag size={22} />

                            </div>

                            <h1 className="text-xl font-bold">

                                Shop
                                <span className="text-emerald-500">
                                    Ease
                                </span>

                            </h1>

                        </Link>

                    </div>

                </header>


                <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

                    <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">

                            <XCircle size={30} />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-gray-900">

                            Unable to load your orders

                        </h2>

                        <p className="mt-2 text-sm text-gray-500">

                            {error}

                        </p>

                        <button
                            onClick={loadOrders}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >

                            <RefreshCw size={17} />

                            Try Again

                        </button>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">


            {/* =====================================
                TOP HEADER
            ====================================== */}

            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

                    {/* Logo */}

                    <Link
                        to="/customer/dashboard"
                        className="flex items-center gap-2"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                            <ShoppingBag size={22} />

                        </div>

                        <h1 className="text-xl font-bold tracking-tight">

                            Shop
                            <span className="text-emerald-500">
                                Ease
                            </span>

                        </h1>

                    </Link>


                    {/* Quick Navigation */}

                    <div className="flex items-center gap-2 sm:gap-3">

                        <Link
                            to="/products"
                            className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600 sm:flex"
                        >

                            <ShoppingBag size={17} />

                            Products

                        </Link>


                        <Link
                            to="/cart"
                            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <ShoppingCart size={18} />

                            <span className="hidden sm:inline">
                                Cart
                            </span>

                        </Link>

                    </div>

                </div>

            </header>


            {/* =====================================
                MAIN
            ====================================== */}

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">


                {/* =================================
                    BREADCRUMB
                ================================== */}

                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">

                    <Link
                        to="/customer/dashboard"
                        className="transition hover:text-emerald-600"
                    >
                        Dashboard
                    </Link>

                    <ChevronRight size={15} />

                    <span className="font-medium text-gray-800">
                        My Orders
                    </span>

                </div>


                {/* =================================
                    PAGE HEADER
                ================================== */}

                <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                                <Receipt size={17} />

                            </span>

                            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">

                                Order History

                            </span>

                        </div>


                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                            My Orders

                        </h1>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">

                            View, track and manage all your previous purchases.

                        </p>

                    </div>


                    {/* Continue Shopping */}

                    <Link
                        to="/products"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
                    >

                        Continue Shopping

                        <ArrowRight
                            size={17}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </Link>

                </section>


                {/* =================================
                    NAVIGATION
                ================================== */}

                <div className="mb-6 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">

                    <div className="flex min-w-max items-center gap-1">

                        <Link
                            to="/customer/dashboard"
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <LayoutDashboard size={17} />

                            Dashboard

                        </Link>


                        <Link
                            to="/products"
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <ShoppingBag size={17} />

                            Products

                        </Link>


                        <Link
                            to="/cart"
                            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <ShoppingCart size={17} />

                            Cart

                        </Link>


                        <Link
                            to="/orders"
                            className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600"
                        >

                            <Package size={17} />

                            Orders

                        </Link>

                    </div>

                </div>


                {/* =================================
                    FILTER BAR
                ================================== */}

                <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="font-bold text-gray-900">

                                Your Orders

                            </h2>

                            <p className="mt-1 text-sm text-gray-500">

                                {orders.length}{" "}
                                {orders.length === 1
                                    ? "order"
                                    : "orders"}{" "}
                                found

                            </p>

                        </div>


                        <div className="flex items-center gap-3">

                            <label
                                htmlFor="order-status"
                                className="hidden text-sm font-medium text-gray-600 sm:block"
                            >
                                Filter:
                            </label>

                            <select
                                id="order-status"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            >

                                <option value="">
                                    All Orders
                                </option>

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

                </section>


                {/* =================================
                    EMPTY ORDERS
                ================================== */}

                {orders.length === 0 ? (

                    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                            <Package size={36} />

                        </div>

                        <h2 className="mt-6 text-xl font-bold text-gray-900">

                            No orders found

                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                            {status
                                ? "There are no orders with this status."
                                : "You haven't placed any orders yet. Start shopping and your orders will appear here."}

                        </p>


                        <Link
                            to="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >

                            <ShoppingBag size={17} />

                            Start Shopping

                        </Link>

                    </div>

                ) : (

                    /* =================================
                       ORDERS LIST
                    ================================== */

                    <section className="space-y-5">

                        {orders.map((order) => (

                            <article
                                key={order._id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >

                                {/* Order Header */}

                                <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:px-6">

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                                <Package size={20} />

                                            </div>

                                            <div>

                                                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">

                                                    Order ID

                                                </p>

                                                <p className="mt-0.5 max-w-[220px] truncate font-semibold text-gray-800">

                                                    #{order._id}

                                                </p>

                                            </div>

                                        </div>


                                        <span
                                            className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >

                                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                                            {order.status}

                                        </span>

                                    </div>

                                </div>


                                {/* Order Content */}

                                <div className="px-5 py-5 sm:px-6">

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">


                                        {/* Date */}

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500">

                                                <CalendarDays size={19} />

                                            </div>

                                            <div>

                                                <p className="text-xs text-gray-400">
                                                    Order Date
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">

                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}

                                                </p>

                                            </div>

                                        </div>


                                        {/* Total */}

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                                <Receipt size={19} />

                                            </div>

                                            <div>

                                                <p className="text-xs text-gray-400">
                                                    Total Amount
                                                </p>

                                                <p className="mt-1 text-lg font-bold text-gray-900">

                                                    ${Number(
                                                        order.totalAmount
                                                    ).toFixed(2)}

                                                </p>

                                            </div>

                                        </div>


                                        {/* Status */}

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">

                                                <Package size={19} />

                                            </div>

                                            <div>

                                                <p className="text-xs text-gray-400">
                                                    Current Status
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">

                                                    {order.status}

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Order Actions */}

                                <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">

                                    <Link
                                        to={`/orders/${order._id}`}
                                        className="group flex items-center justify-center gap-2 rounded-xl border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                                    >

                                        View Details

                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />

                                    </Link>


                                    {order.status !== "Delivered" &&
                                        order.status !== "Cancelled" && (

                                            <button
                                                onClick={() =>
                                                    handleCancel(
                                                        order._id
                                                    )
                                                }
                                                className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                            >

                                                <XCircle size={17} />

                                                Cancel Order

                                            </button>

                                        )}

                                </div>

                            </article>

                        ))}

                    </section>

                )}

            </main>

        </div>

    );

}


export default Orders;