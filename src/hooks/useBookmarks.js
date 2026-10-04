import { useState, useCallback } from 'react'
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  isBookmarked,
  clearAllBookmarks,
} from '../utils/storage'

/**
 * Hook for managing bookmarks with LocalStorage persistence.
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => getBookmarks())

  const bookmark = useCallback((verse) => {
    const updated = addBookmark(verse)
    setBookmarks(updated)
  }, [])

  const unbookmark = useCallback((surahNumber, verseNumber) => {
    const updated = removeBookmark(surahNumber, verseNumber)
    setBookmarks(updated)
  }, [])

  const toggleBookmark = useCallback((verse) => {
    if (isBookmarked(verse.surahNumber, verse.verseNumber)) {
      unbookmark(verse.surahNumber, verse.verseNumber)
    } else {
      bookmark(verse)
    }
  }, [bookmark, unbookmark])

  const checkIsBookmarked = useCallback((surahNumber, verseNumber) => {
    return bookmarks.some(b => b.surahNumber === surahNumber && b.verseNumber === verseNumber)
  }, [bookmarks])

  const clearBookmarks = useCallback(() => {
    clearAllBookmarks()
    setBookmarks([])
  }, [])

  return {
    bookmarks,
    bookmark,
    unbookmark,
    toggleBookmark,
    isBookmarked: checkIsBookmarked,
    clearBookmarks,
    count: bookmarks.length,
  }
}
