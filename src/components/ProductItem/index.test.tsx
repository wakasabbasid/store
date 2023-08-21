import { render, fireEvent } from "@testing-library/react";
import ProductItem from ".";

test("renders product item and triggers basket interactions", () => {
  const product = {
    id: 1,
    colour: "red",
    name: "Product A",
    price: 10,
    img: "",
  };
  const mockAdd = jest.fn();
  const mockRemove = jest.fn();
  const mockRemoveAll = jest.fn();

  const { getByText, getByAltText } = render(
    <ProductItem
      product={product}
      onAddToBasket={mockAdd}
      onRemoveFromBasket={mockRemove}
      onRemoveAllFromBasket={mockRemoveAll}
      basketQuantity={1}
    />,
  );

  const addButton = getByText("+");
  fireEvent.click(addButton);
  expect(mockAdd).toHaveBeenCalledWith(1);

  const removeButton = getByText("-");
  fireEvent.click(removeButton);
  expect(mockRemove).toHaveBeenCalledWith(1);

  const removeAllButton = getByText("Remove");
  fireEvent.click(removeAllButton);
  expect(mockRemoveAll).toHaveBeenCalledWith(1);

  expect(getByAltText("Product A")).toBeInTheDocument();
});
