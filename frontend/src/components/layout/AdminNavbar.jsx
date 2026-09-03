// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// import {
//     LayoutDashboard,
//     Package,
//     Tags,
//     ShoppingCart,
//     Users,
//     Plus,
//     LogOut,
//     Menu,
//     X,
//     UserCircle,
// } from "lucide-react";

// import { useAuth } from "../../context/AuthContext";

// function AdminNavbar() {

//     const location = useLocation();

//     const { user, logout } = useAuth();

//     const [mobileOpen, setMobileOpen] = useState(false);


//     const isActive = (path) => {
//         return location.pathname === path;
//     };


//     const closeMobileMenu = () => {
//         setMobileOpen(false);
//     };


//     return (
//         <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">

//             <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

//                 {/* ================= BRAND ================= */}

//                 <Link
//                     to="/admin/dashboard"
//                     className="flex items-center gap-3"
//                 >

//                     <div className="
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         rounded-xl
//                         bg-emerald-600
//                         text-lg
//                         font-bold
//                         text-white
//                         shadow-sm
//                     ">
//                         S
//                     </div>


//                     <div className="hidden sm:block">

//                         <h1 className="text-lg font-bold text-gray-900">
//                             ShopEase
//                         </h1>

//                         <p className="text-xs text-gray-500">
//                             Shop Management
//                         </p>

//                     </div>

//                 </Link>


//                 {/* ================= DESKTOP NAV ================= */}

//                 <nav className="hidden items-center gap-1 xl:flex">

//                     <Link
//                         to="/admin/dashboard"
//                         className={`
//                             flex items-center gap-2
//                             rounded-lg
//                             px-4 py-2.5
//                             text-sm font-medium
//                             transition
//                             ${
//                                 isActive("/admin/dashboard")
//                                     ? "bg-emerald-50 text-emerald-600"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
//                             }
//                         `}
//                     >
//                         <LayoutDashboard size={18} />
//                         Dashboard
//                     </Link>


//                     <Link
//                         to="/products"
//                         className={`
//                             flex items-center gap-2
//                             rounded-lg
//                             px-4 py-2.5
//                             text-sm font-medium
//                             transition
//                             ${
//                                 isActive("/products")
//                                     ? "bg-emerald-50 text-emerald-600"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
//                             }
//                         `}
//                     >
//                         <Package size={18} />
//                         Products
//                     </Link>


//                     <Link
//                         to="/categories"
//                         className={`
//                             flex items-center gap-2
//                             rounded-lg
//                             px-4 py-2.5
//                             text-sm font-medium
//                             transition
//                             ${
//                                 isActive("/categories")
//                                     ? "bg-emerald-50 text-emerald-600"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
//                             }
//                         `}
//                     >
//                         <Tags size={18} />
//                         Categories
//                     </Link>


//                     <Link
//                         to="/admin/orders"
//                         className={`
//                             flex items-center gap-2
//                             rounded-lg
//                             px-4 py-2.5
//                             text-sm font-medium
//                             transition
//                             ${
//                                 location.pathname.startsWith("/admin/orders")
//                                     ? "bg-emerald-50 text-emerald-600"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
//                             }
//                         `}
//                     >
//                         <ShoppingCart size={18} />
//                         Orders
//                     </Link>


//                     <Link
//                         to="/admin/users"
//                         className={`
//                             flex items-center gap-2
//                             rounded-lg
//                             px-4 py-2.5
//                             text-sm font-medium
//                             transition
//                             ${
//                                 location.pathname.startsWith("/admin/users")
//                                     ? "bg-emerald-50 text-emerald-600"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
//                             }
//                         `}
//                     >
//                         <Users size={18} />
//                         Users
//                     </Link>

//                 </nav>


//                 {/* ================= RIGHT SIDE ================= */}

//                 <div className="hidden items-center gap-4 xl:flex">

//                     <Link
//                         to="/products/add"
//                         className="
//                             flex
//                             items-center
//                             gap-2
//                             rounded-lg
//                             bg-emerald-600
//                             px-4
//                             py-2.5
//                             text-sm
//                             font-semibold
//                             text-white
//                             shadow-sm
//                             transition
//                             hover:bg-emerald-700
//                             hover:shadow-md
//                         "
//                     >
//                         <Plus size={18} />
//                         Add Product
//                     </Link>


