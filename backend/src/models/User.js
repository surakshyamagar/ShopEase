import mongoose from "mongoose";

// creating blueprint for user document
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    {
        timestamps: true,
    }
);

// create User model using userSchema blueprint
// Call the model() function from the Mongoose library and pass it two arguments.
// argment 1: Use= This is the name of the model. to create/find 
// argument 2: userschema: every user must follow this userchema
const User = mongoose.model("User", userSchema)

export default User;
