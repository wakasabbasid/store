import { render, waitFor } from "@testing-library/react";
import App from "./App";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

const mockProducts = [
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

describe("App", () => {
  it("renders products after successful fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { getByText, getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId("t_productslisting")).toBeInTheDocument();
      mockProducts.forEach((product) => {
        expect(getByText(product.name)).toBeInTheDocument();
      });
    });
  });

  it("displays error message when fetch fails", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(
        getByText("Error fetching data. Please try again later."),
      ).toBeInTheDocument();
    });
  });
});
