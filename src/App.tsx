import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { fetchProducts } from "./services/product";

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [colorFilter, setColorFilter] = useState<string>("");
    const [basket, setBasket] = useState<Basket>({});
    const [total, setTotal] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts()
            .then(data => {
                setProducts(data);
                setError(null);
            })
            .catch(error => {
                console.error(error);
                setError("Error fetching data. Please try again later.");
            });
    }, []);


    useEffect(() => {
        let newTotal = 0;
        for (const productId in basket) {
            const product = products.find((p) => p.id === Number(productId));
            if (product) {
                newTotal += product.price * basket[productId];
            }
        }
        setTotal(newTotal);
    }, [basket, products]);

    const handleAddToBasket = (productId: number) => {
        setBasket((prevBasket) => ({
            ...prevBasket,
            [productId]: (prevBasket[productId] || 0) + 1,
        }));
    };

    const handleRemoveFromBasket = (productId: number) => {
        if (basket[productId] && basket[productId] > 0) {
            setBasket((prevBasket) => ({
                ...prevBasket,
                [productId]: prevBasket[productId] - 1,
            }));
        }
    };

    const handleRemoveAllFromBasket = (productId: number) => {
        if (basket[productId]) {
            const newBasket = { ...basket };
            delete newBasket[productId];
            setBasket(newBasket);
        }
    };

    const handleColorFilterChange = (selectedColor: string) => {
        setColorFilter(selectedColor);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
                Product Listings
            </h1>
            {error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    <ProductList
                        products={products}
                        handleColorFilterChange={handleColorFilterChange}
                        handleAddToBasket={handleAddToBasket}
                        handleRemoveFromBasket={handleRemoveFromBasket}
                        handleRemoveAllFromBasket={handleRemoveAllFromBasket}
                        colorFilter={colorFilter}
                        basket={basket}
                    />
                    <div className="mt-4 text-right">
                        <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
