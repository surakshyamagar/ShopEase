import api from "./api";

const createReview = async (reviewData) => {
    const response = await api.post("/review/add", reviewData);

    return response.data.data;
};

const getProductReviews = async (productId) => {
    const response = await api.get(`/review/product/${productId}`);

    return response.data.data;
};

const updateReview = async (id, reviewData) => {
    const response = await api.put(`/review/update/${id}`, reviewData);

    return response.data.data;
};

const deleteReview = async (id) => {
    const response = await api.delete(`/review/delete/${id}`);

    return response.data.data;
};

export {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
};