//                     <div className="flex items-center gap-3 border-l border-gray-200 pl-4">

//                         <div className="
//                             flex
//                             h-10
//                             w-10
//                             items-center
//                             justify-center
//                             rounded-full
//                             bg-emerald-100
//                             text-emerald-700
//                         ">
//                             <UserCircle size={22} />
//                         </div>


//                         <div>

//                             <p className="text-sm font-semibold text-gray-900">
//                                 {user?.name || "Admin"}
//                             </p>

//                             <p className="text-xs text-gray-500">
//                                 Administrator
//                             </p>

//                         </div>


//                         <button
//                             onClick={logout}
//                             title="Logout"
//                             className="
//                                 ml-2
//                                 rounded-lg
//                                 p-2
//                                 text-gray-400
//                                 transition
//                                 hover:bg-red-50
//                                 hover:text-red-600
//                             "
//                         >
//                             <LogOut size={18} />
//                         </button>

//                     </div>

//                 </div>


//                 {/* ================= MOBILE BUTTON ================= */}

//                 <button
//                     onClick={() => setMobileOpen(!mobileOpen)}
//                     className="
//                         rounded-lg
//                         p-2
//                         text-gray-600
//                         hover:bg-gray-100
//                         xl:hidden
//                     "
//                 >
//                     {mobileOpen ? (
//                         <X size={24} />
//                     ) : (
//                         <Menu size={24} />
//                     )}
//                 </button>

//             </div>


//             {/* ================= MOBILE MENU ================= */}

//             {mobileOpen && (

//                 <div className="border-t border-gray-200 bg-white px-6 py-4 xl:hidden">

//                     <div className="flex flex-col gap-1">

//                         <Link
//                             to="/admin/dashboard"
//                             onClick={closeMobileMenu}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                             <LayoutDashboard size={18} />
//                             Dashboard
//                         </Link>


//                         <Link
//                             to="/products"
//                             onClick={closeMobileMenu}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                             <Package size={18} />
//                             Products
//                         </Link>


//                         <Link
//                             to="/categories"
//                             onClick={closeMobileMenu}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                             <Tags size={18} />
//                             Categories
//                         </Link>


//                         <Link
//                             to="/admin/orders"
//                             onClick={closeMobileMenu}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                             <ShoppingCart size={18} />
//                             Orders
//                         </Link>


//                         <Link
//                             to="/admin/users"
//                             onClick={closeMobileMenu}
//                             className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
//                         >
//                             <Users size={18} />
//                             Users
//                         </Link>


//                         <Link
//                             to="/products/add"
//                             onClick={closeMobileMenu}
//                             className="
//                                 mt-2
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                                 rounded-lg
//                                 bg-emerald-600
//                                 px-4
//                                 py-3
//                                 font-semibold
//                                 text-white
//                             "
//                         >
//                             <Plus size={18} />
//                             Add Product
//                         </Link>


//                         <div className="my-2 border-t border-gray-200" />


//                         <div className="flex items-center gap-3 px-4 py-3">

//                             <div className="
//                                 flex
//                                 h-9
//                                 w-9
//                                 items-center
//                                 justify-center
//                                 rounded-full
//                                 bg-emerald-100
//                                 text-emerald-700
//                             ">
//                                 <UserCircle size={20} />
//                             </div>

//                             <div>

//                                 <p className="text-sm font-semibold text-gray-900">
//                                     {user?.name || "Admin"}
//                                 </p>

//                                 <p className="text-xs text-gray-500">
//                                     Administrator
//                                 </p>

//                             </div>

//                         </div>


//                         <button
//                             onClick={logout}
//                             className="
//                                 flex
//                                 items-center
//                                 gap-3
//                                 rounded-lg
//                                 bg-red-50
//                                 px-4
//                                 py-3
//                                 font-medium
//                                 text-red-600
//                             "
//                         >
//                             <LogOut size={18} />
//                             Logout
//                         </button>

//                     </div>

//                 </div>

//             )}

//         </header>
//     );
// }

// export default AdminNavbar;

import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Plus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";



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