import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardRedirect() {

    const { user, loading } = useAuth();


    // Wait until profile request finishes
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


    // ADMIN
    if (user.role === "ADMIN") {

        return (
            <Navigate
                to="/admin/dashboard"
                replace
            />
        );
    }


    // USER
    if (user.role === "USER") {

        return (
            <Navigate
                to="/customer/dashboard"
                replace
            />
        );
    }


    // Unknown role
    return (
        <Navigate
            to="/"
            replace
        />
    );
}

export default DashboardRedirect;