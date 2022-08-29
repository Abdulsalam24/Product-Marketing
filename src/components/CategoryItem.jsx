import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

import {FaShoppingBag } from 'react-icons/fa'

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li>
      <Link className="listing-img" to={`/category/${listing.type}/${id}`}>
        <img
          className="category-img"
          src={listing.imgUrls[0]}
          alt={listing.name}
        />
        <div className="category-details">
          <p className="category-location">{listing.location}</p>
          <p className="category-name">{listing.name}</p>
          <p className="category-price">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>

          <div className="category-info">
            <div>
              <FaShoppingBag/>
              <p className="categoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </p>
            </div>

            <div>
              <FaShoppingBag/>
              <p className="categoryListingInfoText">

                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className="removeIcon"
          fill="rgb(231, 76,60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
    </li>
  );
}

export default ListingItem;
