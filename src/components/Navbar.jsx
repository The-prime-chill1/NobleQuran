import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Grid3X3,
  Bookmark,
  Settings,
  Sun,
  Moon,
  Sunset,
  Menu,
  X,
} from 'lucide-react'
import { useReadingSettings } from '../hooks/useReadingSettings'
import '../styles/navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/read', label: 'Read', icon: BookOpen },
  { to: '/surahs', label: 'Surahs', icon: Grid3X3 },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const THEME_CYCLE = ['light', 'dark', 'parchment']
const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  parchment: Sunset,
}
const THEME_LABELS = {
  light: 'Switch to dark mode',
  dark: 'Switch to parchment mode',
  parchment: 'Switch to light mode',
}

export default function Navbar() {
  const { settings, setTheme } = useReadingSettings()
  const [menuOpen, setMenuOpen] = useState(false)

  function cycleTheme() {
    const currentIdx = THEME_CYCLE.indexOf(settings.theme)
    const nextTheme = THEME_CYCLE[(currentIdx + 1) % THEME_CYCLE.length]
    setTheme(nextTheme)
  }

  const ThemeIcon = THEME_ICONS[settings.theme] || Sun

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="The Noble Qur'an — Home">
            <div className="navbar-logo-icon" aria-hidden="true">
              <span>ق</span>
            </div>
            <div className="navbar-logo-text">
              <span className="name-arabic">القرآن الكريم</span>
              <span className="name-english">The Noble Qur'an</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar-nav" role="list">
            {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  aria-current={undefined}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={cycleTheme}
              aria-label={THEME_LABELS[settings.theme]}
              title={THEME_LABELS[settings.theme]}
            >
              <ThemeIcon size={16} aria-hidden="true" />
            </button>

            <Link to="/read" className="nav-read-btn">
              <BookOpen size={14} aria-hidden="true" />
              Read Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X size={18} aria-hidden="true" />
                : <Menu size={18} aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
              onClick={closeMenu}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <div className="mobile-menu-footer">
            <p>Theme: {settings.theme}</p>
            <button
              className="btn btn-ghost btn-sm"
              onClick={cycleTheme}
              aria-label={THEME_LABELS[settings.theme]}
            >
              <ThemeIcon size={15} aria-hidden="true" />
              {settings.theme === 'light' ? 'Dark' : settings.theme === 'dark' ? 'Parchment' : 'Light'}
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close menu on outside click */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 98 }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
