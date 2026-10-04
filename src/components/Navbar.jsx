import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Home,
  BookOpen,
  Grid3X3,
  Bookmark,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import QuranLogo from './QuranLogo'
import '../styles/navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/read', label: 'Read', icon: BookOpen },
  { to: '/surahs', label: 'Surahs', icon: Grid3X3 },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Bespoke Islamic Logo */}
          <Link to="/" className="navbar-logo" aria-label="The Noble Qur'an — Home">
            <QuranLogo size="md" variant="full" showTagline={false} />
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
