import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootReducer } from '../../redux/store';
import ProductList from '.';


describe('<ProductList />', () => {
    const mockHandleColorFilterChange = jest.fn();

    const mockProducts = [
        { id: 1, img: 'img1.jpg', name: 'Product1', price: 100, colour: 'Red' },
        { id: 2, img: 'img2.jpg', name: 'Product2', price: 200, colour: 'Blue' },
        { id: 3, img: 'img3.jpg', name: 'Product3', price: 300, colour: 'Red' }
    ];

    const store = configureStore({
        reducer: rootReducer
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the Filter component', () => {
        render(
            <Provider store={store}>
                <ProductList
                    products={mockProducts}
                    handleColorFilterChange={mockHandleColorFilterChange}
                    colorFilter=""
                />
            </Provider>
        );
        expect(screen.getByLabelText(/filter by color/i)).toBeInTheDocument();
    });

    it('should render the product list without any filtering if colorFilter is empty', () => {
        render(
            <Provider store={store}>
                <ProductList
                    products={mockProducts}
                    handleColorFilterChange={mockHandleColorFilterChange}
                    colorFilter=""
                />
            </Provider>
        );
        const productsListing = screen.getByTestId('t_productslisting');
        expect(productsListing.children).toHaveLength(3);
    });

    it('should render the product list with relevant products filtered based on the colorFilter prop', () => {
        render(
            <Provider store={store}>
                <ProductList
                    products={mockProducts}
                    handleColorFilterChange={mockHandleColorFilterChange}
                    colorFilter="Red"
                />
            </Provider>
        );
        const productsListing = screen.getByTestId('t_productslisting');
        expect(productsListing.children).toHaveLength(2);
    });

    it('should call handleColorFilterChange with the selected color when the color filter changes', () => {
        render(
            <Provider store={store}>
                <ProductList
                    products={mockProducts}
                    handleColorFilterChange={mockHandleColorFilterChange}
                    colorFilter=""
                />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/filter by color/i), { target: { value: 'Blue' } });
        expect(mockHandleColorFilterChange).toHaveBeenCalledWith('Blue');
    });
});

