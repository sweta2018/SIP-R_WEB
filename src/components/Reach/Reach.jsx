import React, { useEffect } from 'react';
import './reach.css';

export default function Reach() {
  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="reach-container">

      {/* 1. HERO SECTION */}
      <section className="reach-hero">
        <div className="hero-content-left">
          <div className="hero-label">
            REACH US <span className="line"></span>
          </div>
          <h1 className="hero-title">
            Good<br />
            Conversations<br />
            Brew Here.
          </h1>
          <p className="hero-desc">
            Whether it's a question, a collaboration<br />
            or just a hello — we're always happy<br />
            to hear from you.
          </p>
          <div className="reach-script hero-script">
            Some<br />Table<br />Always.
          </div>
        </div>

        {/* <div className="hero-content-right">
          <div className="hero-vertical-text">
            <span>COFFEE</span>
            <span>PEOPLE</span>
            <span>IDEAS</span>
            <span>ALWAYS</span>
            <span>WELCOME</span>
            <div className="bottom-line"></div>
          </div>
        </div> */}
      </section>

      {/* 2. CONTACT INFO SECTION */}
      <section className="reach-info-bar">
        <div className="info-label">
          GET IN TOUCH <span className="line"></span>
        </div>

        <div className="info-grid">
          {/* Email */}
          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 4l10 8 10-8" />
              </svg>
            </div>
            <span className="info-item-label">EMAIL</span>
            <span className="info-item-value">hello@siprkolkata.com</span>
            <a href="mailto:hello@siprkolkata.com" className="info-item-link">Send us an email &rarr;</a>
          </div>

          {/* WhatsApp */}
          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="info-item-label">CALL / WHATSAPP</span>
            <span className="info-item-value">+91 98765 43210</span>
            <a href="#" className="info-item-link">Chat on WhatsApp &rarr;</a>
          </div>

          {/* Location */}
          <div className="info-item">
            <div className="info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="info-item-label">LOCATION</span>
            <span className="info-item-value" style={{ fontSize: '15px' }}>29 Nicolas str, New York, 987597-50<br />Kolkata - 700019, West Bengal</span>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="info-item-link">Get Directions &rarr;</a>
          </div>

          {/* Side Accent */}
          <div className="info-side-accent">
            <img src="/beans.svg" alt="Coffee Bean" className="info-bean-img" onError={(e) => {
              // Fallback to a single CSS shape or hide if beans.svg doesn't exist
              e.target.style.display = 'none';
            }} />
            <div className="info-side-text">
              Good<br />Coffee<br />Brings<br />People<br />Closer.
              <div className="line" style={{ width: '20px', height: '1px', backgroundColor: '#8c7f73', margin: '15px auto 0' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="reach-map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.9785817210874!2d88.35824581504938!3d22.542289485198276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771c55555555%3A0x1234567890abcdef!2sBallygunge%20Circular%20Rd%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sip'R Location"
          ></iframe>
        </div>

        <div className="map-details">
          <div className="map-label">
            FIND US HERE <span className="line"></span>
          </div>

          <img src="/fav-sipr.png" alt="Stamp" className="map-stamp" style={{ width: '80px', top: '10px', right: '10px' }} />

          <h2 className="map-title">
            Right in the<br />
            heart of New Town.
          </h2>
          <p className="map-desc">
            A space for good coffee, great company<br />
            and a slower, kinder pace.
          </p>

          <div className="map-divider"></div>

          <div className="hours-container">
            <div className="hours-info">
              <div className="hours-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="hours-label">VISITING HOURS</div>
                <div className="hours-value">Mon - Sun<br />8:00 AM - 9:00 PM</div>
              </div>
            </div>
            {/* <div className="reach-script" style={{ transform: 'rotate(-5deg)', marginRight: '20px' }}>
              See<br />you<br />Soon!
            </div> */}
          </div>
        </div>
      </section>

      {/* 4. FOOTER SECTION */}
      <section className="reach-footer">
        <div className="footer-content">
          <div className="footer-label">
            LET'S STAY CONNECTED
          </div>
          <h2 className="footer-title">
            Great things<br />start with a conversation.
          </h2>

          <div className="footer-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f4ebd8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <line x1="4.5" y1="19.5" x2="19.5" y2="4.5" stroke="#f4ebd8" />
            </svg>
          </div>

          <div className="footer-bottom">
            <div className="footer-brand">
              SIP'R &bull; KOLKATA
            </div>
            <div className="footer-nav">
              <span>COFFEE</span>
              <span>PASTRIES</span>
              <span>PEOPLE</span>
              <span>STORIES</span>
              <span>YOU</span>
              <div className="footer-nav-line"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
