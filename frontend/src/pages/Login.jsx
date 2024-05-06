import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const baseURL = import.meta.env.VITE_API_URL
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token", "user"]);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      setCookie("token", token, { path: "/" });
      setCookie("user", JSON.stringify(user), { path: "/" });

      navigate("/");
    } catch (error) {
      setError(error.response.data.detail);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="label-container">
            <label className="label" htmlFor="username">
              Email
            </label>
          </div>

          <input
            required={true}
            className="txt-box"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="label-container">
            <label className="label" htmlFor="password">
              Password
            </label>
          </div>
          <input
            required={true}
            className="txt-box"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="label-container">
            <input
              className="password-visibility-checkbox"
              type="checkbox"
              id="password-visibility"
              checked={showPassword}
              onChange={handlePasswordVisibility}
            />
            <label
              className="password-visibility-label"
              htmlFor="password-visibility"
            >
              Show Password
            </label>
          </div>
          <div className="submit-btn-conatiner">
            <input className="submit-btn" type="submit" value="Login" />
          </div>
        </form>
      </div>
      <div className="label-container">
      </div>
      <Link className="forgot-password" to="/forgot-password">
        Forgot Password
      </Link>

      <Link className="no-account" to="/signup">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;
