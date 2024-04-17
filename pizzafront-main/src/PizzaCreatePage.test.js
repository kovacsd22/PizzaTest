import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PizzaCreatePage from './PizzaCreatePage';


describe('PizzaCreatePage', () => {
    test('renders form for creating a new pizza', () => {
        render(
            <MemoryRouter>
                <PizzaCreatePage />
            </MemoryRouter>
        );

        expect(screen.getByText('Új pizza')).toBeInTheDocument();
        expect(screen.getByLabelText('Pizza név:')).toBeInTheDocument();
        expect(screen.getByLabelText('Gluténmentes:')).toBeInTheDocument();
        expect(screen.getByLabelText('Kép URL-je:')).toBeInTheDocument();
        expect(screen.getByText('Küldés')).toBeInTheDocument();
    });
    
    test('submits new pizza data', () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve({}),
        });

        render(
            <MemoryRouter>
                <PizzaCreatePage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Pizza név:'), { target: { value: 'New Pizza' } });
        fireEvent.change(screen.getByLabelText('Gluténmentes:'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Kép URL-je:'), { target: { value: 'https://example.com/image1.jpg' } });
        fireEvent.click(screen.getByText('Küldés'));

        expect(mockFetch).toHaveBeenCalledWith(`https://pizza.kando-dev.eu/Pizza`, expect.objectContaining({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'New Pizza',
                isGlutenFree: '1',
                kepURL: 'https://example.com/image1.jpg',
            }),
        }));
    });
});
