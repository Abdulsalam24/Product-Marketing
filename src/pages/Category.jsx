import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/style/category.scss";

import {
  getDocs,
  where,
  orderBy,
  limit,
  query,
  collection,
} from "firebase/firestore";

import { db } from "../firebase.config";
import { toast } from "react-toastify";
import CategoryItem from "../components/CategoryItem";

function Category() {
  const params = useParams();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listing");

        const q = query(
          listingsRef,
          where("type", "==", params.catName),
          orderBy("timestamp", "desc"),
          limit(15)
        );
        const querySnap = await getDocs(q);

        let listingData = [];

        querySnap.forEach((doc) => {
          listingData.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listingData);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch lisitng");
      }
    };
    fetchListings();
  }, [params.catName]);
  console.log(listings, "f");

  return (
    <div className="container category">
      <header>
        <h1 className="pageHeader">
          {params.catName === "rent" ? "Places for rent" : "Places for sale"}
        </h1>
      </header>

      {loading ? (
        <p>Loading</p>
      ) : listings && listings.length > 0 ? (
        <main>
          <ul className="category_Listings">
            {listings.map((listing) => (
              <CategoryItem
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </ul>
        </main>
      ) : (
        <p>No listings for {params.catName}</p>
      )}
    </div>
  );
}

export default Category;
