import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import bg from "../assets/img/bg.jpg";
import sale from "../assets/img/sale.jpg";
import service from "../assets/img/service.jpg";

import { FaAngleDoubleRight } from "react-icons/fa";

import "../assets/style/explore.scss";

function Explore() {
  return (
    <div className="explore-page">
      <header
        style={{
          background: `url(${bg}) center no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="thunmnail"></div>
        <div className="header-text">
          <h1>
            Marketing’s job is never done <br /> Get it done !
          </h1>
          <p>
            Looking for a reliable website to launch your product to make that sale for you ? Prosalety is here to save you the stress and make selling easy.
          </p>
          <div className="btn">
            <Link to="/category/sale">
              <button>View Product</button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="category-sec">
          <div className="explore-categories">
            <Link to="/category/sale">
              <img src={sale} alt="sale" />
              <p className="exploreCategoryName">For sale</p>
            </Link>
            <Link to="/category/service">
              <img src={service} alt="service" />
              <p className="exploreCategoryName">For Service</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Explore;
