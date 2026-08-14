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


function Product() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    // ================= LOAD DATA =================

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


    // ================= DELETE PRODUCT =================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteProduct(id);

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


    // ================= CATEGORY NAME =================

    const getCategoryName = (categoryId) => {

        const category = categories.find(
            (category) => category._id === categoryId
        );

        return category
            ? category.name
            : "Unknown category";
    };


    // ================= SEARCH =================

    const filteredProducts = products.filter((product) =>
        product.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );


    // ================= UI =================

    return (

        <div className="min-h-screen bg-gray-50">

            {/* ================= NAVBAR ================= */}

            <AdminNavbar />


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto px-6 py-8">


                {/* ================= PAGE HEADER ================= */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">

                            <Package size={18} />

                            Store Management

                        </div>


                        <h1 className="text-3xl font-bold text-gray-900">
                            Products
                        </h1>


                        <p className="text-gray-500 mt-1">
                            Manage your products, pricing and inventory.
                        </p>

                    </div>


                    {/* Add Product */}

                    <Link
                        to="/products/add"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                    >

                        <Plus size={19} />

                        Add Product

                    </Link>

                </div>


                {/* ================= TOOLBAR ================= */}

                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


                        {/* Search */}

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
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />

                        </div>


                        {/* Product Count */}

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


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="bg-white border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center">

                        <LoaderCircle
                            size={35}
                            className="animate-spin text-blue-600"
                        />

                        <p className="text-gray-500 mt-4">
                            Loading products...
                        </p>

                    </div>

                )}


                {/* ================= EMPTY ================= */}

                {!loading && products.length === 0 && (

                    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                        <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                            <Package
                                size={30}
                                className="text-blue-600"
                            />

                        </div>


                        <h2 className="text-xl font-semibold text-gray-900 mt-5">
                            No products yet
                        </h2>


                        <p className="text-gray-500 mt-2">
                            Start by adding your first product.
                        </p>


                        <Link
                            to="/products/add"
                            className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                        >

                            <Plus size={18} />

                            Add Product

                        </Link>

                    </div>

                )}


                {/* ================= NO SEARCH RESULTS ================= */}

                {!loading &&
                    products.length > 0 &&
                    filteredProducts.length === 0 && (

                        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                            <Search
                                size={35}
                                className="mx-auto text-gray-400"
                            />

                            <h2 className="text-lg font-semibold mt-4">
                                No products found
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Try searching for a different product.
                            </p>

                        </div>

                    )}


                {/* ================= PRODUCT GRID ================= */}

                {!loading &&
                    filteredProducts.length > 0 && (

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product._id}
                                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >

                                    {/* ================= IMAGE ================= */}

                                    <div className="relative h-56 bg-gray-100 overflow-hidden">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                        ) : (

                                            <div className="h-full flex flex-col items-center justify-center text-gray-400">

                                                <Package size={35} />

                                                <span className="text-sm mt-2">
                                                    No image
                                                </span>

                                            </div>

                                        )}


                                        {/* Category Badge */}

                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-blue-600 shadow-sm">

                                            {getCategoryName(product.category)}

                                        </span>

                                    </div>


                                    {/* ================= CONTENT ================= */}

                                    <div className="p-5">

                                        <h2 className="text-lg font-semibold text-gray-900 truncate">

                                            {product.name}

                                        </h2>


                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-10">

                                            {product.description}

                                        </p>


                                        {/* Price / Stock */}

                                        <div className="flex items-center justify-between mt-5">

                                            <div>

                                                <p className="text-xl font-bold text-gray-900">

                                                    ${product.price}

                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    Product Price
                                                </p>

                                            </div>


                                            <div className="text-right">

                                                <p
                                                    className={`text-sm font-semibold ${
                                                        product.stock > 0
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {product.stock > 0
                                                        ? `${product.stock} in stock`
                                                        : "Out of stock"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* ================= ACTIONS ================= */}

                                        <div className="flex gap-2 mt-5">

                                            <Link
                                                to={`/products/edit/${product._id}`}
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-sm font-medium transition"
                                            >

                                                <Pencil size={16} />

                                                Edit

                                            </Link>


                                            <button
                                                onClick={() =>
                                                    handleDelete(product._id)
                                                }
                                                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2.5 rounded-lg text-sm font-medium transition"
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


export default Product;