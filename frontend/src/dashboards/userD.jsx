// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // import {
// //     ShoppingBag,
// //     ShoppingCart,
// //     Package,
// //     User,
// //     Heart,
// //     Settings,
// //     LogOut,
// //     ArrowRight,
// //     Bell,
// //     Sparkles,
// //     CircleUserRound,
// //     LayoutDashboard,
// // } from "lucide-react";


// // function UserDashboard() {

// //    const { user, logout } = useAuth();


// //     return (
// //         <div className="min-h-screen bg-gray-50 text-gray-900">

// //             <div className="flex min-h-screen">


// //                 {/* =====================================================
// //                     SIDEBAR
// //                 ====================================================== */}

// //                 <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">

// //                     {/* Logo */}

// //                     <div className="flex h-20 items-center px-6">

// //                         <div className="flex items-center gap-2">

// //                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">

// //                                 <ShoppingBag size={22} />

// //                             </div>

// //                             <h1 className="text-xl font-bold tracking-tight">

// //                                 Shop
// //                                 <span className="text-emerald-500">
// //                                     Ease
// //                                 </span>

// //                             </h1>

// //                         </div>

// //                     </div>


// //                     {/* Navigation */}

// //                     <nav className="flex-1 px-4 py-6">

// //                         <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                             Menu
// //                         </p>


// //                         {/* Dashboard */}

// //                         <Link
// //                             to="/customer/dashboard"
// //                             className="group mb-2 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600 transition-all duration-200 hover:translate-x-1"
// //                         >

// //                             <LayoutDashboard size={19} />

// //                             Dashboard

// //                         </Link>


// //                         {/* Products */}

// //                         <Link
// //                             to="/products"
// //                             className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <Package size={19} />

// //                             Products

// //                         </Link>


// //                         {/* Cart */}

// //                         <Link
// //                             to="/cart"
// //                             className="group mb-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <span className="flex items-center gap-3">

// //                                 <ShoppingCart size={19} />

// //                                 My Cart

// //                             </span>


// //                             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">

// //                                 0

// //                             </span>

// //                         </Link>


// //                         {/* Orders */}

// //                         <Link
// //                             to="/orders"
// //                             className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <Package size={19} />

// //                             My Orders

// //                         </Link>


// //                         {/* Wishlist */}

// //                         <Link
// //                             to="/wishlist"
// //                             className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <Heart size={19} />

// //                             Wishlist

// //                         </Link>


// //                         <div className="my-6 border-t border-gray-100" />


// //                         <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
// //                             Account
// //                         </p>


// //                         {/* Profile */}

// //                         <Link
// //                             to="/profile"
// //                             className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <User size={19} />

// //                             Profile

// //                         </Link>


// //                         {/* Settings */}

// //                         <Link
// //                             to="/settings"
// //                             className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:translate-x-1 hover:bg-gray-50 hover:text-emerald-600"
// //                         >

// //                             <Settings size={19} />

// //                             Settings

// //                         </Link>

// //                     </nav>


// //                     {/* Upgrade Card */}

// //                     <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-5">

// //                         <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">

// //                             <Sparkles size={20} />

// //                         </div>


// //                         <h3 className="text-sm font-bold text-gray-800">
// //                             Upgrade your shopping
// //                         </h3>

// //                         <p className="mt-1 text-xs leading-5 text-gray-500">
// //                             Get exclusive offers and faster checkout.
// //                         </p>


// //                         <button className="mt-4 w-full rounded-lg bg-emerald-500 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 hover:shadow-md">
// //                             Explore Premium
// //                         </button>

// //                     </div>


// //                     {/* Logout */}

// //                     <button
// //                         onClick={logout}
// //                         className="mx-4 mb-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
// //                     >

// //                         <LogOut size={19} />

// //                         Logout

// //                     </button>

// //                 </aside>


// //                 {/* =====================================================
// //                     MAIN CONTENT
// //                 ====================================================== */}

// //                 <main className="flex-1 overflow-hidden">


// //                     {/* Top Header */}

// //                     <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">

// //                         <div>

// //                             <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
// //                                 Customer Dashboard
// //                             </p>

// //                         </div>


// //                         <div className="flex items-center gap-5">

// //                             {/* Notification */}

// //                             <button className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-600">

// //                                 <Bell size={21} />

// //                                 <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />

// //                             </button>


// //                             {/* User */}

// //                             <div className="flex items-center gap-3 border-l border-gray-200 pl-5">

// //                                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

