import React from 'react'
import { Link } from 'react-router-dom'
import { Type, AlignJustify, BookOpen, RotateCcw } from 'lucide-react'
import { useReadingSettings } from '../hooks/useReadingSettings'
import { AVAILABLE_TRANSLATIONS } from '../services/quranService'
import '../styles/settings.css'

const READING_MODES = [
  { id: 'mushaf', label: 'Mushaf', desc: 'Traditional book layout with flowing Arabic text' },
  { id: 'continuous', label: 'Continuous', desc: 'Verse by verse with translation below each' },
  { id: 'verse-by-verse', label: 'Verse by Verse', desc: 'Focus on one verse at a time' },
]

const LINE_SPACINGS = [
  { value: 1.6, label: 'Compact' },
  { value: 2, label: 'Normal' },
  { value: 2.5, label: 'Relaxed' },
  { value: 3, label: 'Wide' },
]

export default function ReadingSettings() {
  const {
    settings,
    setReadingMode,
    setTranslation,
    toggleTranslation,
    toggleTransliteration,
    increaseArabicFont,
    decreaseArabicFont,
    increaseTranslationFont,
    decreaseTranslationFont,
    setLineSpacing,
    resetAllSettings,
    DEFAULT_SETTINGS,
  } = useReadingSettings()

  const [showResetConfirm, setShowResetConfirm] = React.useState(false)

  function handleReset() {
    resetAllSettings()
    setShowResetConfirm(false)
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="container-narrow">
          <span className="section-tag">Preferences</span>
          <h1>Reading Settings</h1>
          <p>Customize your reading experience. Settings are saved automatically to your browser.</p>
        </div>
      </div>

      <div className="settings-body">
        <div className="container-narrow">

          {/* ====== READING MODE ====== */}
          <section className="settings-section" aria-labelledby="reading-mode-heading">
            <h2 id="reading-mode-heading" className="settings-section-title">
              <BookOpen size={18} aria-hidden="true" />
              Reading Mode
            </h2>
            <div className="reading-mode-options">
              {READING_MODES.map(({ id, label, desc }) => (
                <button
                  key={id}
                  className={`mode-option${settings.readingMode === id ? ' active' : ''}`}
                  onClick={() => setReadingMode(id)}
                  aria-pressed={settings.readingMode === id}
                  id={`reading-mode-${id}-btn`}
                >
                  <div className="mode-option-inner">
                    <div className="mode-option-text">
                      <span className="mode-option-label">{label}</span>
                      <span className="mode-option-desc">{desc}</span>
                    </div>
                    {settings.readingMode === id && (
                      <Check size={16} className="mode-check" aria-hidden="true" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ====== FONT SIZES ====== */}
          <section className="settings-section" aria-labelledby="font-heading">
            <h2 id="font-heading" className="settings-section-title">
              <Type size={18} aria-hidden="true" />
              Font Sizes
            </h2>
            <div className="font-controls">
              {/* Arabic Font */}
              <div className="font-control-row">
                <div className="font-control-info">
                  <span className="font-control-label">Arabic Text</span>
                  <span
                    className="font-preview-arabic"
                    dir="rtl"
                    lang="ar"
                    style={{ fontSize: `${settings.arabicFontSize}px` }}
                    aria-hidden="true"
                  >
                    بِسْمِ اللَّهِ
                  </span>
                </div>
                <div className="font-control-buttons">
                  <button
                    className="font-btn"
                    onClick={decreaseArabicFont}
                    disabled={settings.arabicFontSize <= 18}
                    aria-label="Decrease Arabic font size"
                    id="decrease-arabic-font"
                  >
                    A<span style={{ fontSize: '0.6em' }}>−</span>
                  </button>
                  <span className="font-size-value" aria-label={`Current Arabic font size: ${settings.arabicFontSize}px`}>
                    {settings.arabicFontSize}px
                  </span>
                  <button
                    className="font-btn"
                    onClick={increaseArabicFont}
                    disabled={settings.arabicFontSize >= 72}
                    aria-label="Increase Arabic font size"
                    id="increase-arabic-font"
                  >
                    A<span style={{ fontSize: '0.8em' }}>+</span>
                  </button>
                </div>
              </div>

              {/* Translation Font */}
              <div className="font-control-row">
                <div className="font-control-info">
                  <span className="font-control-label">Translation Text</span>
                  <span
                    className="font-preview-translation"
                    style={{ fontSize: `${settings.translationFontSize}px` }}
                    aria-hidden="true"
                  >
                    In the name of Allah
                  </span>
                </div>
                <div className="font-control-buttons">
                  <button
                    className="font-btn"
                    onClick={decreaseTranslationFont}
                    disabled={settings.translationFontSize <= 11}
                    aria-label="Decrease translation font size"
                    id="decrease-translation-font"
                  >
                    a<span style={{ fontSize: '0.6em' }}>−</span>
                  </button>
                  <span className="font-size-value" aria-label={`Current translation font size: ${settings.translationFontSize}px`}>
                    {settings.translationFontSize}px
                  </span>
                  <button
                    className="font-btn"
                    onClick={increaseTranslationFont}
                    disabled={settings.translationFontSize >= 24}
                    aria-label="Increase translation font size"
                    id="increase-translation-font"
                  >
                    a<span style={{ fontSize: '0.8em' }}>+</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ====== LINE SPACING ====== */}
          <section className="settings-section" aria-labelledby="spacing-heading">
            <h2 id="spacing-heading" className="settings-section-title">
              <AlignJustify size={18} aria-hidden="true" />
              Line Spacing
            </h2>
            <div className="spacing-options" role="group" aria-label="Line spacing options">
              {LINE_SPACINGS.map(({ value, label }) => (
                <button
                  key={value}
                  className={`spacing-btn${settings.lineSpacing === value ? ' active' : ''}`}
                  onClick={() => setLineSpacing(value)}
                  aria-pressed={settings.lineSpacing === value}
                  id={`spacing-${label.toLowerCase()}-btn`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* ====== DISPLAY OPTIONS ====== */}
          <section className="settings-section" aria-labelledby="display-heading">
            <h2 id="display-heading" className="settings-section-title">
              Display Options
            </h2>
            <div className="display-toggles">
              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-label">Show Translation</span>
                  <span className="toggle-desc">Display English translation below Arabic text</span>
                </div>
                <button
                  className={`toggle-switch${settings.showTranslation ? ' on' : ''}`}
                  onClick={toggleTranslation}
                  aria-pressed={settings.showTranslation}
                  role="switch"
                  aria-label="Toggle translation display"
                  id="toggle-translation-btn"
                >
                  <span className="toggle-thumb" />
                </button>
              </div>

              <div className="toggle-row">
                <div className="toggle-info">
                  <span className="toggle-label">Show Transliteration</span>
                  <span className="toggle-desc">Display phonetic transliteration</span>
                </div>
                <button
                  className={`toggle-switch${settings.showTransliteration ? ' on' : ''}`}
                  onClick={toggleTransliteration}
                  aria-pressed={settings.showTransliteration}
                  role="switch"
                  aria-label="Toggle transliteration display"
                  id="toggle-transliteration-btn"
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            </div>
          </section>

          {/* ====== TRANSLATION ====== */}
          <section className="settings-section" aria-labelledby="translation-heading">
            <h2 id="translation-heading" className="settings-section-title">
              Translation
            </h2>
            <div className="translation-options">
              <label htmlFor="translation-select" className="settings-label">
                Select Translation
              </label>
              <select
                id="translation-select"
                className="input"
                value={settings.translation}
                onChange={(e) => setTranslation(e.target.value)}
              >
                {AVAILABLE_TRANSLATIONS.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.language})
                  </option>
                ))}
              </select>
              <p className="settings-note">
                Translations are sourced from AlQuran.cloud. Each translation is
                the work of its respective translator and used for educational purposes.
              </p>
            </div>
          </section>

          {/* ====== RESET ====== */}
          <section className="settings-section settings-reset-section">
            <div className="reset-row">
              <div>
                <h3>Reset to Defaults</h3>
                <p>Restore all settings to their original values.</p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setShowResetConfirm(true)}
                id="reset-settings-btn"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Reset Settings
              </button>
            </div>
          </section>

          {/* Preview */}
          <section className="settings-section" aria-labelledby="preview-heading">
            <h2 id="preview-heading" className="settings-section-title">Preview</h2>
            <div className="settings-preview-card">
              <p
                className="arabic-text"
                dir="rtl"
                lang="ar"
                aria-label="Preview of Arabic text rendering"
              >
                الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝١
              </p>
              {settings.showTranslation && (
                <p className="settings-preview-translation">
                  All praise is for Allah—Lord of all worlds.
                  <span className="settings-preview-credit"> — Saheeh International</span>
                </p>
              )}
            </div>
          </section>

          {/* Read Now CTA */}
          <div className="settings-cta">
            <Link to="/read" className="btn btn-primary btn-lg">
              <BookOpen size={18} aria-hidden="true" />
              Go to Reader
            </Link>
          </div>
        </div>
      </div>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-settings-title"
          onClick={(e) => e.target === e.currentTarget && setShowResetConfirm(false)}
        >
          <div className="modal-box">
            <h2 className="modal-title" id="reset-settings-title">Reset All Settings?</h2>
            <p className="modal-body">
              This will restore all reading settings to their default values.
              Your bookmarks and reading progress will not be affected.
            </p>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleReset}>
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
