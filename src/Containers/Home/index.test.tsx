import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '.';
import { rootReducer } from '../../redux/store';

describe('<Home />', () => {
    const mockProducts = [
        { id: 1, name: 'Product1', price: 100, colour: 'Red', img: 'img1.jpg' },
        { id: 2, name: 'Product2', price: 150, colour: 'Blue', img: 'img2.jpg' }
    ];
    const mockCartItems = [
        { id: 1, name: 'Product1', price: 100, colour: 'Red', img: 'img1.jpg', quantity: 2 },
    ];

    const mockApiState = {
        products: mockProducts
    };

    const mockCartState = {
        items: mockCartItems
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
            api: mockApiState,
            cart: mockCartState
        }
    });

    it('should render the home page with products and cart link', () => {
        render(
            <Router>
                <Provider store={store}>
                    <Home />
                </Provider>
            </Router>
        );

        expect(screen.getByText('Product Listings')).toBeInTheDocument();

        expect(screen.getByAltText('Cart')).toBeInTheDocument();
        expect(screen.getByText(`(${mockCartItems.length})`)).toBeInTheDocument();

        expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
        expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
    });

    it('should have a link pointing to the cart page', () => {
        render(
            <Router>
                <Provider store={store}>
                    <Home />
                </Provider>
            </Router>
        );

        const linkElement = screen.getByAltText('Cart').closest('a');
        expect(linkElement).toHaveAttribute('href', '/cart');
    });
});
