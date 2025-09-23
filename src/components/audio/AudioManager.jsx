import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Howl, Howler } from 'howler'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Audio Context for global sound management
const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

// Sound effect definitions
const soundEffects = {
  // UI Sounds
  buttonHover: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='], // Placeholder
    volume: 0.3,
    sprite: {}
  },
  buttonClick: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.4,
    sprite: {}
  },

  // Success Sounds
  correctAnswer: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.5,
    sprite: {}
  },
  perfectScore: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.6,
    sprite: {}
  },
  levelUp: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.7,
    sprite: {}
  },

  // Battle Sounds
  battleStart: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.5,
    sprite: {}
  },
  culturalPower: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.6,
    sprite: {}
  },
  comboHit: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.4,
    sprite: {}
  },
  specialMove: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.8,
    sprite: {}
  },

  // Mascot Voice Lines (using speech synthesis as placeholder)
  mascotGreeting: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.5,
    sprite: {}
  },
  mascotHint: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.5,
    sprite: {}
  },
  mascotCelebrate: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.6,
    sprite: {}
  }
}

// Background music tracks
const backgroundMusic = {
  heroTheme: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.3,
    loop: true,
    html5: true
  },
  battleTheme: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.4,
    loop: true,
    html5: true
  },
  peacefulGarden: {
    src: ['data:audio/wav;base64,UklGRhwCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YfgBAAA='],
    volume: 0.2,
    loop: true,
    html5: true
  }
}

// Audio Manager Component
const AudioManager = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [masterVolume, setMasterVolume] = useState(0.7)
  const [currentMusic, setCurrentMusic] = useState(null)
  const [showControls, setShowControls] = useState(false)

  const soundEffectsRef = useRef({})
  const musicRef = useRef({})
  const currentMusicRef = useRef(null)

  // Initialize audio on component mount
  useEffect(() => {
    // Load sound effects
    Object.entries(soundEffects).forEach(([key, config]) => {
      soundEffectsRef.current[key] = new Howl({
        ...config,
        volume: config.volume * masterVolume
      })
    })

    // Load background music
    Object.entries(backgroundMusic).forEach(([key, config]) => {
      musicRef.current[key] = new Howl({
        ...config,
        volume: config.volume * masterVolume
      })
    })

    // Set global volume
    Howler.volume(masterVolume)

    return () => {
      // Cleanup
      Object.values(soundEffectsRef.current).forEach(sound => sound.unload())
      Object.values(musicRef.current).forEach(music => music.unload())
    }
  }, [])

  // Update volumes when master volume changes
  useEffect(() => {
    Howler.volume(masterVolume)

    Object.entries(soundEffects).forEach(([key, config]) => {
      if (soundEffectsRef.current[key]) {
        soundEffectsRef.current[key].volume(config.volume * masterVolume)
      }
    })

    Object.entries(backgroundMusic).forEach(([key, config]) => {
      if (musicRef.current[key]) {
        musicRef.current[key].volume(config.volume * masterVolume)
      }
    })
  }, [masterVolume])

  // Play sound effect
  const playSound = (soundName, options = {}) => {
    if (!soundEnabled) return

    const sound = soundEffectsRef.current[soundName]
    if (sound) {
      // Add some variety to common sounds
      if (options.pitch) {
        sound.rate(options.pitch)
      }
      sound.play()
    } else {
      console.warn(`Sound effect '${soundName}' not found`)
    }
  }

  // Play background music
  const playMusic = (musicName, fadeIn = true) => {
    if (!musicEnabled) return

    // Stop current music
    if (currentMusicRef.current) {
      if (fadeIn) {
        currentMusicRef.current.fade(currentMusicRef.current.volume(), 0, 1000)
        setTimeout(() => {
          currentMusicRef.current.stop()
        }, 1000)
      } else {
        currentMusicRef.current.stop()
      }
    }

    // Start new music
    const music = musicRef.current[musicName]
    if (music) {
      currentMusicRef.current = music
      setCurrentMusic(musicName)

      if (fadeIn) {
        music.volume(0)
        music.play()
        music.fade(0, backgroundMusic[musicName].volume * masterVolume, 1000)
      } else {
        music.play()
      }
    }
  }

  // Stop music
  const stopMusic = (fadeOut = true) => {
    if (currentMusicRef.current) {
      if (fadeOut) {
        currentMusicRef.current.fade(currentMusicRef.current.volume(), 0, 1000)
        setTimeout(() => {
          currentMusicRef.current.stop()
          setCurrentMusic(null)
        }, 1000)
      } else {
        currentMusicRef.current.stop()
        setCurrentMusic(null)
      }
    }
  }

  // Text-to-speech for mascot dialogue
  const speakMascotLine = (text, voice = 'Japanese') => {
    if (!soundEnabled || !window.speechSynthesis) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.volume = masterVolume * 0.8
    utterance.rate = 0.9
    utterance.pitch = 1.2

    // Try to use Japanese voice if available
    const voices = window.speechSynthesis.getVoices()
    const japaneseVoice = voices.find(v => v.lang.includes('ja'))
    if (japaneseVoice) {
      utterance.voice = japaneseVoice
    }

    window.speechSynthesis.speak(utterance)
  }

  const audioContextValue = {
    playSound,
    playMusic,
    stopMusic,
    speakMascotLine,
    soundEnabled,
    musicEnabled,
    setSoundEnabled,
    setMusicEnabled,
    masterVolume,
    setMasterVolume,
    currentMusic
  }

  return (
    <AudioContext.Provider value={audioContextValue}>
      {children}

      {/* Floating Audio Controls */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
          onClick={() => setShowControls(!showControls)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Volume2 size={20} />
        </motion.button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              className="absolute top-16 right-0 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white min-w-[200px]"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
            >
              {/* Master Volume */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Sound Effects Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Sound Effects</span>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-6 rounded-full ${soundEnabled ? 'bg-green-500' : 'bg-gray-500'} relative transition-colors`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Music Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm">Background Music</span>
                <button
                  onClick={() => setMusicEnabled(!musicEnabled)}
                  className={`w-12 h-6 rounded-full ${musicEnabled ? 'bg-green-500' : 'bg-gray-500'} relative transition-colors`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${musicEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Currently Playing */}
              {currentMusic && (
                <div className="text-xs text-gray-300 mt-3 pt-3 border-t border-gray-600">
                  <div className="flex items-center gap-2">
                    <Music size={12} />
                    <span>Now playing: {currentMusic}</span>
                  </div>
                </div>
              )}

              {/* Test Sounds */}
              <div className="mt-4 pt-3 border-t border-gray-600">
                <div className="text-xs text-gray-300 mb-2">Test Sounds:</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => playSound('buttonClick')}
                    className="text-xs bg-blue-500 px-2 py-1 rounded"
                  >
                    Click
                  </button>
                  <button
                    onClick={() => playSound('correctAnswer')}
                    className="text-xs bg-green-500 px-2 py-1 rounded"
                  >
                    Success
                  </button>
                  <button
                    onClick={() => speakMascotLine('こんにちは！')}
                    className="text-xs bg-purple-500 px-2 py-1 rounded"
                  >
                    Voice
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AudioContext.Provider>
  )
}

export default AudioManager