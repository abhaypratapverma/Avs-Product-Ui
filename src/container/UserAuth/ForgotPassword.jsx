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
        <div className="auth-background-pattern" />

        <div className="auth-card">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <img src={successIcon} width="64" height="64" alt="success" />
          </div>

          <h2 className="auth-title">Check Your Email</h2>

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
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-background-pattern" />

      <div className="auth-card">
        <h2 className="auth-title">Forgot Password?</h2>

        <p className="auth-subtitle">
          Enter your email to receive reset instructions
        </p>

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

          <Button type="submit" variant="primary" size="large">
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
  );
};

export default ForgotPassword;
