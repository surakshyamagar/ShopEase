import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    cancelOrder,
    getOrder,
} from "../../services/orderService";

import {
    ShoppingBag,
    ShoppingCart,
    Package,
    LayoutDashboard,
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Receipt,
    MapPin,
    Phone,
    User,
    XCircle,
    CheckCircle2,
    Clock3,
    Truck,
    CircleCheck,
    RefreshCw,
    ChevronRight,
} from "lucide-react";


function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ==========================================
    // LOAD ORDER
    // ==========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const loadOrder = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getOrder(id);

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


    // ==========================================
    // CANCEL ORDER
    // ==========================================

    const handleCancel = async () => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }


        try {

            const updatedOrder = await cancelOrder(id);

            setOrder(updatedOrder);

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

    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return {
                    container:
                        "border-amber-200 bg-amber-50 text-amber-700",
                    icon: Clock3,
                };

            case "Processing":
                return {
                    container:
                        "border-blue-200 bg-blue-50 text-blue-700",
                    icon: RefreshCw,
                };

            case "Shipped":
                return {
                    container:
                        "border-purple-200 bg-purple-50 text-purple-700",
                    icon: Truck,
                };

            case "Delivered":
                return {
                    container:
                        "border-emerald-200 bg-emerald-50 text-emerald-700",
                    icon: CheckCircle2,
                };

            case "Cancelled":
                return {
                    container:
                        "border-red-200 bg-red-50 text-red-700",
                    icon: XCircle,
                };

            default:
                return {
                    container:
                        "border-gray-200 bg-gray-50 text-gray-600",
                    icon: Package,
                };

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

                    <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8">

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


                {/* Skeleton */}

                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

                    <div className="animate-pulse">

                        <div className="h-4 w-40 rounded bg-gray-200" />

                        <div className="mt-5 h-9 w-64 rounded bg-gray-200" />

                        <div className="mt-8 grid gap-6 lg:grid-cols-3">

                            <div className="space-y-6 lg:col-span-2">

                                <div className="h-48 rounded-2xl bg-white" />

                                <div className="h-72 rounded-2xl bg-white" />

                            </div>

                            <div className="h-80 rounded-2xl bg-white" />

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

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">

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

                        <h2 className="mt-5 text-xl font-bold">

                            Unable to load order

                        </h2>

                        <p className="mt-2 text-sm text-gray-500">

                            {error}

                        </p>

                        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                            <button
                                onClick={loadOrder}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >

                                <RefreshCw size={17} />

                                Try Again

                            </button>

                            <Link
                                to="/orders"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >

                                <ArrowLeft size={17} />

                                Back to Orders

                            </Link>

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // NO ORDER
    // ==========================================

    if (!order) {

        return (

            <div className="min-h-screen bg-gray-50">

                <main className="mx-auto max-w-3xl px-5 py-20">

                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">

                            <Package size={36} />

                        </div>

                        <h2 className="mt-5 text-xl font-bold">

                            Order not found

                        </h2>

                        <p className="mt-2 text-sm text-gray-500">

                            The order you're looking for could not be found.

                        </p>

                        <Link
                            to="/orders"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
                        >

                            <ArrowLeft size={17} />

                            Back to Orders

                        </Link>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // STATUS
    // ==========================================

    const statusStyle = getStatusStyle(order.status);

    const StatusIcon = statusStyle.icon;


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">


            {/* =====================================
                HEADER
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


                    {/* Header Links */}

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
                        className="hover:text-emerald-600"
                    >
                        Dashboard
                    </Link>

                    <ChevronRight size={15} />

                    <Link
                        to="/orders"
                        className="hover:text-emerald-600"
                    >
                        Orders
                    </Link>

                    <ChevronRight size={15} />

                    <span className="font-medium text-gray-800">
                        Order Details
                    </span>

                </div>


                {/* =================================
                    PAGE HEADER
                ================================== */}

                <section className="mb-8">

                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                        <div>

                            <div className="mb-2 flex items-center gap-2">

                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                                    <Receipt size={17} />

                                </span>

                                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">

                                    Order Details

                                </span>

                            </div>


                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

                                Order #{order._id}

                            </h1>


                            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">

                                <span className="flex items-center gap-1.5">

                                    <CalendarDays size={16} />

                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}

                                </span>

                            </div>

                        </div>


                        {/* Status */}

                        <div
                            className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyle.container}`}
                        >

                            <StatusIcon size={17} />

                            {order.status}

                        </div>

                    </div>

                </section>


                {/* =================================
                    NAVIGATION
                ================================== */}

                <div className="mb-8 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">

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
                    CONTENT GRID
                ================================== */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


                    {/* =================================
                        LEFT COLUMN
                    ================================== */}

                    <div className="space-y-6 lg:col-span-2">


                        {/* =================================
                            ORDER STATUS
                        ================================== */}

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        Order Status
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Current status of your order
                                    </p>

                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <Package size={22} />

                                </div>

                            </div>


                            {/* Status Progress */}

                            <div className="grid grid-cols-4 gap-2">

                                {[
                                    "Pending",
                                    "Processing",
                                    "Shipped",
                                    "Delivered",
                                ].map((step, index) => {

                                    const statusOrder = [
                                        "Pending",
                                        "Processing",
                                        "Shipped",
                                        "Delivered",
                                    ];

                                    const currentIndex =
                                        statusOrder.indexOf(
                                            order.status
                                        );

                                    const completed =
                                        currentIndex >= index;

                                    const isCurrent =
                                        currentIndex === index;

                                    return (

                                        <div
                                            key={step}
                                            className="relative"
                                        >

                                            <div
                                                className={`h-1 rounded-full ${
                                                    completed
                                                        ? "bg-emerald-500"
                                                        : "bg-gray-100"
                                                }`}
                                            />

                                            <div className="mt-3 flex items-center gap-2">

                                                <div
                                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                                        completed
                                                            ? "bg-emerald-500 text-white"
                                                            : "bg-gray-100 text-gray-400"
                                                    }`}
                                                >

                                                    {completed ? (
                                                        <CircleCheck size={15} />
                                                    ) : (
                                                        <span className="text-xs">
                                                            {index + 1}
                                                        </span>
                                                    )}

                                                </div>

                                                <span
                                                    className={`hidden text-xs font-medium sm:block ${
                                                        isCurrent
                                                            ? "text-emerald-600"
                                                            : completed
                                                            ? "text-gray-700"
                                                            : "text-gray-400"
                                                    }`}
                                                >
                                                    {step}
                                                </span>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>


                            {/* Cancelled */}

                            {order.status === "Cancelled" && (

                                <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4">

                                    <XCircle
                                        size={20}
                                        className="text-red-500"
                                    />

                                    <p className="text-sm font-medium text-red-700">

                                        This order has been cancelled.

                                    </p>

                                </div>

                            )}

                        </section>


                        {/* =================================
                            ORDER ITEMS
                        ================================== */}

                        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

                            <div className="border-b border-gray-100 px-6 py-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-lg font-bold">
                                            Order Items
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">

                                            {order.items?.length || 0}{" "}
                                            {order.items?.length === 1
                                                ? "item"
                                                : "items"}{" "}
                                            in this order

                                        </p>

                                    </div>

                                    <Package
                                        size={22}
                                        className="text-emerald-500"
                                    />

                                </div>

                            </div>


                            <div className="divide-y divide-gray-100">

                                {order.items?.map((item) => (

                                    <div
                                        key={item._id}
                                        className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                                    >

                                        <div className="flex items-center gap-4">

                                            {/* Product Image */}

                                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">

                                                {item.image ? (

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />

                                                ) : (

                                                    <ShoppingBag
                                                        size={28}
                                                        className="text-gray-400"
                                                    />

                                                )}

                                            </div>


                                            {/* Product Info */}

                                            <div>

                                                <h3 className="font-semibold text-gray-900">

                                                    {item.name}

                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">

                                                    ${Number(
                                                        item.price
                                                    ).toFixed(2)}{" "}
                                                    ×{" "}
                                                    {item.quantity}

                                                </p>

                                            </div>

                                        </div>


                                        {/* Item Total */}

                                        <div className="sm:text-right">

                                            <p className="text-xs text-gray-400">
                                                Item Total
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-gray-900">

                                                $
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toFixed(2)}

                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </section>


                        {/* =================================
                            SHIPPING INFORMATION
                        ================================== */}

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        Shipping Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Delivery details for this order
                                    </p>

                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500">

                                    <MapPin size={21} />

                                </div>

                            </div>


                            <div className="grid gap-4 sm:grid-cols-2">


                                {/* Name */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">

                                        <User size={15} />

                                        Full Name

                                    </div>

                                    <p className="mt-2 font-semibold text-gray-800">

                                        {order.shippingAddress?.fullName ||
                                            "-"}

                                    </p>

                                </div>


                                {/* Phone */}

                                <div className="rounded-xl bg-gray-50 p-4">

                                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">

                                        <Phone size={15} />

                                        Phone

                                    </div>

                                    <p className="mt-2 font-semibold text-gray-800">

                                        {order.shippingAddress?.phone ||
                                            "-"}

                                    </p>

                                </div>


                                {/* Address */}

                                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">

                                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">

                                        <MapPin size={15} />

                                        Delivery Address

                                    </div>

                                    <p className="mt-2 font-semibold text-gray-800">

                                        {order.shippingAddress?.address ||
                                            "-"}

                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">

                                        {order.shippingAddress?.city ||
                                            "-"}

                                    </p>

                                </div>

                            </div>

                        </section>

                    </div>


                    {/* =================================
                        RIGHT COLUMN
                    ================================== */}

                    <aside className="space-y-6">


                        {/* =================================
                            ORDER SUMMARY
                        ================================== */}

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-6 flex items-center justify-between">

                                <div>

                                    <h2 className="text-lg font-bold">
                                        Order Summary
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Payment summary
                                    </p>

                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                    <Receipt size={20} />

                                </div>

                            </div>


                            <div className="space-y-4 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Items
                                    </span>

                                    <span className="font-medium text-gray-800">

                                        {order.items?.reduce(
                                            (total, item) =>
                                                total +
                                                item.quantity,
                                            0
                                        ) || 0}

                                    </span>

                                </div>


                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-800">

                                        ${Number(
                                            order.totalAmount
                                        ).toFixed(2)}

                                    </span>

                                </div>


                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium text-emerald-600">
                                        Free
                                    </span>

                                </div>

                            </div>


                            <div className="my-5 border-t border-gray-100" />


                            <div className="flex items-center justify-between">

                                <span className="text-base font-semibold">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-emerald-600">

                                    ${Number(
                                        order.totalAmount
                                    ).toFixed(2)}

                                </span>

                            </div>

                        </section>


                        {/* =================================
                            ORDER ACTIONS
                        ================================== */}

                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-bold">
                                Order Actions
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your order
                            </p>


                            <div className="mt-5 space-y-3">

                                <Link
                                    to="/orders"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >

                                    <ArrowLeft size={17} />

                                    Back to Orders

                                </Link>


                                {order.status !== "Delivered" &&
                                    order.status !== "Cancelled" && (

                                        <button
                                            onClick={handleCancel}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                        >

                                            <XCircle size={17} />

                                            Cancel Order

                                        </button>

                                    )}

                            </div>

                        </section>


                        {/* =================================
                            SHOPPING CARD
                        ================================== */}

                        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-green-50 to-white p-6">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">

                                <ShoppingBag size={21} />

                            </div>

                            <h3 className="mt-5 font-bold text-gray-900">

                                Continue Shopping

                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">

                                Discover more products and find something you'll love.

                            </p>


                            <Link
                                to="/products"
                                className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >

                                Browse Products

                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />

                            </Link>

                        </div>

                    </aside>

                </div>

            </main>

        </div>

    );

}


export default OrderDetails;