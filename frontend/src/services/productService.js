import api from "./api";

const createProduct = async(productData) => {
    const response = await api.post("/product/add", productData);
    return response.data.data;
}

const getProducts = async() => {
    const response = await api.get("/product/getAll");
    return response.data.data;
}

const getProduct = async(id) => {
    const response = await api.get(`/product/getOne/${id}`);
    return response.data.data;
}

const updateProduct = async (id, productData) => {
    const response = await api.put(`/product/update/${id}`, productData);
    return response.data.data;
}

const deleteProduct = async (id) => {
    const response = await api.delete(`/product/delete/${id}`);
    return response.data.data;
}

export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}