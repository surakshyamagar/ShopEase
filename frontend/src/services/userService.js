import api from "./api";

// Get all customers
const getCustomers = async () => {
    const response = await api.get("/users/customers");

    return response.data.data;
};

export {
    getCustomers,
};