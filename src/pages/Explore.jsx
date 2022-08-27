import React from "react";

import "../assets/style/explore.scss";

import rentHouse from "../assets/jpg/rentCategoryImage.jpg";
import saleHouse from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <div className="container explore">
      <h1>Explore</h1>
      <div className="recommended">
        <p>Recommended</p>
        <div className="img-flex">
          <div className="img">
            <img src={saleHouse} alt="saleHouse" />
            <div className="img-text">
              <h4>Evergreen house of heroes</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="categories">
        <p>Categories</p>
        <div className="img-flex">
          <div className="img">
            <img src={rentHouse} alt="rentHouse" />
            <span>Places for rent</span>
          </div>
          <div className="img">
            <img src={saleHouse} alt="saleHouse" />
            <span>Places for sale</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
