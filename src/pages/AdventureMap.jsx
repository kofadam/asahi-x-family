import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Swords, Book, Target, Trophy, Star, MapPin, Zap } from 'lucide-react'
import ParticleBackground from '../components/effects/ParticleBackground'
import AsahiMascot from '../components/mascot/AsahiMascot'
import { useAudio } from '../components/audio/AudioManager'
import { useApp } from '../contexts/AppContext'

const AdventureMap = () => {
  const navigate = useNavigate()
  const { playSound, playMusic } = useAudio()
  const { user } = useApp()
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [mascotDialogue, setMascotDialogue] = useState("Welcome to your adventure map! Choose your path wisely! 🗾")

  useEffect(() => {
    playMusic('peacefulGarden')
  }, [playMusic])

  const adventureLocations = [
    {
      id: 'cultural-battles',
      title: 'Cultural Battles',
      japanese: '文化バトル',
      description: 'Test your cultural knowledge in epic battles',
      icon: Swords,
      position: { x: 25, y: 40 },
      color: 'from-red-500 to-orange-500',
      unlocked: true,
      scenarios: [
        { id: 'crowded-train', title: 'Crowded Train Challenge', difficulty: 'Beginner' },
        { id: 'konbini', title: 'Convenience Store', difficulty: 'Beginner' },
        { id: 'restaurant-entry', title: 'Restaurant Entry', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'lesson-academy',
      title: 'Lesson Academy',
      japanese: 'レッスン学院',
      description: 'Learn katakana and basic Japanese',
      icon: Book,
      position: { x: 60, y: 30 },
      color: 'from-blue-500 to-purple-500',
      unlocked: true,
      lessons: 6
    },
    {
      id: 'practice-dojo',
      title: 'Practice Dojo',
      japanese: '練習道場',
      description: 'Master real-world scenarios',
      icon: Target,
      position: { x: 80, y: 60 },
      color: 'from-green-500 to-teal-500',
      unlocked: user?.totalXP >= 100,
      scenarios: 4
    },
    {
      id: 'achievement-hall',
      title: 'Hall of Fame',
      japanese: '栄光の殿堂',
      description: 'View your achievements and progress',
      icon: Trophy,
      position: { x: 45, y: 75 },
      color: 'from-yellow-500 to-gold',
      unlocked: true,
      achievements: user?.achievements?.length || 0
    },
    {
      id: 'review-temple',
      title: 'Review Temple',
      japanese: '復習寺院',
      description: 'Strengthen your memory with spaced repetition',
      icon: Star,
      position: { x: 15, y: 65 },
      color: 'from-purple-500 to-pink-500',
      unlocked: user?.totalXP >= 200,
      pendingReviews: user?.pendingReviews || 0
    }
  ]

  const handleLocationClick = (location) => {
    if (!location.unlocked) {
      playSound('buttonClick')
      setMascotDialogue("This area is still locked! Keep learning to unlock it! 🔒")
      return
    }

    playSound('correctAnswer')
    setSelectedLocation(location)
    setMascotDialogue(`${location.japanese} - ${location.description}`)
  }

  const handleLocationEnter = (location) => {
    playSound('buttonClick')

    switch (location.id) {
      case 'cultural-battles':
        navigate('/battle/crowded-train')
        break
      case 'lesson-academy':
        navigate('/lessons')
        break
      case 'practice-dojo':
        navigate('/practice')
        break
      case 'achievement-hall':
        navigate('/profile')
        break
      case 'review-temple':
        navigate('/review')
        break
      default:
        navigate('/adventure')
    }
  }

  const pageTransition = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 0.5, type: "spring" }
  }

  return (
    <motion.div
      className="adventure-map anime-bg min-h-screen relative overflow-hidden"
      {...pageTransition}
    >
      <ParticleBackground type="sakura" count={25} />

      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 via-green-300/10 to-brown-300/20" />

      {/* Mountain Silhouettes */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1200 400" className="w-full h-64 opacity-30">
          <path d="M0,400 L200,200 L400,250 L600,150 L800,200 L1000,100 L1200,180 L1200,400 Z" fill="url(#mountainGradient)" />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7F7FD5" />
              <stop offset="100%" stopColor="#1A1A2E" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Adventure Locations */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="anime-title text-5xl mb-2">Adventure Map</h1>
          <p className="text-2xl text-pink-200 japanese-text">冒険マップ</p>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative w-full max-w-6xl mx-auto h-96 mb-8">
          {adventureLocations.map((location, index) => {
            const Icon = location.icon
            const isLocked = !location.unlocked

            return (
              <motion.div
                key={location.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${location.position.x}%`,
                  top: `${location.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  bounce: 0.5
                }}
                whileHover={{ scale: isLocked ? 1 : 1.2 }}
                onClick={() => handleLocationClick(location)}
                onDoubleClick={() => !isLocked && handleLocationEnter(location)}
              >
                {/* Location Marker */}
                <div className={`
                  relative w-20 h-20 rounded-full flex items-center justify-center
                  bg-gradient-to-br ${location.color} shadow-2xl
                  ${isLocked ? 'opacity-50 grayscale' : 'group-hover:shadow-3xl'}
                  transition-all duration-300
                `}>
                  <Icon className="w-8 h-8 text-white" />

                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}

                  {/* Notification Badge */}
                  {!isLocked && (
                    <>
                      {(location.id === 'review-temple' && location.pendingReviews > 0) && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                          {location.pendingReviews}
                        </div>
                      )}
                      {(location.id === 'achievement-hall' && location.achievements > 0) && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {location.achievements}
                        </div>
                      )}
                    </>
                  )}

                  {/* Pulsing Effect for Available Actions */}
                  {!isLocked && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${location.color} animate-ping opacity-75`} />
                  )}
                </div>

                {/* Location Label */}
                <motion.div
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: selectedLocation?.id === location.id ? 1 : 0.8 }}
                >
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm font-bold">
                    {location.title}
                  </div>
                  <div className="text-xs text-pink-300 japanese-text mt-1">
                    {location.japanese}
                  </div>
                </motion.div>

                {/* Connecting Paths */}
                {index < adventureLocations.length - 1 && (
                  <svg className="absolute top-full left-1/2 w-32 h-16 opacity-30">
                    <path
                      d="M0,0 Q16,8 32,0"
                      stroke="url(#pathGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <defs>
                      <linearGradient id="pathGradient">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#FF69B4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Selected Location Details */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="anime-card p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedLocation.title}</h3>
                <p className="text-lg text-pink-300 japanese-text mb-4">{selectedLocation.japanese}</p>
                <p className="text-gray-300 mb-6">{selectedLocation.description}</p>

                {selectedLocation.scenarios && (
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-yellow-300 mb-2">Available Battles:</h4>
                    <div className="grid gap-2">
                      {selectedLocation.scenarios.map((scenario) => (
                        <div key={scenario.id} className="flex justify-between items-center bg-white/10 rounded-lg p-2">
                          <span>{scenario.title}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            scenario.difficulty === 'Beginner' ? 'bg-green-500' :
                            scenario.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}>
                            {scenario.difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleLocationEnter(selectedLocation)}
                  className="anime-button px-8 py-3"
                >
                  Enter {selectedLocation.title}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Guide */}
        <div className="fixed bottom-8 left-8 z-30">
          <AsahiMascot
            animation="idle"
            dialogue={mascotDialogue}
            size="medium"
          />
        </div>

        {/* Quick Stats */}
        <div className="fixed top-20 left-4 space-y-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="text-xs text-gray-300">Level</div>
            <div className="text-xl font-bold text-green-400">{user?.level || 1}</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="text-xs text-gray-300">XP</div>
            <div className="text-xl font-bold text-yellow-400">{user?.totalXP || 0}</div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="text-xs text-gray-300">Streak</div>
            <div className="text-xl font-bold text-orange-400">{user?.streakCount || 0}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdventureMap