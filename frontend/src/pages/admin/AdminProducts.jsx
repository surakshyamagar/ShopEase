import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Search,
    Package,
    Pencil,
    Trash2,
    Plus,
    LoaderCircle,
} from "lucide-react";

import {
    getProducts,
    deleteProduct,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";

import AdminNavbar from "../../components/AdminNavbar";


function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);

            const [
                productsData,
                categoriesData
            ] = await Promise.all([
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


    // =====================================================
    // DELETE PRODUCT
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteProduct(id);

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product._id !== id
                )
            );

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }

    };


    // =====================================================
    // GET CATEGORY NAME
    // =====================================================

    const getCategoryName = (categoryId) => {

        const category = categories.find(
            (category) => category._id === categoryId
        );

        return category
            ? category.name
            : "Unknown category";

    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredProducts = products.filter((product) =>
        product.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50">

            {/* =================================================
                ADMIN NAVBAR
            ================================================= */}

            <AdminNavbar />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="mx-auto max-w-7xl px-6 py-8">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600">

                            <Package size={18} />

                            Store Management

                        </div>


                        <h1 className="text-3xl font-bold text-gray-900">

                            Products

                        </h1>


                        <p className="mt-1 text-gray-500">

                            Manage your products, pricing and inventory.

                        </p>

                    </div>


                    {/* Add Product */}

                    <Link
                        to="/admin/products/add"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                    >

                        <Plus size={19} />

                        Add Product

                    </Link>

                </div>


                {/* =================================================
                    TOOLBAR
                ================================================= */}

                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                        {/* SEARCH */}

                        <div className="relative w-full md:w-96">

                            <Search
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />

                        </div>


                        {/* PRODUCT COUNT */}

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <span>
                                Total Products
                            </span>

                            <span className="font-semibold text-gray-900">

                                {products.length}

                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-12">

                        <LoaderCircle
                            size={35}
                            className="animate-spin text-emerald-600"
                        />

                        <p className="mt-4 text-gray-500">

                            Loading products...

                        </p>

                    </div>

                )}


                {/* =================================================
                    EMPTY PRODUCTS
                ================================================= */}

                {!loading && products.length === 0 && (

                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">

                            <Package
                                size={30}
                                className="text-emerald-600"
                            />

                        </div>


                        <h2 className="mt-5 text-xl font-semibold text-gray-900">

                            No products yet

                        </h2>


                        <p className="mt-2 text-gray-500">

                            Start by adding your first product.

                        </p>


                        <Link
                            to="/admin/products/add"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
                        >

                            <Plus size={18} />

                            Add Product

                        </Link>

                    </div>

                )}


                {/* =================================================
                    NO SEARCH RESULTS
                ================================================= */}

                {!loading &&
                    products.length > 0 &&
                    filteredProducts.length === 0 && (

                        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">

                            <Search
                                size={35}
                                className="mx-auto text-gray-400"
                            />

                            <h2 className="mt-4 text-lg font-semibold text-gray-900">

                                No products found

                            </h2>

                            <p className="mt-1 text-gray-500">

                                Try searching for a different product.

                            </p>

                        </div>

                    )}


                {/* =================================================
                    PRODUCT GRID
                ================================================= */}

                {!loading &&
                    filteredProducts.length > 0 && (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >


                                    {/* =================================================
                                        IMAGE
                                    ================================================= */}

                                    <div className="relative h-56 overflow-hidden bg-gray-100">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                        ) : (

                                            <div className="flex h-full flex-col items-center justify-center text-gray-400">

                                                <Package size={35} />

                                                <span className="mt-2 text-sm">

                                                    No image

                                                </span>

                                            </div>

                                        )}


                                        {/* CATEGORY BADGE */}

                                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm backdrop-blur">

                                            {getCategoryName(product.category)}

                                        </span>

                                    </div>


                                    {/* =================================================
                                        CONTENT
                                    ================================================= */}

                                    <div className="p-5">

                                        <h2 className="truncate text-lg font-semibold text-gray-900">

                                            {product.name}

                                        </h2>


                                        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-gray-500">

                                            {product.description}

                                        </p>


                                        {/* PRICE / STOCK */}

                                        <div className="mt-5 flex items-center justify-between">


                                            {/* PRICE */}

                                            <div>

                                                <p className="text-xl font-bold text-gray-900">

                                                    ${Number(product.price).toFixed(2)}

                                                </p>

                                                <p className="mt-1 text-xs text-gray-400">

                                                    Product Price

                                                </p>

                                            </div>


                                            {/* STOCK */}

                                            <div className="text-right">

                                                <p
                                                    className={`text-sm font-semibold ${
                                                        product.stock > 0
                                                            ? "text-emerald-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {product.stock > 0
                                                        ? `${product.stock} in stock`
                                                        : "Out of stock"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* =================================================
                                            ACTIONS
                                        ================================================= */}

                                        <div className="mt-5 flex gap-2">


                                            {/* EDIT */}

                                            <Link
                                                to={`/admin/products/edit/${product._id}`}
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                                            >

                                                <Pencil size={16} />

                                                Edit

                                            </Link>


                                            {/* DELETE */}

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        product._id
                                                    )
                                                }
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                                            >

                                                <Trash2 size={16} />

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


export default AdminProducts;