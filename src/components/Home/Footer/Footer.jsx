import React from 'react';
import './Footer.css';
import WebLogo from '../../../assets/Home/Nav/web-logo.png'
import Instagram from "../../../assets/Home/Footer/insta.png"
import Linkedin from '../../../assets/Home/Footer/linkedin.png'
import Twitter from '../../../assets/Home/Footer/twitter.png'

const Footer = () => {
  return (
    <div className="footer-app">
      <div className="footer-left">
        <img className='footer-logo' src={WebLogo}></img>
        <p className="footer-left-text">Stay Cool, Walk in Comfort</p>
        <p className="footer-left-rights">© 2023 Footfab. All rights reserved.</p>
      </div>
       <div className="footer-middle">
        <div className="footer-middle-newsletter">
          <p className="footer-middle-newsletter-text">Subscribe to our marketing newsletter</p>
          <div className="footer-middle-newsletter-input">
            <input className="footer-middle-newsletter-input-text" placeholder="YOUR E-MAIL"></input>
            <button className="footer-middle-newsletter-input-button">Subscribe</button>
            </div>
        </div>
        <div className="footer-middle-links">
          <a href='' className="footer-middle-links-button">privacy policy</a>
          <a href='' className="footer-middle-links-button">TERMS AND CONDITIONS</a>
        </div>
       </div>
        <div className="footer-right">
          <div className="footer-right-social">
            <p className='social-text'>Follow Us</p>
            <a href='https://www.instagram.com/footfab/'><img className="social-img" src={Instagram} alt='instagram'></img></a>
            <a href='https://www.linkedin.com/in/luis-miguel-vargas-garrido-1743a0114/'><img className="social-img" src={Linkedin} alt='linkedin'></img></a>
            <a href='https://twitter.com/footfab'><img className="social-img" src={Twitter} alt='twitter'></img></a>
          </div>
          <div className="footer-right-contact">
            <p className="footer-right-contact-text">Email us</p>
            <p className="footer-right-contact-text">luismvg41@gmail.com</p>
          </div>
        </div>
    </div>
  );
};

export default Footer;
