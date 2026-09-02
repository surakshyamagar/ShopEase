import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    getCart,
    updateCartItem,
    removeFromCart,
} from "../../services/cartService";

import { createOrder } from "../../services/orderService";

import {
    ShoppingBag,
    ShoppingCart,
    ArrowLeft,
    Trash2,
    Plus,
    Minus,
    Package,
    ShieldCheck,
    Truck,
    CreditCard,
    MapPin,
    Phone,
    User,
    CheckCircle2,
    ArrowRight,
    Loader2,
} from "lucide-react";


function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showCheckout, setShowCheckout] = useState(false);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [shippingData, setShippingData] = useState({
        fullName: "",
        address: "",
        city: "",
        phone: "",
    });


    // ==========================================
    // LOAD CART
    // ==========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadCart();

    }, []);


    const loadCart = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getCart();

            setCart(data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load your cart"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UPDATE QUANTITY
    // ==========================================

    const handleUpdateQuantity = async (
        productId,
        quantity
    ) => {

        if (quantity < 1) {
            return;
        }

        try {

            const updatedCart =
                await updateCartItem(
                    productId,
                    quantity
                );

            setCart(updatedCart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }

    };


    // ==========================================
    // REMOVE ITEM
    // ==========================================

    const handleRemove = async (productId) => {

        try {

            const updatedCart =
                await removeFromCart(productId);

            setCart(updatedCart);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to remove item"
            );

        }

    };


    // ==========================================
    // SHIPPING INPUT
    // ==========================================

    const handleChange = (e) => {

        setShippingData({

            ...shippingData,

            [e.target.name]: e.target.value,

        });

    };


    // ==========================================
    // PLACE ORDER
    // ==========================================

    const handlePlaceOrder = async (e) => {

        e.preventDefault();

        try {

            setPlacingOrder(true);

            const order = await createOrder(
                shippingData
            );

            alert("Order placed successfully!");

            navigate(`/orders/${order._id}`);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );

        } finally {

            setPlacingOrder(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <div className="flex min-h-screen items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">

                            <Loader2
                                size={28}
                                className="animate-spin text-emerald-500"
                            />

                        </div>

                        <p className="mt-4 text-sm font-medium text-gray-500">
                            Loading your cart...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50">

                <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">

                    <div className="w-full rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">

                            <ShoppingCart size={25} />

                        </div>

                        <h1 className="mt-5 text-xl font-bold text-gray-900">
                            Unable to load your cart
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {error}
                        </p>

                        <button
                            onClick={loadCart}
                            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (!cart || cart.items?.length === 0) {

        return (

            <div className="min-h-screen bg-gray-50">

                {/* Header */}

                <header className="border-b border-gray-200 bg-white">

                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

                        <Link
                            to="/customer/dashboard"
                            className="flex items-center gap-3"
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                                <ShoppingBag size={21} />

                            </div>

                            <h1 className="text-xl font-bold tracking-tight">

                                Shop
                                <span className="text-emerald-500">
                                    Ease
                                </span>

                            </h1>

                        </Link>


                        <Link
                            to="/customer/dashboard"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-emerald-600"
                        >

                            <ArrowLeft size={17} />

                            Dashboard

                        </Link>

                    </div>

                </header>


                {/* Empty State */}

                <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-5 py-16 sm:px-8">

                    <div className="w-full max-w-xl text-center">

                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                            <ShoppingCart size={42} strokeWidth={1.5} />

                        </div>

                        <h1 className="mt-7 text-3xl font-bold tracking-tight text-gray-900">
                            Your cart is empty
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                            Looks like you haven't added anything to your cart yet.
                            Explore our products and find something you'll love.
                        </p>

                        <Link
                            to="/shop"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
                        >

                            <ShoppingBag size={18} />

                            Start Shopping

                            <ArrowRight size={17} />

                        </Link>

                    </div>

                </main>

            </div>

        );

    }


    // ==========================================
    // CART CALCULATIONS
    // ==========================================

    const totalAmount = cart.items.reduce(
        (total, item) => {

            return (
                total +
                item.product.price *
                item.quantity
            );

        },
        0
    );


    const totalItems = cart.items.reduce(
        (total, item) => {

            return total + item.quantity;

        },
        0
    );


    const shippingCost = totalAmount >= 100
        ? 0
        : 5;


    const finalTotal =
        totalAmount + shippingCost;


    // ==========================================
    // MAIN UI
    // ==========================================

    return (

        <div className="min-h-screen bg-gray-50">

            {/* ==========================================
                HEADER
            ========================================== */}

            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

                    {/* Logo */}

                    <Link
                        to="/customer/dashboard"
                        className="flex items-center gap-3"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                            <ShoppingBag size={21} />

                        </div>

                        <h1 className="text-xl font-bold tracking-tight">

                            Shop
                            <span className="text-emerald-500">
                                Ease
                            </span>

                        </h1>

                    </Link>


                    {/* Navigation */}

                    <nav className="hidden items-center gap-7 md:flex">

                        <Link
                            to="/customer/dashboard"
                            className="text-sm font-medium text-gray-500 transition hover:text-emerald-600"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/shop"
                            className="text-sm font-medium text-gray-500 transition hover:text-emerald-600"
                        >
                            Products
                        </Link>

                        <Link
                            to="/orders"
                            className="text-sm font-medium text-gray-500 transition hover:text-emerald-600"
                        >
                            Orders
                        </Link>

                    </nav>


                    {/* Cart */}

                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-emerald-600">

                        <ShoppingCart size={18} />

                        <span className="text-sm font-semibold">
                            {totalItems}
                        </span>

                    </div>

                </div>

            </header>


            {/* ==========================================
                MAIN
            ========================================== */}

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">


                {/* ======================================
                    PAGE HEADER
                ====================================== */}

                <div className="mb-8">

                    <Link
                        to="/shop"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-600"
                    >

                        <ArrowLeft size={16} />

                        Continue Shopping

                    </Link>


                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                                Shopping Cart
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                My Cart
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                            </p>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    CART + SUMMARY
                ====================================== */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


                    {/* ==================================
                        CART ITEMS
                    ================================== */}

                    <section className="lg:col-span-2">

                        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                            {/* Card Header */}

                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">

                                <div>

                                    <h2 className="font-bold text-gray-900">
                                        Cart Items
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Review your selected products
                                    </p>

                                </div>

                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                    {totalItems} items
                                </span>

                            </div>


                            {/* Items */}

                            <div className="divide-y divide-gray-100">

                                {cart.items.map((item) => (

                                    <div
                                        key={item._id}
                                        className="p-5 sm:p-6"
                                    >

                                        <div className="flex gap-4 sm:gap-5">


                                            {/* Product Image */}

                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">

                                                {item.product.image ? (

                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                    />

                                                ) : (

                                                    <div className="flex h-full w-full items-center justify-center text-gray-400">

                                                        <Package size={30} />

                                                    </div>

                                                )}

                                            </div>


                                            {/* Product Details */}

                                            <div className="min-w-0 flex-1">

                                                <div className="flex items-start justify-between gap-3">

                                                    <div>

                                                        <h3 className="font-semibold text-gray-900">

                                                            {item.product.name}

                                                        </h3>

                                                        <p className="mt-1 text-sm text-gray-500">

                                                            ${Number(item.product.price).toFixed(2)}

                                                        </p>

                                                    </div>


                                                    {/* Remove */}

                                                    <button
                                                        onClick={() =>
                                                            handleRemove(
                                                                item.product._id
                                                            )
                                                        }
                                                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                                        title="Remove item"
                                                    >

                                                        <Trash2 size={18} />

                                                    </button>

                                                </div>


                                                {/* Quantity + Price */}

                                                <div className="mt-5 flex items-center justify-between">

                                                    {/* Quantity */}

                                                    <div className="flex items-center rounded-lg border border-gray-200">

                                                        <button
                                                            onClick={() =>
                                                                handleUpdateQuantity(
                                                                    item.product._id,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantity <= 1
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-30"
                                                        >

                                                            <Minus size={15} />

                                                        </button>


                                                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-800">

                                                            {item.quantity}

                                                        </span>


                                                        <button
                                                            onClick={() =>
                                                                handleUpdateQuantity(
                                                                    item.product._id,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-emerald-600"
                                                        >

                                                            <Plus size={15} />

                                                        </button>

                                                    </div>


                                                    {/* Item Total */}

                                                    <p className="text-lg font-bold text-gray-900">

                                                        $
                                                        {(
                                                            item.product.price *
                                                            item.quantity
                                                        ).toFixed(2)}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* Security Information */}

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

                            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                                <ShieldCheck
                                    size={20}
                                    className="text-emerald-500"
                                />

                                <div>

                                    <p className="text-xs font-semibold text-gray-800">
                                        Secure Checkout
                                    </p>

                                    <p className="text-[11px] text-gray-400">
                                        Your data is protected
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                                <Truck
                                    size={20}
                                    className="text-emerald-500"
                                />

                                <div>

                                    <p className="text-xs font-semibold text-gray-800">
                                        Fast Delivery
                                    </p>

                                    <p className="text-[11px] text-gray-400">
                                        Reliable shipping
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">

                                <CheckCircle2
                                    size={20}
                                    className="text-emerald-500"
                                />

                                <div>

                                    <p className="text-xs font-semibold text-gray-800">
                                        Easy Returns
                                    </p>

                                    <p className="text-[11px] text-gray-400">
                                        Hassle-free returns
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* ==================================
                        ORDER SUMMARY
                    ================================== */}

                    <aside className="lg:col-span-1">

                        <div className="sticky top-28 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="text-lg font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Review your order total
                            </p>


                            {/* Summary */}

                            <div className="mt-6 space-y-4 text-sm">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ${totalAmount.toFixed(2)}
                                    </span>

                                </div>


                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium">

                                        {shippingCost === 0 ? (

                                            <span className="text-emerald-600">
                                                Free
                                            </span>

                                        ) : (

                                            `$${shippingCost.toFixed(2)}`

                                        )}

                                    </span>

                                </div>


                                <div className="border-t border-gray-100 pt-4">

                                    <div className="flex items-center justify-between">

                                        <span className="font-semibold text-gray-900">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-emerald-600">
                                            ${finalTotal.toFixed(2)}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Free Shipping Message */}

                            {shippingCost > 0 && (

                                <div className="mt-5 rounded-xl bg-emerald-50 p-3">

                                    <p className="text-xs leading-5 text-emerald-700">

                                        Add $

                                        {(100 - totalAmount).toFixed(2)}

                                        {" "}more to your cart to get
                                        <span className="font-semibold">
                                            {" "}free shipping.
                                        </span>

                                    </p>

                                </div>

                            )}


                            {/* Checkout Button */}

                            <button
                                onClick={() =>
                                    setShowCheckout(true)
                                }
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
                            >

                                Proceed to Checkout

                                <ArrowRight size={17} />

                            </button>


                            <Link
                                to="/shop"
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-emerald-600"
                            >

                                <ShoppingBag size={17} />

                                Continue Shopping

                            </Link>


                            {/* Payment */}

                            <div className="mt-6 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">

                                <CreditCard size={15} />

                                Secure payment processing

                            </div>

                        </div>

                    </aside>

                </div>


                {/* ======================================
                    CHECKOUT FORM
                ====================================== */}

                {showCheckout && (

                    <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                        {/* Checkout Header */}

                        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">

                            <div>

                                <div className="flex items-center gap-2">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">

                                        <MapPin size={20} />

                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">
                                        Shipping Information
                                    </h2>

                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    Enter your delivery details to complete your order.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowCheckout(false)
                                }
                                className="text-sm font-semibold text-gray-400 transition hover:text-gray-600"
                            >
                                Cancel
                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handlePlaceOrder}
                            className="mt-7"
                        >

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                                {/* Full Name */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Full Name

                                    </label>

                                    <div className="relative">

                                        <User
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={shippingData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                        />

                                    </div>

                                </div>


                                {/* Phone */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Phone Number

                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            value={shippingData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                        />

                                    </div>

                                </div>


                                {/* Address */}

                                <div className="md:col-span-2">

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Delivery Address

                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute left-4 top-4 text-gray-400"
                                        />

                                        <textarea
                                            name="address"
                                            placeholder="Enter your complete delivery address"
                                            value={shippingData.address}
                                            onChange={handleChange}
                                            required
                                            rows="3"
                                            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                        />

                                    </div>

                                </div>


                                {/* City */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        City

                                    </label>

                                    <div className="relative">

                                        <MapPin
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="Enter your city"
                                            value={shippingData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-50"
                                        />

                                    </div>

                                </div>


                                {/* Payment */}

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-gray-700">

                                        Payment Method

                                    </label>

                                    <div className="flex h-[50px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

                                        <CreditCard
                                            size={18}
                                            className="text-emerald-500"
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            Cash on Delivery
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Order Confirmation */}

                            <div className="mt-7 flex flex-col gap-4 rounded-xl bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <p className="text-sm font-semibold text-emerald-800">
                                        Ready to place your order?
                                    </p>

                                    <p className="mt-1 text-xs text-emerald-600">
                                        Total amount: ${finalTotal.toFixed(2)}
                                    </p>

                                </div>


                                <button
                                    type="submit"
                                    disabled={placingOrder}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {placingOrder ? (

                                        <>
                                            <Loader2
                                                size={17}
                                                className="animate-spin"
                                            />

                                            Placing Order...

                                        </>

                                    ) : (

                                        <>
                                            Confirm Order

                                            <CheckCircle2 size={17} />

                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </section>

                )}

            </main>

        </div>

    );

}


export default Cart;