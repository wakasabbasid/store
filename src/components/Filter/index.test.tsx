import { fireEvent, render } from '@testing-library/react';
import Filter from '.';

describe('Filter Component', () => {
    const mockOnColorFilterChange = jest.fn();

    it('renders correctly', () => {
        const products = [
            { id: 1, img: '', name: '', price: 0, colour: 'blue' },
            { id: 2, img: '', name: '', price: 0, colour: 'red' }
        ];
        
        const { getByText } = render(
            <Filter products={products} onColorFilterChange={mockOnColorFilterChange} />
        );

        expect(getByText('Filter by Color:')).toBeInTheDocument();
        expect(getByText('All Colors')).toBeInTheDocument();
    });

    it('lists unique colors', () => {
        const products = [
            { id: 1, img: '', name: '', price: 0, colour: 'blue' },
            { id: 2, img: '', name: '', price: 0, colour: 'red' },
            { id: 3, img: '', name: '', price: 0, colour: 'blue' }
        ];
        
        const { getByText, queryAllByText } = render(
            <Filter products={products} onColorFilterChange={mockOnColorFilterChange} />
        );

        expect(getByText('blue')).toBeInTheDocument();
        expect(getByText('red')).toBeInTheDocument();
        expect(queryAllByText('blue').length).toBe(1);
    });

    it('calls onColorFilterChange with the correct value', () => {
        const products = [
            { id: 1, img: '', name: '', price: 0, colour: 'blue' },
            { id: 2, img: '', name: '', price: 0, colour: 'red' }
        ];

        const { getByText } = render(
            <Filter products={products} onColorFilterChange={mockOnColorFilterChange} />
        );

        fireEvent.change(getByText('All Colors').parentElement!, { target: { value: 'red' } });
        
        expect(mockOnColorFilterChange).toHaveBeenCalledWith('red');
    });
});
