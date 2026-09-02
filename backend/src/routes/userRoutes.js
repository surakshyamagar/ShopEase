import express from "express";
import { getCustomers } from "../controllers/user/userController.js";

const router = express.Router();

router.get("/customers", getCustomers);

export default router;