import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product/productController.js";

const router = express.Router();

router.post("/add", createProduct);
router.get("/getAll", getProducts);
router.get("/getOne/:id", getProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;