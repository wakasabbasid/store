import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import cartReducer, { addToCart } from '../../redux/cartSlice'; // Update with your actual path
import ProductItem from '.';

describe('ProductItem Component', () => {
    const mockProduct = {
        id: 1,
        img: 'path_to_image.jpg',
        name: 'Sample Product',
        price: 100,
        colour: 'blue'
    };
    
    const store = configureStore({
        reducer: {
            cart: cartReducer
        }
    });

    it('renders correctly', () => {
        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <ProductItem product={mockProduct} />
            </Provider>
        );

        expect(getByText('Sample Product')).toBeInTheDocument();
        expect(getByAltText('Sample Product')).toHaveAttribute('src', 'path_to_image.jpg');
        expect(getByText('Price: $100.00')).toBeInTheDocument();
    });

    it('handles quantity increment and decrement', () => {
        const { getByText } = render(
            <Provider store={store}>
                <ProductItem product={mockProduct} />
            </Provider>
        );

        expect(getByText('Quantity: 1')).toBeInTheDocument();

        const addButton = getByText('+');
        const subtractButton = getByText('-');

        fireEvent.click(addButton);
        expect(getByText('Quantity: 2')).toBeInTheDocument();

        fireEvent.click(subtractButton);
        expect(getByText('Quantity: 1')).toBeInTheDocument();

        fireEvent.click(subtractButton);
        expect(getByText('Quantity: 1')).toBeInTheDocument();
    });
});
