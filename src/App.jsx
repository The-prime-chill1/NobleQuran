import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import QuranReader from './pages/QuranReader'
import SurahDirectory from './pages/SurahDirectory'
import Bookmarks from './pages/Bookmarks'
import ReadingSettings from './pages/ReadingSettings'
import About from './pages/About'
import Privacy from './pages/Privacy'
import { useReadingSettings } from './hooks/useReadingSettings'
import './styles/global.css'

function AppContent() {
  const { settings } = useReadingSettings()

  useEffect(() => {
    const root = document.documentElement
    // Light mode by default as requested
    root.setAttribute('data-theme', 'light')
    // Apply font sizes as CSS variables
    root.style.setProperty('--arabic-font-size', `${settings.arabicFontSize}px`)
    root.style.setProperty('--translation-font-size', `${settings.translationFontSize}px`)
    root.style.setProperty('--line-spacing', settings.lineSpacing)
  }, [settings])

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<QuranReader />} />
            <Route path="/read/:surahNumber" element={<QuranReader />} />
            <Route path="/read/:surahNumber/:verseNumber" element={<QuranReader />} />
            <Route path="/surahs" element={<SurahDirectory />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<ReadingSettings />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default function App() {
  return <AppContent />
}