// //                                     <CircleUserRound size={23} />

// //                                 </div>


// //                                 <div className="hidden sm:block">

// //                                     <p className="text-sm font-semibold text-gray-800">
// //                                         {user?.name || "User"}
// //                                     </p>

// //                                     <p className="text-xs text-gray-500">
// //                                         Customer
// //                                     </p>

// //                                 </div>

// //                             </div>

// //                         </div>

// //                     </header>


// //                     {/* Dashboard Content */}

// //                     <div className="p-5 sm:p-8">


// //                         {/* Welcome Section */}

// //                         <section className="mb-8 flex items-center justify-between">

// //                             <div>

// //                                 <p className="mb-2 text-sm font-semibold text-emerald-600">
// //                                     GOOD TO SEE YOU AGAIN 👋
// //                                 </p>

// //                                 <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

// //                                     Welcome back,

// //                                     <span className="block text-emerald-500">

// //                                         {user?.name || "Customer"}

// //                                     </span>

// //                                 </h1>

// //                                 <p className="mt-2 text-gray-500">
// //                                     Here's what's happening with your account today.
// //                                 </p>

// //                             </div>


// //                             {/* Decorative Icon */}

// //                             <div className="hidden h-28 w-28 items-center justify-center rounded-full bg-emerald-50 md:flex">

// //                                 <ShoppingBag
// //                                     size={55}
// //                                     strokeWidth={1.3}
// //                                     className="text-emerald-400"
// //                                 />

// //                             </div>

// //                         </section>


// //                         {/* =================================================
// //                             STAT CARDS
// //                         ================================================== */}

// //                         <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">


// //                             {/* Orders */}

// //                             <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// //                                 <div className="flex items-start justify-between">

// //                                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">

// //                                         <Package size={22} />

// //                                     </div>

// //                                     <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
// //                                         +20%
// //                                     </span>

// //                                 </div>


// //                                 <p className="mt-5 text-sm text-gray-500">
// //                                     Total Orders
// //                                 </p>

// //                                 <h2 className="mt-1 text-3xl font-bold">
// //                                     0
// //                                 </h2>

// //                                 <p className="mt-2 text-xs text-gray-400">
// //                                     All time orders
// //                                 </p>

// //                             </div>


// //                             {/* Cart */}

// //                             <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// //                                 <div className="flex items-start justify-between">

// //                                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-500">

// //                                         <ShoppingCart size={22} />

// //                                     </div>

// //                                     <span className="rounded-lg bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
// //                                         Active
// //                                     </span>

// //                                 </div>


// //                                 <p className="mt-5 text-sm text-gray-500">
// //                                     Cart Items
// //                                 </p>

// //                                 <h2 className="mt-1 text-3xl font-bold">
// //                                     0
// //                                 </h2>

// //                                 <p className="mt-2 text-xs text-gray-400">
// //                                     Items in your cart
// //                                 </p>

// //                             </div>


// //                             {/* Wishlist */}

// //                             <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// //                                 <div className="flex items-start justify-between">

// //                                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500">

// //                                         <Heart size={22} />

// //                                     </div>

// //                                     <span className="rounded-lg bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">
// //                                         Saved
// //                                     </span>

// //                                 </div>


// //                                 <p className="mt-5 text-sm text-gray-500">
// //                                     Wishlist
// //                                 </p>

// //                                 <h2 className="mt-1 text-3xl font-bold">
// //                                     0
// //                                 </h2>

// //                                 <p className="mt-2 text-xs text-gray-400">
// //                                     Saved products
// //                                 </p>

// //                             </div>


// //                             {/* Account */}

// //                             <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// //                                 <div className="flex items-start justify-between">

// //                                     <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500">

// //                                         <User size={22} />

// //                                     </div>

// //                                     <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
// //                                         Active
// //                                     </span>

// //                                 </div>


// //                                 <p className="mt-5 text-sm text-gray-500">
// //                                     Account
// //                                 </p>

// //                                 <h2 className="mt-1 text-lg font-bold">
// //                                     {user?.role || "USER"}
// //                                 </h2>

// //                                 <p className="mt-2 text-xs text-gray-400">
// //                                     Account status
// //                                 </p>

// //                             </div>

// //                         </section>


// //                         {/* =================================================
// //                             QUICK ACCESS
// //                         ================================================== */}

// //                         <section className="mb-8">

// //                             <div className="mb-5">

// //                                 <h2 className="text-xl font-bold">
// //                                     Quick Access
// //                                 </h2>

