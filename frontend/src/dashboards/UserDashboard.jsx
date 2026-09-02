import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { getUserDashboard } from "../services/userDashboardService";
import { getCart } from "../services/cartService";

import {
    ShoppingBag,
    ShoppingCart,
    Package,
    User,
    Heart,
    Settings,
    LogOut,
    ArrowRight,
    Bell,
    Sparkles,
    CircleUserRound,
    LayoutDashboard,
} from "lucide-react";


function UserDashboard() {

    const { user, logout } = useAuth();

    const [stats, setStats] = useState({
        totalOrders: 0,
        cartItems: 0,
        wishlistItems: 0,
        recentOrders: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const [dashboardData, cartData] = await Promise.all([
                    getUserDashboard(),
                    getCart(),
                ]);


                const dashboard =
                    dashboardData?.data ??
                    dashboardData ??
                    {};


                const cart =
                    cartData?.data ??
                    cartData ??
                    {};


                const cartItems = Array.isArray(cart?.items)
                    ? cart.items
                    : [];


                const totalCartQuantity = cartItems.reduce(
                    (total, item) =>
                        total + Number(item?.quantity || 0),
                    0
                );


                setStats({
                    totalOrders:
                        dashboard?.totalOrders ??
                        dashboard?.ordersCount ??
                        0,

                    cartItems: totalCartQuantity,

                    wishlistItems:
                        dashboard?.wishlistItems ?? 0,

                    recentOrders:
                        dashboard?.recentOrders ??
                        dashboard?.orders ??
                        [],
                });

            } catch (error) {

                console.error(
                    "Failed to load user dashboard:",
                    error
                );

                console.error(
                    "Dashboard error response:",
                    error?.response?.data
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load dashboard."
                );

            } finally {

                setLoading(false);

            }

        };


        loadDashboard();

    }, []);


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );

    };


    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">

            <div className="flex min-h-screen">

                {/* SIDEBAR */}

                <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">

                    <div className="flex h-20 items-center px-6">

                        <div className="flex items-center gap-2">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

                                <ShoppingBag size={22} />

                            </div>

                            <h1 className="text-xl font-bold tracking-tight">

                                Shop
                                <span className="text-emerald-500">
                                    Ease
                                </span>

                            </h1>

                        </div>

                    </div>


                    <nav className="flex-1 px-4 py-6">

                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Menu
                        </p>


                        <Link
                            to="/customer/dashboard"
                            className="group mb-2 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:translate-x-1"
                        >

                            <LayoutDashboard size={19} />

                            Dashboard

                        </Link>


                        <Link
                            to="/shop"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Package size={19} />

                            Products

                        </Link>


                        <Link
                            to="/cart"
                            className="group mb-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <span className="flex items-center gap-3">

                                <ShoppingCart size={19} />

                                My Cart

                            </span>

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">

                                {stats.cartItems}

                            </span>

                        </Link>


                        <Link
                            to="/orders"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Package size={19} />

                            My Orders

                        </Link>


                        <Link
                            to="/wishlist"
                            className="group mb-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <span className="flex items-center gap-3">

                                <Heart size={19} />

                                Wishlist

                            </span>

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-600">

                                {stats.wishlistItems}

                            </span>

                        </Link>


                        <div className="my-6 border-t border-gray-100" />


                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Account
                        </p>


                        <Link
                            to="/profile"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <User size={19} />

                            Profile

                        </Link>


                        <Link
                            to="/settings"
                            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Settings size={19} />

                            Settings

                        </Link>

                    </nav>


                    <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-5">

                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">

                            <Sparkles size={20} />

                        </div>

                        <h3 className="text-sm font-bold text-gray-800">
                            Enjoy your shopping
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Discover products and enjoy a smooth checkout experience.
                        </p>

                        <Link
                            to="/products"
                            className="mt-4 block w-full rounded-lg bg-emerald-500 py-2 text-center text-xs font-semibold text-white transition hover:bg-emerald-600 hover:shadow-md"
                        >
                            Start Shopping
                        </Link>

                    </div>


                    <button
                        onClick={logout}
                        className="mx-4 mb-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >

                        <LogOut size={19} />

                        Logout

                    </button>

                </aside>


                {/* MAIN */}

                <main className="flex-1 overflow-hidden">

                    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                                Customer Dashboard
                            </p>

                        </div>


                        <div className="flex items-center gap-5">

                            <button className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-600">

                                <Bell size={21} />

                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />

                            </button>


                            <div className="flex items-center gap-3 border-l border-gray-200 pl-5">

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

                                    <CircleUserRound size={23} />

                                </div>

                                <div className="hidden sm:block">

                                    <p className="text-sm font-semibold text-gray-800">
                                        {user?.name || "User"}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Customer
                                    </p>

                                </div>

                            </div>

                        </div>

                    </header>


                    <div className="p-5 sm:p-8">

                        {loading && (

                            <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-600">
                                Loading your dashboard...
                            </div>

                        )}


                        {error && (

                            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
                                {error}
                            </div>

                        )}


                        {/* WELCOME */}

                        <section className="mb-8 flex items-center justify-between">

                            <div>

                                <p className="mb-2 text-sm font-semibold text-emerald-600">
                                    GOOD TO SEE YOU AGAIN 👋
                                </p>

                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                                    Welcome back,

                                    <span className="block text-emerald-500">
                                        {user?.name || "Customer"}
                                    </span>

                                </h1>

                                <p className="mt-2 text-gray-500">
                                    Here's what's happening with your account today.
                                </p>

                            </div>


                            <div className="hidden h-28 w-28 items-center justify-center rounded-full bg-emerald-50 md:flex">

                                <ShoppingBag
                                    size={55}
                                    strokeWidth={1.3}
                                    className="text-emerald-400"
                                />

                            </div>

                        </section>


                        {/* STATS */}

                        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {/* ORDERS */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">

                                        <Package size={22} />

                                    </div>

                                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                                        Orders
                                    </span>

                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    Total Orders
                                </p>

                                <h2 className="mt-1 text-3xl font-bold">
                                    {stats.totalOrders}
                                </h2>

                                <p className="mt-2 text-xs text-gray-400">
                                    All time orders
                                </p>

                            </div>


                            {/* CART */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-500">

                                        <ShoppingCart size={22} />

                                    </div>

                                    <span className="rounded-lg bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
                                        Active
                                    </span>

                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    Cart Items
                                </p>

                                <h2 className="mt-1 text-3xl font-bold">
                                    {stats.cartItems}
                                </h2>

                                <p className="mt-2 text-xs text-gray-400">
                                    Items in your cart
                                </p>

                            </div>


                            {/* WISHLIST */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500">

                                        <Heart size={22} />

                                    </div>

                                    <span className="rounded-lg bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">
                                        Coming Soon
                                    </span>

                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    Wishlist
                                </p>

                                <h2 className="mt-1 text-3xl font-bold">
                                    {stats.wishlistItems}
                                </h2>

                                <p className="mt-2 text-xs text-gray-400">
                                    Wishlist feature not implemented yet
                                </p>

                            </div>


                            {/* ACCOUNT */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex items-start justify-between">

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500">

                                        <User size={22} />

                                    </div>

                                    <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                        Active
                                    </span>

                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    Account
                                </p>

                                <h2 className="mt-1 text-lg font-bold">
                                    {user?.role || "USER"}
                                </h2>

                                <p className="mt-2 text-xs text-gray-400">
                                    Account status
                                </p>

                            </div>

                        </section>


                        {/* QUICK ACCESS */}

                        <section className="mb-8">

                            <div className="mb-5">

                                <h2 className="text-xl font-bold">
                                    Quick Access
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Navigate to your favorite sections
                                </p>

                            </div>


                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                                <Link
                                    to="/products"
                                    className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <ShoppingBag size={24} />

                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>

                                    <h3 className="mt-8 text-lg font-bold">
                                        Browse Products
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Explore our products and find something you love.
                                    </p>

                                </Link>


                                <Link
                                    to="/cart"
                                    className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-purple-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <ShoppingCart size={24} />

                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-purple-500 transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>

                                    <h3 className="mt-8 text-lg font-bold">
                                        My Cart
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">

                                        You currently have {stats.cartItems} item
                                        {stats.cartItems === 1 ? "" : "s"} in your cart.

                                    </p>

                                </Link>


                                <Link
                                    to="/orders"
                                    className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <Package size={24} />

                                        </div>

                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>

                                    <h3 className="mt-8 text-lg font-bold">
                                        My Orders
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">

                                        You have {stats.totalOrders} order
                                        {stats.totalOrders === 1 ? "" : "s"} in total.

                                    </p>

                                </Link>

                            </div>

                        </section>


                        {/* ACCOUNT + ORDERS */}

                        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

                                <div className="mb-6">

                                    <h2 className="text-lg font-bold">
                                        Account Overview
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Your account details
                                    </p>

                                </div>


                                <div className="mb-6 flex items-center gap-4">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

                                        <CircleUserRound size={34} />

                                    </div>

                                    <div>

                                        <h3 className="font-bold">
                                            {user?.name || "Customer"}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            {user?.email || "No email"}
                                        </p>

                                        <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                            ✓ Active
                                        </span>

                                    </div>

                                </div>


                                <div className="space-y-4 text-sm">

                                    <div className="flex justify-between border-b border-gray-100 pb-3">

                                        <span className="text-gray-500">
                                            Account Type
                                        </span>

                                        <span className="font-semibold">
                                            Customer
                                        </span>

                                    </div>


                                    <div className="flex justify-between border-b border-gray-100 pb-3">

                                        <span className="text-gray-500">
                                            Role
                                        </span>

                                        <span className="font-semibold">
                                            {user?.role || "USER"}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Email
                                        </span>

                                        <span className="max-w-[180px] truncate font-semibold">
                                            {user?.email || "-"}
                                        </span>

                                    </div>

                                </div>


                                <Link
                                    to="/profile"
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                                >

                                    View Full Profile

                                    <ArrowRight size={16} />

                                </Link>

                            </div>


                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-3">

                                <div className="mb-6 flex items-center justify-between">

                                    <div>

                                        <h2 className="text-lg font-bold">
                                            Recent Orders
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Your latest order activities
                                        </p>

                                    </div>


                                    <Link
                                        to="/orders"
                                        className="hidden rounded-lg border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 sm:block"
                                    >
                                        View All Orders
                                    </Link>

                                </div>


                                {stats.recentOrders.length === 0 && (

                                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-10">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">

                                            <Package size={26} />

                                        </div>

                                        <h3 className="mt-4 font-semibold text-gray-700">
                                            No orders yet
                                        </h3>

                                        <p className="mt-1 text-center text-sm text-gray-400">
                                            Your recent orders will appear here.
                                        </p>

                                        <Link
                                            to="/products"
                                            className="mt-4 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                                        >
                                            Start Shopping
                                        </Link>

                                    </div>

                                )}


                                {stats.recentOrders.length > 0 && (

                                    <div className="space-y-3">

                                        {stats.recentOrders.map((order) => (

                                            <div
                                                key={order._id}
                                                className="rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
                                            >

                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">

                                                            <Package size={20} />

                                                        </div>

                                                        <div>

                                                            <p className="text-sm font-semibold">

                                                                Order #
                                                                {order._id?.slice(-6).toUpperCase()}

                                                            </p>

                                                            <p className="text-xs text-gray-400">
                                                                {formatDate(order.createdAt)}
                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="flex items-center justify-between gap-4 sm:justify-end">

                                                        <span
                                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                order.status === "Delivered"
                                                                    ? "bg-emerald-50 text-emerald-600"
                                                                    : order.status === "Cancelled"
                                                                    ? "bg-red-50 text-red-600"
                                                                    : order.status === "Shipped"
                                                                    ? "bg-blue-50 text-blue-600"
                                                                    : order.status === "Processing"
                                                                    ? "bg-purple-50 text-purple-600"
                                                                    : "bg-orange-50 text-orange-600"
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>

                                                        <p className="text-sm font-bold">
                                                            ${Number(
                                                                order.totalAmount || 0
                                                            ).toFixed(2)}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="mt-3 border-t border-gray-100 pt-3">

                                                    <p className="text-xs text-gray-500">

                                                        {order.items?.length || 0}
                                                        {" "}
                                                        product
                                                        {order.items?.length === 1
                                                            ? ""
                                                            : "s"
                                                        }

                                                    </p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>

                        </section>


                        {/* PROMOTION */}

                        <section className="mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white p-6 sm:p-8">

                            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <Sparkles
                                            size={19}
                                            className="text-emerald-500"
                                        />

                                        <h2 className="font-bold text-emerald-600">
                                            Ready to shop? 🛍️
                                        </h2>

                                    </div>

                                    <p className="mt-2 text-sm text-gray-600">
                                        Discover our latest products and find something you love.
                                    </p>

                                </div>


                                <Link
                                    to="/products"
                                    className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
                                >

                                    Shop Now

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />

                                </Link>

                            </div>

                        </section>

                    </div>

                </main>

            </div>

        </div>

    );

}


export default UserDashboard;