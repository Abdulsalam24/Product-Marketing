import React from "react";

import "../assets/style/nav.scss";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as Profile } from "../assets/svg/personOutlineIcon.svg";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeLinkCheck = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>
            <ExploreIcon
              fill={activeLinkCheck("/") ? "#000" : "#535353"}
              height="30px"
              width="30px"
            />
            <p>Explore</p>
          </li>
          <li onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={activeLinkCheck("/offers") ? "#000" : "#535353"}
              height="30px"
              width="30px"
            />
            <p>Offer</p>
          </li>
          <li onClick={() => navigate("/profile")}>
            <Profile
              fill={activeLinkCheck("/profile") ? "#000" : "#535353"}
              height="30px"
              width="30px"
            />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default NavBar;
