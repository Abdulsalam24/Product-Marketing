import React, { useState } from "react";

import "../assets/style/forgot-password.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import SignBtn from "../shared/SignBtn";
import { FaArrowRight } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Check your email/spam for password change");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Unable to recreat password");
    }
  };

  return (
    <div className="forgot-password container">
      <h1>Forgot Password</h1>
      <form>
        <div className="input">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="enter your email"
            onChange={onChange}
          />
        </div>
        <div className="sign-in">
          <Link to="/sign-in">Sign in</Link>
        </div>
        <SignBtn>
          <h4>Send reset Link</h4>
          <button type="submit" onClick={handleSubmit}>
            <FaArrowRight />
          </button>
        </SignBtn>
      </form>
    </div>
  );
}

export default ForgotPassword;
