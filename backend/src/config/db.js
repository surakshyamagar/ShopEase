import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDb connection Error:", error.message);
        // if error; tells node to stop entire program/application
        // 1: The program stopped because something went wrong.
        // 0: Everything finished successfully.
        process.exit(1);
    }
};

export default connectDB;