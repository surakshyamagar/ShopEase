import api from "./api";

const getCategories = async () => {
    const response = await api.get("/category");
    return response.data.data;
}

// (categoryData): data sent by client
// later http post request sends that data to backend
const createCategory = async (categoryData) => {
    const response = await api.post("/category", categoryData);
    return response.data.data;
}   

const updateCategory = async(id, categoryData) => {
    const response = await api.put(`/category/${id}`, categoryData);
    return response.data.data;
}

const deleteCategory = async (id) => {
    const response = await api.delete(`/category/${id}`);
    return response.data.data;
}


export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};