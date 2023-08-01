import React, { useState, useEffect } from 'react';
import './CheckOut.css';
import Nav from '../Home/Nav/Nav';
import Footer from '../Home/Footer/Footer';
import WebLogo from '../../assets/Home/Nav/web-logo.png';
import add from "../../assets/CheckOut/add.png"
import minus from "../../assets/CheckOut/minus.png"

function calculateTaxes(subtotal) {
    // Calculate the taxes (assuming 21% tax rate)
    const taxRate = 0.21;
    return subtotal * taxRate;
  }
  
  function calculateTotalPriceWithTaxesAndShipping(subtotal) {
    const shippingCost = 10;
    const taxes = calculateTaxes(subtotal);
    return subtotal + shippingCost + taxes;
  }

const CheckOut = () => {
  // Retrieve the basket data from session storage
  const [basketData, setBasketData] = useState(JSON.parse(sessionStorage.getItem('basket')) || []);
  const [basketCount, setBasketCount] = useState(JSON.parse(sessionStorage.getItem('basketCount')) || []);

  // Function to calculate the total price of all items in the basket
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of basketData) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  };

  // Function to handle reducing the quantity of a product
  const handleReduceQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      sessionStorage.setItem('basket', JSON.stringify(basketData));
      setBasketData([...basketData]); // Trigger re-render
    } else {
      // Remove the product from the basket if the quantity becomes 0
      const updatedBasket = basketData.filter((basketItem) => basketItem.id !== item.id);
      sessionStorage.setItem('basket', JSON.stringify(updatedBasket));
      setBasketData([...updatedBasket]); // Trigger re-render
    }
  };

  // Function to handle increasing the quantity of a product
  const handleIncreaseQuantity = (item) => {
    item.quantity += 1;
    sessionStorage.setItem('basket', JSON.stringify(basketData));
    setBasketData([...basketData]); // Trigger re-render
  };

  // Update the basket count in sessionStorage whenever basketData changes
  useEffect(() => {
    let basketCount = 0;
    for (const item of basketData) {
      basketCount += item.quantity;
    }
    sessionStorage.setItem('basketCount', basketCount);
    setBasketCount(basketCount); // Update the basket count state variable
  }, [basketData]);



  
  return (
    <div className='checkout-app'>
    <div className='checkout-upper'>
      <Nav textColor='#ffffff' logo={WebLogo} className='checkout-nav' />
      <div className='checkout-body'>
        <p className='checkout-title'>Checkout</p>
        <div className='checkout-container'>
        <div className='checkout-container-left'>
        <div className='checkout-summary'>
        <p className='checkout-summary-title'>Order Summary</p>
        <div className='basket-items'>
          {basketData.length === 0 ? (
            <p className='checkout-summary-title'>Your basket is empty.</p>
          ) : (
            basketData.map((item) => (
              <div key={item.id} className='basket-item'>
                <img src={item.imageURL} alt={item.name} className='basket-item-photo' />
                <p className='item-title-checkout'>{item.name}</p>
                <p className='item-description-checkout'>{item.category}</p>
                <p className='item-price-checkout'>${item.price}</p>
                <div className='quantity-group'>
                  <button onClick={() => handleReduceQuantity(item)} className='quantity-button'>
                  <img className="item-add"src={minus} alt='alt'></img>
                  </button>
                  <p className='item-quantity'>{item.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(item)} className='quantity-button'>
                    <img className="item-add"src={add} alt='alt'></img>
                  </button>
                </div> 
              </div>
            ))
          )}
        </div>
        </div>
        <div className='checkout-delivery-info'>
        <p className='checkout-summary-title'>Delivery Information</p>
        <div className='checkout-delivery-info-container'>
        <div className='checkout-delivery-info-container-upper'>
            <div className='checkout-delivery-info-container-left'>
        <p className='checkout-delivery-info-text'>Name</p>
        <input className='checkout-delivery-info-input'  type="text" id="name_to" name="name_to"/>
        <p className='checkout-delivery-info-text'>Email</p>
        <input className='checkout-delivery-info-input'  type="text" id="name_to" name="name_to"/>
        <p className='checkout-delivery-info-text'>Country</p>
        <input className='checkout-delivery-info-input'  type="text" id="name_to" name="name_to"/>
            </div>
            <div className='checkout-delivery-info-container-right'>
        <p className='checkout-delivery-info-text'>Mobile Number</p>
        <input className='checkout-delivery-info-input'  type="text" id="name_to" name="name_to"/>
        <p className='checkout-delivery-info-text'>City</p>
        <input className='checkout-delivery-info-input'  type="text" id="name_to" name="name_to"/>
        <div className='checkout-delivery-info-container-zip-state'>  
        <div className='checkout-delivery-info-container-zip'>
        <p className='checkout-delivery-info-text'>ZIP</p>
        <input className='checkout-delivery-info-input-small'  type="text" id="name_to" name="name_to"/>
        </div>
        <div className='checkout-delivery-info-container-state'>
        <p className='checkout-delivery-info-text'>State</p>
        <input className='checkout-delivery-info-input-small'  type="text" id="name_to" name="name_to"/>
        </div>
            </div>
            </div>
        </div>
        <div className='checkout-delivery-info-container-address'>
        <p className='checkout-delivery-info-text'>Address</p>
        <input className='checkout-delivery-info-input-large'  type="text" id="name_to" name="name_to"/>
        </div>
        </div>
        </div>

        </div>

        <div className='checkout-container-right'>
            <p className='checkout-summary-title'>Total Price</p>
            <div className='checkout-container-price'>
      {basketData.length === 0 ? (
        <p className='checkout-summary-title'></p>
      ) : (
        <>
          <div className='checkout-container-price-upper'>
            <p className='checkout-total-price'>${calculateTotalPriceWithTaxesAndShipping(calculateTotalPrice()).toFixed(2)}</p>
            <p className='checkout-total-price-text'>Total</p>
          </div>
          <div className='checkout-group-data-price-container'>
            {basketData.length > 0 && (
              <div className='checkout-group-data-price'>
                <p className='checkout-data-price-text'>Subtotal</p>
                <p className='checkout-data-price'>${calculateTotalPrice()}</p>
              </div>
            )}
            <div className='checkout-group-data-price'>
              <p className='checkout-data-price-text'>Shipping</p>
              <p className='checkout-data-price'>$10</p>
            </div>
            <div className='checkout-group-data-price'>
              <p className='checkout-data-price-text'>Taxes</p>
              <p className='checkout-data-price'>${calculateTaxes(calculateTotalPrice()).toFixed(2)}</p>
            </div>
          </div>
          <div className='checkout-group-data-price-basket'>
            <p className='checkout-data-price-text'>Item In basket</p>
            <p className='checkout-data-price'>{basketCount}</p>
          </div>
          <button className='checkout-button'>Confirm Order</button>
        </>
      )}
    </div>
        </div>
        </div>
      </div>
      </div>
      <div className='footer-checkout-app' >< Footer /></div>
    </div>
  );
};

export default CheckOut;
