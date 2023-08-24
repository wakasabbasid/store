import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch();
  const { id, img, name, price } = product;
  const { items } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = () => {
    const existingItem = items.find((item: Product) => item.id === id);
    const eiq = existingItem?.quantity || 0;
    if (existingItem) {
      const updatedItems = items.map((item) => {
        if (item.id === id) {
          return { ...product, quantity: eiq + 1 };
        } else {
          return item;
        }
      });
      dispatch(updateCart(updatedItems));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    toast.success("Item added!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
      <button
        onClick={handleAddToCart}
        className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductItem;
