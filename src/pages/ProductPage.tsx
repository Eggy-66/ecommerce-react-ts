import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Product } from '../types/types';
import './css/ProductPage.css';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  const { addToCart } = cartContext;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-page">
      <div className="product-page-container">
        
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          <button className="add-to-cart-button" onClick={() => addToCart(productId!)}>
            Add to Cart
          </button>
          <Link to="/" className="back-link">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
