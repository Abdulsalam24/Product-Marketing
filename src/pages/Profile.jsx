import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

import "../assets/style/profile.scss";
import CategoryItem from "../components/CategoryItem";

function Profile() {
  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetail, setChangeDetail] = useState(true);

  const { name, email } = formData;

  const navigate = useNavigate();

  const onlogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setChangeDetail(!changeDetail);
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

  const btnDisable = true;




  return (
    <div className="profile container">
      <div className="profile-status">
        <h1>Profile</h1>
        <button type="button" className="sign-out" onClick={onlogOut}>
          Sign-out
        </button>
      </div>

      <div className="change">
        <p>Details</p>
        {changeDetail ? (
          <p
            className="change-btn"
            onClick={() => setChangeDetail(!changeDetail)}
          >
            change
          </p>
        ) : (
          <p className="change-btn" onClick={handleSubmit}>
            done
          </p>
        )}
      </div>

      <form>
        <div className="input">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            disabled={changeDetail}
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={onChange}
            disabled={btnDisable}
          />
        </div>
      </form>

      <Link to="/create-listing" className="create-listing">
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your home</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>

      {!loading && listings?.length > 0 && (
        <>
          <p className="listingText">Your Listings</p>
          <ul className="listingsList">
            {listings.map((listing) => (
              <CategoryItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Profile;
