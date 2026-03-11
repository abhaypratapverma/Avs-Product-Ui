import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./auth.css";

import emailIcon from "../../assets/auth/emailIcon.svg";
import passwordIcon from "../../assets/auth/passwordIcon.svg"; // Reuse icon for OTP if no OTP icon

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const { verifyUser } = await import("../../auth/services/api");
      await verifyUser(formData);
      // Example redirect to sign in after success
      navigate("/signin");
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
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
          <h1 className="auth-brand-title">Verify Your Account</h1>
          <p className="auth-brand-subtitle">Enter the OTP sent to your email to verify your account</p>
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
            <h2 className="auth-title">Verification</h2>
            <p className="auth-subtitle">Please check your email for the OTP</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error" style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
            
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

            {/* OTP */}
            <div className="auth-field">
              <label className="auth-label">
                <img src={passwordIcon} width="16" height="16" alt="" />
                OTP
              </label>

              <Input
                type="text"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength="6"
              />
            </div>

            <Button type="submit" variant="primary" size="large" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <div className="auth-footer">
            Return to{" "}
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

export default VerifyUser;