// //                                 <p className="mt-1 text-sm text-gray-500">
// //                                     Navigate to your favorite sections
// //                                 </p>

// //                             </div>


// //                             <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


// //                                 {/* Products */}

// //                                 <Link
// //                                     to="/products"
// //                                     className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
// //                                 >

// //                                     <div className="flex items-center justify-between">

// //                                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

// //                                             <ShoppingBag size={24} />

// //                                         </div>


// //                                         <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">

// //                                             <ArrowRight size={17} />

// //                                         </div>

// //                                     </div>


// //                                     <h3 className="mt-8 text-lg font-bold">
// //                                         Browse Products
// //                                     </h3>

// //                                     <p className="mt-2 text-sm leading-6 text-gray-500">
// //                                         Explore our products and find something you love.
// //                                     </p>

// //                                 </Link>


// //                                 {/* Cart */}

// //                                 <Link
// //                                     to="/cart"
// //                                     className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
// //                                 >

// //                                     <div className="flex items-center justify-between">

// //                                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-purple-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

// //                                             <ShoppingCart size={24} />

// //                                         </div>


// //                                         <div className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-purple-500 transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white">

// //                                             <ArrowRight size={17} />

// //                                         </div>

// //                                     </div>


// //                                     <h3 className="mt-8 text-lg font-bold">
// //                                         My Cart
// //                                     </h3>

// //                                     <p className="mt-2 text-sm leading-6 text-gray-500">
// //                                         Review your selected products and proceed to checkout.
// //                                     </p>

// //                                 </Link>


// //                                 {/* Orders */}

// //                                 <Link
// //                                     to="/orders"
// //                                     className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
// //                                 >

// //                                     <div className="flex items-center justify-between">

// //                                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm transition-transform duration-300 group-hover:scale-110">

// //                                             <Package size={24} />

// //                                         </div>


// //                                         <div className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">

// //                                             <ArrowRight size={17} />

// //                                         </div>

// //                                     </div>


// //                                     <h3 className="mt-8 text-lg font-bold">
// //                                         My Orders
// //                                     </h3>

// //                                     <p className="mt-2 text-sm leading-6 text-gray-500">
// //                                         Track and manage all your previous orders.
// //                                     </p>

// //                                 </Link>

// //                             </div>

// //                         </section>


// //                         {/* =================================================
// //                             ACCOUNT + RECENT ORDERS
// //                         ================================================== */}

// //                         <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">


// //                             {/* Account Overview */}

// //                             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

// //                                 <div className="mb-6">

// //                                     <h2 className="text-lg font-bold">
// //                                         Account Overview
// //                                     </h2>

// //                                     <p className="mt-1 text-sm text-gray-500">
// //                                         Your account details
// //                                     </p>

// //                                 </div>


// //                                 <div className="mb-6 flex items-center gap-4">

// //                                     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

// //                                         <CircleUserRound size={34} />

// //                                     </div>


// //                                     <div>

// //                                         <h3 className="font-bold">
// //                                             {user?.name || "Customer"}
// //                                         </h3>

// //                                         <p className="text-sm text-gray-500">
// //                                             {user?.email || "No email"}
// //                                         </p>

// //                                         <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
// //                                             ✓ Verified
// //                                         </span>

// //                                     </div>

// //                                 </div>


// //                                 <div className="space-y-4 text-sm">

// //                                     <div className="flex justify-between border-b border-gray-100 pb-3">

// //                                         <span className="text-gray-500">
// //                                             Account Type
// //                                         </span>

// //                                         <span className="font-semibold">
// //                                             Customer
// //                                         </span>

// //                                     </div>


// //                                     <div className="flex justify-between border-b border-gray-100 pb-3">

// //                                         <span className="text-gray-500">
// //                                             Role
// //                                         </span>

// //                                         <span className="font-semibold">
// //                                             {user?.role || "USER"}
// //                                         </span>

// //                                     </div>


// //                                     <div className="flex justify-between">

// //                                         <span className="text-gray-500">
// //                                             Email
// //                                         </span>

// //                                         <span className="max-w-[180px] truncate font-semibold">
// //                                             {user?.email || "-"}
// //                                         </span>

// //                                     </div>

// //                                 </div>


// //                                 <Link
// //                                     to="/profile"
// //                                     className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 py-3 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
// //                                 >

// //                                     View Full Profile

// //                                     <ArrowRight size={16} />

// //                                 </Link>

// //                             </div>


// //                             {/* Recent Orders */}

