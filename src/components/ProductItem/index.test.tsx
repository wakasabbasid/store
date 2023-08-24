import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import ProductItem from ".";
import cartReducer from "../../redux/cartSlice";

describe("ProductItem Component", () => {
  const mockProduct = {
    id: 1,
    img: "path_to_image.jpg",
    name: "Sample Product",
    price: 100,
    colour: "blue",
  };

  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductItem product={mockProduct} />
      </Provider>,
    );

    expect(getByText("Sample Product")).toBeInTheDocument();
    expect(getByAltText("Sample Product")).toHaveAttribute(
      "src",
      "path_to_image.jpg",
    );
    expect(getByText("Price: $100.00")).toBeInTheDocument();
  });

  it('dispatches addToCart action when "Add to cart" button is clicked', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ProductItem product={mockProduct} />
      </Provider>,
    );

    const addToCartButton = getByRole("button", { name: /Add to cart/i });
    fireEvent.click(addToCartButton);

    expect(store.getState().cart.items).toEqual([
      { ...mockProduct, quantity: 1 },
    ]);
  });
});
