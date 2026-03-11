import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const { logoutUser } = await import("../../auth/services/api");
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");
      
      if (refreshToken) {
        await logoutUser(refreshToken, accessToken);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setLoggingOut(false);
      navigate("/signin");
    }
  };

  const products = [
    {
      id: 1,
      name: "Nexus Ultra Phone",
      price: "$999.00",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Voyager Elite Pods",
      price: "$299.00",
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Omni Pro Slate",
      price: "$749.00",
      category: "Computing",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Stellar Horizon Watch",
      price: "$499.00",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    },
      {
      id: 1,
      name: "Nexus Ultra Phone",
      price: "$999.00",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Voyager Elite Pods",
      price: "$299.00",
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Omni Pro Slate",
      price: "$749.00",
      category: "Computing",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Stellar Horizon Watch",
      price: "$499.00",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    },
      {
      id: 1,
      name: "Nexus Ultra Phone",
      price: "$999.00",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Voyager Elite Pods",
      price: "$299.00",
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Omni Pro Slate",
      price: "$749.00",
      category: "Computing",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Stellar Horizon Watch",
      price: "$499.00",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    },
      {
      id: 1,
      name: "Nexus Ultra Phone",
      price: "$999.00",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Voyager Elite Pods",
      price: "$299.00",
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Omni Pro Slate",
      price: "$749.00",
      category: "Computing",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Stellar Horizon Watch",
      price: "$499.00",
      category: "Wearables",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="home-container">
      {/* Background Effects */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-logo">AVS ELITE</div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#collections">Collections</a>
        </div>
        <div className="nav-actions">
          <button className="add-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
          <button className="btn-primary" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-badge">NEW COLLECTION 2026</div>
        <h1 className="hero-title">
          <span>EXPERIENCE THE</span>
          <span>FUTURE OF SHOPPING</span>
        </h1>
        <p className="hero-subtitle">
          Curated premium selection of next-gen technology and lifestyle
          essentials designed for the visionary.
        </p>
        <div className="hero-btns">
          <button className="btn-primary">Shop Collection</button>
          <button className="btn-outline">Watch Trailer</button>
        </div>
      </section>

      {/* Products Grid */}
      <section id="shop" className="products-section">
        <div className="section-header">
          <div className="section-info">
            <h2 className="section-title">Featured Products</h2>
            <p className="text-muted">
              Hand-picked selections for your professional workspace.
            </p>
          </div>
          <button className="btn-outline">View All Products</button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price-row">
                  <span className="product-price">{product.price}</span>
                  <button className="add-btn">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Newsletter */}
      <section
        style={{
          padding: "8rem 5%",
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <div
          style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Join the Vision
          </h2>
          <p className="text-muted" style={{ marginBottom: "2rem" }}>
            Subscribe for exclusive early access to our most sophisticated
            releases.
          </p>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <input
              type="text"
              placeholder="Enter your email"
              style={{
                background: "#1e293b",
                border: "1px solid var(--glass-border)",
                padding: "12px 24px",
                borderRadius: "12px",
                color: "white",
                width: "100%",
                maxWidth: "340px",
              }}
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