// //                             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-3">

// //                                 <div className="mb-6 flex items-center justify-between">

// //                                     <div>

// //                                         <h2 className="text-lg font-bold">
// //                                             Recent Orders
// //                                         </h2>

// //                                         <p className="mt-1 text-sm text-gray-500">
// //                                             Your latest order activities
// //                                         </p>

// //                                     </div>


// //                                     <Link
// //                                         to="/orders"
// //                                         className="hidden rounded-lg border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 sm:block"
// //                                     >
// //                                         View All Orders
// //                                     </Link>

// //                                 </div>


// //                                 {/* Empty state for now */}

// //                                 <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-10">

// //                                     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">

// //                                         <Package size={26} />

// //                                     </div>

// //                                     <h3 className="mt-4 font-semibold text-gray-700">
// //                                         No orders yet
// //                                     </h3>

// //                                     <p className="mt-1 text-center text-sm text-gray-400">
// //                                         Your recent orders will appear here.
// //                                     </p>

// //                                     <Link
// //                                         to="/products"
// //                                         className="mt-4 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
// //                                     >
// //                                         Start Shopping
// //                                     </Link>

// //                                 </div>

// //                             </div>

// //                         </section>


// //                         {/* =================================================
// //                             PROMOTION
// //                         ================================================== */}

// //                         <section className="mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white p-6 sm:p-8">

// //                             <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

// //                                 <div>

// //                                     <div className="flex items-center gap-2">

// //                                         <Sparkles
// //                                             size={19}
// //                                             className="text-emerald-500"
// //                                         />

// //                                         <h2 className="font-bold text-emerald-600">
// //                                             Special Offer for You! 🎉
// //                                         </h2>

// //                                     </div>


// //                                     <p className="mt-2 text-sm text-gray-600">
// //                                         Get exciting deals on your next purchase.
// //                                     </p>

// //                                 </div>


// //                                 <Link
// //                                     to="/products"
// //                                     className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg"
// //                                 >

// //                                     Shop Now

// //                                     <ArrowRight
// //                                         size={17}
// //                                         className="transition-transform duration-300 group-hover:translate-x-1"
// //                                     />

// //                                 </Link>

// //                             </div>

// //                         </section>


// //                     </div>

// //                 </main>

// //             </div>

// //         </div>
// //     );
// // }


// // export default UserDashboard;

// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //     ShoppingBag,
// //     ShoppingCart,
// //     User,
// //     Bell,
// //     Search,
// //     ArrowRight,
// //     Package,
// // } from "lucide-react";

// // import { useAuth } from "../context/AuthContext";
// // import { getCategories } from "../services/categoryService";
// // import { getProducts } from "../services/productService";

// // function UserDashboard() {

// //     const { user, logout } = useAuth();

// //     const [categories, setCategories] = useState([]);
// //     const [products, setProducts] = useState([]);

// //     const [selectedCategory, setSelectedCategory] = useState(null);

// //     const [loading, setLoading] = useState(true);

// //     const [search, setSearch] = useState("");


// //     // =========================================================
// //     // LOAD CATEGORIES + PRODUCTS
// //     // =========================================================

// //     useEffect(() => {

// //         const loadData = async () => {

// //             try {

// //                 const [categoryData, productData] =
// //                     await Promise.all([
// //                         getCategories(),
// //                         getProducts(),
// //                     ]);

// //                 setCategories(categoryData);
// //                 setProducts(productData);

// //             } catch (error) {

// //                 console.log(error);

// //             } finally {

// //                 setLoading(false);

// //             }
// //         };

// //         loadData();

// //     }, []);


// //     // =========================================================
// //     // FILTER PRODUCTS
// //     // =========================================================

// //     const filteredProducts = products.filter((product) => {

// //         // Category filter
// //         const categoryMatch =
// //             selectedCategory === null ||
// //             product.category?._id === selectedCategory;

// //         // Search filter
// //         const searchMatch =
// //             product.name
// //                 ?.toLowerCase()
// //                 .includes(search.toLowerCase());

// //         return categoryMatch && searchMatch;

// //     });


// //     // =========================================================
// //     // CATEGORY SELECT
// //     // =========================================================

// //     const handleCategoryClick = (categoryId) => {

// //         setSelectedCategory(categoryId);

// //     };


// //     // =========================================================
// //     // GET SELECTED CATEGORY NAME
// //     // =========================================================

// //     const selectedCategoryName =
// //         selectedCategory === null
// //             ? "All Products"
// //             : categories.find(
// //                 (category) => category._id === selectedCategory
// //             )?.name || "Products";


