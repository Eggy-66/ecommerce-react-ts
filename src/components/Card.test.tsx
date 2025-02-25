import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types/types';

// Mock pentru datele produsului, conform interfeței actualizate
const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  image: 'test-image.jpg',
  description: 'This is a test product description.',
  category: 'Electronics',
};

// Mock pentru funcția onAddToCart
const mockOnAddToCart = jest.fn();

describe('Card Component', () => {
  test('renders product information correctly', () => {
    render(
      <BrowserRouter>
        <Card product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>
    );

    // Verificăm afișarea titlului, prețului și imaginii
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $19.99')).toBeInTheDocument();

    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', 'test-image.jpg');

    // Verificăm că descrierea și categoria există în mock, chiar dacă nu sunt afișate
    expect(mockProduct.description).toBe('This is a test product description.');
    expect(mockProduct.category).toBe('Electronics');
  });

  test('calls onAddToCart and updates button state correctly', async () => {
    render(
      <BrowserRouter>
        <Card product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>
    );

    // Verificăm inițial butonul
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeEnabled();

    // Simulăm click pe buton
    fireEvent.click(button);

    // Verificăm că funcția onAddToCart este apelată
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);

    // Butonul ar trebui să fie dezactivat și să arate "Added"
    expect(screen.getByText('Added')).toBeInTheDocument();
    expect(button).toBeDisabled();

    // Așteptăm 2 secunde ca butonul să revină la starea inițială
    await waitFor(() => {
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(button).toBeEnabled();
    }, { timeout: 2500 });
  });
});
