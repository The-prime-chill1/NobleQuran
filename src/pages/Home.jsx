import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight, RotateCcw, AlertCircle, Compass, Sparkles } from 'lucide-react'
import SurahCard from '../components/SurahCard'
import SearchBar from '../components/SearchBar'
import { useReadingProgress } from '../hooks/useReadingProgress'
import { fetchSurahList, searchSurahs } from '../services/quranService'
import '../styles/home.css'

const PREVIEW_COUNT = 12

const HERO_SLIDES = [
  {
    id: 0,
    quote: '"AND ALLAH INVITES TO THE HOME OF PEACE"',
    arabic: 'وَاللَّهُ يَدْعُو إِلَىٰ دَارِ السَّلَامِ',
    surah: 'Surah Yunus, Verse 25',
    surahNumber: 10,
    verseNumber: 25,
  },
  {
    id: 1,
    quote: '"UNQUESTIONABLY, BY THE REMEMBRANCE OF ALLAH HEARTS FIND REST"',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    surah: "Surah Ar-Ra'd, Verse 28",
    surahNumber: 13,
    verseNumber: 28,
  },
  {
    id: 2,
    quote: '"THIS IS THE NOBLE BOOK WHEREIN IS GUIDANCE FOR THE CONSCIOUS"',
    arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    surah: 'Surah Al-Baqarah, Verse 2',
    surahNumber: 2,
    verseNumber: 2,
  },
  {
    id: 3,
    quote: '"READ IN THE NAME OF YOUR LORD WHO CREATED"',
    arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    surah: 'Surah Al-Alaq, Verse 1',
    surahNumber: 96,
    verseNumber: 1,
  },
]

const POPULAR_SURAHS = [
  { number: 1, name: 'Al-Fatihah', arabic: 'الفاتحة' },
  { number: 36, name: 'Ya-Sin', arabic: 'يس' },
  { number: 18, name: 'Al-Kahf', arabic: 'الكهف' },
  { number: 67, name: 'Al-Mulk', arabic: 'الملك' },
  { number: 55, name: 'Ar-Rahman', arabic: 'الرحمن' },
  { number: 56, name: 'Al-Waqi\'ah', arabic: 'الواقعة' },
]

