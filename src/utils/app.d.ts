interface Product {
    id: number;
    img: string;
    name: string;
    price: number;
    colour: string;
}

interface ProductItemProps {
    product: Product;
    onAddToBasket: (productId: number) => void;
    onRemoveFromBasket: (productId: number) => void;
    onRemoveAllFromBasket: (productId: number) => void;
    basketQuantity: number;
}

interface Basket {
    [productId: number]: number;
}

interface FilterProps {
    onColorFilterChange: (selectedColor: string) => void;
    products: Product[];
}
