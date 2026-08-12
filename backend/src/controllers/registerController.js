import User from "../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async(req, res) => {
    try{
        // Data is already validated by Zod middleware
        const {name,email, password} = req.body;

        // 1. Check if email already exists
        const exisitingUser = await User.findOne({email});

        if (exisitingUser){
            return res.status(409).json({
                success: false,
                message: "Email already exists!",
            });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

         // 3. Create user in MongoDB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Send response
        res.status(201).json({
            success: true,
             message: "User registered successfully",
             data: user,
        });

    }catch (error){
        res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export default registerUser;

