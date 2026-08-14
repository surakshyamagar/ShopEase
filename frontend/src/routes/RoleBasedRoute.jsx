import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleBasedRoute({ role, children }) {

    const {
        user,
        loading,
    } = useAuth();


    // Wait for profile
    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center">

                <p className="text-gray-500">
                    Loading...
                </p>

            </div>
        );
    }


    // Not logged in
    if (!user) {

        return (
            <Navigate
                to="/"
                replace
            />
        );
    }


    // Wrong role
    if (user.role !== role) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    // Correct role
    return children;
}

export default RoleBasedRoute;