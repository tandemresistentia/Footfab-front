import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Product from './components/Product/Product';
import CheckOut from './components/CheckOut/CheckOut';
import LoadingPage from './components/LoadingPage'; // Import the LoadingPage component
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the loading time as needed
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingPage /> // Show the loading animation if isLoading is true
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Product />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
