// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//     ArrowLeft,
//     Package,
//     Save,
//     LoaderCircle,
// } from "lucide-react";

// import {
//     getProduct,
//     updateProduct,
// } from "../../services/productService";

// import { getCategories } from "../../services/categoryService";

// import AdminNavbar from "../../components/AdminNavbar";


// function EditProduct() {

//     // =====================================================
//     // URL + NAVIGATION
//     // =====================================================

//     const { id } = useParams();

//     const navigate = useNavigate();


//     // =====================================================
//     // STATE
//     // =====================================================

//     const [categories, setCategories] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         price: "",
//         stock: "",
//         image: "",
//         category: "",
//     });


//     // =====================================================
//     // LOAD PRODUCT + CATEGORIES
//     // =====================================================

//     useEffect(() => {

//         loadData();

//     }, [id]);


//     const loadData = async () => {

//         try {

//             setLoading(true);

//             const [productData, categoriesData] =
//                 await Promise.all([
//                     getProduct(id),
//                     getCategories(),
//                 ]);


//             setForm({
//                 name: productData.name || "",

//                 description:
//                     productData.description || "",

//                 price:
//                     productData.price ?? "",

//                 stock:
//                     productData.stock ?? "",

//                 image:
//                     productData.image || "",

//                 category:
//                     typeof productData.category === "object"
//                         ? productData.category?._id || ""
//                         : productData.category || "",
//             });


//             setCategories(categoriesData);

//         } catch (error) {

//             console.log(error);

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to load product"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };


