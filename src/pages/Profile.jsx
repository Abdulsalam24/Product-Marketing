import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style/profile.scss";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
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
    </div>
  );
}

export default Profile;