// //     return (

// //         <div className="min-h-screen bg-gray-50 text-gray-900">


// //             {/* =====================================================
// //                 NAVBAR
// //             ====================================================== */}

// //             <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

// //                 <div className="mx-auto max-w-7xl px-5 sm:px-8">

// //                     <div className="flex h-16 items-center justify-between">


// //                         {/* LOGO */}

// //                         <Link
// //                             to="/customer/dashboard"
// //                             className="flex items-center gap-3"
// //                         >

// //                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">

// //                                 <ShoppingBag size={22} />

// //                             </div>


// //                             <div>

// //                                 <h1 className="text-lg font-bold">
// //                                     Shop
// //                                     <span className="text-emerald-600">
// //                                         Ease
// //                                     </span>
// //                                 </h1>

// //                                 <p className="text-xs text-gray-400">
// //                                     Online Store
// //                                 </p>

// //                             </div>

// //                         </Link>


// //                         {/* SEARCH */}

// //                         <div className="hidden w-96 md:block">

// //                             <div className="relative">

// //                                 <Search
// //                                     size={18}
// //                                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
// //                                 />

// //                                 <input
// //                                     type="text"
// //                                     placeholder="Search products..."
// //                                     value={search}
// //                                     onChange={(e) =>
// //                                         setSearch(e.target.value)
// //                                     }
// //                                     className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
// //                                 />

// //                             </div>

// //                         </div>


// //                         {/* RIGHT SIDE */}

// //                         <div className="flex items-center gap-3">


// //                             {/* Notification */}

// //                             <button
// //                                 type="button"
// //                                 className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-600"
// //                             >

// //                                 <Bell size={20} />

// //                                 <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />

// //                             </button>


// //                             {/* Cart */}

// //                             <Link
// //                                 to="/cart"
// //                                 className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-600"
// //                             >

// //                                 <ShoppingCart size={20} />

// //                                 <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
// //                                     0
// //                                 </span>

// //                             </Link>


// //                             {/* Profile */}

// //                             <div className="hidden items-center gap-2 border-l border-gray-200 pl-3 sm:flex">

// //                                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">

// //                                     <User size={19} />

// //                                 </div>


// //                                 <div>

// //                                     <p className="text-sm font-semibold text-gray-800">
// //                                         {user?.name || "Customer"}
// //                                     </p>

// //                                     <p className="text-xs text-gray-400">
// //                                         Customer
// //                                     </p>

// //                                 </div>

// //                             </div>


// //                             {/* Logout */}

// //                             <button
// //                                 onClick={logout}
// //                                 className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 lg:block"
// //                             >
// //                                 Logout
// //                             </button>

// //                         </div>

// //                     </div>

// //                 </div>

// //             </header>


// //             {/* =====================================================
// //                 MAIN
// //             ====================================================== */}

// //             <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">


// //                 {/* =================================================
// //                     WELCOME / HERO
// //                 ================================================== */}

// //                 <section className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500">

// //                     <div className="flex flex-col items-start justify-between gap-8 px-7 py-10 sm:px-10 lg:flex-row lg:items-center">

// //                         <div className="max-w-2xl">

// //                             <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-100">
// //                                 Welcome back 👋
// //                             </p>

// //                             <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">

// //                                 Hello, {user?.name || "Customer"}!

// //                             </h1>

// //                             <p className="mt-3 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">

// //                                 Discover amazing products, explore our
// //                                 categories, and find something you'll love.

// //                             </p>


// //                             <Link
// //                                 to="/products"
// //                                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
// //                             >

// //                                 Shop Now

// //                                 <ArrowRight size={17} />

// //                             </Link>

// //                         </div>


// //                         <div className="hidden h-36 w-36 items-center justify-center rounded-full bg-white/10 lg:flex">

// //                             <ShoppingBag
// //                                 size={75}
// //                                 strokeWidth={1.2}
// //                                 className="text-white"
// //                             />

// //                         </div>

// //                     </div>

// //                 </section>


// //                 {/* =================================================
// //                     CATEGORIES
// //                 ================================================== */}

// //                 <section className="mb-10">


// //                     <div className="mb-5 flex items-end justify-between">

// //                         <div>

// //                             <h2 className="text-xl font-bold">
// //                                 Shop by Category
// //                             </h2>

// //                             <p className="mt-1 text-sm text-gray-500">
// //                                 Find products you are looking for
// //                             </p>

