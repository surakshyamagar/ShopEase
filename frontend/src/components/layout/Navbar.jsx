import { Link, useLocation } from "react-router-dom";
import {
    ShoppingBag,
    ShoppingCart,
    User,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const location = useLocation();

    const { user, logout } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);


    const isActive = (path) => {
        return location.pathname === path;
    };


    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* ================= BRAND ================= */}

                <Link
                    to="/products"
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

                <nav className="hidden items-center gap-2 md:flex">

                    <Link
                        to="/products"
                        className={`
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition
                            ${
                                isActive("/products")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            <ShoppingBag size={18} />
                            Products
                        </span>
                    </Link>


                    <Link
                        to="/cart"
                        className={`
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition
                            ${
                                isActive("/cart")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            <ShoppingCart size={18} />
                            Cart
                        </span>
                    </Link>


                    <Link
                        to="/customer/dashboard"
                        className={`
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            transition
                            ${
                                isActive("/customer/dashboard")
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            <User size={18} />
                            Account
                        </span>
                    </Link>

                </nav>


                {/* ================= USER ================= */}

                <div className="hidden items-center gap-4 md:flex">

                    <div className="text-right">

                        <p className="text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.role || "Customer"}
                        </p>

                    </div>


                    <button
                        onClick={logout}
                        className="
                            rounded-lg
                            border
                            border-gray-200
                            px-4
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
                        md:hidden
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

                <div className="border-t border-gray-200 bg-white px-6 py-4 md:hidden">

                    <div className="flex flex-col gap-2">

                        <Link
                            to="/products"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            Products
                        </Link>


                        <Link
                            to="/cart"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            Cart
                        </Link>


                        <Link
                            to="/customer/dashboard"
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            My Account
                        </Link>


                        <button
                            onClick={logout}
                            className="
                                mt-2
                                rounded-lg
                                bg-red-50
                                px-4
                                py-3
                                text-left
                                font-medium
                                text-red-600
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

            )}

        </header>
    );
}

export default Navbar;