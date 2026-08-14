import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";


function Login() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login } = useAuth();

    const navigate = useNavigate();


    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Handle login
    const handleSubmit = async (e) => {

        e.preventDefault();

        const { email, password } = formData;


        // Check empty fields
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }


        try {

            // Send login request to backend
            const response = await api.post("/auth/login", {
                email,
                password,
            });


            // Get logged-in user
            const user = response.data.data;

            console.log("LOGIN USER:", user);
            console.log("LOGIN ROLE:", user.role);


            // Save user in AuthContext
            login(user);


            console.log(response.data);

            alert("Login successful!");


            // Redirect based on role
            if (user.role === "ADMIN") {

                navigate("/admin/dashboard");

            } else {

                navigate("/customer/dashboard");

            }


        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };


    return (
        <>

            {/* Heading */}

            <h2 className="mb-6 text-center text-2xl font-bold">
                Welcome Back
            </h2>


            {/* Login Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />

                </div>


                {/* Password */}

                <div>

                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>


                    <div className="relative">

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />


                        {/* Show / Hide Password */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                        >

                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}

                        </button>

                    </div>

                </div>


                {/* Login Button */}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition duration-200 hover:bg-emerald-700"
                >
                    Login
                </button>

            </form>


            {/* Register Link */}

            <p className="mt-6 text-center text-sm text-gray-600">

                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-semibold text-emerald-600 hover:underline"
                >
                    Register
                </Link>

            </p>

        </>
    );
}


export default Login;

