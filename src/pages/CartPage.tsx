import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Product } from '../types/types';
import './css/CartPage.css'; 

const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { cart, addToCart, removeFromCart, clearCart } = cartContext;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Eroare la preluarea produselor:', error);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) =>
    products.find((product) => product.id === parseInt(id));

  const calculateTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = getProductById(productId);
      return product ? total + product.price * quantity : total;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = getProductById(productId);
              return product ? (
                <div className="cart-item" key={productId}>
                  <img src={product.image} alt={product.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{product.title}</h2>
                    <p className="cart-item-price">Price: ${product.price.toFixed(2)}</p>
                    <p className="cart-item-quantity">Pcs: {quantity}</p>
                    <div className="cart-item-actions">
                      <button onClick={() => addToCart(productId)} className="cart-item-button">
                        +
                      </button>
                      <button onClick={() => removeFromCart(productId)} className="cart-item-button">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </ul>
          

        </div>
      )}
      <div className="cart-actions">
        <button onClick={clearCart} className="clear-cart-button">
          Clear Cart
        </button>
          <div className="total-price">
            Total Price: ${calculateTotalPrice().toFixed(2)}
          </div>
      </div>
    </div>
  );
};

export default CartPage;
