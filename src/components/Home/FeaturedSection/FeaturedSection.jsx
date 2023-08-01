import React from "react";
import "./FeaturedSection.css";
import FeaturedItem from "./FeaturedItem";
import Stars45 from "../../../assets/Home/FeaturedSection/Stars.png";
import shoe1 from "../../../assets/Home/FeaturedSection/shoe1.png";
import shoe2 from "../../../assets/Home/FeaturedSection/shoe2.png";
import shoe3 from "../../../assets/Home/FeaturedSection/shoe3.png";

const FeaturedSection = () => {
  return (
    <div className="featured-section">
      <div className="featured-section_title">Featured Items</div>
        <div className="featured-section_items">
          <div className="featured-item-title">featured items you might like</div>
          <div className="item-group">
          <FeaturedItem
          image={shoe1}
          price='199€'
          title='Nike Air Max Solo'
          description='Retro, Stylish, Modern'
          rating={Stars45}
          ratingNumber='(135)'
          />
                    <FeaturedItem
          image={shoe2}
          price='299€'
          title='Air Jordan 2 Retro'
          description='Classic, Iconic, Timeless'
          rating={Stars45}
          ratingNumber='(189)'
          />
                    <FeaturedItem
          image={shoe3}
          price='249€'
          title='Nike Invincible 3'
          description='Innovative, Responsive, Light'
          rating={Stars45}
          ratingNumber='(49)'
          />
          </div>
        </div>
    </div>
  );
};

export default FeaturedSection;
