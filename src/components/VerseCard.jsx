import React, { useState, useRef, useCallback } from 'react'
import { Bookmark, BookmarkCheck, Copy, ChevronDown, ChevronUp, Volume2, VolumeX, Share2, Check } from 'lucide-react'
import './VerseCard.css'

export default function VerseCard({
  verse,
  surahNumber,
  surahName,
  surahNameArabic,
  settings,
  isBookmarked,
  onToggleBookmark,
  onPlayAudio,
  isPlayingAudio = false,
  readingMode = 'continuous',
}) {
  const [showTranslation, setShowTranslation] = useState(settings.showTranslation)
  const [copied, setCopied] = useState(false)

  // Sync with global settings changes
  const prevGlobalTranslation = useRef(settings.showTranslation)
  if (prevGlobalTranslation.current !== settings.showTranslation) {
    prevGlobalTranslation.current = settings.showTranslation
    setShowTranslation(settings.showTranslation)
  }

  const handleCopy = useCallback(async () => {
    const text = `${verse.arabic}\n\n${verse.translation || ''}\n\n— Surah ${surahName}, Verse ${verse.number}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [verse, surahName])

  const handleShare = useCallback(async () => {
    const text = `${verse.arabic}\n\n"${verse.translation}"\n\n— Surah ${surahName}, Verse ${verse.number} (${surahNumber}:${verse.number})`
    if (navigator.share) {
      try {
        await navigator.share({ text, title: `Surah ${surahName} — Verse ${verse.number}` })
      } catch { /* User cancelled */ }
    } else {
      handleCopy()
    }
  }, [verse, surahName, surahNumber, handleCopy])

  const handleBookmark = useCallback(() => {
    onToggleBookmark?.({
      surahNumber,
      verseNumber: verse.number,
      surahName,
      surahNameArabic,
      arabicText: verse.arabic,
    })
  }, [verse, surahNumber, surahName, surahNameArabic, onToggleBookmark])

  const isVerseByVerse = readingMode === 'verse-by-verse'

  return (
    <article
      className={`verse-card${isVerseByVerse ? ' verse-card-vbv' : ''}`}
      id={`verse-${surahNumber}-${verse.number}`}
      aria-label={`Verse ${verse.number} of Surah ${surahName}`}
    >
      {/* Arabic Text */}
      <div className="verse-arabic-wrapper">
        <p
          className="verse-arabic arabic-text"
          dir="rtl"
          lang="ar"
          aria-label={`Arabic text of verse ${verse.number}`}
        >
          {verse.arabic}
          {' '}
          <span className="verse-number-inline" aria-label={`Verse number ${verse.number}`}>
            &#x06DD;{toArabicNumerals(verse.number)}&#x06DD;
          </span>
        </p>
      </div>

      {/* Translation */}
      {showTranslation && verse.translation && (
        <div className="verse-translation" lang="en">
          <p>{verse.translation}</p>
        </div>
      )}

      {/* Action Bar */}
      <div className="verse-actions" role="toolbar" aria-label={`Actions for verse ${verse.number}`}>
        <div className="verse-ref">
          <span className="verse-number">{surahNumber}:{verse.number}</span>
        </div>
        <div className="verse-action-buttons">
          {/* Translation Toggle */}
          {verse.translation && (
            <button
              className="btn-icon"
              onClick={() => setShowTranslation(prev => !prev)}
              aria-label={showTranslation ? 'Hide translation' : 'Show translation'}
              title={showTranslation ? 'Hide translation' : 'Show translation'}
            >
              {showTranslation
                ? <ChevronUp size={15} aria-hidden="true" />
                : <ChevronDown size={15} aria-hidden="true" />
              }
            </button>
          )}

          {/* Audio */}
          {onPlayAudio && (
            <button
              className={`btn-icon${isPlayingAudio ? ' btn-icon-active' : ''}`}
              onClick={() => onPlayAudio(verse)}
              aria-label={isPlayingAudio ? 'Pause recitation' : 'Play recitation'}
              title={isPlayingAudio ? 'Pause recitation' : 'Play recitation'}
            >
              {isPlayingAudio
                ? <VolumeX size={15} aria-hidden="true" />
                : <Volume2 size={15} aria-hidden="true" />
              }
            </button>
          )}

          {/* Copy */}
          <button
            className="btn-icon"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy verse text'}
            title={copied ? 'Copied!' : 'Copy verse'}
          >
            {copied
              ? <Check size={15} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
              : <Copy size={15} aria-hidden="true" />
            }
          </button>

          {/* Share */}
          <button
            className="btn-icon"
            onClick={handleShare}
            aria-label="Share verse"
            title="Share verse"
          >
            <Share2 size={15} aria-hidden="true" />
          </button>

          {/* Bookmark */}
          <button
            className={`btn-icon${isBookmarked ? ' btn-icon-bookmarked' : ''}`}
            onClick={handleBookmark}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this verse'}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark verse'}
          >
            {isBookmarked
              ? <BookmarkCheck size={15} aria-hidden="true" />
              : <Bookmark size={15} aria-hidden="true" />
            }
          </button>
        </div>
      </div>
    </article>
  )
}

/**
 * Convert western numerals to Eastern Arabic-Indic numerals.
 * Used for Quranic verse end markers.
 */
function toArabicNumerals(num) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).split('').map(d => arabicDigits[parseInt(d)] || d).join('')
}
