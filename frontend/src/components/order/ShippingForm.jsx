import { useState } from "react";


function ShippingForm({ onSubmit, loading = false }) {

    const [formData, setFormData] = useState({

        fullName: "",
        address: "",
        city: "",
        phone: "",

    });


    // ==========================================
    // HANDLE CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // ==========================================
    // HANDLE SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-xl p-6"
        >

            <h2 className="text-xl font-semibold text-gray-900">
                Shipping Information
            </h2>


            <p className="text-sm text-gray-500 mt-1">
                Enter the address where you want your order delivered.
            </p>


            {/* ==================================
                FULL NAME
            ================================== */}

            <div className="mt-6">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

            </div>


            {/* ==================================
                ADDRESS
            ================================== */}

            <div className="mt-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                </label>

                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

            </div>


            {/* ==================================
                CITY
            ================================== */}

            <div className="mt-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                </label>

                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

            </div>


            {/* ==================================
                PHONE
            ================================== */}

            <div className="mt-4">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                </label>

                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />

            </div>


            {/* ==================================
                SUBMIT
            ================================== */}

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition"
            >

                {loading
                    ? "Placing Order..."
                    : "Place Order"}

            </button>

        </form>

    );
}


export default ShippingForm;