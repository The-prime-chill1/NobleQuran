import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bookmark, Trash2, BookOpen, ExternalLink, ChevronRight, AlertCircle } from 'lucide-react'
import { useBookmarks } from '../hooks/useBookmarks'
import '../styles/bookmarks.css'

export default function Bookmarks() {
  const { bookmarks, unbookmark, clearBookmarks } = useBookmarks()
  const navigate = useNavigate()
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [removingKey, setRemovingKey] = useState(null)

  function handleRemove(surahNumber, verseNumber) {
    const key = `${surahNumber}:${verseNumber}`
    setRemovingKey(key)
    setTimeout(() => {
      unbookmark(surahNumber, verseNumber)
      setRemovingKey(null)
    }, 300)
  }

  function handleClearAll() {
    clearBookmarks()
    setShowClearConfirm(false)
  }

  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
  )

  return (
    <div className="bookmarks-page">
      {/* Header */}
      <div className="bookmarks-header">
        <div className="container">
          <div className="bookmarks-header-inner">
            <div>
              <span className="section-tag">Saved Verses</span>
              <h1>My Bookmarks</h1>
              <p>
                {bookmarks.length === 0
                  ? 'No verses bookmarked yet.'
                  : `${bookmarks.length} verse${bookmarks.length === 1 ? '' : 's'} saved locally`
                }
              </p>
            </div>
            {bookmarks.length > 0 && (
              <button
                className="btn btn-ghost"
                onClick={() => setShowClearConfirm(true)}
                id="clear-all-bookmarks-btn"
              >
                <Trash2 size={15} aria-hidden="true" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Storage Note */}
      <div className="container">
        <div className="bookmarks-note" role="note">
          <AlertCircle size={14} aria-hidden="true" />
          <span>
            Bookmarks are saved locally in your browser. They are not synced between devices.
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="bookmarks-body">
        <div className="container">
          {bookmarks.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="empty-state-icon">
                <Bookmark size={48} />
              </div>
              <h2>No Bookmarks Yet</h2>
              <p>
                While reading, tap the bookmark icon on any verse to save it here
                for quick reference.
              </p>
              <Link to="/read" className="btn btn-primary">
                <BookOpen size={16} aria-hidden="true" />
                Start Reading
              </Link>
            </div>
          ) : (
            <ul className="bookmarks-list" aria-label="Bookmarked verses">
              {sortedBookmarks.map(b => {
                const key = `${b.surahNumber}:${b.verseNumber}`
                const isRemoving = removingKey === key

                return (
                  <li
                    key={key}
                    className={`bookmark-item animate-fade-in${isRemoving ? ' removing' : ''}`}
                    aria-label={`Bookmark: Surah ${b.surahName}, verse ${b.verseNumber}`}
                  >
                    <div className="bookmark-item-inner">
                      {/* Octagonal Verse Reference (matching user reference image 1) */}
                      <div className="octagonal-cartouche bookmark-cartouche" aria-label={`Verse ${b.surahNumber}:${b.verseNumber}`}>
                        <div className="octagonal-cartouche-inner">
                          <span>{b.surahNumber}:{b.verseNumber}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="bookmark-content">
                        <div className="bookmark-surah-info">
                          <span className="bookmark-surah-name">{b.surahName}</span>
                          {b.surahNameArabic && (
                            <span className="bookmark-surah-arabic" dir="rtl" lang="ar">
                              {b.surahNameArabic}
                            </span>
                          )}
                        </div>
                        {b.arabicText && (
                          <p
                            className="bookmark-arabic-preview arabic-text"
                            dir="rtl"
                            lang="ar"
                          >
                            {b.arabicText.length > 120
                              ? b.arabicText.slice(0, 120) + '...'
                              : b.arabicText
                            }
                          </p>
                        )}
                        {b.savedAt && (
                          <p className="bookmark-date">
                            Saved {new Date(b.savedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="bookmark-actions">
                        <Link
                          to={`/read/${b.surahNumber}/${b.verseNumber}`}
                          className="btn btn-secondary btn-sm"
                          aria-label={`Go to Surah ${b.surahName}, verse ${b.verseNumber}`}
                        >
                          Read
                          <ChevronRight size={14} aria-hidden="true" />
                        </Link>
                        <button
                          className="btn-icon"
                          onClick={() => handleRemove(b.surahNumber, b.verseNumber)}
                          aria-label={`Remove bookmark for verse ${b.verseNumber} of ${b.surahName}`}
                          id={`remove-bookmark-${b.surahNumber}-${b.verseNumber}`}
                        >
                          <Trash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Clear All Confirmation */}
      {showClearConfirm && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-bookmarks-title"
          onClick={(e) => e.target === e.currentTarget && setShowClearConfirm(false)}
        >
          <div className="modal-box">
            <h2 className="modal-title" id="clear-bookmarks-title">Clear All Bookmarks?</h2>
            <p className="modal-body">
              This will permanently remove all {bookmarks.length} saved verses.
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowClearConfirm(false)}
                id="cancel-clear-bookmarks-btn"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleClearAll}
                id="confirm-clear-bookmarks-btn"
                style={{ background: '#c0504a' }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
