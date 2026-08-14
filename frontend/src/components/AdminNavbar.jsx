import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Plus,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function AdminNavbar() {
    const location = useLocation();
    const { user } = useAuth();

    // Dashboard depends on user's role
    const dashboardPath =
        user?.role === "ADMIN"
            ? "/admin/dashboard"
            : "/dashboard";

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-16 flex items-center justify-between">

                    {/* ================= LOGO ================= */}

                    <Link
                        to={dashboardPath}
                        className="flex items-center gap-3"
                    >

                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">

                            <span className="text-white text-lg font-bold">
                                S
                            </span>

                        </div>

                        <div className="hidden sm:block">

                            <h1 className="text-lg font-bold text-gray-900">
                                ShopEase
                            </h1>

                            <p className="text-xs text-gray-500">
                                {user?.role === "ADMIN"
                                    ? "Admin Panel"
                                    : "Shop"}
                            </p>

                        </div>

                    </Link>


                    {/* ================= NAVIGATION ================= */}

                    <nav className="hidden lg:flex items-center gap-1">

                        {/* Dashboard */}

                        <Link
                            to={dashboardPath}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                isActive(dashboardPath)
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >

                            <LayoutDashboard size={18} />

                            Dashboard

                        </Link>


                        {/* Products */}

                        <Link
                            to="/products"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                location.pathname.startsWith("/products")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >

                            <Package size={18} />

                            Products

                        </Link>


                        {/* Categories */}

                        <Link
                            to="/categories"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                location.pathname.startsWith("/categories")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >

                            <Tags size={18} />

                            Categories

                        </Link>


                        {/* Orders */}

                        <Link
                            to="/admin/orders"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                location.pathname.startsWith("/admin/orders")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >

                            <ShoppingCart size={18} />

                            Orders

                        </Link>


                        {/* Users */}

                        <Link
                            to="/admin/users"
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                                location.pathname.startsWith("/admin/users")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >

                            <Users size={18} />

                            Users

                        </Link>

                    </nav>


                    {/* ================= RIGHT SIDE ================= */}

                    <div className="flex items-center gap-3">

                        {/* Add Product */}

                        <Link
                            to="/products/add"
                            className="hidden md:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                        >

                            <Plus size={18} />

                            Add Product

                        </Link>


                        {/* Admin / User Profile */}

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">

                                <span className="text-sm font-bold text-emerald-600">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </span>

                            </div>


                            <div className="hidden xl:block">

                                <p className="text-sm font-semibold text-gray-900">
                                    {user?.name || "User"}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {user?.role === "ADMIN"
                                        ? "Administrator"
                                        : "Customer"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default AdminNavbar;