//     // =====================================================
//     // HANDLE INPUT CHANGE
//     // =====================================================

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setForm((currentForm) => ({
//             ...currentForm,
//             [name]: value,
//         }));

//     };


//     // =====================================================
//     // UPDATE PRODUCT
//     // =====================================================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setSaving(true);


//             await updateProduct(id, {
//                 name: form.name,
//                 description: form.description,
//                 price: Number(form.price),
//                 stock: Number(form.stock),
//                 image: form.image,
//                 category: form.category,
//             });


//             alert("Product updated successfully");


//             // =================================================
//             // AFTER SUCCESSFUL UPDATE
//             // GO BACK TO ADMIN PRODUCTS PAGE
//             // =================================================

//             navigate("/products");


//         } catch (error) {

//             console.log(error);

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to update product"
//             );

//         } finally {

//             setSaving(false);

//         }

//     };


//     // =====================================================
//     // BACK TO PRODUCTS
//     // =====================================================

//     const handleBack = () => {

//         navigate("/admin/products");

//     };


//     // =====================================================
//     // LOADING SCREEN
//     // =====================================================

//     if (loading) {

//         return (

//             <div className="min-h-screen bg-gray-50">

//                 <AdminNavbar />

//                 <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">

//                     <div className="text-center">

//                         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">

//                             <LoaderCircle
//                                 size={28}
//                                 className="animate-spin text-emerald-600"
//                             />

//                         </div>


//                         <p className="mt-4 text-sm font-medium text-gray-500">

//                             Loading product...

//                         </p>

//                     </div>

//                 </main>

//             </div>

//         );

//     }


//     // =====================================================
//     // MAIN UI
//     // =====================================================

//     return (

//         <div className="min-h-screen bg-gray-50 text-gray-900">


//             {/* =================================================
//                 ADMIN NAVBAR
//             ================================================= */}

//             <AdminNavbar />


//             {/* =================================================
//                 MAIN
//             ================================================= */}

//             <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">


//                 {/* =================================================
//                     BACK BUTTON
//                 ================================================= */}

//                 <button
//                     type="button"
//                     onClick={handleBack}
//                     className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
//                 >

//                     <ArrowLeft size={17} />

//                     Back to Products

//                 </button>


//                 {/* =================================================
//                     PAGE HEADER
//                 ================================================= */}

//                 <div className="mb-8">

//                     <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">

//                         <Package size={18} />

//                         Store Management

//                     </div>


//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

//                         Edit Product

//                     </h1>


//                     <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">

//                         Update the product information, pricing,
//                         inventory and category.

//                     </p>

//                 </div>


//                 {/* =================================================
//                     FORM CARD
//                 ================================================= */}

//                 <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


//                     {/* =================================================
//                         CARD HEADER
//                     ================================================= */}

//                     <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">

//                         <div className="flex items-center gap-3">

//                             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

//                                 <Package size={20} />

//                             </div>


//                             <div>

//                                 <h2 className="font-bold text-gray-900">

//                                     Product Information

//                                 </h2>

//                                 <p className="mt-1 text-sm text-gray-500">

//                                     Make changes to this product.

//                                 </p>

//                             </div>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         FORM
//                     ================================================= */}

//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-6 p-6 sm:p-8"
//                     >


//                         {/* =================================================
//                             PRODUCT NAME
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="name"
//                                 className="mb-2 block text-sm font-semibold text-gray-700"
//                             >

//                                 Product Name

//                             </label>


//                             <input
//                                 id="name"
//                                 type="text"
//                                 name="name"
//                                 value={form.name}
//                                 onChange={handleChange}
//                                 placeholder="Enter product name"
//                                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                                 required
//                             />

//                         </div>


//                         {/* =================================================
//                             DESCRIPTION
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="description"
//                                 className="mb-2 block text-sm font-semibold text-gray-700"
//                             >

//                                 Description

//                             </label>


//                             <textarea
//                                 id="description"
//                                 name="description"
//                                 value={form.description}
//                                 onChange={handleChange}
//                                 rows="5"
//                                 placeholder="Enter product description"
//                                 className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                                 required
//                             />

//                         </div>


//                         {/* =================================================
//                             PRICE + STOCK
//                         ================================================= */}

//                         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">


//                             {/* PRICE */}

//                             <div>

//                                 <label
//                                     htmlFor="price"
//                                     className="mb-2 block text-sm font-semibold text-gray-700"
//                                 >

//                                     Price

//                                 </label>


//                                 <div className="relative">

//                                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">

//                                         $

//                                     </span>


//                                     <input
//                                         id="price"
//                                         type="number"
//                                         name="price"
//                                         value={form.price}
//                                         onChange={handleChange}
//                                         min="0"
//                                         step="0.01"
//                                         placeholder="0.00"
//                                         className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                                         required
//                                     />

//                                 </div>

//                             </div>


//                             {/* STOCK */}

//                             <div>

//                                 <label
//                                     htmlFor="stock"
//                                     className="mb-2 block text-sm font-semibold text-gray-700"
//                                 >

//                                     Stock

//                                 </label>


//                                 <input
//                                     id="stock"
//                                     type="number"
//                                     name="stock"
//                                     value={form.stock}
//                                     onChange={handleChange}
//                                     min="0"
//                                     placeholder="0"
//                                     className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                                     required
//                                 />

//                             </div>

//                         </div>


//                         {/* =================================================
//                             IMAGE URL
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="image"
//                                 className="mb-2 block text-sm font-semibold text-gray-700"
//                             >

//                                 Image URL

//                             </label>


//                             <input
//                                 id="image"
//                                 type="text"
//                                 name="image"
//                                 value={form.image}
//                                 onChange={handleChange}
//                                 placeholder="https://example.com/product-image.jpg"
//                                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                             />


//                             {/* IMAGE PREVIEW */}

//                             {form.image && (

//                                 <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">

//                                     <img
//                                         src={form.image}
//                                         alt="Product preview"
//                                         className="h-48 w-full object-contain"
//                                         onError={(e) => {
//                                             e.currentTarget.style.display =
//                                                 "none";
//                                         }}
//                                     />

//                                 </div>

//                             )}

//                         </div>


//                         {/* =================================================
//                             CATEGORY
//                         ================================================= */}

//                         <div>

//                             <label
//                                 htmlFor="category"
//                                 className="mb-2 block text-sm font-semibold text-gray-700"
//                             >

//                                 Category

//                             </label>


//                             <select
//                                 id="category"
//                                 name="category"
//                                 value={form.category}
//                                 onChange={handleChange}
//                                 className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
//                                 required
//                             >

//                                 <option value="">
//                                     Select category
//                                 </option>


//                                 {categories.map((category) => (

//                                     <option
//                                         key={category._id}
//                                         value={category._id}
//                                     >

//                                         {category.name}

//                                     </option>

//                                 ))}

//                             </select>

//                         </div>


//                         {/* =================================================
//                             BUTTONS
//                         ================================================= */}

//                         <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">


//                             {/* CANCEL */}

//                             <button
//                                 type="button"
//                                 onClick={handleBack}
//                                 disabled={saving}
//                                 className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//                             >

//                                 Cancel

//                             </button>


//                             {/* UPDATE */}

//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
//                             >

//                                 {saving ? (

//                                     <>
//                                         <LoaderCircle
//                                             size={17}
//                                             className="animate-spin"
//                                         />

//                                         Updating...
//                                     </>

//                                 ) : (

//                                     <>
//                                         <Save size={17} />

//                                         Update Product
//                                     </>

//                                 )}

//                             </button>

//                         </div>

//                     </form>

//                 </div>

//             </main>

//         </div>

//     );

// }


// export default EditProduct;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Package,
    Save,
    LoaderCircle,
} from "lucide-react";

import {
    getProduct,
    updateProduct,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";

import AdminNavbar from "../../components/AdminNavbar";


function EditProduct() {

    // =====================================================
    // URL + NAVIGATION
    // =====================================================

    const { id } = useParams();

    const navigate = useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        newImage: null,
        category: "",
    });


    // =====================================================
    // LOAD PRODUCT + CATEGORIES
    // =====================================================

    useEffect(() => {

        loadData();

    }, [id]);


    const loadData = async () => {

        try {

            setLoading(true);

            const [productData, categoriesData] =
                await Promise.all([
                    getProduct(id),
                    getCategories(),
                ]);


            setForm({
                name: productData.name || "",

                description:
                    productData.description || "",

                price:
                    productData.price ?? "",

                stock:
                    productData.stock ?? "",

                // Existing Cloudinary image URL
                image:
                    productData.image || "",

                // New image selected by admin
                newImage: null,

                category:
                    typeof productData.category === "object"
                        ? productData.category?._id || ""
                        : productData.category || "",
            });


            setCategories(categoriesData);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to load product"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

    };


    // =====================================================
    // HANDLE IMAGE CHANGE
    // =====================================================

    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // Make sure selected file is an image
        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            e.target.value = "";

            return;
        }

        // Optional 5MB check
        if (file.size > 5 * 1024 * 1024) {

            alert("Image size must be less than 5MB.");

            e.target.value = "";

            return;
        }

        setForm((currentForm) => ({
            ...currentForm,
            newImage: file,
        }));

    };


    // =====================================================
    // UPDATE PRODUCT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);


            // =============================================
            // CREATE FORMDATA
            // =============================================

            const formData = new FormData();


            // =============================================
            // PRODUCT DATA
            // =============================================

            formData.append("name", form.name);

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "price",
                Number(form.price)
            );

            formData.append(
                "stock",
                Number(form.stock)
            );

            formData.append(
                "category",
                form.category
            );


            // =============================================
            // NEW IMAGE
            // =============================================

            // Only send image when admin selects
            // a new image.

            if (form.newImage) {

                formData.append(
                    "image",
                    form.newImage
                );

            }


            // =============================================
            // UPDATE PRODUCT
            // =============================================

            await updateProduct(id, formData);


            alert("Product updated successfully");


            // =============================================
            // GO BACK TO PRODUCTS
            // =============================================

            navigate("/products");


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // BACK TO PRODUCTS
    // =====================================================

    const handleBack = () => {

        navigate("/products");

    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <AdminNavbar />

                <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">

                    <div className="text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">

                            <LoaderCircle
                                size={28}
                                className="animate-spin text-emerald-600"
                            />

                        </div>


                        <p className="mt-4 text-sm font-medium text-gray-500">

                            Loading product...

                        </p>

                    </div>

                </main>

            </div>

        );

    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">


            {/* =================================================
                ADMIN NAVBAR
            ================================================= */}

            <AdminNavbar />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">


                {/* =================================================
                    BACK BUTTON
                ================================================= */}

                <button
                    type="button"
                    onClick={handleBack}
                    className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                >

                    <ArrowLeft size={17} />

                    Back to Products

                </button>


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mb-8">

                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">

                        <Package size={18} />

                        Store Management

                    </div>


                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                        Edit Product

                    </h1>


                    <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">

                        Update the product information, pricing,
                        inventory and category.

                    </p>

                </div>


                {/* =================================================
                    FORM CARD
                ================================================= */}

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">


                    {/* =================================================
                        CARD HEADER
                    ================================================= */}

                    <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                                <Package size={20} />

                            </div>


                            <div>

                                <h2 className="font-bold text-gray-900">

                                    Product Information

                                </h2>

                                <p className="mt-1 text-sm text-gray-500">

                                    Make changes to this product.

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 p-6 sm:p-8"
                    >


                        {/* =================================================
                            PRODUCT NAME
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >

                                Product Name

                            </label>


                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                                required
                            />

                        </div>


                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >

                                Description

                            </label>


                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter product description"
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                                required
                            />

                        </div>


                        {/* =================================================
                            PRICE + STOCK
                        ================================================= */}

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">


                            {/* PRICE */}

                            <div>

                                <label
                                    htmlFor="price"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >

                                    Price

                                </label>


                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">

                                        $

                                    </span>


                                    <input
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                                        required
                                    />

                                </div>

                            </div>


                            {/* STOCK */}

                            <div>

                                <label
                                    htmlFor="stock"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >

                                    Stock

                                </label>


                                <input
                                    id="stock"
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                            PRODUCT IMAGE
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="image"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >

                                Product Image

                            </label>


                            {/* =============================================
                                CURRENT / NEW IMAGE PREVIEW
                            ============================================= */}

                            {(form.newImage || form.image) && (

                                <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">

                                    <img
                                        src={
                                            form.newImage
                                                ? URL.createObjectURL(form.newImage)
                                                : form.image
                                        }
                                        alt="Product preview"
                                        className="h-56 w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                </div>

                            )}


                            {/* =============================================
                                FILE INPUT
                            ============================================= */}

                            <input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-600 hover:file:bg-emerald-100 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                            />


                            {/* =============================================
                                IMAGE INFORMATION
                            ============================================= */}

                            {form.newImage ? (

                                <p className="mt-2 text-xs text-emerald-600">

                                    New image selected:{" "}
                                    <span className="font-semibold">

                                        {form.newImage.name}

                                    </span>

                                </p>

                            ) : (

                                <p className="mt-2 text-xs text-gray-500">

                                    Select a new image if you want to
                                    replace the current product image.
                                    Leave empty to keep the current image.

                                </p>

                            )}

                        </div>


                        {/* =================================================
                            CATEGORY
                        ================================================= */}

                        <div>

                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >

                                Category

                            </label>


                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
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


                        {/* =================================================
                            BUTTONS
                        ================================================= */}

                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">


                            {/* CANCEL */}

                            <button
                                type="button"
                                onClick={handleBack}
                                disabled={saving}
                                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                Cancel

                            </button>


                            {/* UPDATE */}

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {saving ? (

                                    <>

                                        <LoaderCircle
                                            size={17}
                                            className="animate-spin"
                                        />

                                        Updating...

                                    </>

                                ) : (

                                    <>

                                        <Save size={17} />

                                        Update Product

                                    </>

                                )}

                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>

    );

}


export default EditProduct;