// //                         </div>

// //                     </div>


// //                     <div className="flex gap-5 overflow-x-auto pb-3">


// //                         {/* ALL */}

// //                         <button
// //                             type="button"
// //                             onClick={() =>
// //                                 handleCategoryClick(null)
// //                             }
// //                             className="group flex min-w-[90px] flex-col items-center"
// //                         >

// //                             <div
// //                                 className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-200 ${
// //                                     selectedCategory === null
// //                                         ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md"
// //                                         : "border-gray-100 bg-white text-gray-500 hover:border-emerald-300 hover:text-emerald-500"
// //                                 }`}
// //                             >

// //                                 <ShoppingBag size={27} />

// //                             </div>


// //                             <span
// //                                 className={`mt-3 text-sm font-semibold ${
// //                                     selectedCategory === null
// //                                         ? "text-emerald-600"
// //                                         : "text-gray-600"
// //                                 }`}
// //                             >
// //                                 All
// //                             </span>

// //                         </button>


// //                         {/* DATABASE CATEGORIES */}

// //                         {categories.map((category) => (

// //                             <button
// //                                 key={category._id}
// //                                 type="button"
// //                                 onClick={() =>
// //                                     handleCategoryClick(category._id)
// //                                 }
// //                                 className="group flex min-w-[90px] flex-col items-center"
// //                             >

// //                                 <div
// //                                     className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-200 ${
// //                                         selectedCategory === category._id
// //                                             ? "border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md"
// //                                             : "border-gray-100 bg-white text-gray-500 hover:border-emerald-300 hover:text-emerald-500"
// //                                     }`}
// //                                 >

// //                                     <Package size={27} />

// //                                 </div>


// //                                 <span
// //                                     className={`mt-3 max-w-[90px] truncate text-center text-sm font-semibold ${
// //                                         selectedCategory === category._id
// //                                             ? "text-emerald-600"
// //                                             : "text-gray-600"
// //                                     }`}
// //                                 >
// //                                     {category.name}
// //                                 </span>

// //                             </button>

// //                         ))}

// //                     </div>

// //                 </section>


// //                 {/* =================================================
// //                     PRODUCTS
// //                 ================================================== */}

// //                 <section>


// //                     <div className="mb-6 flex items-end justify-between">

// //                         <div>

// //                             <p className="mb-1 text-sm font-semibold text-emerald-600">
// //                                 OUR COLLECTION
// //                             </p>

// //                             <h2 className="text-2xl font-bold">
// //                                 {selectedCategoryName}
// //                             </h2>

// //                         </div>


// //                         <Link
// //                             to="/products"
// //                             className="hidden items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:flex"
// //                         >

// //                             View All

// //                             <ArrowRight size={16} />

// //                         </Link>

// //                     </div>


// //                     {/* LOADING */}

// //                     {loading && (

// //                         <div className="flex min-h-60 items-center justify-center">

// //                             <p className="text-sm text-gray-500">
// //                                 Loading products...
// //                             </p>

// //                         </div>

// //                     )}


// //                     {/* NO PRODUCTS */}

// //                     {!loading && filteredProducts.length === 0 && (

// //                         <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">

// //                             <Package
// //                                 size={40}
// //                                 className="mx-auto text-gray-300"
// //                             />

// //                             <h3 className="mt-4 font-semibold text-gray-700">
// //                                 No products found
// //                             </h3>

// //                             <p className="mt-1 text-sm text-gray-400">
// //                                 Try another category or search.
// //                             </p>

// //                             <button
// //                                 type="button"
// //                                 onClick={() => {
// //                                     setSelectedCategory(null);
// //                                     setSearch("");
// //                                 }}
// //                                 className="mt-5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
// //                             >
// //                                 Show All Products
// //                             </button>

// //                         </div>

// //                     )}


// //                     {/* PRODUCT GRID */}

// //                     {!loading && filteredProducts.length > 0 && (

// //                         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// //                             {filteredProducts.map((product) => (

// //                                 <div
// //                                     key={product._id}
// //                                     className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
// //                                 >


// //                                     {/* IMAGE */}

// //                                     <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50">

// //                                         {product.image ? (

// //                                             <img
// //                                                 src={product.image}
// //                                                 alt={product.name}
// //                                                 className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
// //                                             />

// //                                         ) : (

// //                                             <ShoppingBag
// //                                                 size={55}
// //                                                 strokeWidth={1.3}
// //                                                 className="text-gray-300"
// //                                             />

// //                                         )}


