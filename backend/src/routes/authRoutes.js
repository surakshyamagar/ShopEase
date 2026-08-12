import express from "express";
import registerSchema from "../validations/registerValidation.js";
import registerUser from "../controllers/registerController.js";
import validate from "../middleware/validate.js";
import loginSchema from "../validations/loginValidation.js";
import loginUser from "../controllers/loginController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import getProfile from "../controllers/profileController.js";

const router  = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", authenticateUser, getProfile);
export default router;