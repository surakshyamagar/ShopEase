// // import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// // import Login from "../pages/auth/Login";
// // import Register from "../pages/auth/Register";
// // import AuthLayout from "../layouts/AuthLayout";
// // import Product from "../pages/product/product";
// // import AddProduct from "../pages/product/AddProduct";

// // function AppRoutes() {
// //     return(
// //         <BrowserRouter>
// //             <Routes>
// //                 {/* Authentication Routes */}
// //                 <Route element={<AuthLayout/>}>
// //                     <Route path="/" element={<Login/>}/>
// //                     <Route path="/register" element={<Register />} />
// //                      <Route
// //                         path="/products"
// //                         element={<Product/>}
// //                     />

// //                     <Route
// //                         path="/products/add"
// //                         element={<AddProduct/>}
// //                     />

// //                 </Route>

// //                 {/* Page Not Found */}
// //                 <Route path="*" element={<Navigate to="/" replace />} />

// //             </Routes>
// //         </BrowserRouter>
// //     )
// // }
// // export default AppRoutes;


// import {
//     BrowserRouter,
//     Navigate,
//     Route,
//     Routes,
// } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";

// import AuthLayout from "../layouts/AuthLayout";

// import UserDashboard from "../dashboards/UserDashboard";
// import AdminDashboard from "../dashboards/AdminDashboard";

// import Product from "../pages/product/product";
// import AddProduct from "../pages/product/AddProduct";
// import EditProduct from "../pages/product/EditProduct";

// import ProtectedRoute from "./ProtectedRoute";
// import RoleBasedRoute from "./RoleBasedRoute";
// import DashboardRedirect from "./DashboardRedirect";
// import Category from "../pages/categories/Category";


// function AppRoutes() {

//     return (

//         <BrowserRouter>

//             <Routes>

//                 {/* AUTH */}

//                 <Route element={<AuthLayout />}>

//                     <Route
//                         path="/"
//                         element={<Login />}
//                     />

//                     <Route
//                         path="/register"
//                         element={<Register />}
//                     />

//                 </Route>


//                 {/* DASHBOARD REDIRECT */}

//                 <Route
//                     path="/dashboard"
//                     element={
//                         <DashboardRedirect />
//                     }
//                 />


//                 {/* USER DASHBOARD */}

//                 <Route
//                     path="/customer/dashboard"
//                     element={
//                         <RoleBasedRoute role="USER">

//                             <UserDashboard />

//                         </RoleBasedRoute>
//                     }
//                 />


//                 {/* ADMIN DASHBOARD */}

//                 <Route
//                     path="/admin/dashboard"
//                     element={
//                         <RoleBasedRoute role="ADMIN">

//                             <AdminDashboard />

//                         </RoleBasedRoute>
//                     }
//                 />


//                 {/* PRODUCTS */}

//                 <Route
//                     path="/products"
//                     element={
//                         <ProtectedRoute>

//                             <Product />

//                         </ProtectedRoute>
//                     }
//                 />


//                 {/* ADMIN ADD PRODUCT */}

//                 <Route
//                     path="/products/add"
//                     element={
//                         <RoleBasedRoute role="ADMIN">

//                             <AddProduct />

//                         </RoleBasedRoute>
//                     }
//                 />


//                 {/* ADMIN EDIT PRODUCT */}

//                 <Route
//                     path="/products/edit/:id"
//                     element={
//                         <RoleBasedRoute role="ADMIN">

//                             <EditProduct />

//                         </RoleBasedRoute>
//                     }
//                 />

//                 <Route
//                     path="/categories"
//                     element={
//                         <RoleBasedRoute role="ADMIN">
//                             <Category />
//                         </RoleBasedRoute>
//                     }
//                 />
                


//                 {/* NOT FOUND */}

//                 <Route
//                     path="*"
//                     element={
//                         <Navigate
//                             to="/"
//                             replace
//                         />
//                     }
//                 />

//             </Routes>

//         </BrowserRouter>
//     );
// }

// export default AppRoutes;

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AuthLayout from "../layouts/AuthLayout";

import UserDashboard from "../dashboards/UserDashboard.jsx";
import AdminDashboard from "../dashboards/AdminDashboard";

import Product from "../pages/product/product";
import UserProducts from "../pages/product/UserProducts";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";
import ProductDetails from "../pages/product/ProductDetails";

import Category from "../pages/categories/Category";

import Cart from "../pages/cart/Cart";

import Orders from "../pages/order/Orders";
import OrderDetails from "../pages/order/OrderDetails";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import DashboardRedirect from "./DashboardRedirect";
import AdminOrders from "../pages/admin/AdminOrders.jsx";
import AdminOrderDetails from "../pages/admin/AdminOrderDetails.jsx";
import AdminProducts from "../pages/admin/AdminProducts.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =====================================
                    AUTHENTICATION
                ===================================== */}

                <Route element={<AuthLayout />}>

                    <Route
                        path="/"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Route>


                {/* =====================================
                    DASHBOARD REDIRECT
                ===================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <DashboardRedirect />
                    }
                />


                {/* =====================================
                    USER DASHBOARD
                ===================================== */}

                <Route
                    path="/customer/dashboard"
                    element={
                        <RoleBasedRoute role="USER">
                            <UserDashboard />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    ADMIN DASHBOARD
                ===================================== */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AdminDashboard />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    ADMIN PRODUCT MANAGEMENT
                ===================================== */}

                <Route
                    path="/products"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AdminProducts />
                        </RoleBasedRoute>
                    }
                />

                


                {/* =====================================
                    CUSTOMER SHOP
                ===================================== */}

                <Route
                    path="/shop"
                    element={
                        <RoleBasedRoute role="USER">
                            <UserProducts />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    PRODUCT DETAILS
                ===================================== */}

                <Route
                    path="/products/:id"
                    element={
                        <ProtectedRoute>
                            <ProductDetails />
                        </ProtectedRoute>
                    }
                />


                {/* =====================================
                    ADMIN ADD PRODUCT
                ===================================== */}

                <Route
                    path="/products/add"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AddProduct />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    ADMIN EDIT PRODUCT
                ===================================== */}

                <Route
                    path="/admin/products/edit/:id"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <EditProduct />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    ADMIN CATEGORIES
                ===================================== */}

                <Route
                    path="/categories"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <Category />
                        </RoleBasedRoute>
                    }
                />

                <Route 
                    path="/admin/orders" 
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AdminOrders/>
                        </RoleBasedRoute>
                    }
                />

                <Route 
                    path="/admin/orders/:id" 
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AdminOrderDetails/>
                        </RoleBasedRoute>
                    }
                />


                
                {/* =====================================
                    ADMIN CUSTOMERS
                ===================================== */}

                <Route
                    path="/admin/users"
                    element={
                        <RoleBasedRoute role="ADMIN">
                            <AdminUsers />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    CUSTOMER CART
                ===================================== */}

                <Route
                    path="/cart"
                    element={
                        <RoleBasedRoute role="USER">
                            <Cart />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    CUSTOMER ORDERS
                ===================================== */}

                <Route
                    path="/orders"
                    element={
                        <RoleBasedRoute role="USER">
                            <Orders />
                        </RoleBasedRoute>
                    }
                />


                {/* =====================================
                    ORDER DETAILS
                ===================================== */}

                <Route
                    path="/orders/:id"
                    element={
                        <RoleBasedRoute role="USER">
                            <OrderDetails />
                        </RoleBasedRoute>
                    }
                />



                {/* =====================================
                    PAGE NOT FOUND
                ===================================== */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default AppRoutes;