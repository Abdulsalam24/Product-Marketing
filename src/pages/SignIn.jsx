import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

import "../assets/style/signIn.scss";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <div className="center">
          <div className="left">
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
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
                Sign In
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
            <Link className="sign-up-instead" to="/sign-up">
              Sign Up Instead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
