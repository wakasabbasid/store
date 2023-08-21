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

interface ProductListProps {
  products: Product[];
  handleColorFilterChange: (selectedColor: string) => void;
  handleAddToBasket: (productId: number) => void;
  handleRemoveFromBasket: (productId: number) => void;
  handleRemoveAllFromBasket: (productId: number) => void;
  colorFilter: string;
  basket: Basket;
}

interface Basket {
  [productId: number]: number;
}

interface FilterProps {
  onColorFilterChange: (selectedColor: string) => void;
  products: Product[];
}
