// Keep track of who is logged in and make that information available to all components that need it.
import { useState } from "react";
import AuthContext from "./AuthContext";
import { useEffect } from "react";
import api from "../services/api";

// gives props that are inside Authproider
// <AuthProvider>
//      <App/> = prop/children (navbar, dashboard, profile etc)
// </Authprovider>

// Since they are inside AuthProvider, they can access: useAuth();
function AuthProvider({children}) {
    // Stores the currently logged-in user.
    const [user, setUser] = useState(null);

    // Check if a user is already logged in
    // when React application starts
    //
    // "When this AuthProvider runs, execute the function inside."
    useEffect(()=> {
        const getProfile = async()=> {
            try{
                // Ask backend: "Who is currently logged in?"
                const response = await api.get("/auth/profile");

                // Store the user returned by backend
                setUser(response.data.data);
            } catch (error) {
                console.log(error.response?.data);
                
                // No valid login
                setUser(null);
            }
        };
        getProfile();
    }, [])

    // Called after successful login.
    // userData comes from the backend.
    const login = (userData) => {
        setUser(userData);
    };

    // Called when the user logs out.
    //
    // Removes the user from the state.
    const logout = () => {
        setUser(null);
    };

     // Give user, login and logout to every component
    // inside AuthProvider.
    return (
        // provider (given by react): Make a value available to all components underneath it.
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;