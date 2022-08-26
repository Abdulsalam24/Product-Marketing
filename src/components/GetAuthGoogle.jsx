import { useEffect } from "react";
import "../assets/style/getauthgoogle.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import GoogleIcon from "../assets/svg/googleIcon.svg";

import { toast } from "react-toastify";

function GetAuthGoogle() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("could not authorize google");
    }
  };

  return (
    <div className="google-auth container">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <button onClick={handleGoogle}>
        <img src={GoogleIcon} alt="GoogleIcon" />
      </button>
    </div>
  );
}

export default GetAuthGoogle;
