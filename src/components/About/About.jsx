import React from 'react'
import './About.css'
import Line from './../../assets/About/line.png'
import Nav from '../Home/Nav/Nav'
import Footer from '../Home/Footer/Footer'
import WebLogoDark from '../../assets/Home/Nav/web-logo-dark.png'
const About = () => {
  return (
    <div className='about-app'>
        <div className='about-nav'>
            <Nav textColor="#000000" logo={WebLogoDark}/>
        </div>
        <div className='about-body'>

            <div className='about-upper'>
                <p className='about-title'>About Us</p>
                <img src={Line} alt='line' />
                <p className='about-text-upper'>Welcome to Footbab, 
                your ultimate destination for stylish and comfortable footwear. 
                Our passion for fashion and commitment to exceptional customer 
                service redefine online shoe shopping.</p>
            </div>
            <div className='about-lower'>
                <div className='about-lower-item'>
                    <p className='about-subtitle'>Our Story</p>
                        <img src={Line} alt='line' />
                        <p className='about-text'>We strive to provide an unparalleled shopping 
                        experience with a diverse collection of high-quality shoes for men, women, 
                        and kids. Each shoe is handpicked to complement your style and empower you 
                        to walk confidently.</p>
                </div>
                <div className='about-lower-item'>
                    <p className='about-subtitle'>Why Choose Us?</p>
                        <img src={Line} alt='line' />
                        <ul>
                            <li className='about-text'>Curated Collection: 
                            Trendy and comfortable styles for every occasion.</li>
                            <li className='about-text'>Quality Assurance: Only the best products 
                            from trusted brands and manufacturers.</li>
                            <li className='about-text'>Customer Satisfaction: Friendly support 
                            for a smooth and enjoyable shopping experience.</li>
                        </ul>
                </div>
                <div className='about-lower-item'>
                    <p className='about-subtitle'>Our Values</p>
                        <img src={Line} alt='line' />
                        <ul>
                            <li className='about-text'>Integrity: Honesty, transparency,
                             and ethical practices guide us.</li>
                            <li className='about-text'>Innovation: Stay ahead with the 
                            latest trends and technology.</li>
                            <li className='about-text'>Community: Your feedback inspires us 
                            to deliver excellence.</li>
                        </ul>
                </div>
            </div>
            
        </div>
        <div className='about-footer'>
            <Footer className="about-footer"/>
            </div>
    </div>
  )
}

export default About