export default function Home() {
  const navigate = useNavigate()
  const { progress, clearProgress, hasProgress } = useReadingProgress()

  const [surahList, setSurahList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all') // all | meccan | medinan
  const [showConfirm, setShowConfirm] = useState(false)

  // Interactive Carousel
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const canvasRef = useRef(null)

  // Fetch Surah list
  useEffect(() => {
    fetchSurahList()
      .then(setSurahList)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Static hero slide index (no auto-advancing animation)
  // currentSlide is preserved for manual selection if needed

  function handleStartReading() {
    if (hasProgress) {
      navigate(`/read/${progress.surahNumber}/${progress.verseNumber}`)
    } else {
      const activeSlide = HERO_SLIDES[currentSlide]
      navigate(`/read/${activeSlide.surahNumber}/${activeSlide.verseNumber}`)
    }
  }

  function handleClearProgress() {
    clearProgress()
    setShowConfirm(false)
  }

  // Filter + search
  const filtered = searchSurahs(surahList, searchQuery).filter(s => {
    if (activeFilter === 'meccan') return s.revelationType === 'Meccan'
    if (activeFilter === 'medinan') return s.revelationType === 'Medinan'
    return true
  })

  const previewSurahs = searchQuery || activeFilter !== 'all' ? filtered : filtered.slice(0, PREVIEW_COUNT)
  const showingAll = searchQuery || activeFilter !== 'all'
  const activeSlideData = HERO_SLIDES[currentSlide]

  return (
    <div className="home-page landing-page-noble">
      {/* ======= 10/10 CINEMATIC HERO SECTION ======= */}
      <section
        className="hero-cinematic"
        aria-labelledby="hero-main-heading"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Real photo background matching user's reference */}
        <div className="hero-cinematic-bg" aria-hidden="true" />
        <div className="hero-cinematic-vignette" aria-hidden="true" />

        {/* Top Radiant Arabesque Mandala Crest (delicate filigree watermark) */}
        <div className="hero-mandala-crest" aria-hidden="true">
          <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="0" r="70" stroke="url(#mandalaGoldGrad)" strokeWidth="1.2" opacity="0.35" />
            <circle cx="300" cy="0" r="130" stroke="url(#mandalaGoldGrad)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="300" cy="0" r="190" stroke="url(#mandalaGoldGrad)" strokeWidth="1.2" opacity="0.25" />
            <circle cx="300" cy="0" r="250" stroke="url(#mandalaGoldGrad)" strokeWidth="1" strokeDasharray="3 7" opacity="0.2" />
            {/* 16-point radiating petal lines */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180].map((deg, i) => (
              <g key={i} transform={`rotate(${deg - 90} 300 0)`}>
                <path d="M300 0 C286 60 286 130 300 170 C314 130 314 60 300 0" stroke="url(#mandalaGoldGrad)" strokeWidth="0.8" opacity="0.22" fill="none" />
                <path d="M300 80 L300 230" stroke="url(#mandalaGoldGrad)" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.18" />
              </g>
            ))}
            <defs>
              <linearGradient id="mandalaGoldGrad" x1="0" y1="0" x2="600" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9D888" />
                <stop offset="0.5" stopColor="#E5A93C" />
                <stop offset="1" stopColor="#B88022" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Central Hero Content */}
        <div className="container hero-cinematic-content">
          {/* Glowing Divine Word "الله" above title (exact match to reference) */}
          <div className="hero-divine-calligraphy" aria-label="Allah">
            <span dir="rtl" lang="ar">الله</span>
          </div>

          {/* Grand Quote Title */}
          <div className="hero-quote-wrapper" key={activeSlideData.id}>
            <h1 className="hero-main-title" id="hero-main-heading">
              {activeSlideData.quote}
            </h1>

            {/* Arabic Counterpart with gold glow */}
            <p className="hero-arabic-verse" dir="rtl" lang="ar">
              {activeSlideData.arabic}
            </p>

            <p className="hero-verse-source">
              {activeSlideData.surah}
            </p>
          </div>

          {/* Amber Gold CTA Button (exact match to reference [Become a Member] button shape) */}
          <div className="hero-cta-group">
            <button
              className="hero-amber-btn"
              onClick={handleStartReading}
              id="hero-start-btn"
            >
              <BookOpen size={18} aria-hidden="true" />
              <span>{hasProgress ? 'Continue Reading' : 'Start Reading'}</span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <Link to="/surahs" className="hero-glass-pill" id="hero-explore-btn">
              <Compass size={17} aria-hidden="true" />
              <span>Explore 114 Surahs</span>
            </Link>
          </div>

          {/* Bottom Interactive Carousel Pagination (exact match to reference dots [— • ○ ○]) */}
          <div className="hero-carousel-pagination" role="tablist" aria-label="Featured verse carousel">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Go to slide ${idx + 1}: ${slide.surah}`}
                className={`carousel-dot${currentSlide === idx ? ' active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              >
                {currentSlide === idx && <span className="carousel-dot-fill" />}
              </button>
            ))}
          </div>

          {/* Quick Jump Bar */}
          <div className="hero-quick-strip">
            <span className="quick-strip-label">
              <Sparkles size={13} aria-hidden="true" />
              Frequent Surahs:
            </span>
            <div className="quick-strip-pills">
              {POPULAR_SURAHS.map(s => (
                <Link
                  key={s.number}
                  to={`/read/${s.number}`}
                  className="quick-strip-item"
                  title={`Open Surah ${s.name}`}
                >
                  <span className="strip-num">{s.number}</span>
                  <span className="strip-name">{s.name}</span>
                  <span className="strip-ar" dir="rtl" lang="ar">{s.arabic}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= CONTINUE READING (WALNUT WOOD & CARVED IVORY PANEL) ======= */}
      <section className="continue-section pattern-wood-bg" aria-labelledby="continue-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Your Journey</span>
            <h2 id="continue-heading">Continue Where You Left Off</h2>
          </div>

          {hasProgress ? (
            <div className="fretwork-panel continue-fretwork-card animate-fade-in">
              <div className="octagonal-cartouche continue-cartouche" aria-hidden="true">
                <div className="octagonal-cartouche-inner">
                  <span>{progress.surahNumber}</span>
                </div>
              </div>

              <div className="continue-info">
                <p className="continue-label">Last Read Position</p>
                <h3 className="continue-surah-name">{progress.surahName}</h3>
                {progress.surahNameArabic && (
                  <span className="continue-surah-arabic" dir="rtl" lang="ar">
                    {progress.surahNameArabic}
                  </span>
                )}
                <p className="continue-verse-info">
                  Verse {progress.verseNumber} · {progress.savedAt
                    ? `Saved ${new Date(progress.savedAt).toLocaleDateString()}`
                    : 'Saved locally in browser'}
                </p>
              </div>

              <div className="continue-actions">
                <Link
                  to={`/read/${progress.surahNumber}/${progress.verseNumber}`}
                  className="hero-amber-btn btn-sm"
                  id="continue-reading-btn"
                >
                  <span>Resume Reading</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
                <button
                  className="continue-reset-btn"
                  onClick={() => setShowConfirm(true)}
                  id="reset-progress-btn"
                >
                  <RotateCcw size={12} aria-hidden="true" />
                  Reset progress
                </button>
              </div>
            </div>
          ) : (
            <div className="fretwork-panel welcome-fretwork-card animate-fade-in">
              <div className="octagonal-cartouche" aria-hidden="true">
                <div className="octagonal-cartouche-inner">
                  <span>١</span>
                </div>
              </div>
              <div className="welcome-text-content">
                <h3>Welcome to The Noble Qur'an</h3>
                <p>
                  Begin your spiritual journey from the opening chapter, Surah Al-Fatihah — the seven oft-repeated verses of guidance, light, and mercy.
                </p>
              </div>
              <Link
                to="/read/1"
                className="hero-amber-btn"
                id="begin-reading-btn"
              >
                <BookOpen size={16} aria-hidden="true" />
                <span>Begin with Al-Fatihah</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ======= SURAH EXPLORER SECTION ======= */}
      <section className="surahs-section" aria-labelledby="surahs-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">114 Chapters</span>
            <h2 id="surahs-heading">Surah Explorer</h2>
            <p>Browse, search, and reflect upon all 114 sacred chapters of the Holy Qur'an</p>
          </div>

          {/* Controls */}
          <div className="surahs-controls">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, number, or meaning..."
              id="home-surah-search"
            />
            <div className="surahs-filters" role="group" aria-label="Filter by revelation type">
              {['all', 'meccan', 'medinan'].map(f => (
                <button
                  key={f}
                  className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={activeFilter === f}
                  id={`filter-${f}`}
                >
                  {f === 'all' ? 'All Surahs' : f === 'meccan' ? 'Meccan' : 'Medinan'}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Opening the chapters...</p>
            </div>
          ) : error ? (
            <div className="error-state" role="alert">
              <AlertCircle size={40} className="error-icon" aria-hidden="true" />
              <h3>Could not load chapters</h3>
              <p>{error}</p>
              <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state" role="status">
              <p>No surahs found for "{searchQuery}".</p>
            </div>
          ) : (
            <>
              <div className="surahs-grid" aria-label="Surah list">
                {previewSurahs.map(surah => (
                  <SurahCard key={surah.number} surah={surah} compact />
                ))}
              </div>

              {!showingAll && filtered.length > PREVIEW_COUNT && (
                <div className="home-surahs-footer">
                  <Link to="/surahs" className="hero-amber-btn" id="view-all-surahs-btn">
                    <span>View All 114 Surahs</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ======= CONFIRM RESET DIALOG ======= */}
      {showConfirm && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          onClick={(e) => e.target === e.currentTarget && setShowConfirm(false)}
        >
          <div className="modal-box">
            <h2 className="modal-title" id="confirm-dialog-title">Reset Reading Progress?</h2>
            <p className="modal-body">
              This will clear your saved position. You will need to find your place manually when you return.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowConfirm(false)}
                id="cancel-reset-btn"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleClearProgress}
                id="confirm-reset-btn"
                style={{ background: '#A84438' }}
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
