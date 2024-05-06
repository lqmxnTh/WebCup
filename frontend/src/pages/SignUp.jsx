import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const baseURL = import.meta.env.VITE_API_URL
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormData({ ...formData, [name]: value, email: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post(
        `http://127.0.0.1:8000/signup`,
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.response.data);
    }
  };
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="label-container">
            <label className="label" htmlFor="first_name">
              First Name
            </label>
          </div>
          <input
            required={true}
            className="txt-box"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />

          <div className="label-container">
            <label className="label" htmlFor="username">
              Email
            </label>
          </div>
          <input
            required={true}
            className="txt-box"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            <input className="submit-btn" type="submit" value="Register" />
          </div>
        </form>
      </div>
      <Link className="no-account" to="/login">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default SignUp;
