import { useState } from "react";
import "../assets/style/signIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import SignBtn from "../shared/SignBtn";
import GetAuthGoogle from "../components/GetAuthGoogle";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const { email, password, name } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
      toast.error("Something is wrong with registration");
    }
  };

  return (
    <div className="container sign-form">
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit}>
        <div className="input input-name">
          <input
            type="email"
            id="name"
            value={name}
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>
        <div className="input input-email">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="input input-password">
          <input
            type={viewPassword ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={handleChange}
          />
          <div className="view-icon">
            {viewPassword ? (
              <FaEyeSlash onClick={() => setViewPassword(!viewPassword)} />
            ) : (
              <FaEye onClick={() => setViewPassword(!viewPassword)} />
            )}
          </div>
        </div>

        <div className="forget-password">
          <Link to="/forget-password">Forget password</Link>
        </div>
      </form>
      <SignBtn>
        <h4>Sign Up</h4>
        <button onClick={handleSubmit}>
          <FaArrowRight />
        </button>
      </SignBtn>
      <GetAuthGoogle />
      <div className="sign-option">
        <Link to="/sign-in">Sign In Instead</Link>
      </div>
    </div>
  );
}

export default SignUp;
