import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Search,
    ShoppingCart,
    SlidersHorizontal,
    RotateCcw,
    Package,
    ArrowRight,
    X,
} from "lucide-react";

import {
    getProducts,
    filterProducts,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";

import { addToCart } from "../../services/cartService";


function UserProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [error, setError] = useState("");

    const [addingProduct, setAddingProduct] = useState(null);


    // =====================================================
    // LOAD PRODUCTS + CATEGORIES
    // =====================================================

    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                productsData,
                categoriesData,
            ] = await Promise.all([
                getProducts(),
                getCategories(),
            ]);

            setProducts(productsData);
            setCategories(categoriesData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    const handleFilter = async () => {

        try {

            setFilterLoading(true);
            setError("");

            const productsData = await filterProducts(
                search,
                category
            );

            setProducts(productsData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to filter products"
            );

        } finally {

            setFilterLoading(false);

        }

    };


    // =====================================================
    // RESET FILTER
    // =====================================================

    const handleReset = async () => {

        try {

            setSearch("");
            setCategory("");

            setFilterLoading(true);
            setError("");

            const productsData = await getProducts();

            setProducts(productsData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setFilterLoading(false);

        }

    };


    // =====================================================
    // ADD TO CART
    // =====================================================

    const handleAddToCart = async (productId) => {

        try {

            setAddingProduct(productId);

            await addToCart(productId, 1);

            alert("Product added to cart");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        } finally {

            setAddingProduct(null);

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

                    <div className="animate-pulse">

                        <div className="h-8 w-48 rounded bg-gray-200" />

                        <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                                >

                                    <div className="h-56 bg-gray-200" />

                                    <div className="space-y-3 p-5">

                                        <div className="h-5 w-3/4 rounded bg-gray-200" />

                                        <div className="h-4 w-full rounded bg-gray-200" />

                                        <div className="h-4 w-1/2 rounded bg-gray-200" />

                                        <div className="h-11 w-full rounded-lg bg-gray-200" />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error && products.length === 0) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">

                <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">

                        <Package size={26} />

                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        onClick={loadData}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                        <RotateCcw size={16} />
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">


                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-emerald-500" />

                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                ShopEase Store
                            </p>

                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Browse Products
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Discover products you'll love and add them to your cart.
                        </p>

                    </div>


                    {/* Cart */}

                    <Link
                        to="/cart"
                        className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:shadow-md"
                    >

                        <ShoppingCart size={19} />

                        View Cart

                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />

                    </Link>

                </div>


                {/* =================================================
                    BREADCRUMB
                ================================================== */}

                <div className="mb-6 flex items-center gap-2 text-sm">

                    <Link
                        to="/customer/dashboard"
                        className="text-gray-400 transition hover:text-emerald-600"
                    >
                        Dashboard
                    </Link>

                    <span className="text-gray-300">
                        /
                    </span>

                    <span className="font-medium text-gray-700">
                        Products
                    </span>

                </div>


                {/* =================================================
                    SEARCH + FILTER
                ================================================== */}

                <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">

                            <SlidersHorizontal size={19} />

                        </div>

                        <div>

                            <h2 className="font-bold text-gray-900">
                                Find Products
                            </h2>

                            <p className="text-xs text-gray-500">
                                Search or filter products by category
                            </p>

                        </div>

                    </div>


                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">


                        {/* Search */}

                        <div className="relative lg:col-span-5">

                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        handleFilter();
                                    }

                                }}
                                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                            />

                            {search && (

                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
                                >

                                    <X size={16} />

                                </button>

                            )}

                        </div>


                        {/* Category */}

                        <div className="lg:col-span-3">

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                            >

                                <option value="">
                                    All Categories
                                </option>

                                {categories.map((category) => (

                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Filter */}

                        <button
                            onClick={handleFilter}
                            disabled={filterLoading}
                            className="h-12 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 lg:col-span-2"
                        >

                            {filterLoading
                                ? "Searching..."
                                : "Apply Filters"}

                        </button>


                        {/* Reset */}

                        <button
                            onClick={handleReset}
                            disabled={filterLoading}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60 lg:col-span-2"
                        >

                            <RotateCcw size={16} />

                            Reset

                        </button>

                    </div>

                </div>


                {/* =================================================
                    RESULTS HEADER
                ================================================== */}

                <div className="mb-5 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">
                            All Products
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {products.length}{" "}
                            {products.length === 1
                                ? "product"
                                : "products"}{" "}
                            available
                        </p>

                    </div>

                </div>


                {/* =================================================
                    ERROR AFTER FILTER
                ================================================== */}

                {error && (

                    <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
                        {error}
                    </div>

                )}


                {/* =================================================
                    PRODUCTS
                ================================================== */}

                {products.length === 0 ? (

                    <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">

                            <Package size={30} />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-gray-900">
                            No products found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            We couldn't find any products matching your search.
                            Try another keyword or category.
                        </p>

                        <button
                            onClick={handleReset}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >

                            <RotateCcw size={16} />

                            Clear Filters

                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >


                                {/* =================================
                                    PRODUCT IMAGE
                                ================================= */}

                                <div className="relative h-60 overflow-hidden bg-gray-100">

                                    {product.image ? (

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                    ) : (

                                        <div className="flex h-full items-center justify-center text-gray-400">

                                            <Package size={38} />

                                        </div>

                                    )}


                                    {/* Stock Badge */}

                                    <div className="absolute left-3 top-3">

                                        {product.stock > 0 ? (

                                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur">

                                                In Stock

                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-500 shadow-sm backdrop-blur">

                                                Out of Stock

                                            </span>

                                        )}

                                    </div>

                                </div>


                                {/* =================================
                                    PRODUCT INFO
                                ================================= */}

                                <div className="p-5">


                                    {/* Product name */}

                                    <h3 className="truncate text-lg font-bold text-gray-900">
                                        {product.name}
                                    </h3>


                                    {/* Description */}

                                    <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                                        {product.description}
                                    </p>


                                    {/* Price + Stock */}

                                    <div className="mt-5 flex items-end justify-between">

                                        <div>

                                            <p className="text-xs font-medium text-gray-400">
                                                Price
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-gray-900">
                                                ${product.price}
                                            </p>

                                        </div>


                                        <p
                                            className={
                                                product.stock > 0
                                                    ? "text-xs font-semibold text-emerald-600"
                                                    : "text-xs font-semibold text-red-500"
                                            }
                                        >

                                            {product.stock > 0
                                                ? `${product.stock} left`
                                                : "Unavailable"}

                                        </p>

                                    </div>


                                    {/* Add to cart */}

                                    <button
                                        onClick={() =>
                                            handleAddToCart(product._id)
                                        }
                                        disabled={
                                            product.stock === 0 ||
                                            addingProduct === product._id
                                        }
                                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-emerald-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                                    >

                                        <ShoppingCart size={17} />

                                        {addingProduct === product._id
                                            ? "Adding..."
                                            : product.stock === 0
                                                ? "Out of Stock"
                                                : "Add to Cart"}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* =================================================
                    BOTTOM SHOPPING CTA
                ================================================== */}

                {products.length > 0 && (

                    <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-green-50 to-white p-6 sm:p-8">

                        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                    ShopEase
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-gray-900">
                                    Ready to checkout?
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Review your selected products in your cart.
                                </p>

                            </div>


                            <Link
                                to="/cart"
                                className="group flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md"
                            >

                                Go to Cart

                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />

                            </Link>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}


export default UserProducts;