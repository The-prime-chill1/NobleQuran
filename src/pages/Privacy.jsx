import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import '../styles/about.css'

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <div className="container-narrow">
          <span className="section-tag">Transparency</span>
          <h1>Privacy Information</h1>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="privacy-body">
        <div className="container-narrow">

          <section className="privacy-section">
            <h2>Local Data Storage</h2>
            <p>
              This website does not require you to create an account. Your reading data is stored
              locally in your browser using <strong>LocalStorage</strong>. The following information
              is saved locally on your device:
            </p>
            <ul className="privacy-list">
              <li>Your last-read surah and verse number</li>
              <li>Bookmarked verses (surah number, verse number, and Arabic text)</li>
              <li>Reading preferences (theme, font size, reading mode, translation choice)</li>
            </ul>
            <p>
              This data <strong>does not leave your browser</strong>. It is not sent to any server
              and is not accessible to us or any third party. It remains on your device until you
              clear your browser data, clear your bookmarks manually, or reset your settings.
            </p>
            <p>
              Because this data is local, it <strong>does not sync between devices or browsers</strong>.
              If you use a different browser or device, your reading progress and bookmarks will
              not be available there.
            </p>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          <section className="privacy-section">
            <h2>Third-Party Services</h2>
            <p>
              This website uses the following third-party services. Please review their privacy
              policies if you would like to understand how they handle data:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>AlQuran.cloud API</strong> — Used to fetch Qur'anic Arabic text and English
                translations. When you open a surah, a request is made to their servers.
                Visit{' '}
                <a href="https://alquran.cloud" target="_blank" rel="noopener noreferrer">
                  alquran.cloud
                  <ExternalLink size={11} style={{ display: 'inline', marginLeft: '3px' }} aria-hidden="true" />
                </a>
                {' '}for their terms and privacy information.
              </li>
              <li>
                <strong>Google Fonts</strong> — Used to load the Amiri Quran and Inter typefaces.
                Google may log font request data per their policies. Visit{' '}
                <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">
                  fonts.google.com
                  <ExternalLink size={11} style={{ display: 'inline', marginLeft: '3px' }} aria-hidden="true" />
                </a>.
              </li>
              <li>
                <strong>Islamic.Network CDN</strong> — Used to stream audio recitation files when
                the audio player is active. This CDN is operated by AlQuran.cloud.
              </li>
            </ul>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          <section className="privacy-section">
            <h2>Analytics and Tracking</h2>
            <p>
              This website does not use any analytics tools, tracking scripts, or advertising
              networks in its current form. We do not collect any personally identifiable
              information.
            </p>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          <section className="privacy-section">
            <h2>Qur'anic Content Accuracy</h2>
            <p>
              The Arabic text of the Holy Qur'an displayed on this website is sourced from
              the Tanzil Uthmani dataset via the AlQuran.cloud API. It is not generated,
              modified, or paraphrased by this application.
            </p>
            <p>
              Translations are provided by their respective translators and are attributed
              accordingly. We do not generate translations using AI or any automated system.
            </p>
          </section>

          <div className="geo-divider"><div className="geo-divider-icon" /></div>

          <section className="privacy-section">
            <h2>Contact</h2>
            <p>
              This project was developed by{' '}
              <a href="https://chilltechltd.com" target="_blank" rel="noopener noreferrer">
                CHILL TECH LTD
                <ExternalLink size={11} style={{ display: 'inline', marginLeft: '3px' }} aria-hidden="true" />
              </a>.
              If you have questions or concerns about this privacy policy, please visit our website.
            </p>
          </section>

          <div className="about-cta">
            <Link to="/" className="btn btn-secondary">Back to Home</Link>
            <Link to="/about" className="btn btn-ghost">About This Project</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
