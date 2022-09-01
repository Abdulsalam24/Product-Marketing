import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";

import "../assets/style/listitem.scss";

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="category-Listing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="category-listing-link"
      >
        <p className="category-name">Product Name : {listing.name}</p>

        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="category-details">
          <p className="category-price">
            Price : #
            <b>
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "service" && " / Month"}
            </b>
          </p>
          <p className="category-location">Address : {listing.location}</p>
          <p className="category-listing">Quantity : {listing.quantity}</p>
        </div>
        <div className="flex">
          {onDelete && (
            <DeleteIcon
              className="removeIcon"
              fill="rgb(231, 76,60)"
              onClick={() => onDelete(listing.id, listing.name)}
            />
          )}

          {onEdit && (
            <EditIcon className="editIcon" onClick={() => onEdit(id)} />
          )}
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
