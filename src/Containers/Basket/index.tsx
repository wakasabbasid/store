import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import BasketItem from "./BasketItem";
import { Link } from "react-router-dom";
import backBtn from "../../assets/icons/backbtn.svg";
import emptyCart from "../../assets/images/emptyCart.webp";
const Basket = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const totalPrice = items.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Link
          to={"/"}
          className="flex hover:bg-gray-300 h-14 w-14 rounded-xl justify-center"
        >
          <img src={backBtn} alt="Backbutton" width={30} height={30} />
        </Link>
        <div className="flex justify-between gap-x-2">
          <p className="text-4xl font-bold mb-6 text-center text-green-600">
            Shopping Cart
          </p>
          <p className="text-xl text-green-600">{`(${items.length})`}</p>
        </div>
        <div />
      </div>
      {items.length > 0 ? (
        items.map((item) => <BasketItem key={item.id} product={item} />)
      ) : (
        <div className="flex justify-center">
          <img alt="emptyCart" src={emptyCart} />
        </div>
      )}
      <p className="text-2xl font-bold mb-6 text-right">{`Total: $${totalPrice.toFixed(
        2,
      )}`}</p>
    </div>
  );
};

export default Basket;
