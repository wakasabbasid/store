import { render, waitFor } from "@testing-library/react";
import App from "./App";

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

beforeEach(() => {
    mockFetch.mockClear();
});

const mockProducts = [{
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
    colour: "Red",
}];

describe('App', () => {
    it('renders products after successful fetch', async () => {

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts,
        });

        const { getByText, getByTestId } = render(<App />);

        // Ensure the products are rendered after fetch
        await waitFor(() => {
            expect(getByTestId('t_productslisting')).toBeInTheDocument();
            mockProducts.forEach(product => {
                expect(getByText(product.name)).toBeInTheDocument();
            });
        });
    });
});
