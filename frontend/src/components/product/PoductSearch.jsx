import { Search } from "lucide-react";

function ProductSearch({ value, onChange }) {

    return (

        <div className="relative w-full">

            <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

        </div>

    );
}

export default ProductSearch;