import React, { useEffect, useState } from 'react';
import './Nav.css';
import Expand from '../../../assets/Home/Nav/expand.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Basket from './Basket/Basket';
// Move styled-components code outside of the component function
const NavContainer = styled.nav`
  /* Set default styles for the navigation bar */
  background-color: #ffffff; /* White background */
  color: ${props => props.textColor || '#000000'}; /* Default text color is black */

  /* Add other styles for your navigation bar */
`;

const LogoImg = styled.img`
  /* Add any specific styles for the logo here */
`;
// Function to retrieve basket count from session or set to 0 if not found
const getBasketCountFromSession = () => {
  const storedCount = sessionStorage.getItem('basketCount');
  return storedCount ? parseInt(storedCount, 10) : 0;
};

const Nav = ({ textColor, logo}) => {
  const [linksVisible, setLinksVisible] = useState(false);
  
  const toggleLinksVisibility = () => {
    setLinksVisible(!linksVisible);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);



  return (
    <NavContainer textColor={textColor}>
      <nav className={`navbar ${visible ? 'show' : 'hide'}`}>
        <div className='nav-app'>
          <div className="stay-cool-walk-in-wrapper">
            <p className="stay-cool-walk-in" style={{ color: textColor }}>Stay Cool, Walk In Comfort</p>
          </div>
          <Link to="/">
            <LogoImg src={logo} alt="Logo" />
          </Link>
          <div className="nav-links-wrapper">
            <div className="nav-links">
              <Link to="/about" className="text-wrapper" style={{ color: textColor }}>
                About
              </Link>
              <Link to="/products" className="text-wrapper" style={{ color: textColor }}>
                Products
                </Link>
              <Link to="/contact" className="text-wrapper" style={{ color: textColor }}>
                Contact
              </Link>
              <Link to="/checkout" className="text-wrapper" style={{ color: textColor }}>
              <Basket/>
              </Link>
              
            </div>
          </div>
        </div>
        <div className="nav-mobile">
          <Link to="/">
            <LogoImg src={logo} alt="Logo" />
          </Link>
          <div className="nav-mobile-group">
          <button className="toggle-button" onClick={toggleLinksVisibility}>
            {linksVisible ? (
              <img src={Expand} alt="Hide Links" />
            ) : (
              <img src={Expand} alt="Show Links" />
            )}
          </button>
          {linksVisible && (
            <div className="nav-mobile-links">
              <Link to="/about" className="text-wrapper" style={{ color: textColor }}>
                About
              </Link>
              <Link to="/products" className="text-wrapper" style={{ color: textColor }}>
              Products
              </Link>
              <Link to="/contact" className="text-wrapper" style={{ color: textColor }}>
                Contact
              </Link>
              <Link to="/checkout" className="text-wrapper" style={{ color: textColor }}>
              <Basket/>
              </Link>
            </div>
          )}
          </div>
        </div>
      </nav>
    </NavContainer>
  );
};

export default Nav;
