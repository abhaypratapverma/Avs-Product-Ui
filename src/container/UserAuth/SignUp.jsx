import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./auth.css";

import emailIcon from "../../assets/auth/emailIcon.svg";
import passwordIcon from "../../assets/auth/passwordIcon.svg";
import eyeOpenIcon from "../../assets/auth/eyeOpenIcon.svg";
import eyeCloseIcon from "../../assets/auth/eyeCloseIcon.svg";
import userIcon from "../../assets/auth/userIcon.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    console.log("Sign up:", formData);

    // Example redirect after successful signup
    navigate("/signin");
  };

  const passwordLength = formData.password.length;

  const strength =
    passwordLength < 6 ? "weak" : passwordLength < 10 ? "medium" : "strong";

  return (
    <div className="auth-page">
      <div className="auth-background-pattern" />

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start your shopping journey today</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="auth-field">
            <label className="auth-label">
              <img src={userIcon} width="16" height="16" alt="" />
              Full Name
            </label>

            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
                placeholder="Create a strong password"
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

            {passwordLength > 0 && (
              <div className="auth-password-strength">
                <div className="auth-password-strength-bar">
                  <div className={`auth-password-strength-fill ${strength}`} />
                </div>
                <span>{strength}</span>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="auth-terms">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span className="auth-checkbox-checkmark" />
              <span>
                I agree to the{" "}
                <span
                  className="auth-link-inline"
                  onClick={() => navigate("/terms")}
                  style={{ cursor: "pointer" }}
                >
                  Terms
                </span>{" "}
                and{" "}
                <span
                  className="auth-link-inline"
                  onClick={() => navigate("/privacy")}
                  style={{ cursor: "pointer" }}
                >
                  Privacy
                </span>
              </span>
            </label>
          </div>

          <Button type="submit" variant="primary" size="large">
            Create Account
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/signin")}
            style={{ cursor: "pointer" }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
