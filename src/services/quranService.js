/**
 * Qur'an Service — fetches data from AlQuran.cloud REST API (v1)
 * API Documentation: https://alquran.cloud/api
 *
 * Text source: Tanzil.net Uthmani text dataset (via AlQuran.cloud)
 * Translation: Saheeh International (en.sahih)
 *
 * Caches responses in memory to avoid redundant network requests.
 */

const BASE_URL = 'https://api.alquran.cloud/v1'

// In-memory cache
const cache = new Map()

async function cachedFetch(url) {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`)
  const json = await res.json()
  if (json.code !== 200 || json.status !== 'OK') {
    throw new Error(json.data || 'API returned non-OK status')
  }
  cache.set(url, json.data)
  return json.data
}

/**
 * Fetches the list of all 114 surahs.
 * Returns array of surah metadata objects.
 */
export async function fetchSurahList() {
  return cachedFetch(`${BASE_URL}/surah`)
}

/**
 * Fetches a single surah with Arabic text (Uthmani edition).
 * @param {number} surahNumber 1–114
 */
export async function fetchSurahArabic(surahNumber) {
  return cachedFetch(`${BASE_URL}/surah/${surahNumber}/quran-uthmani`)
}

/**
 * Fetches a surah translation (Saheeh International or another edition).
 * @param {number} surahNumber 1–114
 * @param {string} edition e.g. 'en.sahih'
 */
export async function fetchSurahTranslation(surahNumber, edition = 'en.sahih') {
  return cachedFetch(`${BASE_URL}/surah/${surahNumber}/${edition}`)
}

/**
 * Fetches a single verse with Arabic text.
 * @param {number} surahNumber
 * @param {number} verseNumber
 */
export async function fetchVerse(surahNumber, verseNumber) {
  return cachedFetch(`${BASE_URL}/ayah/${surahNumber}:${verseNumber}/quran-uthmani`)
}

/**
 * Fetches audio URL for a specific verse using AlQuran.cloud.
 * Edition: ar.alafasy (Sheikh Mishary Alafasy)
 * @param {number} surahNumber
 * @param {number} verseNumber
 * @param {string} edition
 */
export async function fetchVerseAudio(surahNumber, verseNumber, edition = 'ar.alafasy') {
  return cachedFetch(`${BASE_URL}/ayah/${surahNumber}:${verseNumber}/${edition}`)
}

/**
 * Fetches available audio editions (reciters).
 */
export async function fetchAudioEditions() {
  return cachedFetch(`${BASE_URL}/edition/format/audio/type/versebyverse`)
}

/**
 * Fetches a complete surah with both Arabic and translation, merged.
 * @param {number} surahNumber
 * @param {string} translationEdition
 * @returns {{ surah: object, verses: Array }}
 */
export async function fetchSurahWithTranslation(surahNumber, translationEdition = 'en.sahih') {
  const [arabicData, translationData] = await Promise.all([
    fetchSurahArabic(surahNumber),
    fetchSurahTranslation(surahNumber, translationEdition),
  ])

  const verses = arabicData.ayahs.map((ayah, index) => ({
    number: ayah.numberInSurah,
    globalNumber: ayah.number,
    arabic: ayah.text,
    translation: translationData.ayahs[index]?.text || '',
    juz: ayah.juz,
    page: ayah.page,
    sajda: ayah.sajda,
  }))

  return {
    surah: {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      revelationType: arabicData.revelationType,
      numberOfAyahs: arabicData.numberOfAyahs,
    },
    verses,
  }
}

/**
 * Search surahs by name (Arabic, English, transliteration).
 * @param {Array} surahList
 * @param {string} query
 */
export function searchSurahs(surahList, query) {
  if (!query.trim()) return surahList
  const q = query.toLowerCase().trim()
  return surahList.filter(s =>
    s.englishName.toLowerCase().includes(q) ||
    s.englishNameTranslation.toLowerCase().includes(q) ||
    s.name.includes(query) ||
    String(s.number) === q
  )
}

/**
 * Parses a verse reference like "2:255" into { surahNumber, verseNumber }.
 * Returns null if the format is invalid.
 */
export function parseVerseReference(ref) {
  const match = ref.trim().match(/^(\d+):(\d+)$/)
  if (!match) return null
  return {
    surahNumber: parseInt(match[1], 10),
    verseNumber: parseInt(match[2], 10),
  }
}

/**
 * Available translations with labels.
 */
export const AVAILABLE_TRANSLATIONS = [
  { id: 'en.sahih', label: 'Saheeh International', language: 'English' },
  { id: 'en.yusufali', label: 'Abdullah Yusuf Ali', language: 'English' },
  { id: 'en.pickthall', label: 'Pickthall', language: 'English' },
  { id: 'en.khattab', label: 'Dr. Mustafa Khattab', language: 'English' },
]

/**
 * Available audio reciters.
 */
export const AVAILABLE_RECITERS = [
  { id: 'ar.alafasy', label: 'Sheikh Mishary Rashid Alafasy' },
  { id: 'ar.abdullahbasfar', label: 'Sheikh Abdullah Basfar' },
  { id: 'ar.hudhaify', label: 'Sheikh Ali Al-Hudhaify' },
  { id: 'ar.minshawi', label: 'Sheikh Mohamed Siddiq Al-Minshawi' },
]
