import { useState, useCallback } from 'react'
import { getSettings, saveSettings, resetSettings, DEFAULT_SETTINGS } from '../utils/storage'

/**
 * Hook for managing reading settings with LocalStorage persistence.
 * Settings include theme, font sizes, reading mode, and display preferences.
 */
export function useReadingSettings() {
  const [settings, setSettingsState] = useState(() => getSettings())

  const updateSettings = useCallback((updates) => {
    setSettingsState(prev => {
      const next = { ...prev, ...updates }
      saveSettings(next)
      return next
    })
  }, [])

  const resetAllSettings = useCallback(() => {
    const defaults = resetSettings()
    setSettingsState(defaults)
    return defaults
  }, [])

  // Convenience updaters
  const setTheme = useCallback((theme) => updateSettings({ theme }), [updateSettings])
  const setReadingMode = useCallback((readingMode) => updateSettings({ readingMode }), [updateSettings])
  const setTranslation = useCallback((translation) => updateSettings({ translation }), [updateSettings])
  const toggleTranslation = useCallback(() => updateSettings({ showTranslation: !settings.showTranslation }), [settings, updateSettings])
  const toggleTransliteration = useCallback(() => updateSettings({ showTransliteration: !settings.showTransliteration }), [settings, updateSettings])

  const increaseArabicFont = useCallback(() => {
    updateSettings({ arabicFontSize: Math.min(settings.arabicFontSize + 2, 72) })
  }, [settings, updateSettings])

  const decreaseArabicFont = useCallback(() => {
    updateSettings({ arabicFontSize: Math.max(settings.arabicFontSize - 2, 18) })
  }, [settings, updateSettings])

  const increaseTranslationFont = useCallback(() => {
    updateSettings({ translationFontSize: Math.min(settings.translationFontSize + 1, 24) })
  }, [settings, updateSettings])

  const decreaseTranslationFont = useCallback(() => {
    updateSettings({ translationFontSize: Math.max(settings.translationFontSize - 1, 11) })
  }, [settings, updateSettings])

  const setLineSpacing = useCallback((lineSpacing) => {
    updateSettings({ lineSpacing })
  }, [updateSettings])

  return {
    settings,
    updateSettings,
    resetAllSettings,
    setTheme,
    setReadingMode,
    setTranslation,
    toggleTranslation,
    toggleTransliteration,
    increaseArabicFont,
    decreaseArabicFont,
    increaseTranslationFont,
    decreaseTranslationFont,
    setLineSpacing,
    DEFAULT_SETTINGS,
  }
}
