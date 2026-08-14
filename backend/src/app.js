import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// import
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/orderRoutes.js"

// Create Express application
// app = whole project, start all routes with app (app.use)
const app = express();

// ADD MIDDLEWARE
// Security
app.use(helmet());
// Logging
app.use(morgan("dev"));
// Parse JSON: Allows Express to read JSON data:
app.use(express.json());
// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Parse cookies
app.use(cookieParser());
// Allow frontend requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running 🚀",
  });
});

  // Routes
  app.use("/auth", authRoutes);

  // categories
  app.use("/category", categoryRoutes);

  // products
  app.use("/product", productRoutes);

  // carts
  app.use("/cart", cartRoutes);

  // order
  app.use("/order", orderRoutes);

  app.use("/review", reviewRoutes);
  

export default app;