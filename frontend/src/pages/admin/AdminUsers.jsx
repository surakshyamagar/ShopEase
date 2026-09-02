import { useEffect, useState } from "react";
import {
    Users,
    Search,
    LoaderCircle,
    UserCircle,
    Mail,
    CalendarDays,
} from "lucide-react";

import { getCustomers } from "../../services/userService";
import AdminNavbar from "../../components/AdminNavbar";

function AdminUsers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // ================= LOAD CUSTOMERS =================

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);

            const data = await getCustomers();

            setCustomers(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ================= SEARCH =================

    const filteredCustomers = customers.filter((customer) => {

        const searchText = search.toLowerCase();

        return (
            customer.name?.toLowerCase().includes(searchText) ||
            customer.email?.toLowerCase().includes(searchText)
        );
    });

    // ================= DATE =================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= NAVBAR ================= */}

            <AdminNavbar />


            {/* ================= MAIN ================= */}

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 mb-2">

                        <Users size={18} />

                        Customer Management

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Customers
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View all registered customers in your store.
                    </p>

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
                                placeholder="Search customers..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
                            />

                        </div>


                        {/* Count */}

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <span>
                                Total Customers
                            </span>

                            <span className="font-semibold text-gray-900">
                                {customers.length}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="bg-white border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center">

                        <LoaderCircle
                            size={35}
                            className="animate-spin text-emerald-600"
                        />

                        <p className="text-gray-500 mt-4">
                            Loading customers...
                        </p>

                    </div>

                )}


                {/* ================= EMPTY ================= */}

                {!loading && customers.length === 0 && (

                    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 flex items-center justify-center">

                            <Users
                                size={30}
                                className="text-emerald-600"
                            />

                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 mt-5">
                            No customers yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Registered customers will appear here.
                        </p>

                    </div>

                )}


                {/* ================= NO SEARCH RESULTS ================= */}

                {!loading &&
                    customers.length > 0 &&
                    filteredCustomers.length === 0 && (

                        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                            <Search
                                size={35}
                                className="mx-auto text-gray-400"
                            />

                            <h2 className="text-lg font-semibold mt-4">
                                No customers found
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Try searching for a different customer.
                            </p>

                        </div>
                    )}


                {/* ================= CUSTOMER GRID ================= */}

                {!loading &&
                    filteredCustomers.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredCustomers.map((customer) => (

                                <div
                                    key={customer._id}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                                >

                                    {/* Profile */}

                                    <div className="flex items-center gap-4">

                                        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">

                                            <UserCircle
                                                size={30}
                                                className="text-emerald-600"
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h2 className="font-semibold text-gray-900 truncate">
                                                {customer.name}
                                            </h2>

                                            <span className="inline-flex mt-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                                                CUSTOMER
                                            </span>

                                        </div>

                                    </div>


                                    {/* Information */}

                                    <div className="mt-6 space-y-4">

                                        {/* Email */}

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">

                                                <Mail
                                                    size={17}
                                                    className="text-gray-500"
                                                />

                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs text-gray-400">
                                                    Email
                                                </p>

                                                <p className="text-sm text-gray-700 truncate">
                                                    {customer.email}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Joined */}

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">

                                                <CalendarDays
                                                    size={17}
                                                    className="text-gray-500"
                                                />

                                            </div>

                                            <div>

                                                <p className="text-xs text-gray-400">
                                                    Joined
                                                </p>

                                                <p className="text-sm text-gray-700">
                                                    {formatDate(customer.createdAt)}
                                                </p>

                                            </div>

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

export default AdminUsers;