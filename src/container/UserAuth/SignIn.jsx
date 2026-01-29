import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./auth.css";

import emailIcon from "../../assets/auth/emailIcon.svg";
import passwordIcon from "../../assets/auth/passwordIcon.svg";
import eyeOpenIcon from "../../assets/auth/eyeOpenIcon.svg";
import eyeCloseIcon from "../../assets/auth/eyeCloseIcon.svg";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sign in:", formData);

    // Example redirect after success
    navigate("/");   // or /dashboard, /home etc
  };

  return (
    <div className="auth-page">
      {/* Left Side - Animated Logo Section */}
      <div className="auth-left-section">
        <div className="auth-logo-container">
          <div className="auth-logo-wrapper">
            <div className="auth-logo-circle auth-logo-circle-1"></div>
            <div className="auth-logo-circle auth-logo-circle-2"></div>
            <div className="auth-logo-circle auth-logo-circle-3"></div>
            <div className="auth-logo-text">AVS</div>
          </div>
          <h1 className="auth-brand-title">Welcome Back</h1>
          <p className="auth-brand-subtitle">Sign in to access your account and continue your journey with us</p>
        </div>
        
        {/* Animated Background Elements */}
        <div className="auth-bg-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-right-section">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">Enter your credentials to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">
                <img src={emailIcon} width="16" height="16" alt="" />
                Email Address
              </label>

              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">
                <img src={passwordIcon} width="16" height="16" alt="" />
                Password
              </label>

              <div className="auth-password-wrapper">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeCloseIcon : eyeOpenIcon}
                    width="20"
                    height="20"
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span className="auth-checkbox-label">Remember me</span>
              </label>

              <span
                className="auth-link-small"
                onClick={() => navigate("/forgot-password")}
                style={{ cursor: "pointer" }}
              >
                Forgot password?
              </span>
            </div>

            <Button type="submit" variant="primary" size="large">
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <span
              className="auth-link"
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
