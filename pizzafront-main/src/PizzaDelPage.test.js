import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PizzaDelPage from './PizzaDelPage';

// Mockoljuk a fetch hívást
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 1, name: "Négysajtos pizza", isGlutenFree: true, kepURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fparkpizza.hu%2Fwp-content%2Fuploads%2F2018%2F05%2FN%25C3%25A9gysajtos-pizza.jpg&f=1&nofb=1&ipt=aec291f02b2c6cf7c3a0903b03b44b9dcba4f470587e554552ee50eb71d7f896&ipo=images" }),
  })
);

describe('PizzaDelPage', () => {
  test('renders PizzaDelPage component', async () => {
    render(
      <MemoryRouter initialEntries={['/pizza/1']}>
        <Routes>
          <Route path="/pizza/:pizzaId" element={<PizzaDelPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Várjuk meg, amíg a spinner eltűnik
    await waitFor(() => expect(screen.queryByRole('status')).toBeNull());

    // Ellenőrizzük, hogy a pizza neve megjelenik-e
    expect(screen.getByText(/Törlendő elem: Négysajtos pizza/i)).toBeInTheDocument();

    // Ellenőrizzük, hogy a gluténmentes információ megjelenik-e
    expect(screen.getByText(/Gluténmentes: nem/i)).toBeInTheDocument();

    // Ellenőrizzük, hogy a kép megjelenik-e
    expect(screen.getByAltText(/Négysajtos pizza/i)).toBeInTheDocument();

    // Kattintsunk a törlés gombra
    userEvent.click(screen.getByText(/Törlés/i));

    // Ellenőrizzük, hogy a navigálás megtörtént-e
    expect(screen.getByText(/Mégsem/i)).toBeInTheDocument();
  });
});
