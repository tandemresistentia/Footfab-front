import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
      <div className="hero-section-wrapper">
        <div className="hero-section">
          <h1 className="foot-fab">Footfab</h1>
          <p className="walk-with-confidence">
            Walk With Confidence, Rock With Footfab: Defining Your Signature Style.
          </p>
        </div>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <button className="hero-button">SHOP NOW</button>
          </Link>
        </div>
  )
}

export default Hero