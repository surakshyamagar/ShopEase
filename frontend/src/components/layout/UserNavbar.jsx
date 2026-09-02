import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Package,
    UserCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function UserNavbar() {

    const location = useLocation();

    const { user, logout } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);


    const isActive = (path) => {
        return location.pathname === path;
    };


    const closeMobileMenu = () => {
        setMobileOpen(false);
    };


    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* ================= BRAND ================= */}

                <Link
                    to="/customer/dashboard"
                    className="flex items-center gap-3"
                >

                    <div className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-600
                        text-lg
                        font-bold
                        text-white
                        shadow-sm
                    ">
                        S
                    </div>


                    <div className="hidden sm:block">

                        <h1 className="text-lg font-bold text-gray-900">
                            ShopEase
                        </h1>

                        <p className="text-xs text-gray-500">
                            Shop smart. Shop easy.
                        </p>

                    </div>

                </Link>


                {/* ================= DESKTOP NAV ================= */}

                <nav className="hidden items-center gap-1 lg:flex">

                    <Link
                        to="/customer/dashboard"
                        className={`
                            flex items-center gap-2
                            rounded-lg
                            px-4 py-2.5
                            text-sm font-medium
                            transition
                            ${
                                isActive("/customer/dashboard")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>


                    <Link
                        to="/products"
                        className={`
                            flex items-center gap-2
                            rounded-lg
                            px-4 py-2.5
                            text-sm font-medium
                            transition
                            ${
                                isActive("/products")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <ShoppingBag size={18} />
                        Products
                    </Link>


                    <Link
                        to="/cart"
                        className={`
                            flex items-center gap-2
                            rounded-lg
                            px-4 py-2.5
                            text-sm font-medium
                            transition
                            ${
                                isActive("/cart")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <ShoppingCart size={18} />
                        Cart
                    </Link>


                    <Link
                        to="/orders"
                        className={`
                            flex items-center gap-2
                            rounded-lg
                            px-4 py-2.5
                            text-sm font-medium
                            transition
                            ${
                                location.pathname.startsWith("/orders")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <Package size={18} />
                        Orders
                    </Link>

                </nav>


                {/* ================= USER ================= */}

                <div className="hidden items-center gap-4 lg:flex">

                    <div className="flex items-center gap-3">

                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-100
                            text-emerald-700
                        ">
                            <UserCircle size={22} />
                        </div>


                        <div>

                            <p className="text-sm font-semibold text-gray-900">
                                {user?.name || "Customer"}
                            </p>

                            <p className="text-xs text-gray-500">
                                Customer
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={logout}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-gray-200
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-gray-600
                            transition
                            hover:border-red-200
                            hover:bg-red-50
                            hover:text-red-600
                        "
                    >
                        <LogOut size={17} />
                        Logout
                    </button>

                </div>


                {/* ================= MOBILE BUTTON ================= */}

                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="
                        rounded-lg
                        p-2
                        text-gray-600
                        hover:bg-gray-100
                        lg:hidden
                    "
                >
                    {mobileOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

            </div>


            {/* ================= MOBILE MENU ================= */}

            {mobileOpen && (

                <div className="border-t border-gray-200 bg-white px-6 py-4 lg:hidden">

                    <div className="flex flex-col gap-1">

                        <Link
                            to="/customer/dashboard"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>


                        <Link
                            to="/products"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <ShoppingBag size={18} />
                            Products
                        </Link>


                        <Link
                            to="/cart"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <ShoppingCart size={18} />
                            Cart
                        </Link>


                        <Link
                            to="/orders"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Package size={18} />
                            Orders
                        </Link>


                        <div className="my-2 border-t border-gray-200" />


                        <div className="flex items-center gap-3 px-4 py-3">

                            <div className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-emerald-100
                                text-emerald-700
                            ">
                                <UserCircle size={20} />
                            </div>

                            <div>

                                <p className="text-sm font-semibold text-gray-900">
                                    {user?.name || "Customer"}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Customer
                                </p>

                            </div>

                        </div>


                        <button
                            onClick={logout}
                            className="
                                mt-1
                                flex
                                items-center
                                gap-3
                                rounded-lg
                                bg-red-50
                                px-4
                                py-3
                                font-medium
                                text-red-600
                            "
                        >
                            <LogOut size={18} />
                            Logout
                        </button>

                    </div>

                </div>

            )}

        </header>
    );
}

export default UserNavbar;