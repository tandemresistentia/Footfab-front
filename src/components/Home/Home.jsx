import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Home.css';
import Nav from './Nav/Nav';
import Hero from './Hero/Hero';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import  FeaturedSection  from './FeaturedSection/FeaturedSection';
import ShipmentCalculator from './ShipmentCalculator/ShipmentCalculator';
import EndGreetings from './EndGreetings/EndGreetings'; 
import Footer from './Footer/Footer';
import WebLogo from '../../assets/Home/Nav/web-logo.png';

const Home = () => {
  const [zoomedOut, setZoomedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomedOut(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const foo = document.getElementById('foo');
    const navhero = document.getElementsByClassName('navhero-class')[0];
    const navheroRect = navhero.getBoundingClientRect();

    const randomX = Math.random() * (navheroRect.width - 50);
    const randomY = Math.random() * (navheroRect.height - 50);

    foo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  };

  return (
    <div className='home-app'>
      <div
        className={`navhero-class ${zoomedOut ? 'navhero-class2' : ''}`}
        onClick={handleClick}
      >
        <div id="foo" className="ball"></div>
        <TransitionGroup>
          {zoomedOut && (
            <CSSTransition classNames="fade" timeout={1000}>
              <Nav textColor="#ffffff" logo={WebLogo}/>
            </CSSTransition>
          )}
        </TransitionGroup>
        <TransitionGroup>
          {zoomedOut && (
            <CSSTransition classNames="fade" timeout={1000}>
              <Hero />
            </CSSTransition>
          )}
          
        </TransitionGroup>
      </div>
      <FeaturedSection/>
      <VideoPlayer/>        
      <ShipmentCalculator/>
      <EndGreetings/>
      <Footer/>
    </div>
  );
};

export default Home;