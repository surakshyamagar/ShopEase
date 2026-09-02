import { Link } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";

function ProductCard({ product, onAddToCart }) {

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">

            {/* Image */}
            <Link to={`/products/${product._id}`}>

                <div className="h-52 bg-gray-100">

                    {product.image ? (

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />

                    ) : (

                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Package size={35} />
                            <p className="text-sm mt-2">
                                No image
                            </p>
                        </div>

                    )}

                </div>

            </Link>


            {/* Content */}
            <div className="p-5">

                <Link to={`/products/${product._id}`}>

                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        {product.name}
                    </h2>

                </Link>


                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                </p>


                {/* Price + Stock */}
                <div className="flex items-center justify-between mt-4">

                    <p className="text-xl font-bold text-gray-900">
                        ${product.price}
                    </p>

                    <p
                        className={`text-sm font-medium ${
                            product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                    </p>

                </div>


                {/* Add Cart */}
                <button
                    onClick={() => onAddToCart(product._id)}
                    disabled={product.stock === 0}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition"
                >

                    <ShoppingCart size={18} />

                    {product.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}

                </button>

            </div>

        </div>
    );
}

export default ProductCard;