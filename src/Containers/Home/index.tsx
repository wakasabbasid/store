import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/ProductList";
import { fetchProducts } from "../../redux/apiSlice";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit"
import cartLogo from "../../assets/icons/cart.svg";

function Home() {
    const [colorFilter, setColorFilter] = useState<string>("");
    const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
    const products = useSelector((state: RootState) => state.api.products);
    const { items } = useSelector((state: RootState) => state.cart);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleColorFilterChange = (selectedColor: string) => {
        setColorFilter(selectedColor);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-green-600">
                Product Listings
            </h1>
            <div className="flex justify-end px-14">
                <Link to={"/cart"} className="flex hover:bg-gray-300 h-14 w-14 rounded-xl justify-center">
                    <img src={cartLogo} alt="Cart" width={30} height={30} />
                    <p className="text-xl">{`(${items.length})`}</p>
                </Link>
            </div>
            <ProductList
                products={products}
                handleColorFilterChange={handleColorFilterChange}
                colorFilter={colorFilter}
            />
        </div>
    );
}

export default Home;
