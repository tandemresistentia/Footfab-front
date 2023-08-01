import React, { useState } from 'react';
import axios from 'axios';
import './ShipmentCalculator.css';
import { Scrollbars } from 'react-custom-scrollbars';
import USPSImage from "../../../assets/Home/ShipmentCalculator/USPS.png";
import UPSImage from "../../../assets/Home/ShipmentCalculator/UPS.png";
import DHLImage from "../../../assets/Home/ShipmentCalculator/DHL.png";
import FedExImage from "../../../assets/Home/ShipmentCalculator/FedEx.png";
const ShipmentCalculator = () => {
  const [formData, setFormData] = useState({
    name_from: '',
    street1_from: '',
    city_from: '',
    state_from: '',
    zip_from: '',
    country_from: '',
    name_to: '',
    street1_to: '',
    city_to: '',
    state_to: '',
    zip_to: '',
    country_to: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  });
  const [shippingRates, setShippingRates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the Django backend
      await axios.post('https://footfab-back-production.up.railway.app/api/shipping-rates/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Fetch shipping rates after successful form submission
      await getShippingRates();

      // Form submitted successfully, handle any necessary UI changes
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle error if the form submission fails
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getShippingRates = async () => {
    try {
      const response = await axios.get('https://footfab-back-production.up.railway.app/api/shipping-rates/');
      const data = response.data;

      // Update the shippingRates state with the received data
      setShippingRates(data.rates);
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    }
  };

  
  return (
    <div className='shipping-rates-app'>
    <div className='shipping-rates-left'>
      <p className='shipping-rates-title'>Shipment Cost Calculator</p>
    <form className="shipping-input-container-group" onSubmit={handleSubmit}>
      <div className='shipping-input-container'>
      <p className='form-title'>From</p>
      <div className='shipping-input-container-inside'>
      <label htmlFor="name_from" className='form-text'>Name -</label>
      <input className='input-box' placeholder='John Doe' type="text" id="name_from" name="name_from" onChange={handleChange} value={formData.name_from} />

      <label htmlFor="street1_from" className='form-text'>Street -</label>
      <input className='input-box' placeholder='123 Main St' type="text" id="street1_from" name="street1_from" onChange={handleChange} value={formData.street1_from} />

      <label htmlFor="city_from" className='form-text'>City -</label>
      <input className='input-box' placeholder='San Francisco' type="text" id="city_from" name="city_from" onChange={handleChange} value={formData.city_from} />

      <label htmlFor="state_from" className='form-text'>State -</label>
      <input className='input-box'placeholder='CA' type="text" id="state_from" name="state_from" onChange={handleChange} value={formData.state_from} />

      <label htmlFor="zip_from" className='form-text'>ZIP -</label>
      <input className='input-box' placeholder='94111' type="text" id="zip_from" name="zip_from" onChange={handleChange} value={formData.zip_from} />

      <label htmlFor="country_from" className='form-text'>Country -</label>
      <input className='input-box' placeholder='US' type="text" id="country_from" name="country_from" onChange={handleChange} value={formData.country_from} />
      </div>
      </div>
      <div className='shipping-input-container'>
      <p className='form-title' >To</p>
      <div className='shipping-input-container-inside'>
      <label htmlFor="name_to" className='form-text'>Name -</label>
      <input className='input-box' placeholder='Jane Doe' type="text" id="name_to" name="name_to" onChange={handleChange} value={formData.name_to} />

      <label htmlFor="street1_to" className='form-text'>Street -</label>
      <input className='input-box' placeholder='456 Elm St' type="text" id="street1_to" name="street1_to" onChange={handleChange} value={formData.street1_to} />

      <label htmlFor="city_to" className='form-text'>City -</label>
      <input className='input-box' placeholder='New York' type="text" id="city_to" name="city_to" onChange={handleChange} value={formData.city_to} />

      <label htmlFor="state_to" className='form-text'>State -</label>
      <input className='input-box' placeholder='NY' type="text" id="state_to" name="state_to" onChange={handleChange} value={formData.state_to} />

      <label htmlFor="zip_to" className='form-text'>ZIP -</label>
      <input className='input-box' placeholder='10001' type="text" id="zip_to" name="zip_to" onChange={handleChange} value={formData.zip_to} />

      <label htmlFor="country_to" className='form-text'>Country -</label>
      <input className='input-box' placeholder='US' type="text" id="country_to" name="country_to" onChange={handleChange} value={formData.country_to} />
      </div>
      </div>
      <div className='shipping-input-parcel-button'> 
      <div className='shipping-input-container-small'>
      <p className='form-title'>Parcel</p>
      <div className='shipping-input-container-inside-small'>
      <label htmlFor="length" className='form-text'>Length -</label>
      <input className='input-box' placeholder='5' type="text" id="length" name="length" onChange={handleChange} value={formData.length} />

      <label htmlFor="width" className='form-text'>Width -</label>
      <input className='input-box' placeholder='5' type="text" id="width" name="width" onChange={handleChange} value={formData.width} />

      <label htmlFor="height" className='form-text'>Height -</label>
      <input className='input-box' placeholder='5' type="text" id="height" name="height" onChange={handleChange} value={formData.height} />

      <label htmlFor="weight" className='form-text'>Weight -</label>
      <input className='input-box' placeholder='5' type="text" id="weight" name="weight" onChange={handleChange} value={formData.weight} />
      </div>
      </div>
      <button className='submit-button' type="submit">Submit</button>
      </div>
    </form>
    </div>
    
    <div className='shipping-rates-right'>
    
        <ul className='cost-data-group'>
        <Scrollbars style={{ width: '100%', height: '100%'}}>
      {shippingRates.map((rate, index) => (
        <li key={index}>
          <ul className='shipment-data-unit'>
          <li className='service-image'>
                  {rate.provider === "USPS" ? (
                    <img src={USPSImage} alt="USPS" />
                  ) : rate.provider === "UPS" ? (
                    <img src={UPSImage} alt="UPS" />
                  ) : rate.provider === "DHL Express" || rate.provider === "DHL eCommerce" ? (
                    <img src={DHLImage} alt="DHL" />
                  ) : rate.provider === "FedEx" || rate.provider === "FedEx SmartPost" ? (
                    <img src={FedExImage} alt="FedEx" />
                  ) : (
                    rate.provider
                  )}
                </li>
            <li className='service-text'>{rate.service}</li>
            <li className='rate-text'>{rate.rate}</li>
          </ul>
        </li>
      ))}
      </Scrollbars>
    </ul>
    
    </div>
    
    </div>
  );
};

export default ShipmentCalculator;
