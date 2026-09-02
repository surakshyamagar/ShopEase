import api from "./api";

// =====================================================
// GET USER DASHBOARD DATA
// =====================================================

export const getUserDashboard = async () => {

    const response = await api.get(
        "/api/user/dashboard"
    );

    return response.data?.data;
};