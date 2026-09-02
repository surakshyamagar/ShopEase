import api from "./api";


// =====================================================
// CUSTOMER
// =====================================================


// Create order
const createOrder = async (shippingData) => {

    const response = await api.post(
        "/order",
        shippingData
    );

    return response.data.data;
};


// Get customer's orders
const getMyOrders = async () => {

    const response = await api.get(
        "/order/my-orders"
    );

    return response.data.data;
};


// Get one customer's order
const getOrder = async (id) => {

    const response = await api.get(
        `/order/my-orders/${id}`
    );

    return response.data.data;
};


// Cancel customer's order
const cancelOrder = async (id) => {

    const response = await api.delete(
        `/order/my-orders/${id}`
    );

    return response.data.data;
};


// =====================================================
// ADMIN
// =====================================================


// Get all customer orders
const getAllOrders = async () => {

    const response = await api.get(
        "/order/admin"
    );

    return response.data.data;
};


// Get any order
const getAdminOrder = async (id) => {

    const response = await api.get(
        `/order/admin/${id}`
    );

    return response.data.data;
};


// Update order status
const updateOrderStatus = async (
    id,
    status
) => {

    const response = await api.put(

        `/order/admin/${id}/status`,

        {
            status,
        }

    );

    return response.data.data;
};


export {

    createOrder,

    getMyOrders,

    getOrder,

    cancelOrder,

    getAllOrders,

    getAdminOrder,

    updateOrderStatus,

};