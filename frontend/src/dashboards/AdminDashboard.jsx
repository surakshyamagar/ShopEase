import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingBag,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    ArrowRight,
    Plus,
    TrendingUp,
    CircleUserRound,
    Boxes,
    AlertTriangle,
    DollarSign,
} from "lucide-react";


function AdminDashboard() {

    const { user, logout } = useAuth();


    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">

            <div className="flex min-h-screen">


                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">


                    {/* Logo */}

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



                    {/* Navigation */}

                    <nav className="flex-1 px-4 py-6">


                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Administration
                        </p>


                        {/* Dashboard */}

                        <Link
                            to="/admin/dashboard"
                            className="group mb-2 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:translate-x-1"
                        >

                            <LayoutDashboard size={19} />

                            Dashboard

                        </Link>


                        {/* Products */}

                        <Link
                            to="/products"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Package size={19} />

                            Products

                        </Link>


                        {/* Categories */}

                        <Link
                            to="/categories"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Tags size={19} />

                            Categories

                        </Link>


                        {/* Orders */}

                        <Link
                            to="/admin/orders"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <ShoppingBag size={19} />

                            Orders

                        </Link>


                        {/* Users */}

                        <Link
                            to="/admin/users"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Users size={19} />

                            Customers

                        </Link>


                        <div className="my-6 border-t border-gray-100" />


                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Management
                        </p>


                        {/* Analytics */}

                        <Link
                            to="/admin/analytics"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <BarChart3 size={19} />

                            Analytics

                        </Link>


                        {/* Settings */}

                        <Link
                            to="/admin/settings"
                            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
                        >

                            <Settings size={19} />

                            Settings

                        </Link>

                    </nav>



                    {/* Admin Account */}

                    <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-5">

                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">

                            <CircleUserRound size={20} />

                        </div>


                        <p className="text-sm font-bold text-gray-800">
                            {user?.name || "Administrator"}
                        </p>


                        <p className="mt-1 truncate text-xs text-gray-500">
                            {user?.email || "admin@example.com"}
                        </p>


                        <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                            ADMIN
                        </span>

                    </div>



                    {/* Logout */}

                    <button
                        onClick={logout}
                        className="mx-4 mb-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >

                        <LogOut size={19} />

                        Logout

                    </button>

                </aside>



                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <main className="flex-1 overflow-hidden">


                    {/* Header */}

                    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">


                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                                Admin Dashboard
                            </p>

                        </div>


                        <div className="flex items-center gap-5">


                            {/* Notification */}

                            <button className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-600">

                                <Bell size={21} />

                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />

                            </button>



                            {/* Admin */}

                            <div className="flex items-center gap-3 border-l border-gray-200 pl-5">


                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

                                    <CircleUserRound size={23} />

                                </div>


                                <div className="hidden sm:block">

                                    <p className="text-sm font-semibold text-gray-800">
                                        {user?.name || "Administrator"}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Administrator
                                    </p>

                                </div>

                            </div>

                        </div>

                    </header>



                    {/* Dashboard Content */}

                    <div className="p-5 sm:p-8">


                        {/* =================================================
                            WELCOME
                        ================================================== */}

                        <section className="mb-8 flex items-center justify-between">


                            <div>

                                <p className="mb-2 text-sm font-semibold text-emerald-600">
                                    ADMIN CONTROL CENTER 👋
                                </p>


                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                                    Welcome back,

                                    <span className="block text-emerald-500">

                                        {user?.name || "Administrator"}

                                    </span>

                                </h1>


                                <p className="mt-2 text-gray-500">
                                    Manage your store, products, customers and orders from here.
                                </p>

                            </div>



                            <div className="hidden h-28 w-28 items-center justify-center rounded-full bg-emerald-50 md:flex">

                                <BarChart3
                                    size={55}
                                    strokeWidth={1.3}
                                    className="text-emerald-400"
                                />

                            </div>

                        </section>



                        {/* =================================================
                            STAT CARDS
                        ================================================== */}

                        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">


                            {/* Revenue */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">


                                <div className="flex items-start justify-between">


                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">

                                        <DollarSign size={22} />

                                    </div>


                                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                                        Revenue
                                    </span>

                                </div>


                                <p className="mt-5 text-sm text-gray-500">
                                    Total Revenue
                                </p>


                                <h2 className="mt-1 text-3xl font-bold">
                                    $0.00
                                </h2>


                                <p className="mt-2 text-xs text-gray-400">
                                    All time sales
                                </p>

                            </div>



                            {/* Orders */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">


                                <div className="flex items-start justify-between">


                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-500">

                                        <ShoppingBag size={22} />

                                    </div>


                                    <span className="rounded-lg bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
                                        Orders
                                    </span>

                                </div>


                                <p className="mt-5 text-sm text-gray-500">
                                    Total Orders
                                </p>


                                <h2 className="mt-1 text-3xl font-bold">
                                    0
                                </h2>


                                <p className="mt-2 text-xs text-gray-400">
                                    Customer orders
                                </p>

                            </div>



                            {/* Products */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">


                                <div className="flex items-start justify-between">


                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500">

                                        <Package size={22} />

                                    </div>


                                    <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                        Inventory
                                    </span>

                                </div>


                                <p className="mt-5 text-sm text-gray-500">
                                    Products
                                </p>


                                <h2 className="mt-1 text-3xl font-bold">
                                    0
                                </h2>


                                <p className="mt-2 text-xs text-gray-400">
                                    Products in store
                                </p>

                            </div>



                            {/* Customers */}

                            <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">


                                <div className="flex items-start justify-between">


                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">

                                        <Users size={22} />

                                    </div>


                                    <span className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                                        Customers
                                    </span>

                                </div>


                                <p className="mt-5 text-sm text-gray-500">
                                    Registered Users
                                </p>


                                <h2 className="mt-1 text-3xl font-bold">
                                    0
                                </h2>


                                <p className="mt-2 text-xs text-gray-400">
                                    Store customers
                                </p>

                            </div>

                        </section>



                        {/* =================================================
                            QUICK MANAGEMENT
                        ================================================== */}

                        <section className="mb-8">


                            <div className="mb-5 flex items-end justify-between">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        Quick Management
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage the most important parts of your store.
                                    </p>

                                </div>


                                <Link
                                    to="/products/add"
                                    className="hidden items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:flex"
                                >

                                    <Plus size={17} />

                                    Add Product

                                </Link>

                            </div>



                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">


                                {/* Products */}

                                <Link
                                    to="/products"
                                    className="group rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <Package size={24} />

                                        </div>


                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>


                                    <h3 className="mt-8 text-lg font-bold">
                                        Products
                                    </h3>


                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Add, edit, delete and manage your store products.
                                    </p>

                                </Link>



                                {/* Categories */}

                                <Link
                                    to="/categories"
                                    className="group rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-purple-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <Tags size={24} />

                                        </div>


                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-purple-500 transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>


                                    <h3 className="mt-8 text-lg font-bold">
                                        Categories
                                    </h3>


                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Organize and manage your product categories.
                                    </p>

                                </Link>



                                {/* Orders */}

                                <Link
                                    to="/admin/orders"
                                    className="group rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <ShoppingBag size={24} />

                                        </div>


                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>


                                    <h3 className="mt-8 text-lg font-bold">
                                        Orders
                                    </h3>


                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        View and manage customer orders and payments.
                                    </p>

                                </Link>



                                {/* Customers */}

                                <Link
                                    to="/admin/users"
                                    className="group rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

                                            <Users size={24} />

                                        </div>


                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 text-blue-500 transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white">

                                            <ArrowRight size={17} />

                                        </div>

                                    </div>


                                    <h3 className="mt-8 text-lg font-bold">
                                        Customers
                                    </h3>


                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        View and manage registered customers.
                                    </p>

                                </Link>

                            </div>

                        </section>



                        {/* =================================================
                            STORE + ADMIN INFORMATION
                        ================================================== */}

                        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">


                            {/* Store Overview */}

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-3">


                                <div className="mb-6 flex items-center justify-between">

                                    <div>

                                        <h2 className="text-lg font-bold">
                                            Store Overview
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Current store status
                                        </p>

                                    </div>


                                    <TrendingUp
                                        size={21}
                                        className="text-emerald-500"
                                    />

                                </div>



                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


                                    {/* Inventory */}

                                    <div className="rounded-xl bg-gray-50 p-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-500">

                                                <Boxes size={20} />

                                            </div>


                                            <div>

                                                <p className="text-sm text-gray-500">
                                                    Inventory
                                                </p>

                                                <p className="font-bold">
                                                    No data yet
                                                </p>

                                            </div>

                                        </div>


                                        <p className="mt-4 text-xs text-gray-400">
                                            Product inventory will appear here.
                                        </p>

                                    </div>



                                    {/* Low Stock */}

                                    <div className="rounded-xl bg-gray-50 p-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-500">

                                                <AlertTriangle size={20} />

                                            </div>


                                            <div>

                                                <p className="text-sm text-gray-500">
                                                    Low Stock
                                                </p>

                                                <p className="font-bold">
                                                    0 products
                                                </p>

                                            </div>

                                        </div>


                                        <p className="mt-4 text-xs text-gray-400">
                                            Low-stock products will appear here.
                                        </p>

                                    </div>

                                </div>

                            </div>



                            {/* Admin Information */}

                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">


                                <div className="mb-6">

                                    <h2 className="text-lg font-bold">
                                        Admin Account
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Your administrator information
                                    </p>

                                </div>


                                <div className="flex items-center gap-4">


                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

                                        <CircleUserRound size={34} />

                                    </div>


                                    <div className="min-w-0">

                                        <h3 className="truncate font-bold">
                                            {user?.name || "Administrator"}
                                        </h3>


                                        <p className="truncate text-sm text-gray-500">
                                            {user?.email || "No email"}
                                        </p>

                                    </div>

                                </div>



                                <div className="mt-6 space-y-4 text-sm">


                                    <div className="flex justify-between border-b border-gray-100 pb-3">

                                        <span className="text-gray-500">
                                            Account Type
                                        </span>

                                        <span className="font-semibold">
                                            Administrator
                                        </span>

                                    </div>


                                    <div className="flex justify-between border-b border-gray-100 pb-3">

                                        <span className="text-gray-500">
                                            Role
                                        </span>

                                        <span className="font-semibold text-emerald-600">
                                            {user?.role || "ADMIN"}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-gray-500">
                                            Email
                                        </span>

                                        <span className="max-w-[170px] truncate font-semibold">
                                            {user?.email || "-"}
                                        </span>

                                    </div>

                                </div>



                                <Link
                                    to="/admin/settings"
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                                >

                                    Admin Settings

                                    <ArrowRight size={16} />

                                </Link>

                            </div>

                        </section>



                        {/* =================================================
                            BOTTOM MESSAGE
                        ================================================== */}

                        <section className="mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white p-6 sm:p-8">


                            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">


                                <div>

                                    <div className="flex items-center gap-2">

                                        <TrendingUp
                                            size={19}
                                            className="text-emerald-500"
                                        />

                                        <h2 className="font-bold text-emerald-600">
                                            Store Management
                                        </h2>

                                    </div>


                                    <p className="mt-2 text-sm text-gray-600">
                                        Keep your products, categories, customers and orders organized.
                                    </p>

                                </div>



                                <Link
                                    to="/products"
                                    className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
                                >

                                    Manage Store

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


export default AdminDashboard;