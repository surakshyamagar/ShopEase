// import api from "./api";

// const createProduct = async(productData) => {
//     const response = await api.post("/product/add", productData);
//     return response.data.data;
// }

// const getProducts = async() => {
//     const response = await api.get("/product/getAll");
//     return response.data.data;
// }

// const getProduct = async(id) => {
//     const response = await api.get(`/product/getOne/${id}`);
//     return response.data.data;
// }


// // FILTER / SEARCH PRODUCTS
// const filterProducts = async (search, category) => {
//     const response = await api.get("/product/filter", {
//         params: {
//             search,
//             category,
//         },
//     });

//     return response.data.data;
// };
// const updateProduct = async (id, productData) => {
//     const response = await api.put(`/product/update/${id}`, productData);
//     return response.data.data;
// }

// const deleteProduct = async (id) => {
//     const response = await api.delete(`/product/delete/${id}`);
//     return response.data.data;
// }


// export {
//     createProduct,
//     getProducts,
//     getProduct,
//     filterProducts,
//     updateProduct,
//     deleteProduct,
// }


import api from "./api";


// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (formData) => {
    const response = await api.post(
        "/product/add",
        formData
    );

    return response.data.data;
};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getProducts = async () => {
    const response = await api.get("/product/getAll");

    return response.data.data;
};


// =====================================================
// GET ONE PRODUCT
// =====================================================

const getProduct = async (id) => {
    const response = await api.get(
        `/product/getOne/${id}`
    );

    return response.data.data;
};


// =====================================================
// FILTER / SEARCH PRODUCTS
// =====================================================

const filterProducts = async (search, category) => {
    const response = await api.get(
        "/product/filter",
        {
            params: {
                search,
                category,
            },
        }
    );

    return response.data.data;
};


// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (id, formData) => {
    const response = await api.put(
        `/product/update/${id}`,
        formData
    );

    return response.data.data;
};


// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (id) => {
    const response = await api.delete(
        `/product/delete/${id}`
    );

    return response.data.data;
};


export {
    createProduct,
    getProducts,
    getProduct,
    filterProducts,
    updateProduct,
    deleteProduct,
};

