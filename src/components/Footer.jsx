import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, BookOpen } from 'lucide-react'
import '../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner container">
        {/* Top row */}
        <div className="footer-top">
          {/* Branding */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon" aria-hidden="true">
                <span>ق</span>
              </div>
              <div>
                <p className="footer-name-arabic">القرآن الكريم</p>
                <p className="footer-name-english">The Noble Qur'an</p>
              </div>
            </div>
            <p className="footer-tagline">
              Open the Book. Find Peace. Continue Your Journey.
            </p>
          </div>

          {/* Links */}
          <div className="footer-links-section">
            <div className="footer-link-group">
              <h3>Navigate</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/read">Read Qur'an</Link></li>
                <li><Link to="/surahs">Surah Directory</Link></li>
                <li><Link to="/bookmarks">Bookmarks</Link></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h3>Information</h3>
              <ul>
                <li><Link to="/about">About This Project</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/settings">Reading Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="geo-divider">
          <div className="geo-divider-icon" aria-hidden="true" />
        </div>

        {/* Bottom row */}
        <div className="footer-bottom">
          <div className="footer-credits">
            <p>
              Project Courtesy:{' '}
              <span className="footer-credit-name">Taoheed Ololade Naheemat</span>
            </p>
            <p>
              Developed by{' '}
              <a
                href="https://chilltechltd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-company-link"
              >
                CHILL TECH LTD
                <ExternalLink size={12} aria-hidden="true" />
              </a>
              {' '}— We Build. You Grow.
            </p>
          </div>
          <div className="footer-meta">
            <p>Arabic text: Tanzil Uthmani (via AlQuran.cloud)</p>
            <p>Translation: Saheeh International</p>
            <p>&copy; {year} The Noble Qur'an. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
