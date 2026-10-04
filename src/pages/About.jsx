import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, BookOpen, Heart, Shield } from 'lucide-react'
import '../styles/about.css'

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="container-narrow">
          <div className="about-hero-arabic" dir="rtl" lang="ar" aria-label="Al-Quran Al-Kareem">
            القرآن الكريم
          </div>
          <h1>About This Project</h1>
          <p>
            The Noble Qur'an is a peaceful digital reading space created to make
            the words of the Holy Qur'an accessible to everyone.
          </p>
        </div>
      </div>

      <div className="about-body">
        <div className="container-narrow">

          {/* Purpose */}
          <section className="about-section" aria-labelledby="purpose-heading">
            <h2 id="purpose-heading">Our Purpose</h2>
            <p>
              This website was created with one simple goal: to provide a dedicated, reliable,
              and respectful digital space for reading the Holy Qur'an.
            </p>
            <p>
              Whether you are a lifelong reader or approaching the Qur'an for the first time,
              this platform is designed to help you open the Book, find peace, and continue
              your journey — quietly, without distraction.
            </p>
            <p>
              We have tried to recreate the feeling of reading a beautifully printed Mushaf
              while providing the convenience and accessibility of modern web technology.
            </p>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          {/* Features */}
          <section className="about-section" aria-labelledby="features-heading">
            <h2 id="features-heading">What This Project Offers</h2>
            <ul className="about-features-list">
              <li>
                <BookOpen size={18} aria-hidden="true" />
                <div>
                  <strong>Complete Qur'an Text</strong>
                  <p>All 114 surahs with verified Arabic text sourced from a trusted dataset.</p>
                </div>
              </li>
              <li>
                <BookOpen size={18} aria-hidden="true" />
                <div>
                  <strong>Multiple Reading Modes</strong>
                  <p>Mushaf, Continuous, and Verse-by-Verse layouts to suit your preference.</p>
                </div>
              </li>
              <li>
                <Heart size={18} aria-hidden="true" />
                <div>
                  <strong>Bookmarks and Progress</strong>
                  <p>Save your place and return to where you left off — no account required.</p>
                </div>
              </li>
              <li>
                <Shield size={18} aria-hidden="true" />
                <div>
                  <strong>Privacy-First</strong>
                  <p>Everything is stored locally in your browser. No accounts, no tracking of your reading.</p>
                </div>
              </li>
            </ul>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          {/* Data Sources */}
          <section className="about-section" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Qur'anic Text and Sources</h2>
            <p>
              The Arabic text used in this application is the Tanzil Uthmani edition,
              served through the <strong>AlQuran.cloud</strong> API. This is a widely used and
              verified source for Qur'anic text in digital applications.
            </p>
            <p>
              The default English translation is <strong>Saheeh International</strong>.
              Additional translations by Abdullah Yusuf Ali, Pickthall, and
              Dr. Mustafa Khattab are also available. These translations are provided
              for educational and personal reading purposes.
            </p>
            <p>
              We do not modify, paraphrase, or generate Qur'anic text. The text displayed
              is served as-is from its source.
            </p>
            <div className="about-source-links">
              <a
                href="https://alquran.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="about-source-link"
              >
                AlQuran.cloud API
                <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a
                href="https://tanzil.net"
                target="_blank"
                rel="noopener noreferrer"
                className="about-source-link"
              >
                Tanzil.net (Qur'anic Text)
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          {/* Credits */}
          <section className="about-section about-credits" aria-labelledby="credits-heading">
            <h2 id="credits-heading">Project Credits</h2>

            <div className="credit-card">
              <div className="credit-label">Project Courtesy</div>
              <div className="credit-name">Taoheed Ololade Naheemat</div>
              <p className="credit-desc">
                This project was created with the kind courtesy of Taoheed Ololade Naheemat,
                whose support made this digital reading experience possible.
              </p>
            </div>

            <div className="credit-card credit-card-developer">
              <div className="credit-label">Developed by</div>
              <div className="credit-name">
                <a
                  href="https://chilltechltd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credit-company-link"
                >
                  CHILL TECH LTD
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
              <p className="credit-tagline">"We Build. You Grow."</p>
              <p className="credit-desc">
                CHILL TECH LTD is a technology company dedicated to building
                thoughtful digital products. Visit our portfolio at{' '}
                <a
                  href="https://chilltechltd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  chilltechltd.com
                </a>
                .
              </p>
            </div>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          {/* CTA */}
          <div className="about-cta">
            <Link to="/read" className="btn btn-primary btn-lg">
              <BookOpen size={18} aria-hidden="true" />
              Open the Qur'an
            </Link>
            <Link to="/privacy" className="btn btn-secondary">
              Privacy Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
