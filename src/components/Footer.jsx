import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, BookOpen, Heart, ArrowUp, Sparkles, Compass } from 'lucide-react'
import QuranLogo from './QuranLogo'
import '../styles/footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-master" role="contentinfo">
      {/* Top Sacred Arch Banner */}
      <div className="footer-sacred-arch">
        <div className="container footer-arch-inner">
          <div className="footer-arch-calligraphy" dir="rtl" lang="ar">
            وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
          </div>
          <p className="footer-arch-translation">
            “And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?”
          </p>
          <span className="footer-arch-ref">Surah Al-Qamar • Verse 17</span>
        </div>
      </div>

      <div className="footer-inner container">
        {/* Main 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Sacred Mission */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand-link" aria-label="The Noble Qur'an Home">
              <QuranLogo size="lg" variant="full" showTagline={true} />
            </Link>
            <p className="footer-mission-text">
              An illuminated digital sanctuary dedicated to the timeless recitation, contemplation, and study of the Holy Qur'an with authentic typography, crystal-clear audio, and distraction-free sacred design.
            </p>
            <div className="footer-quick-badge">
              <Link to="/read/1/1" className="footer-read-pill">
                <BookOpen size={14} aria-hidden="true" />
                <span>Begin with Al-Fatihah</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Sacred Scripture & Key Surahs */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <Compass size={14} className="footer-col-icon" aria-hidden="true" />
              Sacred Surahs
            </h3>
            <ul className="footer-nav-list">
              <li>
                <Link to="/read/36">
                  <span>Surah Ya-Sin (يس)</span>
                  <span className="footer-surah-tag">Heart of Qur'an</span>
                </Link>
              </li>
              <li>
                <Link to="/read/67">
                  <span>Surah Al-Mulk (الملك)</span>
                  <span className="footer-surah-tag">The Protector</span>
                </Link>
              </li>
              <li>
                <Link to="/read/18">
                  <span>Surah Al-Kahf (الكهف)</span>
                  <span className="footer-surah-tag">Friday Light</span>
                </Link>
              </li>
              <li>
                <Link to="/read/55">
                  <span>Surah Ar-Rahman (الرحمن)</span>
                  <span className="footer-surah-tag">The Beneficent</span>
                </Link>
              </li>
              <li>
                <Link to="/read/56">
                  <span>Surah Al-Waqi'ah (الواقعة)</span>
                  <span className="footer-surah-tag">The Inevitable</span>
                </Link>
              </li>
              <li>
                <Link to="/surahs" className="footer-view-all-link">
                  <span>Explore all 114 Surahs &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Tools */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <Sparkles size={14} className="footer-col-icon" aria-hidden="true" />
              Navigation & Study
            </h3>
            <ul className="footer-nav-list">
              <li><Link to="/">Sanctuary Home</Link></li>
              <li><Link to="/read">Scripture Reader</Link></li>
              <li><Link to="/surahs">Index of 114 Surahs</Link></li>
              <li><Link to="/bookmarks">Illuminated Bookmarks</Link></li>
              <li><Link to="/settings">Reading & Script Settings</Link></li>
              <li><Link to="/about">About This Project</Link></li>
            </ul>
          </div>

          {/* Column 4: Daily Dhikr & Spiritual Anchor */}
          <div className="footer-col footer-col-dhikr">
            <h3 className="footer-col-title">Daily Remembrance</h3>
            <div className="footer-dhikr-card">
              <div className="dhikr-card-crest" aria-hidden="true">
                <span className="dhikr-arabic-lead" dir="rtl" lang="ar">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</span>
              </div>
              <p className="dhikr-translation">
                “Glory be to Allah and His is all praise; Glory be to Allah, the Supreme.”
              </p>
              <div className="dhikr-card-bottom">
                <span className="dhikr-benefit">Prophetic Remembrance (Dhikr)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Patronage & Development Pavilion */}
        <div className="footer-pavilion">
          <div className="pavilion-card pavilion-courtesy">
            <div className="pavilion-tag">PROJECT COURTESY & VISION</div>
            <div className="pavilion-name-wrap">
              <span className="pavilion-honorific">Esteemed Patron:</span>
              <h4 className="pavilion-name">Taoheed Ololade Naheemat</h4>
            </div>
            <p className="pavilion-sub">
              Dedicated to continuous charity (Sadaqah Jariyah) and spreading the blessed guidance of the Noble Qur'an.
            </p>
          </div>

          <div className="pavilion-card pavilion-developer">
            <div className="pavilion-tag">ARCHITECTED & ENGINEERED BY</div>
            <div className="pavilion-company-wrap">
              <h4 className="pavilion-company">CHILL TECH LTD</h4>
              <span className="pavilion-motto">“We Build. You Grow.”</span>
            </div>
            <p className="pavilion-sub">
              Crafting world-class digital experiences, sacred interfaces, and performant web technologies.
            </p>
            <a
              href="https://chilltechltd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pavilion-btn"
              aria-label="Visit Chill Tech Ltd website (opens in new tab)"
            >
              <span>Visit Chill Tech Ltd</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Divider Bar with Islamic Diamond */}
        <div className="footer-divider-row">
          <div className="footer-divider-line" />
          <div className="footer-divider-diamond" aria-hidden="true" />
          <div className="footer-divider-line" />
        </div>

        {/* Scholarly Text Attributions & Legal Meta */}
        <div className="footer-bottom-meta">
          <div className="footer-attribution-chips">
            <span className="attribution-chip">
              <strong className="chip-label">Text:</strong> Tanzil Uthmani (Al-Madinah Style)
            </span>
            <span className="attribution-chip">
              <strong className="chip-label">Translation:</strong> Saheeh International
            </span>
            <span className="attribution-chip">
              <strong className="chip-label">Audio:</strong> Mishary Rashid Alafasy & Mahmoud Khalil Al-Husary
            </span>
          </div>

          <div className="footer-legal-row">
            <p className="footer-copyright">
              &copy; {year} <strong>The Noble Qur'an</strong> (القرآن الكريم). All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="footer-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span>Return to Top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
