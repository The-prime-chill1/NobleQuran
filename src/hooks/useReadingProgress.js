import { useState, useCallback } from 'react'
import {
  getReadingProgress,
  saveReadingProgress,
  clearReadingProgress,
} from '../utils/storage'

/**
 * Hook for tracking and persisting reading progress.
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(() => getReadingProgress())

  const updateProgress = useCallback((data) => {
    const { surahNumber, verseNumber, surahName, surahNameArabic } = data
    if (!surahNumber || !verseNumber) return
    saveReadingProgress({ surahNumber, verseNumber, surahName, surahNameArabic })
    setProgress({ surahNumber, verseNumber, surahName, surahNameArabic, savedAt: new Date().toISOString() })
  }, [])

  const clearProgress = useCallback(() => {
    clearReadingProgress()
    setProgress(null)
  }, [])

  const hasProgress = Boolean(progress)

  return {
    progress,
    updateProgress,
    clearProgress,
    hasProgress,
  }
}
