import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import SurahCard from '../components/SurahCard'
import SearchBar from '../components/SearchBar'
import { fetchSurahList, searchSurahs } from '../services/quranService'
import '../styles/surahs.css'

export default function SurahDirectory() {
  const [surahList, setSurahList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    fetchSurahList()
      .then(setSurahList)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = searchSurahs(surahList, searchQuery).filter(s => {
    if (activeFilter === 'meccan') return s.revelationType === 'Meccan'
    if (activeFilter === 'medinan') return s.revelationType === 'Medinan'
    return true
  })

  const meccanCount = surahList.filter(s => s.revelationType === 'Meccan').length
  const medinanCount = surahList.filter(s => s.revelationType === 'Medinan').length

  return (
    <div className="surahs-page">
      <div className="surahs-page-header">
        <div className="container">
          <div className="surahs-page-header-inner">
            <div>
              <span className="section-tag">Complete Index</span>
              <h1>Surah Directory</h1>
              <p>All 114 chapters of the Holy Qur'an</p>
            </div>
            {surahList.length > 0 && (
              <div className="surahs-stats">
                <div className="stat-item">
                  <span className="stat-value">{surahList.length}</span>
                  <span className="stat-label">Total Surahs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{meccanCount}</span>
                  <span className="stat-label">Meccan</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{medinanCount}</span>
                  <span className="stat-label">Medinan</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="surahs-page-body">
        <div className="container">
          {/* Controls */}
          <div className="surahs-controls-bar">
            <div className="surahs-search-wrapper">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, number, or meaning..."
                autoFocus
                id="surahs-search"
              />
            </div>
            <div className="surahs-filter-group" role="group" aria-label="Filter by revelation type">
              {['all', 'meccan', 'medinan'].map(f => (
                <button
                  key={f}
                  className={`filter-chip${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={activeFilter === f}
                  id={`surahs-filter-${f}`}
                >
                  {f === 'all' ? 'All' : f === 'meccan' ? 'Meccan' : 'Medinan'}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          {!loading && !error && (
            <p className="surahs-result-count" role="status" aria-live="polite">
              {filtered.length === surahList.length
                ? `Showing all ${surahList.length} surahs`
                : `${filtered.length} of ${surahList.length} surahs`
              }
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          )}

          {/* States */}
          {loading ? (
            <div className="loading-state" role="status">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Loading all 114 surahs...</p>
            </div>
          ) : error ? (
            <div className="error-state" role="alert">
              <AlertCircle size={48} className="error-icon" aria-hidden="true" />
              <h2>Could not load surahs</h2>
              <p>{error}</p>
              <button className="btn btn-secondary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state" role="status">
              <div className="empty-state-icon">
                <span style={{ fontFamily: 'var(--font-arabic-ui)', fontSize: '3rem', color: 'var(--text-muted)' }}>؟</span>
              </div>
              <h3>No surahs found</h3>
              <p>No surahs match "{searchQuery}". Try another name or number.</p>
              <button
                className="btn btn-ghost"
                onClick={() => { setSearchQuery(''); setActiveFilter('all') }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="surahs-full-grid" role="list" aria-label="All surahs">
              {filtered.map(surah => (
                <div key={surah.number} role="listitem">
                  <SurahCard surah={surah} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
