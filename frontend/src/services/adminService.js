import api from "./api";

// =====================================================
// GET ADMIN DASHBOARD STATISTICS
// =====================================================

export const getAdminDashboardStats = async () => {
    const response = await api.get("/api/admin/dashboard");

    return response.data.data;
};