import { render, screen, fireEvent } from "@testing-library/react";
import Filter from ".";

describe("Filter", () => {
  const mockProducts = [
    {
      id: 1,
      img: "image1.jpg",
      name: "Product 1",
      price: 10.99,
      colour: "Red",
    },
    {
      id: 2,
      img: "image2.jpg",
      name: "Product 2",
      price: 15.99,
      colour: "Blue",
    },
  ];

  it("renders filter options", () => {
    render(<Filter onColorFilterChange={() => {}} products={mockProducts} />);

    expect(screen.getByText("All Colors")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  it("calls onColorFilterChange with selected color", () => {
    const mockColorFilterChange = jest.fn();
    render(
      <Filter
        onColorFilterChange={mockColorFilterChange}
        products={mockProducts}
      />,
    );

    fireEvent.change(screen.getByLabelText("Filter by Color:"), {
      target: { value: "Red" },
    });
    expect(mockColorFilterChange).toHaveBeenCalledWith("Red");
  });
});
