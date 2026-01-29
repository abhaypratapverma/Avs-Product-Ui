import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./auth.css";

import emailIcon from "../../assets/auth/emailIcon.svg";
import successIcon from "../../assets/auth/successIcon.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate api
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
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
            <h1 className="auth-brand-title">Check Your Email</h1>
            <p className="auth-brand-subtitle">We've sent you a password reset link</p>
          </div>
          
          {/* Animated Background Elements */}
          <div className="auth-bg-shapes">
            <div className="auth-shape auth-shape-1"></div>
            <div className="auth-shape auth-shape-2"></div>
            <div className="auth-shape auth-shape-3"></div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="auth-right-section">
          <div className="auth-form-container">
            <div className="auth-success-container">
              <div className="auth-success-icon">
                <img src={successIcon} width="64" height="64" alt="success" />
              </div>

              <h2 className="auth-title">Email Sent!</h2>

              <p className="auth-subtitle">
                Reset link sent to <strong>{email}</strong>
              </p>

              <Button
                variant="primary"
                size="large"
                onClick={() => navigate("/signin")}
              >
                Back to Sign In
              </Button>

              <div className="auth-footer">
                Remember password?{" "}
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
        </div>
      </div>
    );
  }

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
          <h1 className="auth-brand-title">Reset Password</h1>
          <p className="auth-brand-subtitle">Don't worry, we'll help you get back in</p>
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
            <h2 className="auth-title">Forgot Password?</h2>
            <p className="auth-subtitle">
              Enter your email to receive reset instructions
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">
                <img src={emailIcon} width="16" height="16" alt="" />
                Email Address
              </label>

              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" size="large" loading={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="auth-footer">
            Back to{" "}
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
    </div>
  );
};

export default ForgotPassword;

