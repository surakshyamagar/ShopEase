import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        // 1. Find user
        const existingUser = await User.findOne({email});

        if (!existingUser){
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

         // 2. Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // 3. Create JWT
        // JWT library, create/sign a token
        const token = jwt.sign(
            // info/payload to keep inside JWT
            {
                id: existingUser._id,
                role: existingUser.role,
            },
            // This is the secret key used to sign the JWT.
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Store JWT in HTTP-only cookie
        // Send a cookie named token to the browser, and put our JWT inside it.
        res.cookie("token", token, {
            // Browser JavaScript cannot directly read this cookie.
            httpOnly: true,
            secure: false,
            // Adds protection for cross-site requests while still allowing normal use of your application.
            sameSite: "lax",
            // Keep the cookie for 1 day.
            maxAge: 24 * 60 * 60 * 1000
        })

        // 4. Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                // token,
            },
        });
        
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default loginUser;

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // 1. Find user
//         const existingUser = await User.findOne({ email });

//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found!",
//             });
//         }

//         // 2. Check password
//         const isPasswordCorrect = await bcrypt.compare(
//             password,
//             existingUser.password
//         );

//         if (!isPasswordCorrect) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid password",
//             });
//         }

//         // 3. Create JWT
//         const token = jwt.sign(
//             {
//                 id: existingUser._id,
//                 role: existingUser.role,
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1d",
//             }
//         );

//         // 4. Store JWT in HTTP-only cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false,
//             sameSite: "lax",
//             maxAge: 24 * 60 * 60 * 1000,
//         });

//         // 5. Send response
//         res.status(200).json({
//             success: true,
//             message: "Login successful",
//             data: {
//                 id: existingUser._id,
//                 name: existingUser.name,
//                 email: existingUser.email,
//                 role: existingUser.role,
//             },
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// export default loginUser;