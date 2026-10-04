import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2, VolumeX, Loader } from 'lucide-react'
import { buildAudioUrl } from '../services/audioService'
import './AudioPlayer.css'

export default function AudioPlayer({
  surahNumber,
  verseNumber,
  totalVerses,
  reciter = 'ar.alafasy',
  onVerseChange,
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  // Build URL whenever surah/verse/reciter changes
  const audioUrl = buildAudioUrl(surahNumber, verseNumber, reciter)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    const audio = audioRef.current

    const handleLoadStart = () => { setIsLoading(true); setHasError(false) }
    const handleCanPlay = () => setIsLoading(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-advance to next verse
      if (verseNumber < totalVerses) {
        onVerseChange?.(verseNumber + 1)
      }
    }
    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      setIsPlaying(false)
    }
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration || 0)

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)

    // Update src
    audio.src = audioUrl
    audio.preload = 'metadata'
    audio.volume = isMuted ? 0 : volume

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.pause()
    }
  }, [audioUrl])

  // Volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => setHasError(true))
      }
    }
  }, [isPlaying])

  const replay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => setHasError(true))
    }
  }, [])

  const handlePrev = useCallback(() => {
    if (verseNumber > 1) onVerseChange?.(verseNumber - 1)
  }, [verseNumber, onVerseChange])

  const handleNext = useCallback(() => {
    if (verseNumber < totalVerses) onVerseChange?.(verseNumber + 1)
  }, [verseNumber, totalVerses, onVerseChange])

  const handleProgressClick = useCallback((e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }, [duration])

  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="audio-player" role="region" aria-label="Audio recitation player">
      {/* Verse indicator */}
      <div className="audio-verse-info">
        <span className="audio-verse-ref">{surahNumber}:{verseNumber}</span>
        {hasError && (
          <span className="audio-error-msg" role="alert">
            Audio unavailable for this verse
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div
        className="audio-progress-bar"
        ref={progressRef}
        onClick={handleProgressClick}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPercent)}
        aria-label="Playback progress"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!audioRef.current || !duration) return
          if (e.key === 'ArrowRight') audioRef.current.currentTime = Math.min(duration, currentTime + 5)
          if (e.key === 'ArrowLeft') audioRef.current.currentTime = Math.max(0, currentTime - 5)
        }}
      >
        <div className="audio-progress-fill" style={{ width: `${progressPercent}%` }} />
        <div className="audio-progress-thumb" style={{ left: `${progressPercent}%` }} />
      </div>

      {/* Time */}
      <div className="audio-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="audio-controls">
        <button
          className="audio-btn"
          onClick={handlePrev}
          disabled={verseNumber <= 1}
          aria-label="Previous verse"
          title="Previous verse"
        >
          <SkipBack size={16} aria-hidden="true" />
        </button>

        <button
          className="audio-btn audio-replay-btn"
          onClick={replay}
          aria-label="Replay verse"
          title="Replay"
        >
          <RotateCcw size={14} aria-hidden="true" />
        </button>

        <button
          className="audio-play-btn"
          onClick={togglePlay}
          disabled={hasError}
          aria-label={isPlaying ? 'Pause recitation' : 'Play recitation'}
          aria-pressed={isPlaying}
        >
          {isLoading
            ? <Loader size={20} className="audio-spinner" aria-hidden="true" />
            : isPlaying
            ? <Pause size={20} aria-hidden="true" />
            : <Play size={20} aria-hidden="true" />
          }
        </button>

        <button
          className="audio-btn"
          onClick={handleNext}
          disabled={verseNumber >= totalVerses}
          aria-label="Next verse"
          title="Next verse"
        >
          <SkipForward size={16} aria-hidden="true" />
        </button>

        {/* Volume */}
        <div className="audio-volume">
          <button
            className="audio-btn"
            onClick={() => setIsMuted(prev => !prev)}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
          </button>
          <input
            type="range"
            className="audio-volume-slider"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value))
              setIsMuted(false)
            }}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  )
}