// //                                         {/* STOCK */}

// //                                         {product.stock <= 0 && (

// //                                             <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
// //                                                 Out of Stock
// //                                             </span>

// //                                         )}

// //                                     </div>


// //                                     {/* PRODUCT INFO */}

// //                                     <div className="p-5">


// //                                         <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
// //                                             {product.category?.name || "Product"}
// //                                         </p>


// //                                         <h3 className="mt-2 truncate text-base font-bold text-gray-900">
// //                                             {product.name}
// //                                         </h3>


// //                                         <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
// //                                             {product.description || "No description available."}
// //                                         </p>


// //                                         <div className="mt-5 flex items-center justify-between">


// //                                             <div>

// //                                                 <p className="text-lg font-bold text-gray-900">
// //                                                     Rs. {product.price}
// //                                                 </p>

// //                                                 <p className="text-xs text-gray-400">
// //                                                     {product.stock > 0
// //                                                         ? `${product.stock} available`
// //                                                         : "Currently unavailable"}
// //                                                 </p>

// //                                             </div>


// //                                             <button
// //                                                 type="button"
// //                                                 disabled={product.stock <= 0}
// //                                                 className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
// //                                             >

// //                                                 <ShoppingCart size={15} />

// //                                                 Add

// //                                             </button>

// //                                         </div>

// //                                     </div>

// //                                 </div>

// //                             ))}

// //                         </div>

// //                     )}

// //                 </section>


// //                 {/* =================================================
// //                     BOTTOM PROMOTION
// //                 ================================================== */}

// //                 <section className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">

// //                     <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

// //                         <div>

// //                             <h2 className="text-xl font-bold text-gray-900">
// //                                 Ready to find your next favorite product?
// //                             </h2>

// //                             <p className="mt-2 text-sm text-gray-500">
// //                                 Browse our complete collection and discover
// //                                 something special.
// //                             </p>

// //                         </div>


// //                         <Link
// //                             to="/products"
// //                             className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
// //                         >

// //                             Explore Products

// //                             <ArrowRight size={17} />

// //                         </Link>

// //                     </div>

// //                 </section>


// //             </main>

// //         </div>

// //     );
// // }

// // export default UserDashboard;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import { getCart } from "../services/cartService";
// import { getMyOrders } from "../services/orderService";

// function UserDashboard() {

//     const { user, logout } = useAuth();

//     const [cart, setCart] = useState(null);
//     const [orders, setOrders] = useState([]);

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");


//     // ==========================================
//     // LOAD DASHBOARD DATA
//     // ==========================================

//     useEffect(() => {

//         const loadDashboard = async () => {

//             try {

//                 setLoading(true);
//                 setError("");

//                 // Get logged-in user's cart
//                 const cartData = await getCart();
//                 setCart(cartData);

//                 // Get logged-in user's orders
//                 const orderData = await getMyOrders();
//                 setOrders(orderData);

//             } catch (error) {

//                 console.log(error.response?.data || error.message);

//                 setError(
//                     error.response?.data?.message ||
//                     "Failed to load dashboard"
//                 );

//             } finally {

//                 setLoading(false);

//             }
//         };

//         loadDashboard();

//     }, []);


//     // ==========================================
//     // CART ITEM COUNT
//     // ==========================================

//     const cartItemCount =
//         cart?.items?.reduce(
//             (total, item) => total + item.quantity,
//             0
//         ) || 0;


//     // ==========================================
//     // RECENT ORDERS
//     // ==========================================

//     const recentOrders = orders.slice(0, 5);


//     // ==========================================
//     // LOADING
//     // ==========================================

//     if (loading) {
//         return (
//             <div className="p-8">
//                 <p>Loading dashboard...</p>
//             </div>
//         );
//     }


//     // ==========================================
//     // ERROR
//     // ==========================================

//     if (error) {
//         return (
//             <div className="p-8">

//                 <p className="text-red-500">
//                     {error}
//                 </p>

//                 <button
//                     onClick={() => window.location.reload()}
//                     className="mt-3 rounded bg-gray-800 px-4 py-2 text-white"
//                 >
//                     Try Again
//                 </button>

//             </div>
//         );
//     }


//     // ==========================================
//     // DASHBOARD
//     // ==========================================

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">

//             {/* ==============================
//                 HEADER
//             ============================== */}

//             <div className="mb-6 flex items-center justify-between">

//                 <div>

//                     <h1 className="text-2xl font-bold">
//                         User Dashboard
//                     </h1>

