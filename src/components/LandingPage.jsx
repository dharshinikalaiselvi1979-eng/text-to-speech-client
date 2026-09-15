import React from 'react';

function LandingPage({ onGetStarted, onLogin, onGuestDemo }) {
  return (
    <div className="landing-container">
      {/* Header / Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav__brand">
          <span className="landing-nav__logo">🎙️</span>
          <span className="landing-nav__title">TextToSpeech AI</span>
        </div>
        <div className="landing-nav__actions">
          <button type="button" className="btn-text" style={{ fontSize: 14 }} onClick={onLogin}>
            Log In
          </button>
          <button
            type="button"
            className="btn btn--primary"
            style={{ width: 'auto', padding: '8px 18px', fontSize: 14 }}
            onClick={onGetStarted}
          >
            Sign Up Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">✨ Multi-lingual Speech Synthesis Engine</div>
        <h1 className="hero-title">Give your words a natural, human voice.</h1>
        <p className="hero-subtitle">
          Convert written text into natural-sounding audio across 7 global languages. Listen back instantly in your browser or download MP3 voiceovers with one click.
        </p>

        <div className="hero-cta-group">
          <button type="button" className="btn btn--primary hero-btn" onClick={onGetStarted}>
            Get Started Now →
          </button>
          <button type="button" className="btn btn--secondary hero-btn" onClick={onGuestDemo}>
            Try Demo as Guest
          </button>
        </div>

        {/* Feature Pill Tags */}
        <div className="hero-tags">
          <span className="tag-pill">✓ 7 Languages</span>
          <span className="tag-pill">✓ Neural Male & Female Voices</span>
          <span className="tag-pill">✓ MP3 Audio Export</span>
          <span className="tag-pill">✓ Speech History & Favourites</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-features">
        <h2 className="section-title">Everything you need for voice synthesis</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>7 Languages</h3>
            <p>Full support for English, Hindi, Gujarati, Marathi, Spanish, French, and German voices.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎙️</div>
            <h3>Neural Voices</h3>
            <p>Expressive, natural-sounding male and female neural voices for professional audio.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Instant MP3 Export</h3>
            <p>Generate audio in seconds and download standard MP3 files straight to your device.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Speech History</h3>
            <p>Save past speech generations automatically to your personal account dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Favourite Voices</h3>
            <p>Star your preferred voices for quick access whenever you need to synthesize text.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Lightweight</h3>
            <p>Zero clutter, rapid conversion speed, and simple browser-based controls.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} TextToSpeech AI • Built with React & Express</p>
      </footer>
    </div>
  );
}

export default LandingPage;
