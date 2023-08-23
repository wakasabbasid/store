function Filter({ onColorFilterChange, products }: FilterProps) {
    const availableColors = Array.from(
        new Set(products.map((product) => product.colour)),
    );

    return (
        <div className="mb-4">
            <label
                htmlFor="colorFilter"
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                Filter by Color:
            </label>
            <select
                id="colorFilter"
                onChange={(e) => onColorFilterChange(e.target.value)}
                className="cursor-pointer block w-full border rounded py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-400"
            >
                <option value="">All Colors</option>
                {availableColors.map((color) => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filter;
