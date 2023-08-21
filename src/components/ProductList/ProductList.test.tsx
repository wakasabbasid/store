import { render } from "@testing-library/react";
import ProductList from ".";

test("renders product list with filters and products", () => {
  const products = [
    {
      id: 1,
      img: "imageurl",
      name: "Dress",
      price: 99,
      colour: "Red",
    },
    {
      id: 2,
      img: "otherimage",
      name: "Dress 1",
      price: 69,
      colour: "Blue",
    },
  ];
  const mockHandleColorFilterChange = jest.fn();
  const mockHandleAddToBasket = jest.fn();
  const mockHandleRemoveFromBasket = jest.fn();
  const mockHandleRemoveAllFromBasket = jest.fn();

  const { getByText, getByTestId } = render(
    <ProductList
      products={products}
      handleColorFilterChange={mockHandleColorFilterChange}
      handleAddToBasket={mockHandleAddToBasket}
      handleRemoveFromBasket={mockHandleRemoveFromBasket}
      handleRemoveAllFromBasket={mockHandleRemoveAllFromBasket}
      colorFilter=""
      basket={{ 1: 1 }}
    />,
  );

  const productList = getByTestId("t_productslisting");
  expect(productList).toBeInTheDocument();
  expect(getByText("Dress")).toBeInTheDocument();
  expect(getByText("Dress 1")).toBeInTheDocument();
});
