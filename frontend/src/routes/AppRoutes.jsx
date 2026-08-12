// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import AuthLayout from "../layouts/AuthLayout";
// import Product from "../pages/product/product";
// import AddProduct from "../pages/product/AddProduct";

// function AppRoutes() {
//     return(
//         <BrowserRouter>
//             <Routes>
//                 {/* Authentication Routes */}
//                 <Route element={<AuthLayout/>}>
//                     <Route path="/" element={<Login/>}/>
//                     <Route path="/register" element={<Register />} />
//                      <Route
//                         path="/products"
//                         element={<Product/>}
//                     />

//                     <Route
//                         path="/products/add"
//                         element={<AddProduct/>}
//                     />

//                 </Route>

//                 {/* Page Not Found */}
//                 <Route path="*" element={<Navigate to="/" replace />} />

//             </Routes>
//         </BrowserRouter>
//     )
// }
// export default AppRoutes;



import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import Product from "../pages/product/product";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";


function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* AUTH PAGES */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* PRODUCT PAGES */}

                <Route
                    path="/products"
                    element={<Product />}
                />

                <Route
                    path="/products/add"
                    element={<AddProduct />}
                />

                <Route
                    path="/products/edit/:id"
                    element={<EditProduct/>}
                />


                {/* 404 */}

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