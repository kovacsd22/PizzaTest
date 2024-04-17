import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PizzaSinglePage from './PizzaSinglePage';

describe('PizzaSinglePage', () => {
    test('fetches and renders single pizza', async () => {
        const mockPizza = { id: 1, name: 'Margarita', isGlutenFree: false, kepURL: 'https://example.com/image1.jpg' };

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockPizza)
        });

        render(
            <MemoryRouter>
                <PizzaSinglePage />
            </MemoryRouter>
        );

        expect(await screen.findByText('Margarita')).toBeInTheDocument();
    });

    test('displays spinner while fetching single pizza', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => new Promise(() => {}) // Simulate slow response
        });

        render(
            <MemoryRouter>
                <PizzaSinglePage />
            </MemoryRouter>
        );

        expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    });

    test('renders back and edit links', async () => {
        const mockPizza = { id: 1, name: 'Margarita', isGlutenFree: false };

        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockPizza)
        });

        render(
            <MemoryRouter>
                <PizzaSinglePage />
            </MemoryRouter>
        );

        expect(await screen.findByRole('back-link')).toHaveAttribute('href', '/');
        expect(await screen.findByRole('edit-pizza-link')).toHaveAttribute('href', '/mod-pizza/1');
    });
});
