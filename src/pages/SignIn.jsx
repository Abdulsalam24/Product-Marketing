import { useState } from "react";
import "../assets/style/signIn.scss";
import { Link } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [viewPassword, setViewPassword] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="container sign-form">
      <h1>Welcome back</h1>
      <form>
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
      <div className="sign-btn">
        <h4>Sign in</h4>
        <button>
          <FaArrowRight />
        </button>
      </div>
      <div className="sign-option">
        <Link to="/sign-up">Sign Up Instead</Link>
      </div>
    </div>
  );
}

export default SignIn;