//                     <p className="text-gray-600">
//                         Welcome, {user?.name || "User"}
//                     </p>

//                 </div>

//                 <button
//                     onClick={logout}
//                     className="rounded bg-red-500 px-4 py-2 text-white"
//                 >
//                     Logout
//                 </button>

//             </div>


//             {/* ==============================
//                 USER INFORMATION
//             ============================== */}

//             <div className="mb-6 rounded bg-white p-5">

//                 <h2 className="mb-3 text-lg font-bold">
//                     My Account
//                 </h2>

//                 <p>
//                     <strong>Name:</strong>{" "}
//                     {user?.name}
//                 </p>

//                 <p>
//                     <strong>Email:</strong>{" "}
//                     {user?.email}
//                 </p>

//                 <p>
//                     <strong>Role:</strong>{" "}
//                     {user?.role}
//                 </p>

//             </div>


//             {/* ==============================
//                 NAVIGATION
//             ============================== */}

//             <div className="mb-6 rounded bg-white p-5">

//                 <h2 className="mb-3 text-lg font-bold">
//                     Navigation
//                 </h2>

//                 <div className="flex gap-4">

//                     <Link
//                         to="/customer/dashboard"
//                         className="text-blue-600"
//                     >
//                         Dashboard
//                     </Link>

//                     <Link
//                         to="/shop"
//                         className="text-blue-600"
//                     >
//                         Shop
//                     </Link>

//                     <Link
//                         to="/cart"
//                         className="text-blue-600"
//                     >
//                         Cart
//                     </Link>

//                     <Link
//                         to="/orders"
//                         className="text-blue-600"
//                     >
//                         Orders
//                     </Link>

//                 </div>

//             </div>


//             {/* ==============================
//                 SUMMARY
//             ============================== */}

//             <div className="mb-6 grid grid-cols-2 gap-4">

//                 <div className="rounded bg-white p-5">

//                     <h2 className="text-lg font-bold">
//                         Cart
//                     </h2>

//                     <p className="mt-2 text-2xl">
//                         {cartItemCount}
//                     </p>

//                     <p className="text-gray-500">
//                         Items in cart
//                     </p>

//                     <Link
//                         to="/cart"
//                         className="mt-3 inline-block text-blue-600"
//                     >
//                         View Cart
//                     </Link>

//                 </div>


//                 <div className="rounded bg-white p-5">

//                     <h2 className="text-lg font-bold">
//                         Orders
//                     </h2>

//                     <p className="mt-2 text-2xl">
//                         {orders.length}
//                     </p>

//                     <p className="text-gray-500">
//                         Total orders
//                     </p>

//                     <Link
//                         to="/orders"
//                         className="mt-3 inline-block text-blue-600"
//                     >
//                         View Orders
//                     </Link>

//                 </div>

//             </div>


//             {/* ==============================
//                 RECENT ORDERS
//             ============================== */}

//             <div className="rounded bg-white p-5">

//                 <div className="mb-4 flex items-center justify-between">

//                     <h2 className="text-lg font-bold">
//                         Recent Orders
//                     </h2>

//                     <Link
//                         to="/orders"
//                         className="text-blue-600"
//                     >
//                         View All
//                     </Link>

//                 </div>


//                 {recentOrders.length === 0 ? (

//                     <p className="text-gray-500">
//                         No orders yet.
//                     </p>

//                 ) : (

//                     <table className="w-full border-collapse">

//                         <thead>

//                             <tr className="border-b text-left">

//                                 <th className="p-3">
//                                     Order ID
//                                 </th>

//                                 <th className="p-3">
//                                     Status
//                                 </th>

//                                 <th className="p-3">
//                                     Total
//                                 </th>

//                                 <th className="p-3">
//                                     Action
//                                 </th>

//                             </tr>

//                         </thead>


//                         <tbody>

//                             {recentOrders.map((order) => (

//                                 <tr
//                                     key={order._id}
//                                     className="border-b"
//                                 >

//                                     <td className="p-3">
//                                         {order._id}
//                                     </td>

//                                     <td className="p-3">
//                                         {order.status}
//                                     </td>

//                                     <td className="p-3">
//                                         {order.totalAmount}
//                                     </td>

//                                     <td className="p-3">

//                                         <Link
//                                             to={`/orders/${order._id}`}
//                                             className="text-blue-600"
//                                         >
//                                             View
//                                         </Link>

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>

//                 )}

//             </div>

//         </div>
//     );
// }

// export default UserDashboard;