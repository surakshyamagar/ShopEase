import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-600">
            ShopEase
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome to ShopEase
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;