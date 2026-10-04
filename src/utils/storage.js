/**
 * LocalStorage utility functions with error handling.
 * Handles missing keys, invalid JSON, and storage quota errors gracefully.
 */

const STORAGE_KEYS = {
  READING_PROGRESS: 'quran_reading_progress',
  BOOKMARKS: 'quran_bookmarks',
  SETTINGS: 'quran_reading_settings',
}

export { STORAGE_KEYS }

/**
 * Safely get a value from localStorage.
 * Returns null if key doesn't exist or JSON parse fails.
 */
export function storageGet(key) {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return null
    return JSON.parse(item)
  } catch (error) {
    console.warn(`[Storage] Failed to read key "${key}":`, error)
    return null
  }
}

/**
 * Safely set a value in localStorage.
 * Returns true on success, false on failure (e.g. quota exceeded).
 */
export function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`[Storage] Failed to write key "${key}":`, error)
    return false
  }
}

/**
 * Safely remove a key from localStorage.
 */
export function storageRemove(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}":`, error)
    return false
  }
}

/* --- Reading Progress --- */

export function getReadingProgress() {
  const progress = storageGet(STORAGE_KEYS.READING_PROGRESS)
  if (!progress || typeof progress !== 'object') return null
  // Validate shape
  if (
    typeof progress.surahNumber !== 'number' ||
    typeof progress.verseNumber !== 'number'
  ) return null
  return progress
}

export function saveReadingProgress({ surahNumber, verseNumber, surahName, surahNameArabic }) {
  if (!surahNumber || !verseNumber) return false
  return storageSet(STORAGE_KEYS.READING_PROGRESS, {
    surahNumber,
    verseNumber,
    surahName: surahName || '',
    surahNameArabic: surahNameArabic || '',
    savedAt: new Date().toISOString(),
  })
}

export function clearReadingProgress() {
  return storageRemove(STORAGE_KEYS.READING_PROGRESS)
}

/* --- Bookmarks --- */

export function getBookmarks() {
  const bookmarks = storageGet(STORAGE_KEYS.BOOKMARKS)
  if (!Array.isArray(bookmarks)) return []
  return bookmarks
}

export function addBookmark(bookmark) {
  const bookmarks = getBookmarks()
  const key = `${bookmark.surahNumber}:${bookmark.verseNumber}`
  const existing = bookmarks.find(b => `${b.surahNumber}:${b.verseNumber}` === key)
  if (existing) return bookmarks // Already bookmarked
  const updated = [
    ...bookmarks,
    {
      surahNumber: bookmark.surahNumber,
      verseNumber: bookmark.verseNumber,
      surahName: bookmark.surahName || '',
      surahNameArabic: bookmark.surahNameArabic || '',
      arabicText: bookmark.arabicText || '',
      savedAt: new Date().toISOString(),
    }
  ]
  storageSet(STORAGE_KEYS.BOOKMARKS, updated)
  return updated
}

export function removeBookmark(surahNumber, verseNumber) {
  const bookmarks = getBookmarks()
  const updated = bookmarks.filter(
    b => !(b.surahNumber === surahNumber && b.verseNumber === verseNumber)
  )
  storageSet(STORAGE_KEYS.BOOKMARKS, updated)
  return updated
}

export function isBookmarked(surahNumber, verseNumber) {
  const bookmarks = getBookmarks()
  return bookmarks.some(b => b.surahNumber === surahNumber && b.verseNumber === verseNumber)
}

export function clearAllBookmarks() {
  return storageRemove(STORAGE_KEYS.BOOKMARKS)
}

/* --- Reading Settings --- */

export const DEFAULT_SETTINGS = {
  theme: 'light',
  arabicFontSize: 32,
  translationFontSize: 15,
  lineSpacing: 2,
  showTranslation: true,
  showTransliteration: false,
  readingMode: 'continuous', // mushaf | continuous | verse-by-verse
  translation: 'en.sahih',
}

export function getSettings() {
  const saved = storageGet(STORAGE_KEYS.SETTINGS)
  if (!saved || typeof saved !== 'object') return DEFAULT_SETTINGS
  // Merge with defaults to handle any new keys added over time
  return { ...DEFAULT_SETTINGS, ...saved }
}

export function saveSettings(settings) {
  return storageSet(STORAGE_KEYS.SETTINGS, settings)
}

export function resetSettings() {
  storageSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  return DEFAULT_SETTINGS
}
