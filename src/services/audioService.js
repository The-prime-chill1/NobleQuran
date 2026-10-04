/**
 * Audio service for Qur'an recitation.
 * Uses AlQuran.cloud audio endpoints.
 * Gracefully handles unavailability, network errors, and load failures.
 */

const BASE_URL = 'https://api.alquran.cloud/v1'

/**
 * Builds an audio URL for a verse using the given reciter edition.
 * This constructs a CDN URL that AlQuran.cloud uses for audio files.
 */
export function buildAudioUrl(surahNumber, verseNumber, edition = 'ar.alafasy') {
  // AlQuran.cloud audio CDN pattern
  const paddedSurah = String(surahNumber).padStart(3, '0')
  const paddedVerse = String(verseNumber).padStart(3, '0')
  return `https://cdn.islamic.network/quran/audio/128/${edition}/${paddedSurah}${paddedVerse}.mp3`
}

/**
 * Creates a new Audio element with event handlers.
 * @param {string} url
 * @param {object} handlers { onPlay, onPause, onEnded, onError, onTimeUpdate, onLoadStart, onCanPlay }
 * @returns {HTMLAudioElement}
 */
export function createAudioElement(url, handlers = {}) {
  const audio = new Audio(url)
  audio.preload = 'metadata'

  if (handlers.onPlay) audio.addEventListener('play', handlers.onPlay)
  if (handlers.onPause) audio.addEventListener('pause', handlers.onPause)
  if (handlers.onEnded) audio.addEventListener('ended', handlers.onEnded)
  if (handlers.onError) audio.addEventListener('error', handlers.onError)
  if (handlers.onTimeUpdate) audio.addEventListener('timeupdate', handlers.onTimeUpdate)
  if (handlers.onLoadStart) audio.addEventListener('loadstart', handlers.onLoadStart)
  if (handlers.onCanPlay) audio.addEventListener('canplay', handlers.onCanPlay)

  return audio
}

/**
 * Attempts to fetch verse audio data from API (for verification).
 */
export async function fetchVerseAudioMeta(surahNumber, verseNumber, edition = 'ar.alafasy') {
  try {
    const res = await fetch(`${BASE_URL}/ayah/${surahNumber}:${verseNumber}/${edition}`)
    if (!res.ok) return null
    const json = await res.json()
    if (json.code !== 200) return null
    return json.data
  } catch {
    return null
  }
}
