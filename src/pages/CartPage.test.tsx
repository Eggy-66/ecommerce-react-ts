import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './CartPage';
import { CartContext } from '../context/CartContext';
import { BrowserRouter } from 'react-router-dom';

// Mock CartContext data
const mockCartContext = {
  cart: { '1': 2 }, // Product ID '1' cu cantitate 2
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
};

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 10.99,
  image: 'test-image.jpg',
};

describe('CartPage Component', () => {
  test('renders empty cart message when cart is empty', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ ...mockCartContext, cart: {} }}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders products in cart and calculates total price', async () => {
    // Mock fetch pentru a returna produsele
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockProduct]),
      })
    ) as jest.Mock;

    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Verificăm afișarea produsului
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
    expect(screen.getByText('Pcs: 2')).toBeInTheDocument();

    // Verificăm prețul total
    expect(screen.getByText('Total Price: $21.98')).toBeInTheDocument();
  });

  test('calls clearCart when Clear Cart button is clicked', async () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    const clearButton = screen.getByText('Clear Cart');
    fireEvent.click(clearButton);

    expect(mockCartContext.clearCart).toHaveBeenCalled();
  });

  test('calls addToCart and removeFromCart when buttons are clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockProduct]),
      })
    ) as jest.Mock;

    render(
      <BrowserRouter>
        <CartContext.Provider value={mockCartContext}>
          <CartPage />
        </CartContext.Provider>
      </BrowserRouter>
    );

    // Butonul "+" pentru a adăuga produs
    const addButton = await screen.findByText('+');
    fireEvent.click(addButton);
    expect(mockCartContext.addToCart).toHaveBeenCalledWith('1');

    // Butonul "-" pentru a elimina produs
    const removeButton = await screen.findByText('-');
    fireEvent.click(removeButton);
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith('1');
  });
});
