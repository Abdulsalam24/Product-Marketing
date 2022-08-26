import { useState } from "react";
import "../assets/style/signIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
  const { email, password } = formData;

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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Wrong credentials");
    }
  };

  return (
    <div className="container sign-form">
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="sign-btn">
          <h4>Sign in</h4>
          <button type="submit" onClick={handleSubmit}>
            <FaArrowRight />
          </button>
        </div>
      </form>

      <div className="sign-option">
        <Link to="/sign-up">Sign Up Instead</Link>
      </div>
    </div>
  );
}

export default SignIn;
