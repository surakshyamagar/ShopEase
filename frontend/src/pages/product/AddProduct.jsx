import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";

function AddProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: "",
    });


    useEffect(() => {
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

            await createProduct({
                name: form.name,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                image: form.image,
                category: form.category,
            });

            alert("Product created successfully");

            navigate("/products");

        } catch (error) {

            console.log(error);

            alert("Failed to create product");
        }
    };


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto">

                <div className="bg-white p-6 rounded-lg shadow">

                    <h1 className="text-2xl font-bold mb-6">
                        Add Product
                    </h1>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>

                            <label className="block mb-1 font-medium">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Enter product name"
                                required
                            />

                        </div>


                        <div>

                            <label className="block mb-1 font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Enter description"
                                rows="4"
                                required
                            />

                        </div>


                        <div>

                            <label className="block mb-1 font-medium">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            />

                        </div>


                        <div>

                            <label className="block mb-1 font-medium">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            />

                        </div>


                        <div>

                            <label className="block mb-1 font-medium">
                                Image URL
                            </label>

                            <input
                                type="text"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                placeholder="Enter image URL"
                            />

                        </div>


                        <div>

                            <label className="block mb-1 font-medium">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
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


                        <div className="flex gap-3 pt-4">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
                            >
                                Create Product
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/products")}
                                className="bg-gray-200 px-5 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default AddProduct;