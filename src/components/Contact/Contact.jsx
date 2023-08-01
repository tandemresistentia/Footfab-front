import React, { useState,useEffect } from 'react';
import './Contact.css';
import HCaptcha from 'react-hcaptcha';
import Nav from '../Home/Nav/Nav'
import Footer from '../Home/Footer/Footer'
import WebLogo from '../../assets/Home/Nav/web-logo.png';
import Arrow from '../../assets/Contact/Outline.png'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captchaToken: '', // To store the hCaptcha response token
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCaptchaChange = (token) => {
    setFormData((prevData) => ({ ...prevData, captchaToken: token }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if hCaptcha token is available
    if (!formData.captchaToken) {
      console.log('Please complete the hCaptcha challenge.');
      return;
    }

    try {
      const response = await fetch('/submit_contact_form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, 'h-captcha-response': formData.captchaToken }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        // Reset the form after successful submission
        setFormData({ name: '', email: '', message: '', captchaToken: '' });
      } else {
        console.log('Form submission failed.');
      }
    } catch (error) {
      // Error occurred during form submission, silently catch the error
      // without showing it to the user
      console.log('An error occurred during form submission.');
    }
  };

  useEffect(() => {
    // Cleanup function to unmount hCaptcha when the component is unmounted
    let unmounted = false;

    return () => {
      // Check if the component is not already unmounted before attempting to unmount hCaptcha
      if (!unmounted) {
        console.log('Contact component is unmounting. Unmount hCaptcha here.');
        unmounted = true;
      }
    };
  }, []);

  return (
    <div className="contact-app2">
        <div className="contact-nav">
        <Nav textColor="#ffffff" logo={WebLogo}/>
        </div>
    <div className="contact-app">
        
      <div className="contact-body">
        <p className="contact-title">Contact Us</p>
        <form className='form-class-group' onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label htmlFor="name" className="form-text">
              Your name
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email" className="form-text">
              Your email
            </label>
            <input
              className="form-input2"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message" className="form-text">
              Message
            </label>
            <textarea
              className="form-input3"
              id="message"
              name="message"
              placeholder="Message..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-form-lower">
          <div className="captcha-container">
            <HCaptcha
              sitekey="6e282531-6a57-4e40-bc74-f207ee2dbe75" // Replace with your hCaptcha Site Key
              onVerify={handleCaptchaChange}
            />
          </div>
          <button className='button-submit' type="submit"><img src={Arrow}></img></button>
          </div>
        </form>
      </div>
        
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
