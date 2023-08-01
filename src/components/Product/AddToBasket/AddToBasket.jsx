import React from 'react';
import './AddToBasket.css';

const AddToBasket = () => {
  const handleClick = () => {
    // Retrieve the current count from sessionStorage
    const currentCount = sessionStorage.getItem('basketCount') || 0;
    const newCount = parseInt(currentCount, 10) + 1;

    // Store the updated count in sessionStorage
    sessionStorage.setItem('basketCount', newCount);
  };

  return (
    <button className="button-text-product" onClick={handleClick}>
      Add to basket
    </button>
  );
};

export default AddToBasket;