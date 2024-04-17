import React, { useEffect, useState } from "react";
// import Image from "./loo.svg";
import Image from "./bLogo.svg";
import Logo from "./loo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  const handleRegisterSubmit = async (e) => {
    console.log('Submitting form...'); // Check if function is triggered
    e.preventDefault();
    const formData = {
      username: e.target.name.value + " " + e.target.lastname.value,
      first_name: e.target.name.value,
      last_name: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      user_type: e.target.user_type.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      DOB: e.target.dob.value
    };
    console.log(formData)
    if (formData.password !== e.target.confirmPassword.value) {
      toast.error("Passwords don't match");
      return;
    }
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:3000/api/user/signup", formData);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.error || "An error occurred");
      } else {
        // Handle network errors or cases where the response is not received
        toast.error("Network error or server not responding");
      }
    }

  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="Decorative image" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="register-center">
            <h2>Welcome to OlumsX!</h2>
            <p>Please enter your credentials to register</p>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Name" name="name" required={true} />
              <input type="text" placeholder="Lastname" name="lastname" required={true} />
              <input type="email" placeholder="Email" name="email" required={true} />
              <select name="user_type" required={true}>
                <option value="Customer">Customer</option>
                <option value="Manager">Manager</option>
                <option value="Vendor">Vendor</option>
              </select>
              <input type="text" placeholder="Address" name="address" required={true} />
              <select name="gender" required={true}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="date" name="dob" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> : <FaEye onClick={() => setShowPassword(!showPassword)} />}
              </div>
              <button type="submit" onClick={() => console.log('Button clicked!')}>Submit</button>

            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
