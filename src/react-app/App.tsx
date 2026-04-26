import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json() as { success: boolean; message: string };
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="site">
      {/* Nav */}
      <nav className="nav">
        <span className="nav-logo">Dr. Sarah Al-Rashid, PharmD</span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#newsletter">Newsletter</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">Clinical Pharmacist · Health Educator · Wellness Advocate</p>
          <h1>Your trusted guide to <span className="accent">medication safety</span> and better health</h1>
          <p className="hero-sub">
            Evidence-based advice, medication reviews, and wellness insights — delivered straight to your inbox.
          </p>
          <a href="#newsletter" className="btn-primary">Join the Newsletter</a>
        </div>
        <div className="hero-image">
          <div className="avatar-ring">
            <div className="avatar-placeholder">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="50" cy="38" r="22" fill="#a7c4bc"/>
                <ellipse cx="50" cy="85" rx="32" ry="20" fill="#a7c4bc"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="section-inner">
          <h2>About Me</h2>
          <p>
            I'm a licensed clinical pharmacist with over 10 years of experience in hospital and community pharmacy settings.
            My passion is bridging the gap between complex medical information and everyday patients — helping people
            understand their medications, avoid harmful interactions, and take control of their health.
          </p>
          <p>
            Through this platform I share practical, science-backed content on drug safety, chronic disease management,
            supplements, and healthy living.
          </p>
          <div className="stats">
            <div className="stat"><span>10+</span><p>Years Experience</p></div>
            <div className="stat"><span>5k+</span><p>Patients Helped</p></div>
            <div className="stat"><span>200+</span><p>Articles Written</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services" id="services">
        <div className="section-inner">
          <h2>What I Offer</h2>
          <div className="cards">
            <div className="card">
              <div className="card-icon">💊</div>
              <h3>Medication Reviews</h3>
              <p>Comprehensive review of your current medications to identify interactions, duplications, and optimization opportunities.</p>
            </div>
            <div className="card">
              <div className="card-icon">📋</div>
              <h3>Health Consultations</h3>
              <p>One-on-one sessions to discuss your health goals, OTC choices, supplements, and chronic condition management.</p>
            </div>
            <div className="card">
              <div className="card-icon">📰</div>
              <h3>Weekly Newsletter</h3>
              <p>Curated health tips, medication news, and wellness strategies delivered every week — free of charge.</p>
            </div>
            <div className="card">
              <div className="card-icon">🎓</div>
              <h3>Patient Education</h3>
              <p>Easy-to-understand guides on common conditions, drug classes, and how to have better conversations with your doctor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter" id="newsletter">
        <div className="section-inner newsletter-inner">
          <h2>Stay Informed. Stay Healthy.</h2>
          <p>Join thousands of readers who get weekly insights on medications, wellness, and evidence-based health tips.</p>
          <form className="subscribe-form" onSubmit={handleSubscribe} noValidate>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Your name"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing…" : "Subscribe Free"}
            </button>
          </form>
          {status === "success" && <p className="form-msg success">{message}</p>}
          {status === "error" && <p className="form-msg error">{message}</p>}
          <p className="privacy-note">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact">
        <div className="section-inner">
          <h2>Get in Touch</h2>
          <p>Have a question or want to collaborate? Reach out — I'd love to hear from you.</p>
          <div className="contact-links">
            <a href="mailto:sarah@pharmahealth.com" className="contact-link">📧 sarah@pharmahealth.com</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link">💼 LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact-link">🐦 Twitter / X</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Dr. Sarah Al-Rashid, PharmD · All rights reserved</p>
        <p className="disclaimer">This site is for educational purposes only and does not constitute medical advice.</p>
      </footer>
    </div>
  );
}

export default App;
