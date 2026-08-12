import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProduct,
    updateProduct,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";


function EditProduct() {

    // Get product ID from URL
    const { id } = useParams();

    // Used to move to another page
    const navigate = useNavigate();


    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);


    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    });


    // Load product + categories
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [id]);


    // Get existing product
    const loadProduct = async () => {

        try {

            const data = await getProduct(id);

            console.log("PRODUCT:", data);

            setForm({
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                image: data.image,
                category: data.category,
            });

        } catch (error) {

            console.log(error);

            alert("Failed to load product");

        } finally {

            setLoading(false);

        }
    };


    // Get categories
    const loadCategories = async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.log(error);

        }
    };


    // Handle input changes
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    // Update product
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateProduct(id, {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                image: form.image,
                category: form.category,
            });


            alert("Product updated successfully");


            // Go back to product list
            navigate("/products");

        } catch (error) {

            console.log(error);

            alert("Failed to update product");

        }
    };


    // Loading screen
    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <p className="text-gray-500">
                    Loading product...
                </p>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-100">


            {/* HEADER */}

            <header className="bg-white border-b">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="h-16 flex items-center justify-between">

                        <button
                            onClick={() => navigate("/products")}
                            className="text-2xl font-bold text-blue-600"
                        >
                            ShopEase
                        </button>


                        <nav className="flex gap-6">

                            <button
                                onClick={() => navigate("/products")}
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Products
                            </button>

                            <button
                                onClick={() => navigate("/categories")}
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Categories
                            </button>

                        </nav>

                    </div>

                </div>

            </header>


            {/* MAIN */}

            <main className="max-w-2xl mx-auto px-6 py-8">


                <div className="bg-white rounded-xl shadow-sm border p-6">


                    {/* TITLE */}

                    <div className="mb-6">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit Product
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Update product information
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* NAME */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* PRICE */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* STOCK */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                        </div>


                        {/* IMAGE */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
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


                        {/* BUTTONS */}

                        <div className="flex gap-3 pt-3">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium"
                            >
                                Update Product
                            </button>


                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg font-medium"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>

    );
}

export default EditProduct;