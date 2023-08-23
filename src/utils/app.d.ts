interface Product {
    id: number;
    img: string;
    name: string;
    price: number;
    colour: string;
    quantity?: number;
}

interface ProductItemProps {
    product: Product;
}

interface ProductListProps {
    products: Product[];
    colorFilter: string;
    handleColorFilterChange: (selectedColor: string) => void;
}

interface ProductQuantity {
    [productId: number]: number;
}

interface FilterProps {
    onColorFilterChange: (selectedColor: string) => void;
    products: Product[];
}

interface ProductsSlice {
    products: Product[]
}

interface CartSlice {
    items: Product[]
}