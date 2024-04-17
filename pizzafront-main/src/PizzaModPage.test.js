import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; // Import act
import PizzaModPage from './PizzaModPage';

describe('PizzaModPage', () => {
    test('renders form fields and handles modification', async () => {
        const mockPizza = {
            id: 1,
            name: 'Margarita',
            isGlutenFree: false,
            kepURL: 'https://example.com/image1.jpg'
        };

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: () => Promise.resolve(mockPizza)
        });

        await act(async () => { // Wrap render in act
            render(
                <MemoryRouter initialEntries={['/mod-pizza/1']}>
                    <Routes>
                        <Route path="/mod-pizza/:id" element={<PizzaModPage />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Wait for the pizza data to be loaded
        await screen.findByText('Pizza módosítás');

        // Assert that form fields are rendered with correct values
        expect(screen.getByLabelText('Név:')).toHaveValue(mockPizza.name);
        expect(screen.getByLabelText('Gluténmentes:')).not.toBeChecked();
        expect(screen.getByLabelText('Kép URL:')).toHaveValue(mockPizza.kepURL);

        // Modify form fields
        fireEvent.change(screen.getByLabelText('Név:'), { target: { value: 'Pepperoni' } });
        fireEvent.click(screen.getByLabelText('Gluténmentes:'));
        fireEvent.change(screen.getByLabelText('Kép URL:'), { target: { value: 'https://example.com/image2.jpg' } });

        // Submit form
        fireEvent.click(screen.getByText('Küldés'));

        // Assert that modification is handled
        expect(global.fetch).toHaveBeenCalledWith(`https://pizza.kando-dev.eu/Pizza/${mockPizza.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: mockPizza.id,
                name: 'Pepperoni',
                isGlutenFree: 1, // Convert to number
                kepURL: 'https://example.com/image2.jpg',
            }),
        });

        // Ensure navigation back to home page
        expect(window.location.pathname).toBe('/');
    });
});