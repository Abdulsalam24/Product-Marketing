import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

import forgotPasswordImg from "../assets/img/forgotPassword.png";

import "../assets/style/forgotpassword.scss";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="pageContainer">
      <div className="center">
        <div className="flex">
          <div className="img">
            <img src={forgotPasswordImg} alt="forgotPasswordImg" />
          </div>
          <div className="forgot-password-text">
            <p>Forgot your password? <br /> No problem - It happens to everyone!</p>
            <form onSubmit={onSubmit}>
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="send">
                <button>Reset Your Password</button>
                {/* <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button> */}
              </div>
            </form>
            <p>Click the button to reset your password</p>

            <Link className="forgotPasswordLink" to="/sign-in">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
