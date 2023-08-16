import { render, screen, fireEvent } from '@testing-library/react';
import ProductItem from '.';

describe('ProductItem', () => {
  const mockProduct = {
    id: 1,
    img: 'image.jpg',
    name: 'Product Name',
    price: 10.99,
    colour: 'Red',
  };

  it('renders product information', () => {
    render(<ProductItem product={mockProduct} onAddToBasket={() => {}} onRemoveFromBasket={() => {}} onRemoveAllFromBasket={() => {}} basketQuantity={0} />);
    
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
  });

  it('calls onAddToBasket when + button is clicked', () => {
    const mockAddToBasket = jest.fn();
    render(<ProductItem product={mockProduct} onAddToBasket={mockAddToBasket} onRemoveFromBasket={() => {}} onRemoveAllFromBasket={() => {}} basketQuantity={0} />);
    
    fireEvent.click(screen.getByText('+'));
    expect(mockAddToBasket).toHaveBeenCalledWith(1);
  });
});
