import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    PackagePlus,
    Image,
    DollarSign,
    Boxes,
    Tags,
    FileText,
    Save,
} from "lucide-react";

import { createProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

import AdminNavbar from "../../components/AdminNavbar";


function AddProduct() {

    const navigate = useNavigate();


    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
        category: "",
    });


    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadCategories();

    }, []);


    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.log(error);

        }

    };


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", Number(form.price));
            formData.append("stock", Number(form.stock));
            formData.append("category", form.category);

            if (form.image) {
                formData.append("image", form.image);
            }

            await createProduct(formData);

            alert("Product created successfully!");

            navigate("/products");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create product"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-gray-50">


            {/* ================= NAVBAR ================= */}

            <AdminNavbar />


            {/* ================= MAIN ================= */}

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* ================= BREADCRUMB ================= */}

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">

                    <Link
                        to="/products"
                        className="hover:text-emerald-600 transition"
                    >
                        Products
                    </Link>

                    <span>/</span>

                    <span className="text-gray-700">
                        Add Product
                    </span>

                </div>


                {/* ================= PAGE HEADER ================= */}

                <div className="flex items-center gap-4 mb-8">

                    <button
                        onClick={() => navigate("/products")}
                        className="
                            w-10 h-10
                            flex items-center justify-center
                            rounded-xl
                            bg-white
                            border border-gray-200
                            hover:bg-gray-100
                            transition
                        "
                    >

                        <ArrowLeft size={19} />

                    </button>


                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            Add Product
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Create a new product for your store.
                        </p>

                    </div>

                </div>


                {/* ================= FORM ================= */}

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                        {/* ================= LEFT ================= */}

                        <div className="lg:col-span-2 space-y-6">


                            {/* BASIC INFORMATION */}

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">

                                        <PackagePlus
                                            size={20}
                                            className="text-emerald-600"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="font-bold text-gray-900">
                                            Basic Information
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            Product name and description
                                        </p>

                                    </div>

                                </div>


                                {/* NAME */}

                                <div className="mb-5">

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Premium Wireless Headphones"
                                        required
                                        className="
                                            w-full
                                            px-4 py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            text-sm
                                            focus:border-emerald-500
                                            focus:ring-4
                                            focus:ring-emerald-50
                                            transition
                                        "
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div>

                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                                        <FileText size={15} />

                                        Description

                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Describe your product..."
                                        rows="6"
                                        required
                                        className="
                                            w-full
                                            px-4 py-3
                                            rounded-xl
                                            border border-gray-200
                                            outline-none
                                            resize-none
                                            text-sm
                                            focus:border-emerald-500
                                            focus:ring-4
                                            focus:ring-emerald-50
                                            transition
                                        "
                                    />

                                </div>

                            </div>


                            {/* PRICE + STOCK */}

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">

                                <h2 className="font-bold text-gray-900 mb-6">
                                    Pricing & Inventory
                                </h2>


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                                    {/* PRICE */}

                                    <div>

                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                                            <DollarSign size={15} />

                                            Price

                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                $
                                            </span>

                                            <input
                                                type="number"
                                                name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                required
                                                className="
                                                    w-full
                                                    pl-9 pr-4 py-3
                                                    rounded-xl
                                                    border border-gray-200
                                                    outline-none
                                                    focus:border-emerald-500
                                                    focus:ring-4
                                                    focus:ring-emerald-50
                                                    transition
                                                "
                                            />

                                        </div>

                                    </div>


                                    {/* STOCK */}

                                    <div>

                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">

                                            <Boxes size={15} />

                                            Stock

                                        </label>

                                        <input
                                            type="number"
                                            name="stock"
                                            value={form.stock}
                                            onChange={handleChange}
                                            placeholder="0"
                                            min="0"
                                            required
                                            className="
                                                w-full
                                                px-4 py-3
                                                rounded-xl
                                                border border-gray-200
                                                outline-none
                                                focus:border-emerald-500
                                                focus:ring-4
                                                focus:ring-emerald-50
                                                transition
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                        </div>


                        {/* ================= RIGHT ================= */}

                        <div className="space-y-6">


                            {/* CATEGORY */}

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">

                                <div className="flex items-center gap-2 mb-4">

                                    <Tags
                                        size={18}
                                        className="text-emerald-600"
                                    />

                                    <h2 className="font-bold text-gray-900">
                                        Category
                                    </h2>

                                </div>


                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        border border-gray-200
                                        bg-white
                                        outline-none
                                        text-sm
                                        focus:border-emerald-500
                                        focus:ring-4
                                        focus:ring-emerald-50
                                    "
                                >

                                    <option value="">
                                        Select category
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


                            {/* IMAGE */}

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">

                                <div className="flex items-center gap-2 mb-4">

                                    <Image
                                        size={18}
                                        className="text-emerald-600"
                                    />

                                    <h2 className="font-bold text-gray-900">
                                        Product Image
                                    </h2>

                                </div>


                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            image: e.target.files[0],
                                        });
                                    }}
                                    className="
                                        w-full
                                        px-4 py-3
                                        rounded-xl
                                        border border-gray-200
                                        outline-none
                                        text-sm
                                        focus:border-emerald-500
                                        focus:ring-4
                                        focus:ring-emerald-50
                                    "
                                />


                                {/* IMAGE PREVIEW */}

                                {form.image && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">

                                        <img
                                            src={URL.createObjectURL(form.image)}
                                            alt="Preview"
                                            className="w-full h-40 object-cover"
                                        />

                                    </div>
                                )}

                            </div>


                            {/* ACTIONS */}

                            <div className="bg-white border border-gray-200 rounded-2xl p-6">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        w-full
                                        flex items-center justify-center gap-2
                                        bg-emerald-600
                                        hover:bg-emerald-700
                                        disabled:bg-emerald-300
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        shadow-sm
                                        hover:shadow-md
                                        transition-all
                                    "
                                >

                                    <Save size={18} />

                                    {loading
                                        ? "Creating..."
                                        : "Create Product"
                                    }

                                </button>


                                <button
                                    type="button"
                                    onClick={() => navigate("/products")}
                                    className="
                                        w-full
                                        mt-3
                                        py-3
                                        rounded-xl
                                        font-medium
                                        text-gray-600
                                        hover:bg-gray-100
                                        transition
                                    "
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </main>

        </div>
    );
}


export default AddProduct;