import {
    ShoppingBag,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="mt-16 bg-gray-900 text-gray-300">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* ================= BRAND ================= */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-600
                                font-bold
                                text-white
                            ">
                                S
                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-white">
                                    ShopEase
                                </h2>

                                <p className="text-xs text-gray-400">
                                    Shop smart. Shop easy.
                                </p>

                            </div>

                        </div>


                        <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
                            Your simple and reliable online shopping
                            experience for quality products at great prices.
                        </p>

                    </div>


                    {/* ================= QUICK LINKS ================= */}

                    <div>

                        <h3 className="mb-4 font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">

                            <Link
                                to="/products"
                                className="transition hover:text-emerald-400"
                            >
                                Products
                            </Link>

                            <Link
                                to="/cart"
                                className="transition hover:text-emerald-400"
                            >
                                Cart
                            </Link>

                            <Link
                                to="/orders"
                                className="transition hover:text-emerald-400"
                            >
                                My Orders
                            </Link>

                            <Link
                                to="/customer/dashboard"
                                className="transition hover:text-emerald-400"
                            >
                                My Account
                            </Link>

                        </div>

                    </div>


                    {/* ================= CUSTOMER SERVICE ================= */}

                    <div>

                        <h3 className="mb-4 font-semibold text-white">
                            Customer Service
                        </h3>

                        <div className="flex flex-col gap-4 text-sm">

                            <div className="flex items-start gap-3">

                                <Mail
                                    size={18}
                                    className="mt-0.5 text-emerald-400"
                                />

                                <span>
                                    support@shopease.com
                                </span>

                            </div>


                            <div className="flex items-start gap-3">

                                <Phone
                                    size={18}
                                    className="mt-0.5 text-emerald-400"
                                />

                                <span>
                                    +977 9800000000
                                </span>

                            </div>


                            <div className="flex items-start gap-3">

                                <MapPin
                                    size={18}
                                    className="mt-0.5 text-emerald-400"
                                />

                                <span>
                                    Kathmandu, Nepal
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ================= SHOPPING ================= */}

                    <div>

                        <h3 className="mb-4 font-semibold text-white">
                            Why ShopEase?
                        </h3>

                        <div className="space-y-3 text-sm text-gray-400">

                            <p>
                                ✓ Quality Products
                            </p>

                            <p>
                                ✓ Secure Shopping
                            </p>

                            <p>
                                ✓ Easy Ordering
                            </p>

                            <p>
                                ✓ Reliable Support
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="mt-10 border-t border-gray-800 pt-6">

                    <div className="flex flex-col items-center justify-between gap-3 text-sm md:flex-row">

                        <p className="text-gray-500">
                            © {new Date().getFullYear()} ShopEase. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-gray-500">

                            <ShoppingBag size={16} />

                            <span>
                                Your trusted online store
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;