import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

const ProductItem = ({
    product,
}: ProductItemProps) => {
    const dispatch = useDispatch();
    const { id, img, name, price } = product;
    const [productQuantity, setProductQuantity] = useState<ProductQuantity>({});
    const { items } = useSelector((state: RootState) => state.cart);
    useEffect(() => {
        setProductQuantity({ [id]: 1 });
    }, [id])


    const handleAddToProductQuantity = (productId: number) => {
        setProductQuantity((prevProductQuantity) => ({
            ...prevProductQuantity,
            [productId]: (prevProductQuantity[productId] || 1) + 1,
        }));
    };

    const handleRemoveFromProductQuantity = (productId: number) => {
        if (productQuantity[productId] && productQuantity[productId] > 1) {
            setProductQuantity((prevProductQuantity) => ({
                ...prevProductQuantity,
                [productId]: prevProductQuantity[productId] - 1,
            }));
        }
    };

    const handleAddToCart = (product: Product) => {
        const existingItem = items.find((item: Product) => item.id === id);
        const eiq = existingItem?.quantity || 1;
        if (existingItem && eiq) {
            const updatedItems = items.map(item => {
                if (item.id === id) {
                    return { ...product, quantity: eiq + productQuantity[id] }
                } else {
                    return item;
                }
            })
            dispatch(updateCart(updatedItems));
        } else {
            dispatch(addToCart({ ...product, quantity: productQuantity[id] }));
        }
        setProductQuantity((prevProductQuantity) => ({
            ...prevProductQuantity,
            [id]: 0,
        }));
    };

    return (
        <div className="border p-4 flex items-center justify-between mb-4 rounded">
            <div className="flex items-center">
                <img src={img} alt={name} className="w-16 h-24 mr-4 rounded" />
                <div className="flex flex-col gap-y-5">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p>{`Price: $${price.toFixed(2)}`}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-5">
                <p className="font-semibold">{`Quantity: ${productQuantity[id] || 1}`}</p>
                <div className="flex space-x-1">
                    <button
                        onClick={() => handleRemoveFromProductQuantity(id)}
                        className={
                            "bg-gray-400 text-white text-xl px-3 py-1 rounded-md hover:bg-gray-500 transition-colors w-full"
                        }
                    >
                        {"-"}
                    </button>
                    <button
                        onClick={() => handleAddToProductQuantity(id)}
                        className="bg-gray-400 text-white text-xl px-3 py-1 rounded-md hover:bg-gray-500 transition-colors w-full"
                    >
                        {"+"}
                    </button>
                </div>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition-colors"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
