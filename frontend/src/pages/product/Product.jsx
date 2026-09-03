import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getProducts,
    filterProducts,
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";
import { addToCart } from "../../services/cartService";


function UserProducts() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD PRODUCTS + CATEGORIES
    // ==========================================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                productsData,
                categoriesData,
            ] = await Promise.all([
                getProducts(),
                getCategories(),
            ]);

            setProducts(productsData);
            setCategories(categoriesData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // SEARCH / FILTER
    // ==========================================

    const handleFilter = async () => {

        try {

            setLoading(true);
            setError("");

            const productsData = await filterProducts(
                search,
                category
            );

            setProducts(productsData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to filter products"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // RESET FILTER
    // ==========================================

    const handleReset = async () => {

        try {

            setSearch("");
            setCategory("");

            setLoading(true);
            setError("");

            const productsData = await getProducts();

            setProducts(productsData);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // ADD TO CART
    // ==========================================

    const handleAddToCart = async (productId) => {

        try {

            await addToCart(productId, 1);

            alert("Product added to cart");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div>
                <h2>Products</h2>
                <p>Loading products...</p>
            </div>
        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div>

                <h2>Products</h2>

                <p>{error}</p>

                <button onClick={loadData}>
                    Try Again
                </button>

            </div>
        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div>

            {/* ==================================
                HEADER
            ================================== */}

            <h1>
                Products
            </h1>

            <p>
                Browse products and add them to your cart.
            </p>


            {/* ==================================
                NAVIGATION
            ================================== */}

            <nav>

                <Link to="/customer/dashboard">
                    Dashboard
                </Link>

                {" | "}

                <Link to="/products">
                    Products
                </Link>

                {" | "}

                <Link to="/cart">
                    Cart
                </Link>

                {" | "}

                <Link to="/orders">
                    Orders
                </Link>

            </nav>


            <hr />


            {/* ==================================
                SEARCH / FILTER
            ================================== */}

            <section>

                <h2>
                    Search / Filter
                </h2>


                {/* Search */}

                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                {/* Category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option value="">
                        All Categories
                    </option>

                    {categories.map((category) => (

                        <option
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>


                {/* Filter */}

                <button onClick={handleFilter}>
                    Search / Filter
                </button>


                {/* Reset */}

                <button onClick={handleReset}>
                    Reset
                </button>

            </section>


            <hr />


            {/* ==================================
                PRODUCTS
            ================================== */}

            <section>

                <h2>
                    All Products
                </h2>


                {products.length === 0 ? (

                    <p>
                        No products found.
                    </p>

                ) : (

                    <div>

                        {products.map((product) => (

                            <div
                                key={product._id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "15px",
                                    marginBottom: "15px"
                                }}
                            >

                                {/* Product name */}

                                <h3>
                                    {product.name}
                                </h3>


                                {/* Description */}

                                <p>
                                    {product.description}
                                </p>


                                {/* Price */}

                                <p>
                                    Price: ${product.price}
                                </p>


                                {/* Stock */}

                                <p>
                                    Stock: {product.stock}
                                </p>


                                {/* ==================================
                                    ADD TO CART
                                ================================== */}

                                <button
                                    onClick={() =>
                                        handleAddToCart(
                                            product._id
                                        )
                                    }
                                    disabled={product.stock === 0}
                                >

                                    {product.stock === 0
                                        ? "Out of Stock"
                                        : "Add to Cart"}

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            <hr />


            {/* ==================================
                CART / ORDERS
            ================================== */}

            <section>

                <h2>
                    Shopping
                </h2>

                <p>
                    <Link to="/cart">
                        Go to Cart
                    </Link>
                </p>

                <p>
                    <Link to="/orders">
                        View My Orders
                    </Link>
                </p>

            </section>

        </div>

    );

}


export default UserProducts;