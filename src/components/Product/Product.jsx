import React, { useEffect, useState } from 'react';
import data001 from '../../ShoeData/data001.json';
import './Product.css';
import Nav from '../Home/Nav/Nav'
import Footer from '../Home/Footer/Footer'
import WebLogo from '../../assets/Home/Nav/web-logo.png'
import heart from "../../assets/Home/FeaturedSection/heart.png";
import FullHeart from "../../assets/Home/FeaturedSection/Full-heart.png";
import Stars45 from "../../assets/Home/FeaturedSection/Stars.png";
import AddToBasket from './AddToBasket/AddToBasket';



const Product = () => {
  // Combine data from all JSON files into a single array
  const allProducts = [
    ...Object.values(data001),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // 4x4 grid, so 8 products per page
  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortBy, setSortBy] = useState('category'); // Default sorting by category

  useEffect(() => {
    // Calculate the index range for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Get the current products for the current page from the sorted array
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (sortBy === 'price') {
        return a[sortBy] - b[sortBy];
      } else {
        return a[sortBy].localeCompare(b[sortBy]);
      }
    });

    setCurrentProducts(sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage, sortBy, productsPerPage, allProducts]); // Add all the dependencies here

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    // Sort the products based on the selected option
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (sortOption === 'price') {
        return a[sortOption] - b[sortOption];
      } else {
        return b[sortOption].localeCompare(a[sortOption]);
      }
    });

    setCurrentProducts(sortedProducts.slice(0, productsPerPage)); // Update the current products with sorted data
    setCurrentPage(1); // Reset the current page to 1 when sorting changes
  };


  const [productHearts, setProductHearts] = useState(() => {
    const savedHearts = JSON.parse(localStorage.getItem("productHearts"));
    return savedHearts ? savedHearts : {};
  });

  // Function to toggle the heart status for a specific product item
  const toggleProductHeart = (productId) => {
    setProductHearts((prevHearts) => ({
      ...prevHearts,
      [productId]: !prevHearts[productId] || false,
    }));
  };

  // Save the updated heart status in localStorage whenever productHearts changes
  useEffect(() => {
    localStorage.setItem("productHearts", JSON.stringify(productHearts));
  }, [productHearts]);

  // Generate and initialize random numbers for each product
  const [productRandomNumbers, setProductRandomNumbers] = useState(() => {
    const savedRandomNumbers = JSON.parse(localStorage.getItem('productRandomNumbers'));
    if (savedRandomNumbers) {
      return savedRandomNumbers;
    } else {
      const generatedRandomNumbers = {};
      allProducts.forEach(product => {
        generatedRandomNumbers[product.id] = Math.floor(Math.random() * 100) + 1;
      });
      localStorage.setItem('productRandomNumbers', JSON.stringify(generatedRandomNumbers));
      return generatedRandomNumbers;
    }
  });

  // Save the updated random numbers in localStorage whenever productRandomNumbers changes
  useEffect(() => {
    localStorage.setItem('productRandomNumbers', JSON.stringify(productRandomNumbers));
  }, [productRandomNumbers]);



  const addToBasket = (product) => {
    // Check if the basket data is already stored in session storage
    const existingBasket = sessionStorage.getItem('basket');
    let updatedBasket = [];
  
    if (existingBasket) {
      // If basket data exists, parse it
      updatedBasket = JSON.parse(existingBasket);
  
      // Check if the product already exists in the basket
      const existingProductIndex = updatedBasket.findIndex((item) => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // If the product exists, increment its quantity by 1
        updatedBasket[existingProductIndex].quantity += 1;
      } else {
        // If the product is not in the basket, add it with quantity 1
        product.quantity = 1;
        updatedBasket.push(product);
      }
    } else {
      // If the basket is empty, add the product with quantity 1
      product.quantity = 1;
      updatedBasket.push(product);
    }
  
    // Save the updated basket data in session storage
    sessionStorage.setItem('basket', JSON.stringify(updatedBasket));
  
    // Add any other logic you need after adding to the basket (e.g., show a success message)
  
    // Print the updated basket data to the console
    console.log('Updated Basket:', updatedBasket);
  };
  




  
  return (
    <div className='products-app'>
      <div className='products-nav'>
        <Nav textColor="#ffffff" logo={WebLogo}/>
      </div>
      <div className='products-body'>
        <div className='products-upper'>
          {/* Sorting options */}
          <div className="sort-options">
            <button onClick={() => handleSort('category')} className={sortBy === 'category' ? 'active' : ''}>
              Category
            </button>
            <button onClick={() => handleSort('price')} className={sortBy === 'price' ? 'active' : ''}>
              Price
            </button>
            {/* Add more sorting options as needed */}
          </div>
          <div className='products-group'>
            {/* Render the 4x4 grid of products */}
            <div className="product-grid">
              
              {currentProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-item-image-group">
                    <img className='product-item-photo' src={product.imageURL} alt={product.name} style={{ width: '200px' }} />
                    <div
                      className={`image-heart-product ${productHearts[product.id] ? "full-heart" : ""}`}
                      onClick={() => toggleProductHeart(product.id)}
                    ></div>
                  </div>
                  <div>
                    <div className='product-item-inside'>
                      <div className='product-item-inside-upper'>
                        <p className='item-title-group'>{product.name}</p>
                        <div className="rating-group-product">
                          <img src={Stars45} alt='alt' />
                          {/* Display the random number for each product */}
                          <div className="item-rating-number">({productRandomNumbers[product.id]})</div>
                        </div>
                        <div className='item-rating-group'>
                          <p className='item-description-product'>{product.category}</p>
                          <p className='item-price-product'>${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className='addtobasket-button' onClick={() => addToBasket(product)}><AddToBasket/></button>
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(allProducts.length / productsPerPage) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
