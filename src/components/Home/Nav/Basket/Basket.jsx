import React from 'react';
import Outline from '../../../../assets/Home/Nav/Basket/Outline.png';
import './Basket.css';

const Basket = () => {
  // Retrieve the current count from sessionStorage
  const basketCount = sessionStorage.getItem('basketCount') || 0;

  return (
    <div className='nav-basket'>
      <img src={Outline} alt='alt' />
      <p className='basket-number'>{basketCount}</p>
    </div>
  );
};

export default Basket;