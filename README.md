# The Noble Qur'an — القرآن الكريم

A beautiful, premium, responsive digital Qur'an reading experience built with React and Vite.

**Project Courtesy:** Taoheed Ololade Naheemat  
**Developed by:** [CHILL TECH LTD](https://chilltechltd.com) — *We Build. You Grow.*

---

## Overview

The Noble Qur'an is a dedicated digital reading space that recreates the feeling of reading a beautifully printed Mushaf while providing the convenience of modern web technology. The focus is on a distraction-free, accurate, and peaceful reading experience.

---

## Features

- **Complete Qur'an** — All 114 surahs via the AlQuran.cloud API
- **Three Reading Modes** — Mushaf, Continuous, and Verse-by-Verse
- **Dark Mode & Parchment Theme** — Light, dark, and parchment themes
- **Translation** — Saheeh International (default), Yusuf Ali, Pickthall, Khattab
- **Audio Recitation** — Sheikh Mishary Alafasy and other reciters via AlQuran.cloud
- **Bookmarks** — Save verses locally, navigate directly to bookmarked content
- **Reading Progress** — Continue from where you left off
- **Reading Customization** — Font size, line spacing, translation toggle
- **Search** — Find surahs by name, number, or meaning
- **Responsive** — Works on mobile, tablet, and desktop
- **Accessible** — Proper ARIA labels, keyboard navigation, RTL support

---

## Data Sources

| Data | Source |
|------|--------|
| Arabic text | Tanzil Uthmani via [AlQuran.cloud](https://alquran.cloud) |
| Default translation | Saheeh International |
| Audio | AlQuran.cloud CDN (Islamic.Network) |
| Fonts | Google Fonts — Amiri Quran, Inter |

---

## Technology Stack

- **React 18** with Vite
- **React Router DOM v6** for routing
- **Lucide React** for icons
- **Vanilla CSS** (no Tailwind, no CSS-in-JS)
- **LocalStorage** for offline bookmarks and settings
- **AlQuran.cloud REST API v1** for Qur'anic text and audio

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Install

```bash
cd Al-Quran
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css (via styles/)
│   ├── SurahCard.jsx / .css
│   ├── VerseCard.jsx / .css
│   ├── AudioPlayer.jsx / .css
│   └── SearchBar.jsx / .css
├── hooks/
│   ├── useBookmarks.js
│   ├── useReadingProgress.js
│   └── useReadingSettings.js
├── pages/
│   ├── Home.jsx
│   ├── QuranReader.jsx
│   ├── SurahDirectory.jsx
│   ├── Bookmarks.jsx
│   ├── ReadingSettings.jsx
│   ├── About.jsx
│   └── Privacy.jsx
├── services/
│   ├── quranService.js
│   └── audioService.js
├── styles/
│   ├── global.css       ← Design system tokens
│   ├── navbar.css
│   ├── footer.css
│   ├── home.css
│   ├── reader.css
│   ├── surahs.css
│   ├── bookmarks.css
│   ├── settings.css
│   └── about.css
├── utils/
│   └── storage.js
├── App.jsx
└── main.jsx
```

---

## API Reference

This project uses the free [AlQuran.cloud REST API v1](https://alquran.cloud/api).

| Endpoint | Used For |
|----------|----------|
| `GET /v1/surah` | List all 114 surahs |
| `GET /v1/surah/{n}/quran-uthmani` | Arabic text of a surah |
| `GET /v1/surah/{n}/{edition}` | Translation of a surah |
| CDN audio URL | MP3 audio for each verse |

---

## Privacy & Data Storage

- Bookmarks, reading progress, and settings are stored in **LocalStorage** only
- No user accounts, no server-side data collection
- All data stays on the reader's device
- Third-party services: AlQuran.cloud API, Google Fonts, Islamic.Network CDN

---

## License

This project is a personal/educational reading tool. Qur'anic text copyright belongs to its respective publishers. Translations are attributed to their respective translators.

---

## Credits

- **Project Courtesy:** Taoheed Ololade Naheemat
- **Developed by:** CHILL TECH LTD — [chilltechltd.com](https://chilltechltd.com)
- **Arabic text:** Tanzil.net / AlQuran.cloud
- **Default translation:** Saheeh International
