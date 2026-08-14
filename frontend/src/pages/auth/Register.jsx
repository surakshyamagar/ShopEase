import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import api from "../../services/api";


function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // Handle registration
    const handleSubmit = async (e) => {

        e.preventDefault();


        // Check passwords
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        try {

            // Send data to backend
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });


            console.log(response.data);

            alert("Registration successful!");


        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    return (
        <>

            {/* Heading */}

            <h2 className="mb-6 text-center text-2xl font-bold">
                Create Account
            </h2>


            {/* Registration Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Full Name */}

                <div>

                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium"
                    >
                        Full Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />

                </div>


                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    />

                </div>


                {/* Password */}

                <div>

                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium"
                    >
                        Password
                    </label>


                    <div className="relative">

                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                </div>


                {/* Confirm Password */}

                <div>

                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium"
                    >
                        Confirm Password
                    </label>


                    <div className="relative">

                        <input
                            id="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                    </div>

                </div>


                {/* Create Account Button */}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                >
                    Create Account
                </button>

            </form>


            {/* Login Link */}

            <p className="mt-6 text-center text-sm">

                Already have an account?{" "}

                <Link
                    to="/"
                    className="font-semibold text-emerald-600 hover:underline"
                >
                    Login
                </Link>

            </p>

        </>
    );
}


export default Register;