import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import './SearchBar.css'

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search surahs...',
  autoFocus = false,
  id = 'search-input',
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value)
    }
    if (e.key === 'Escape') {
      onChange('')
      inputRef.current?.blur()
    }
  }

  function handleClear() {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="search-bar-wrapper" role="search">
      <label htmlFor={id} className="visually-hidden">
        {placeholder}
      </label>
      <div className="search-bar-inner">
        <Search className="search-icon" size={16} aria-hidden="true" />
        <input
          ref={inputRef}
          id={id}
          type="search"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          aria-label={placeholder}
        />
        {value && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
