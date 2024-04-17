import React, { useEffect, useState } from "react";
import Image from "./loo.svg";
import Logo from "./loo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("auth")) || "";

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formInput = {
      email: event.target.email.value.trim(),
      password: event.target.password.value.trim()
    };
    
    for (let key in formInput) {
      if (!formInput[key]) {
        toast.error(`Please fill all input fields: ${key}`);
        return;
      }
    }
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', formInput);
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user); // Assuming setUser here sets the whole user object
      toast.success("Welcome back!", {
        duration: 3000,
        icon: "😃"
      });

      console.log("43")
      console.log(data)
      // Conditional redirection based on user type
      switch (data.user_type) {
        case "Customer":
          console.log("47")
          navigate('/customer');
          break;
          case 'Manager':
          console.log("51")
          navigate('/manager');
          break;
          case 'Vendor':
          console.log("55")
          navigate('/vendor');
          break;
        default:
          navigate('/'); // Default landing if no specific type
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      toast.success("You are already logged in");
      navigate("/dashboard"); // Assume default dashboard or use token to determine type
    }
  }, [token, navigate]);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Company Logo" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Brand Logo" />
          </div>
          <div className="login-center">
            <h2>Sign in</h2>
            <p>Please login to your account</p>
            <form onSubmit={handleFormSubmit}>
              <input type="email" placeholder="Email" name="email" required />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>Login</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
