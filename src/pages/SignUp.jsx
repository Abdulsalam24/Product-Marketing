import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

import "../assets/style/signIn.scss";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="pageContainer">
      <div className="center">
        <div className="flex">
          <div className="left">
            <h1>Sign Up</h1>

            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />

              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />

                <img
                  src={visibilityIcon}
                  alt="show password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>

              <button className="sign-in" type="submit">
                Sign Up
              </button>

              <Link className="forgot-password" to="/forgot-password">
                Forgot Password
              </Link>
            </form>
          </div>
          <div className="or">
            <p>OR</p>
          </div>
          <div className="right">
            <OAuth />

            <Link to="/sign-in" className="sign-up-instead">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
