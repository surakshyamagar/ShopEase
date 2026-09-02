// import express from "express";
// import { createProduct, deleteProduct, filterProducts, getProduct, getProducts, updateProduct } from "../controllers/product/productController.js";
// import authenticateUser from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Customer & admin
// router.get("/getAll", authenticateUser, getProducts);
// router.get("/filter",authenticateUser, filterProducts);
// router.get("/getOne/:id",authenticateUser, getProduct);

// // ADMIN ONLY
// router.post("/add", authenticateUser, createProduct);
// router.put("/update/:id", authenticateUser, updateProduct);
// router.delete("/delete/:id", authenticateUser, deleteProduct);




// export default router;

import express from "express";

import {
    createProduct,
    deleteProduct,
    filterProducts,
    getProduct,
    getProducts,
    updateProduct,
} from "../controllers/product/productController.js";

import authenticateUser from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import uploadToCloudinary from "../middleware/uploadToCloudinary.js";


const router = express.Router();

// CUSTOMER & ADMIN

router.get("/getAll", authenticateUser, getProducts);

router.get("/filter", authenticateUser, filterProducts);

router.get("/getOne/:id", authenticateUser, getProduct);

// ADMIN ONLY

router.post(
    "/add",
    authenticateUser,
    upload.single("image"),
    uploadToCloudinary,
    createProduct
);

router.put(
    "/update/:id",
    authenticateUser,
    upload.single("image"),
    uploadToCloudinary,
    updateProduct
);

router.delete("/delete/:id", authenticateUser, deleteProduct);

export default router;