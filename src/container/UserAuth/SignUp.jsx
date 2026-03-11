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
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      const { registerUser } = await import("../../auth/services/api");
      
      const addressString = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.pincode}, ${formData.country}`;
      const payload = { 
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        pincode: formData.pincode,
        address: addressString,
        roleName: "CLIENT" 
      };

      await registerUser(payload);
      // Example redirect to Verify layout after successful signup
      navigate("/verify-user", { state: { email: formData.email } });
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const passwordLength = formData.password.length;

  const strength =
    passwordLength < 6 ? "weak" : passwordLength < 10 ? "medium" : "strong";

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
          <h1 className="auth-brand-title">Join Us Today</h1>
          <p className="auth-brand-subtitle">Create your account and start your journey with us</p>
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
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Fill in your details to get started</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error" style={{ color: "red", 
marginBottom: "1rem" }}>{error}</div>}
            

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

            {/* Phone */}
            <div className="auth-field">
              <label className="auth-label">
                <img src={userIcon} width="16" height="16" alt="" />
                Phone Number
              </label>

              <Input
                type="text"
                name="phone"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div className="auth-field" style={{ flex: 1 }}>
                <label className="auth-label">
                  <img src={userIcon} width="16" height="16" alt="" />
                  Street
                </label>
                <Input type="text" name="street" placeholder="Sector 62" value={formData.street} onChange={handleChange} required />
              </div>

              <div className="auth-field" style={{ flex: 1 }}>
                <label className="auth-label">City</label>
                <Input type="text" name="city" placeholder="Noida" value={formData.city} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div className="auth-field" style={{ flex: 1 }}>
                <label className="auth-label">State</label>
                <Input type="text" name="state" placeholder="UP" value={formData.state} onChange={handleChange} required />
              </div>

              <div className="auth-field" style={{ flex: 1 }}>
                <label className="auth-label">Country</label>
                <Input type="text" name="country" placeholder="India" value={formData.country} onChange={handleChange} required />
              </div>
            </div>

            {/* Pincode */}
            <div className="auth-field">
              <label className="auth-label">
                <img src={userIcon} width="16" height="16" alt="" />
                Pincode
              </label>

              <Input
                type="text"
                name="pincode"
                placeholder="201301"
                value={formData.pincode}
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
                  <span className="auth-password-strength-text">{strength}</span>
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
                <span className="auth-checkbox-label">
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

            <Button type="submit" variant="primary" size="large" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
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
    </div>
  );
};

export default SignUp;

