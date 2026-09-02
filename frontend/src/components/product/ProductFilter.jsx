function ProductFilter({
    categories,
    value,
    onChange,
}) {

    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
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

    );
}

export default ProductFilter;