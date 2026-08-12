import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

// "Read everything from the .env file."
const PORT = process.env.PORT || 5000;

// connectDB: start connectiing to mongodb first
// node.js waits until connetion
// when connection finished succesfully; then do next
// starts express server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});