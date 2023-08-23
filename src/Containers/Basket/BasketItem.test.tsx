import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rootReducer } from '../../redux/store';
import BasketItem from './BasketItem';

describe('<BasketItem />', () => {
    const mockProduct = {
        id: 1,
        img: 'img1.jpg',
        name: 'Product1',
        price: 100,
        colour: 'Red',
        quantity: 2
    };

    const mockCartState = {
        items: [mockProduct],
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
            cart: mockCartState
        }
    });

    it('should render the product details', () => {
        render(
            <Provider store={store}>
                <BasketItem product={mockProduct} />
            </Provider>
        );
        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByText(`Quantity: ${mockProduct.quantity}`)).toBeInTheDocument();
    });

    it('should dispatch updateCart when "+" button is clicked', () => {
        const updateSpy = jest.spyOn(store, 'dispatch');
        render(
            <Provider store={store}>
                <BasketItem product={mockProduct} />
            </Provider>
        );
        fireEvent.click(screen.getByText('+'));
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should dispatch updateCart when "-" button is clicked', () => {
        const updateSpy = jest.spyOn(store, 'dispatch');
        render(
            <Provider store={store}>
                <BasketItem product={mockProduct} />
            </Provider>
        );
        fireEvent.click(screen.getByText('-'));
        expect(updateSpy).toHaveBeenCalled();
    });

    it('should dispatch removeFromCart when "Remove" button is clicked', () => {
        const removeSpy = jest.spyOn(store, 'dispatch');
        render(
            <Provider store={store}>
                <BasketItem product={mockProduct} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Remove'));
        expect(removeSpy).toHaveBeenCalled();
    });

    it('should disable "-" button if product quantity is 1', () => {
        render(
            <Provider store={store}>
                <BasketItem product={{ ...mockProduct, quantity: 1 }} />
            </Provider>
        );
        expect(screen.getByText('-')).toBeDisabled();
    });
});

