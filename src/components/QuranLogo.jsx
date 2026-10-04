import React from 'react'
import './QuranLogo.css'

/**
 * Premium Bespoke Quran Logo
 * Features:
 * - Handcrafted 8-pointed Rub el Hizb (نجمة القدس) sacred geometric cartouche
 * - Flowing open Holy Qur'an manuscript with illuminated gold pages
 * - Carved geometric Rihal (wooden stand)
 * - Radiant celestial crescent (Hilal) & 8-point guidance star
 * - Luxury dual-tone metallic gold gradients (#FFE6A3 -> #E5A93C -> #9E6B18)
 */
export default function QuranLogo({
  size = 'md', // 'sm' (32px), 'md' (44px), 'lg' (60px), 'xl' (84px)
  variant = 'full', // 'icon', 'full', 'stacked'
  className = '',
  showTagline = true,
}) {
  const sizeMap = {
    sm: 34,
    md: 46,
    lg: 62,
    xl: 88,
  }

  const dimension = sizeMap[size] || 46

  return (
    <div className={`quran-brand-logo quran-brand-${size} quran-brand-${variant} ${className}`}>
      {/* Sacred Geometric Emblem SVG */}
      <div className="quran-logo-emblem" style={{ width: dimension, height: dimension }} aria-hidden="true">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="quran-logo-svg"
        >
          <defs>
            {/* Rich 24K Polished Metallic Gold Gradient */}
            <linearGradient id="quranGold24k" x1="15" y1="10" x2="105" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF2B8" />
              <stop offset="25%" stopColor="#F5CE68" />
              <stop offset="50%" stopColor="#E5A93C" />
              <stop offset="78%" stopColor="#B37C22" />
              <stop offset="100%" stopColor="#87570E" />
            </linearGradient>

            {/* Inner Sacred Light Radial Gradient */}
            <radialGradient id="quranAura" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5A3416" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#2D190B" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#150C06" stopOpacity="1" />
            </radialGradient>

            {/* Manuscript Page Gradient */}
            <linearGradient id="quranPageGrad" x1="40" y1="42" x2="80" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="50%" stopColor="#F6EBD5" />
              <stop offset="100%" stopColor="#E2CCA3" />
            </linearGradient>

            {/* Drop shadow for 3D medallion depth */}
            <filter id="goldEmboss" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E5A93C" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Deep Walnut Wood Cartouche Background */}
          <rect
            x="14"
            y="14"
            width="92"
            height="92"
            rx="20"
            fill="url(#quranAura)"
            stroke="url(#quranGold24k)"
            strokeWidth="1.5"
            filter="url(#goldEmboss)"
          />

          {/* Outer Rub el Hizb — First Diamond (Square rotated 45°) */}
          <rect
            x="32"
            y="32"
            width="56"
            height="56"
            rx="4"
            transform="rotate(45 60 60)"
            fill="none"
            stroke="url(#quranGold24k)"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Outer Rub el Hizb — Second Square */}
          <rect
            x="32"
            y="32"
            width="56"
            height="56"
            rx="4"
            fill="none"
            stroke="url(#quranGold24k)"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Inner Golden Circle */}
          <circle
            cx="60"
            cy="60"
            r="33"
            fill="none"
            stroke="url(#quranGold24k)"
            strokeWidth="1"
            strokeDasharray="1.5 2.5"
            opacity="0.7"
          />

          {/* Celestial Crescent Moon (Hilal) */}
          <path
            d="M 68 28 C 64 28 59 31 57 35 C 55 39 56 44 59 47 C 55 45 52 41 52 36 C 52 30 56 25 62 24 C 64 23.7 66.5 24.3 68 28 Z"
            fill="url(#quranGold24k)"
          />

          {/* Radiant Guidance Star (8-point micro star above) */}
          <path
            d="M 60 21 L 61.2 24 L 64.2 25.2 L 61.2 26.4 L 60 29.4 L 58.8 26.4 L 55.8 25.2 L 58.8 24 Z"
            fill="#FFF5D6"
          />

          {/* Open Holy Qur'an Manuscript (Flowing Sacred Book) */}
          {/* Left Page Layer (Depth) */}
          <path
            d="M 60 56 C 54 52 45 51 35 53 C 34 53 33 54 33 55 L 33 73 C 43 71 52 72 60 77 Z"
            fill="#C9A86E"
            opacity="0.8"
          />
          {/* Right Page Layer (Depth) */}
          <path
            d="M 60 56 C 66 52 75 51 85 53 C 86 53 87 54 87 55 L 87 73 C 77 71 68 72 60 77 Z"
            fill="#A88347"
            opacity="0.8"
          />

          {/* Left Page Main (Illuminated Parchment) */}
          <path
            d="M 60 54 C 54 50 44 49 34 51 C 33.2 51.2 32.5 52 32.5 53 L 32.5 71 C 42.5 69 52 70 60 75 Z"
            fill="url(#quranPageGrad)"
            stroke="url(#quranGold24k)"
            strokeWidth="0.8"
          />
          {/* Left Page Text Lines Simulation */}
          <line x1="38" y1="56" x2="54" y2="58" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <line x1="38" y1="60" x2="54" y2="62" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <line x1="38" y1="64" x2="52" y2="66" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

          {/* Right Page Main (Illuminated Parchment) */}
          <path
            d="M 60 54 C 66 50 76 49 86 51 C 86.8 51.2 87.5 52 87.5 53 L 87.5 71 C 77.5 69 68 70 60 75 Z"
            fill="url(#quranPageGrad)"
            stroke="url(#quranGold24k)"
            strokeWidth="0.8"
          />
          {/* Right Page Text Lines Simulation */}
          <line x1="66" y1="58" x2="82" y2="56" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <line x1="66" y1="62" x2="82" y2="60" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <line x1="68" y1="66" x2="82" y2="64" stroke="#87570E" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

          {/* Book Spine Center Ribbon & Gold Border */}
          <path
            d="M 60 53 L 60 76"
            stroke="url(#quranGold24k)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Intricately Carved Wooden Rihal (X-stand) */}
          {/* Left Leg Crossing */}
          <path
            d="M 44 73 L 73 95 C 74.5 96.2 73.5 97.5 71.5 97.5 L 68 97.5 L 41 76.5 Z"
            fill="url(#quranGold24k)"
          />
          {/* Right Leg Crossing */}
          <path
            d="M 76 73 L 47 95 C 45.5 96.2 46.5 97.5 48.5 97.5 L 52 97.5 L 79 76.5 Z"
            fill="#B37C22"
          />

          {/* Stand Center Joint Jewel */}
          <circle cx="60" cy="84" r="2.2" fill="#FFF2B8" stroke="#87570E" strokeWidth="0.6" />

          {/* Micro Corner Arabesque Accents */}
          <circle cx="24" cy="24" r="1.5" fill="url(#quranGold24k)" />
          <circle cx="96" cy="24" r="1.5" fill="url(#quranGold24k)" />
          <circle cx="24" cy="96" r="1.5" fill="url(#quranGold24k)" />
          <circle cx="96" cy="96" r="1.5" fill="url(#quranGold24k)" />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'icon' && (
        <div className="quran-brand-text">
          <div className="quran-brand-arabic" dir="rtl" lang="ar">
            القرآن الكريم
          </div>
          <div className="quran-brand-english">
            <span className="quran-brand-title">THE NOBLE QUR'AN</span>
            {showTagline && (
              <span className="quran-brand-sub">ILLUMINATED READ & AUDIO</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
