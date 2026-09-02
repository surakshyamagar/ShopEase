import api from "./api";

const addToCart = async (productId, quantity = 1) => {
    const response = await api.post("/cart", {
        productId,
        quantity,
    });

    return response.data.data;
};

const getCart = async () => {
    const response = await api.get("/cart");

    return response.data.data;
};

const updateCartItem = async (productId, quantity) => {
    const response = await api.put("/cart", {
        productId,
        quantity,
    });

    return response.data.data;
};

const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);

    return response.data.data;
};

const clearCart = async () => {
    const response = await api.delete("/cart");

    return response.data.data;
};

export {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};