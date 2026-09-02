import { useEffect, useState } from "react";

import {
    Plus,
    Pencil,
    Trash2,
    Tags,
    X,
} from "lucide-react";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../services/categoryService";

import AdminNavbar from "../../components/AdminNavbar";

function Category() {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });


    // =====================================================
    // GET CATEGORIES
    // =====================================================

    const loadCategories = async () => {

        try {

            setLoading(true);

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed to load categories"
            );

        } finally {

            setLoading(false);

        }

    };


    // Load categories when page opens
    useEffect(() => {

        loadCategories();

    }, []);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =====================================================
    // OPEN ADD FORM
    // =====================================================

    const handleAdd = () => {

        setEditingId(null);

        setFormData({
            name: "",
            description: "",
        });

        setShowForm(true);

    };


    // =====================================================
    // OPEN EDIT FORM
    // =====================================================

    const handleEdit = (category) => {

        setEditingId(category._id);

        setFormData({
            name: category.name || "",
            description: category.description || "",
        });

        setShowForm(true);

    };


    // =====================================================
    // CLOSE FORM
    // =====================================================

    const handleCancel = () => {

        setShowForm(false);

        setEditingId(null);

        setFormData({
            name: "",
            description: "",
        });

    };


    // =====================================================
    // CREATE / UPDATE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {

            alert("Category name is required");

            return;
        }


        try {

            if (editingId) {

                // UPDATE
                await updateCategory(
                    editingId,
                    formData
                );

                alert("Category updated successfully");

            } else {

                // CREATE
                await createCategory(formData);

                alert("Category created successfully");

            }


            // Refresh categories
            await loadCategories();

            // Close form
            handleCancel();

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteCategory(id);

            alert("Category deleted successfully");

            await loadCategories();

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    };


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
                PAGE HEADER
            ================================================= */}

            <div className="border-b border-gray-200 bg-white">

                <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">

                                    <Tags size={23} />

                                </div>

                                <div>

                                    <h1 className="text-2xl font-bold text-gray-900">

                                        Categories

                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">

                                        Manage your store categories

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ADD BUTTON */}

                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                        >

                            <Plus size={18} />

                            Add Category

                        </button>

                    </div>

                </div>

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">


                {/* =================================================
                    FORM
                ================================================= */}

                {showForm && (

                    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">

                                    {editingId
                                        ? "Edit Category"
                                        : "Add New Category"
                                    }

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">

                                    {editingId
                                        ? "Update category information"
                                        : "Create a new store category"
                                    }

                                </p>

                            </div>


                            <button
                                onClick={handleCancel}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">

                                    Category Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">

                                    Description

                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="flex items-center gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >

                                    {editingId
                                        ? "Update Category"
                                        : "Create Category"
                                    }

                                </button>


                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                >

                                    Cancel

                                </button>

                            </div>

                        </form>

                    </div>

                )}


                {/* =================================================
                    CATEGORY LIST
                ================================================= */}

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* TABLE HEADER */}

                    <div className="border-b border-gray-200 px-6 py-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">

                                    All Categories

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">

                                    {categories.length} categories

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className="flex items-center justify-center py-16">

                            <p className="text-sm text-gray-500">

                                Loading categories...

                            </p>

                        </div>

                    ) : categories.length === 0 ? (

                        /* EMPTY */

                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">

                                <Tags size={28} />

                            </div>

                            <h3 className="text-lg font-bold text-gray-900">

                                No categories yet

                            </h3>

                            <p className="mt-2 max-w-md text-sm text-gray-500">

                                Create your first category to organize your products.

                            </p>

                            <button
                                onClick={handleAdd}
                                className="mt-5 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >

                                <Plus size={17} />

                                Add Category

                            </button>

                        </div>

                    ) : (

                        /* TABLE */

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b border-gray-100 bg-gray-50 text-left">

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">

                                            Category

                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">

                                            Description

                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {categories.map((category) => (

                                        <tr
                                            key={category._id}
                                            className="border-b border-gray-100 transition hover:bg-gray-50"
                                        >

                                            {/* CATEGORY */}

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">

                                                        <Tags size={19} />

                                                    </div>

                                                    <div>

                                                        <p className="font-semibold text-gray-900">

                                                            {category.name}

                                                        </p>

                                                        <p className="text-xs text-gray-400">

                                                            ID: {category._id}

                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* DESCRIPTION */}

                                            <td className="px-6 py-5">

                                                <p className="max-w-md text-sm text-gray-600">

                                                    {category.description || "No description"}

                                                </p>

                                            </td>


                                            {/* ACTIONS */}

                                            <td className="px-6 py-5">

                                                <div className="flex justify-end gap-2">

                                                    {/* EDIT */}

                                                    <button
                                                        onClick={() =>
                                                            handleEdit(category)
                                                        }
                                                        className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50"
                                                        title="Edit category"
                                                    >

                                                        <Pencil size={18} />

                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(category._id)
                                                        }
                                                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                                        title="Delete category"
                                                    >

                                                        <Trash2 size={18} />

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>

    );
}

export default Category;