import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAllOrders,
    updateOrderStatus,
} from "../../services/orderService";

import AdminNavbar from "../../components/AdminNavbar";

import {
    ShoppingBag,
    ArrowRight,
    RefreshCw,
    Search,
    Eye,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";


function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [status, setStatus] = useState("");

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [updatingId, setUpdatingId] = useState(null);


    // =====================================================
    // LOAD ORDERS
    // =====================================================

    useEffect(() => {

        loadOrders();

    }, []);


    const loadOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const handleStatusChange = async (
        orderId,
        newStatus
    ) => {

        try {

            setUpdatingId(orderId);

            const updatedOrder =
                await updateOrderStatus(
                    orderId,
                    newStatus
                );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order._id === updatedOrder._id
                        ? updatedOrder
                        : order
                )
            );

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredOrders = orders.filter((order) => {

        const searchText =
            search.toLowerCase().trim();


        const matchesSearch =
            !searchText ||
            order._id
                ?.toLowerCase()
                .includes(searchText) ||

            order.user?.name
                ?.toLowerCase()
                .includes(searchText) ||

            order.user?.email
                ?.toLowerCase()
                .includes(searchText);


        const matchesStatus =
            !status ||
            order.status === status;


        return (
            matchesSearch &&
            matchesStatus
        );

    });


    // =====================================================
    // STATUS STYLE
    // =====================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Pending":
                return "bg-amber-50 text-amber-600 border-amber-200";

            case "Processing":
                return "bg-blue-50 text-blue-600 border-blue-200";

            case "Shipped":
                return "bg-purple-50 text-purple-600 border-purple-200";

            case "Delivered":
                return "bg-emerald-50 text-emerald-600 border-emerald-200";

            case "Cancelled":
                return "bg-red-50 text-red-600 border-red-200";

            default:
                return "bg-gray-50 text-gray-600 border-gray-200";

        }

    };


    // =====================================================
    // STATUS ICON
    // =====================================================

    const getStatusIcon = (status) => {

        switch (status) {

            case "Pending":
                return <Clock size={14} />;

            case "Processing":
                return <Package size={14} />;

            case "Shipped":
                return <Truck size={14} />;

            case "Delivered":
                return <CheckCircle size={14} />;

            case "Cancelled":
                return <XCircle size={14} />;

            default:
                return null;

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50">

                <AdminNavbar />

                <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">

                            <RefreshCw
                                size={22}
                                className="animate-spin text-emerald-500"
                            />

                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Loading orders...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="min-h-screen bg-gray-50">

                <AdminNavbar />

                <main className="p-5 sm:p-8">

                    <div className="mx-auto max-w-7xl">

                        <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">

                                <XCircle size={26} />

                            </div>

                            <h1 className="mt-4 text-xl font-bold text-gray-900">

                                Unable to load orders

                            </h1>

                            <p className="mt-2 text-sm text-red-500">

                                {error}

                            </p>

                            <button
                                onClick={loadOrders}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                            >

                                <RefreshCw size={16} />

                                Try Again

                            </button>

                        </div>

                    </div>

                </main>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="min-h-screen bg-gray-50 text-gray-900">

            {/* =================================================
                ADMIN NAVBAR
            ================================================= */}

            <AdminNavbar />


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="p-5 sm:p-8">

                <div className="mx-auto max-w-7xl">


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">

                                <ShoppingBag size={17} />

                                Order Management

                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

                                Orders

                            </h1>

                            <p className="mt-2 text-sm text-gray-500">

                                Manage customer orders and update their status.

                            </p>

                        </div>


                        <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-600"
                        >

                            Dashboard

                            <ArrowRight size={16} />

                        </Link>

                    </div>


                    {/* =================================================
                        STAT SUMMARY
                    ================================================= */}

                    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">


                        {/* ALL */}

                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                            <p className="text-xs font-medium text-gray-500">
                                All Orders
                            </p>

                            <p className="mt-2 text-2xl font-bold">
                                {orders.length}
                            </p>

                        </div>


                        {/* PENDING */}

                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">

                            <p className="text-xs font-medium text-amber-600">
                                Pending
                            </p>

                            <p className="mt-2 text-2xl font-bold text-amber-700">

                                {
                                    orders.filter(
                                        (order) =>
                                            order.status === "Pending"
                                    ).length
                                }

                            </p>

                        </div>


                        {/* PROCESSING */}

                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

                            <p className="text-xs font-medium text-blue-600">
                                Processing
                            </p>

                            <p className="mt-2 text-2xl font-bold text-blue-700">

                                {
                                    orders.filter(
                                        (order) =>
                                            order.status === "Processing"
                                    ).length
                                }

                            </p>

                        </div>


                        {/* SHIPPED */}

                        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">

                            <p className="text-xs font-medium text-purple-600">
                                Shipped
                            </p>

                            <p className="mt-2 text-2xl font-bold text-purple-700">

                                {
                                    orders.filter(
                                        (order) =>
                                            order.status === "Shipped"
                                    ).length
                                }

                            </p>

                        </div>


                        {/* DELIVERED */}

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

                            <p className="text-xs font-medium text-emerald-600">
                                Delivered
                            </p>

                            <p className="mt-2 text-2xl font-bold text-emerald-700">

                                {
                                    orders.filter(
                                        (order) =>
                                            order.status === "Delivered"
                                    ).length
                                }

                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        FILTER BAR
                    ================================================= */}

                    <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

                        <div className="flex flex-col gap-3 lg:flex-row">


                            {/* SEARCH */}

                            <div className="relative flex-1">

                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search order ID, customer name or email..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                                />

                            </div>


                            {/* STATUS */}

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            >

                                <option value="">
                                    All Statuses
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>


                            {/* REFRESH */}

                            <button
                                onClick={loadOrders}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >

                                <RefreshCw size={16} />

                                Refresh

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        TABLE
                    ================================================= */}

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="border-b border-gray-100 px-5 py-5">

                            <h2 className="font-bold">
                                Customer Orders
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">

                                {filteredOrders.length} order
                                {filteredOrders.length !== 1
                                    ? "s"
                                    : ""}

                                {" "}found

                            </p>

                        </div>


                        {filteredOrders.length === 0 ? (

                            <div className="px-5 py-16 text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">

                                    <ShoppingBag size={25} />

                                </div>

                                <h3 className="mt-4 font-bold">
                                    No orders found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Try changing your search or filter.
                                </p>

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[850px]">

                                    <thead>

                                        <tr className="border-b border-gray-100 bg-gray-50 text-left">

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Order
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Customer
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Total
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Date
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredOrders.map((order) => (

                                            <tr
                                                key={order._id}
                                                className="border-b border-gray-50 transition hover:bg-gray-50/70"
                                            >


                                                {/* ORDER */}

                                                <td className="px-5 py-5">

                                                    <p className="font-semibold text-gray-900">

                                                        #
                                                        {order._id
                                                            .slice(-8)
                                                            .toUpperCase()}

                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">

                                                        {order.items?.length || 0}
                                                        {" "}
                                                        item
                                                        {order.items?.length !== 1
                                                            ? "s"
                                                            : ""}

                                                    </p>

                                                </td>


                                                {/* CUSTOMER */}

                                                <td className="px-5 py-5">

                                                    <p className="font-medium">

                                                        {order.user?.name ||
                                                            "Customer"}

                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">

                                                        {order.user?.email ||
                                                            "-"}

                                                    </p>

                                                </td>


                                                {/* TOTAL */}

                                                <td className="px-5 py-5">

                                                    <p className="font-bold">

                                                        $
                                                        {Number(
                                                            order.totalAmount
                                                        ).toFixed(2)}

                                                    </p>

                                                </td>


                                                {/* STATUS */}

                                                <td className="px-5 py-5">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                                            order.status
                                                        )}`}
                                                    >

                                                        {getStatusIcon(
                                                            order.status
                                                        )}

                                                        {order.status}

                                                    </span>

                                                </td>


                                                {/* DATE */}

                                                <td className="px-5 py-5">

                                                    <p className="text-sm text-gray-600">

                                                        {new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()}

                                                    </p>

                                                </td>


                                                {/* ACTION */}

                                                <td className="px-5 py-5">

                                                    <div className="flex items-center justify-end gap-2">


                                                        {/* STATUS UPDATE */}

                                                        <select
                                                            value={order.status}
                                                            disabled={
                                                                updatingId ===
                                                                order._id
                                                            }
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    order._id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium outline-none transition focus:border-emerald-400"
                                                        >

                                                            <option value="Pending">
                                                                Pending
                                                            </option>

                                                            <option value="Processing">
                                                                Processing
                                                            </option>

                                                            <option value="Shipped">
                                                                Shipped
                                                            </option>

                                                            <option value="Delivered">
                                                                Delivered
                                                            </option>

                                                            <option value="Cancelled">
                                                                Cancelled
                                                            </option>

                                                        </select>


                                                        {/* VIEW DETAILS */}

                                                        <Link
                                                            to={`/admin/orders/${order._id}`}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                                        >

                                                            <Eye size={16} />

                                                        </Link>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

}


export default AdminOrders;