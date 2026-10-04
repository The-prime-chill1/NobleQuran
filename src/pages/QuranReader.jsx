import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Settings, AlertCircle,
  ArrowUpCircle, Volume2, VolumeX
} from 'lucide-react'
import VerseCard from '../components/VerseCard'
import AudioPlayer from '../components/AudioPlayer'
import { useBookmarks } from '../hooks/useBookmarks'
import { useReadingProgress } from '../hooks/useReadingProgress'
import { useReadingSettings } from '../hooks/useReadingSettings'
import {
  fetchSurahList,
  fetchSurahWithTranslation,
} from '../services/quranService'
import '../styles/reader.css'

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'

// Surahs that start with Bismillah (all except Al-Fatihah which has it as verse 1, and At-Tawbah)
const NO_BISMILLAH_SURAHS = [1, 9]

const READING_MODES = [
  { id: 'mushaf', label: 'Mushaf' },
  { id: 'continuous', label: 'Continuous' },
  { id: 'verse-by-verse', label: 'Verse by Verse' },
]

export default function QuranReader() {
  const { surahNumber: paramSurah, verseNumber: paramVerse } = useParams()
  const navigate = useNavigate()

  const { settings, setReadingMode, toggleTranslation, increaseArabicFont, decreaseArabicFont } = useReadingSettings()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { updateProgress } = useReadingProgress()

  const [surahList, setSurahList] = useState([])
  const [currentSurah, setCurrentSurah] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showQuickSettings, setShowQuickSettings] = useState(false)
  const [showAudio, setShowAudio] = useState(false)

  // Verse-by-verse mode: current verse index
  const [currentVerseIdx, setCurrentVerseIdx] = useState(0)

  // Jump-to-verse
  const [jumpInput, setJumpInput] = useState('')

  const surahNum = parseInt(paramSurah) || 1
  const verseNum = parseInt(paramVerse) || 1

  // Load surah list for selector
  useEffect(() => {
    fetchSurahList().then(setSurahList).catch(() => {})
  }, [])

  // Load current surah content
  useEffect(() => {
    setLoading(true)
    setError(null)
    setCurrentSurah(null)

    fetchSurahWithTranslation(surahNum, settings.translation)
      .then(data => {
        setCurrentSurah(data)
        // Set initial verse index for verse-by-verse
        const idx = Math.max(0, verseNum - 1)
        setCurrentVerseIdx(Math.min(idx, data.verses.length - 1))
        // Save reading progress
        updateProgress({
          surahNumber: surahNum,
          verseNumber: verseNum,
          surahName: data.surah.englishName,
          surahNameArabic: data.surah.name,
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Failed to load surah. Please check your connection.')
        setLoading(false)
      })
  }, [surahNum, settings.translation])

  // Scroll to verse after load
  const scrolledRef = useRef(false)
  useEffect(() => {
    if (!loading && currentSurah && paramVerse && !scrolledRef.current) {
      scrolledRef.current = true
      setTimeout(() => {
        const el = document.getElementById(`verse-${surahNum}-${verseNum}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
    if (loading) scrolledRef.current = false
  }, [loading, currentSurah, paramVerse, surahNum, verseNum])

  function navigateToSurah(num) {
    navigate(`/read/${num}`)
  }

  function handleSurahSelect(e) {
    navigateToSurah(parseInt(e.target.value))
  }

  function handleJump(e) {
    e.preventDefault()
    const num = parseInt(jumpInput)
    if (!num || !currentSurah) return
    const maxVerse = currentSurah.verses.length
    const clamped = Math.max(1, Math.min(num, maxVerse))
    navigate(`/read/${surahNum}/${clamped}`)
    setJumpInput('')
    // Update progress
    updateProgress({
      surahNumber: surahNum,
      verseNumber: clamped,
      surahName: currentSurah.surah.englishName,
      surahNameArabic: currentSurah.surah.name,
    })
    setTimeout(() => {
      const el = document.getElementById(`verse-${surahNum}-${clamped}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleVerseChange = useCallback((newVerseIdx) => {
    const clamped = Math.max(0, Math.min(newVerseIdx, (currentSurah?.verses.length || 1) - 1))
    setCurrentVerseIdx(clamped)
    const verseNum = clamped + 1
    navigate(`/read/${surahNum}/${verseNum}`, { replace: true })
    updateProgress({
      surahNumber: surahNum,
      verseNumber: verseNum,
      surahName: currentSurah?.surah.englishName || '',
      surahNameArabic: currentSurah?.surah.name || '',
    })
  }, [currentSurah, surahNum, navigate, updateProgress])

  // Keyboard navigation for verse-by-verse mode
  useEffect(() => {
    function handleKeyDown(e) {
      if (settings.readingMode !== 'verse-by-verse' || !currentSurah) return
      // Don't trigger if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        handleVerseChange(currentVerseIdx + 1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        handleVerseChange(currentVerseIdx - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [settings.readingMode, currentSurah, currentVerseIdx, handleVerseChange])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const showBismillah = !NO_BISMILLAH_SURAHS.includes(surahNum)
  const readingMode = settings.readingMode

  // Current verse for verse-by-verse mode
  const currentVerse = currentSurah?.verses[currentVerseIdx]

  return (
    <div className="reader-page reader-page-with-bg">
      {/* Cloud backdrop overlay for celestial atmosphere */}
      <div className="reader-cloud-overlay" aria-hidden="true" />

      {/* ====== READER HEADER ====== */}
      <header className="reader-header" role="banner">
        <div className="reader-header-inner">
          {/* Surah Selector */}
          <div className="reader-surah-select">
            <label htmlFor="surah-select" className="visually-hidden">Select Surah</label>
            <select
              id="surah-select"
              value={surahNum}
              onChange={handleSurahSelect}
              aria-label="Navigate to surah"
            >
              {surahList.map(s => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.englishName} ({s.name})
                </option>
              ))}
            </select>
          </div>

          {/* Jump to Verse */}
          <form className="verse-jump" onSubmit={handleJump} role="search" aria-label="Jump to verse">
            <span className="verse-jump-label">Verse</span>
            <input
              className="verse-jump-input"
              type="number"
              min={1}
              max={currentSurah?.verses.length || 286}
              value={jumpInput}
              onChange={e => setJumpInput(e.target.value)}
              placeholder={String(verseNum)}
              aria-label="Verse number to jump to"
              id="verse-jump-input"
            />
          </form>

          {/* Reading Mode */}
          <div className="reader-mode-switcher" role="group" aria-label="Reading mode">
            {READING_MODES.map(({ id, label }) => (
              <button
                key={id}
                className={`mode-btn${readingMode === id ? ' active' : ''}`}
                onClick={() => setReadingMode(id)}
                aria-pressed={readingMode === id}
                id={`mode-${id}-btn`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Audio Toggle */}
          <button
            className={`reader-settings-toggle${showAudio ? ' active-audio' : ''}`}
            onClick={() => setShowAudio(prev => !prev)}
            aria-label={showAudio ? 'Hide audio player' : 'Show audio player'}
            title="Audio Recitation"
          >
            {showAudio ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
          </button>

          {/* Quick Settings Toggle */}
          <button
            className={`reader-settings-toggle${showQuickSettings ? ' open' : ''}`}
            onClick={() => setShowQuickSettings(prev => !prev)}
            aria-label={showQuickSettings ? 'Close settings' : 'Open reading settings'}
            aria-expanded={showQuickSettings}
            id="reader-settings-toggle"
          >
            <Settings size={16} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ====== QUICK SETTINGS PANEL ====== */}
      {showQuickSettings && (
        <div className="reader-quick-settings" role="region" aria-label="Reading settings">
          <div className="reader-quick-settings-inner">
            {/* Arabic Font */}
            <div className="qs-group">
              <span className="qs-group-label">Arabic Size</span>
              <div className="qs-controls">
                <button className="qs-btn" onClick={decreaseArabicFont} aria-label="Decrease Arabic font size">−</button>
                <span className="qs-value">{settings.arabicFontSize}</span>
                <button className="qs-btn" onClick={increaseArabicFont} aria-label="Increase Arabic font size">+</button>
              </div>
            </div>

            {/* Translation Toggle */}
            <div className="qs-group">
              <span className="qs-group-label">Translation</span>
              <div className="qs-toggle">
                <button
                  className={`qs-toggle-btn${settings.showTranslation ? ' active' : ''}`}
                  onClick={toggleTranslation}
                  aria-pressed={settings.showTranslation}
                >
                  {settings.showTranslation ? 'On' : 'Off'}
                </button>
              </div>
            </div>

            {/* Mode Switcher (mobile) */}
            <div className="qs-group">
              <span className="qs-group-label">Reading Mode</span>
              <div className="qs-controls" role="group" aria-label="Reading mode">
                {READING_MODES.map(({ id, label }) => (
                  <button
                    key={id}
                    className={`qs-toggle-btn${readingMode === id ? ' active' : ''}`}
                    onClick={() => setReadingMode(id)}
                    aria-pressed={readingMode === id}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== AUDIO PLAYER ====== */}
      {showAudio && currentSurah && (
        <div className="audio-panel">
          <AudioPlayer
            surahNumber={surahNum}
            verseNumber={readingMode === 'verse-by-verse' ? currentVerseIdx + 1 : verseNum}
            totalVerses={currentSurah.verses.length}
            reciter="ar.alafasy"
            onVerseChange={(newVerseNum) => handleVerseChange(newVerseNum - 1)}
          />
        </div>
      )}

      {/* ====== LOADING ====== */}
      {loading && (
        <div className="loading-state reader-loading" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true" />
          <p>Opening the Holy Book...</p>
        </div>
      )}

      {/* ====== ERROR ====== */}
      {error && !loading && (
        <div className="container-narrow">
          <div className="error-state" role="alert">
            <AlertCircle size={48} className="error-icon" aria-hidden="true" />
            <h2>Could not load surah</h2>
            <p>{error}</p>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* ====== SURAH CONTENT ====== */}
      {!loading && !error && currentSurah && (
        <div className="reader-manuscript-canvas">
          {/* Decorative Corner Ornaments */}
          <div className="manuscript-corner corner-tl" aria-hidden="true" />
          <div className="manuscript-corner corner-tr" aria-hidden="true" />

          {/* Surah Header */}
          <div className="surah-header animate-fade-in">
            <div className="surah-header-inner">
              <div className="surah-number-ornament" aria-hidden="true">
                <span className="ornament-number">{currentSurah.surah.number}</span>
              </div>
              <p className="surah-number-display">Surah {currentSurah.surah.number} of 114</p>
              <h1
                className="surah-arabic-title gold-gradient-text"
                dir="rtl"
                lang="ar"
                aria-label={`Arabic name: ${currentSurah.surah.name}`}
              >
                {currentSurah.surah.name}
              </h1>
              <h2 className="surah-english-title">{currentSurah.surah.englishName}</h2>
              <p className="surah-meaning">{currentSurah.surah.englishNameTranslation}</p>
              <div className="surah-header-meta">
                <span className={`badge badge-${currentSurah.surah.revelationType === 'Meccan' ? 'meccan' : 'medinan'}`}>
                  {currentSurah.surah.revelationType}
                </span>
                <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                  {currentSurah.surah.numberOfAyahs} Verses
                </span>
              </div>
            </div>
          </div>

          {/* Bismillah */}
          {showBismillah && (
            <div className="bismillah-wrapper">
              <div className="geo-divider"><div className="geo-divider-icon" /></div>
              <p
                className="bismillah"
                dir="rtl"
                lang="ar"
                aria-label="Bismillah ir-Rahman ir-Raheem"
              >
                {BISMILLAH}
              </p>
              <div className="geo-divider"><div className="geo-divider-icon" /></div>
            </div>
          )}

          {/* ====== VERSES — MUSHAF MODE ====== */}
          {readingMode === 'mushaf' && (
            <div className="verses-container">
              <div className="verses-mushaf" role="main" aria-label={`Reading Surah ${currentSurah.surah.englishName}`}>
                <p
                  className="mushaf-text-flow"
                  dir="rtl"
                  lang="ar"
                  aria-label={`Arabic text of Surah ${currentSurah.surah.englishName}`}
                >
                  {currentSurah.verses.map((verse, idx) => (
                    <span key={verse.number} id={`verse-${surahNum}-${verse.number}`}>
                      {verse.arabic}
                      {' '}
                      <span
                        className="mushaf-verse-end"
                        title={`Verse ${verse.number}`}
                        aria-hidden="true"
                      >
                        &#x06DD;{toArabicNumerals(verse.number)}&#x06DD;
                      </span>
                      {' '}
                    </span>
                  ))}
                </p>
                {settings.showTranslation && (
                  <div style={{ marginTop: 'var(--spacing-2xl)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--spacing-xl)' }}>
                    {currentSurah.verses.map((verse) => (
                      <div key={verse.number} style={{ marginBottom: 'var(--spacing-md)', paddingLeft: 'var(--spacing-md)', borderLeft: '2px solid var(--color-gold-dim)' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                          {surahNum}:{verse.number}
                        </span>
                        <p style={{ fontSize: 'var(--translation-font-size)', color: 'var(--text-secondary)', lineHeight: '1.8', fontStyle: 'italic' }}>
                          {verse.translation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ====== VERSES — CONTINUOUS MODE ====== */}
          {readingMode === 'continuous' && (
            <div className="verses-container" role="main">
              {currentSurah.verses.map((verse) => (
                <VerseCard
                  key={verse.number}
                  verse={verse}
                  surahNumber={surahNum}
                  surahName={currentSurah.surah.englishName}
                  surahNameArabic={currentSurah.surah.name}
                  settings={settings}
                  isBookmarked={isBookmarked(surahNum, verse.number)}
                  onToggleBookmark={toggleBookmark}
                  readingMode="continuous"
                />
              ))}
            </div>
          )}

          {/* ====== VERSES — VERSE-BY-VERSE MODE ====== */}
          {readingMode === 'verse-by-verse' && currentVerse && (
            <div className="verses-container" role="main">
              <VerseCard
                verse={currentVerse}
                surahNumber={surahNum}
                surahName={currentSurah.surah.englishName}
                surahNameArabic={currentSurah.surah.name}
                settings={settings}
                isBookmarked={isBookmarked(surahNum, currentVerse.number)}
                onToggleBookmark={toggleBookmark}
                readingMode="verse-by-verse"
              />

              {/* Verse Navigation */}
              <div className="vbv-controls">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleVerseChange(currentVerseIdx - 1)}
                  disabled={currentVerseIdx === 0}
                  id="prev-verse-btn"
                  aria-label="Previous verse"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Previous
                </button>
                <span className="reader-progress">
                  {currentVerseIdx + 1} / {currentSurah.verses.length}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleVerseChange(currentVerseIdx + 1)}
                  disabled={currentVerseIdx === currentSurah.verses.length - 1}
                  id="next-verse-btn"
                  aria-label="Next verse"
                >
                  Next
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* ====== SURAH NAVIGATION ====== */}
          <nav className="reader-nav" aria-label="Surah navigation">
            <button
              className="reader-nav-btn"
              onClick={() => navigateToSurah(surahNum - 1)}
              disabled={surahNum <= 1}
              id="prev-surah-btn"
              aria-label={surahNum > 1 ? `Previous surah: ${surahList[surahNum - 2]?.englishName || ''}` : 'No previous surah'}
            >
              <ChevronLeft size={16} aria-hidden="true" />
              {surahNum > 1 && surahList.length > 0
                ? <span>{surahList[surahNum - 2]?.englishName}</span>
                : <span>Previous</span>
              }
            </button>

            <button
              className="btn btn-ghost btn-sm"
              onClick={scrollToTop}
              aria-label="Return to top of surah"
              title="Back to top"
            >
              <ArrowUpCircle size={16} aria-hidden="true" />
            </button>

            <button
              className="reader-nav-btn"
              onClick={() => navigateToSurah(surahNum + 1)}
              disabled={surahNum >= 114}
              id="next-surah-btn"
              aria-label={surahNum < 114 ? `Next surah: ${surahList[surahNum]?.englishName || ''}` : 'No next surah'}
            >
              {surahNum < 114 && surahList.length > 0
                ? <span>{surahList[surahNum]?.englishName}</span>
                : <span>Next</span>
              }
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

function toArabicNumerals(num) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).split('').map(d => arabicDigits[parseInt(d)] || d).join('')
}
