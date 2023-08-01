import React from "react";
import "./FeaturedItem.css";
import heart from "../../../assets/Home/FeaturedSection/heart.png";
import AddToBasket from '../../../components/Product/AddToBasket/AddToBasket';
import { Link } from "react-router-dom";
const FeaturedItem = ({ image,alt, price, title, description , rating, ratingNumber}) => {
  return (
    <div className="featured-item">
        <div className="item-image">
          <img className="image-shoe" src={image} alt={alt} />
        </div>
        <div className="featured-group">
        <div className='featured-item-text'>
          <div className="item-title">{title}</div>
          <div className="item-description">{description}</div>
          <div className="rating-group">
          <img src={rating} alt={alt} />
          <div className="item-rating-number">{ratingNumber}</div>
          </div>
          <Link to="/products">
          <button className="button-text">Check  Products</button>
          </Link>
          </div>
          <div className="item-price">{price}</div>
          </div>
    </div>
  );
};

export default FeaturedItem;

