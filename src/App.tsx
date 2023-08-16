import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import ProductItem from './components/ProductItem';

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [colorFilter, setColorFilter] = useState<string>('');
    const [basket, setBasket] = useState<Basket>({});
    const [total, setTotal] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);


    //Fetching Data from API
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setError(null);
            })
            .catch(error => {
                console.error(error);
                setError('Error fetching data. Please try again later.');
            });
    }, []);

    //Handling any changes to overall total
    useEffect(() => {
        let newTotal = 0;
        for (const productId in basket) {
            const product = products.find(p => p.id === Number(productId));
            if (product) {
                newTotal += product.price * basket[productId];
            }
        }
        setTotal(newTotal);
    }, [basket, products]);

    /**
     * 
     * @param productId {number}
     */

    const handleAddToBasket = (productId: number) => {
        setBasket(prevBasket => ({
            ...prevBasket,
            [productId]: (prevBasket[productId] || 0) + 1
        }));
    };

    const handleRemoveFromBasket = (productId: number) => {
        if (basket[productId] && basket[productId] > 0) {
            setBasket(prevBasket => ({
                ...prevBasket,
                [productId]: prevBasket[productId] - 1
            }));
        }
    }

    const onRemoveAllFromBasket = (productId: number) => {
        const newBasket = { ...basket };
        delete newBasket[productId];
        setBasket(newBasket);
    }


    const handleColorFilterChange = (selectedColor: string) => {
        setColorFilter(selectedColor);
    };


    //Displaying products based on the filter selected
    const filteredProducts = colorFilter
        ? products.filter(product => product.colour === colorFilter)
        : products;

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Product Listings</h1>
            {error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    <Filter onColorFilterChange={handleColorFilterChange} products={products} />
                    {products.length === 0 ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : (
                        <div data-testid="t_productslisting">
                            {filteredProducts.map(product => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    onAddToBasket={handleAddToBasket}
                                    onRemoveFromBasket={handleRemoveFromBasket}
                                    onRemoveAllFromBasket={onRemoveAllFromBasket}
                                    basketQuantity={basket[product.id] || 0}
                                />
                            ))}
                        </div>
                    )}
                    <div className="mt-4 text-right">
                        <p className='font-bold text-lg'>Total: ${total.toFixed(2)}</p>
                    </div>
                </>)}
        </div>
    );
}

export default App;
