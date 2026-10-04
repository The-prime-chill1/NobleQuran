import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight } from 'lucide-react'
import './SurahCard.css'

export default function SurahCard({ surah, compact = false }) {
  const isMeccan = surah.revelationType === 'Meccan'

  return (
    <Link
      to={`/read/${surah.number}`}
      className={`surah-card${compact ? ' surah-card-compact' : ''}`}
      aria-label={`Read Surah ${surah.englishName}, surah number ${surah.number}`}
    >
      <div className="surah-card-inner">
        {/* Octagonal Cartouche Badge (matching user reference image 1) */}
        <div className="octagonal-cartouche surah-cartouche" aria-label={`Surah ${surah.number}`}>
          <div className="octagonal-cartouche-inner">
            <span>{surah.number}</span>
          </div>
        </div>

        {/* Info */}
        <div className="surah-info">
          <div className="surah-info-top">
            <div className="surah-english-info">
              <h3 className="surah-english-name">{surah.englishName}</h3>
              {!compact && (
                <p className="surah-translation">{surah.englishNameTranslation}</p>
              )}
            </div>
            <div className="surah-arabic-name" dir="rtl" lang="ar" aria-label={`Arabic name: ${surah.name}`}>
              {surah.name}
            </div>
          </div>
          <div className="surah-meta">
            <span className={`badge ${isMeccan ? 'badge-meccan' : 'badge-medinan'}`}>
              {surah.revelationType}
            </span>
            <span className="surah-verse-count">
              <BookOpen size={12} aria-hidden="true" />
              {surah.numberOfAyahs} verses
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="surah-card-arrow" size={18} aria-hidden="true" />
      </div>
    </Link>
  )
}
