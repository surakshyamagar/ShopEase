import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import api from "../services/api";

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    // Check if user is already logged in
    // when application starts
    useEffect(() => {

        const getProfile = async () => {

            try {

                const response = await api.get("/auth/profile");

                // Store real user from backend
                setUser(response.data.data);

            } catch (error) {

                console.log(error.response?.data);

                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        getProfile();

    }, []);


    // Called after successful login
    const login = (userData) => {

        setUser(userData);

    };


    // Called when user logs out
    const logout = () => {

        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;