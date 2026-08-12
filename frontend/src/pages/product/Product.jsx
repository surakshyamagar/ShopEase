import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    deleteProduct,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";


function Product() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);


    // Load products and categories
    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {

        try {

            setLoading(true);

            const [productsData, categoriesData] =
                await Promise.all([
                    getProducts(),
                    getCategories(),
                ]);

            setProducts(productsData);
            setCategories(categoriesData);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };


    // Delete product
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProduct(id);

            // Remove deleted product from UI
            setProducts(
                products.filter(
                    (product) => product._id !== id
                )
            );

        } catch (error) {

            console.log(error);

            alert("Failed to delete product");

        }
    };


    // Get category name
    const getCategoryName = (categoryId) => {

        const category = categories.find(
            (category) => category._id === categoryId
        );

        return category
            ? category.name
            : "Unknown category";
    };


    return (
        <div className="min-h-screen bg-gray-100">

            {/* ================= HEADER ================= */}

            <header className="bg-white border-b">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}

                        <Link
                            to="/products"
                            className="text-2xl font-bold text-blue-600"
                        >
                            ShopEase
                        </Link>


                        {/* Navigation */}

                        <nav className="flex items-center gap-6">

                            <Link
                                to="/products"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Products
                            </Link>

                            <Link
                                to="/categories"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Categories
                            </Link>

                        </nav>

                    </div>

                </div>

            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto px-6 py-8">


                {/* PAGE HEADER */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Products
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your products
                        </p>

                    </div>


                    <Link
                        to="/products/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
                    >
                        + Add Product
                    </Link>

                </div>


                {/* ================= PRODUCT COUNT ================= */}

                <div className="mb-5">

                    <p className="text-gray-600">
                        {products.length} products
                    </p>

                </div>


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="bg-white rounded-xl p-10 text-center">

                        <p className="text-gray-500">
                            Loading products...
                        </p>

                    </div>

                )}


                {/* ================= EMPTY ================= */}

                {!loading && products.length === 0 && (

                    <div className="bg-white rounded-xl p-10 text-center">

                        <h2 className="text-xl font-semibold">
                            No products yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add your first product.
                        </p>

                        <Link
                            to="/products/add"
                            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Add Product
                        </Link>

                    </div>

                )}


                {/* ================= PRODUCTS ================= */}

                {!loading && products.length > 0 && (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
                            >

                                {/* IMAGE */}

                                <div className="h-56 bg-gray-100">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <div className="h-full flex items-center justify-center text-gray-400">
                                            No image
                                        </div>

                                    )}

                                </div>


                                {/* CONTENT */}

                                <div className="p-5">

                                    {/* Category */}

                                    <p className="text-sm text-blue-600 font-medium mb-1">
                                        {getCategoryName(product.category)}
                                    </p>


                                    {/* Name */}

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {product.name}
                                    </h2>


                                    {/* Description */}

                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                        {product.description}
                                    </p>


                                    {/* Price + Stock */}

                                    <div className="flex justify-between items-center mt-4">

                                        <p className="text-xl font-bold text-gray-900">
                                            ${product.price}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Stock: {product.stock}
                                        </p>

                                    </div>


                                    {/* BUTTONS */}

                                    <div className="flex gap-2 mt-5">

                                        <Link
                                            to={`/products/edit/${product._id}`}
                                            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg font-medium"
                                        >
                                            Edit
                                        </Link>


                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default Product;