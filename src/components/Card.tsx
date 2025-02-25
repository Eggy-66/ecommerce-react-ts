import React, { useState } from 'react';
import { Product } from '../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './css/Card.css';

interface CardProps {
  product: Product;
  onAddToCart: () => void;
}

const Card: React.FC<CardProps> = ({ product, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(); // Apelăm funcția primită prin props
    setIsAdded(true); // Actualizăm starea pentru a schimba butonul
    setTimeout(() => setIsAdded(false), 2000); // Resetăm butonul după 2 secunde
  };

  return (
    <div className="card">
      {/* Link pe imagine */}
      <Link to={`/product/${product.id}`} className="card-link">
        <img
          src={product.image}
          alt={product.title}
          className="card-image"
        />
      </Link>
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">Price: ${product.price.toFixed(2)}</p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className={`card-button ${isAdded ? 'added' : ''}`}
            disabled={isAdded} // Dezactivăm butonul dacă este în starea "Added"
          >
            <FontAwesomeIcon
              icon={isAdded ? faCheck : faCartPlus}
              className="card-icon"
            />
            {isAdded ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
