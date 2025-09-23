import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, Sparkles, Book, Target, Trophy, Zap } from 'lucide-react'
import ParticleBackground from '../components/effects/ParticleBackground'
import AsahiMascot from '../components/mascot/AsahiMascot'
import { useApp } from '../contexts/AppContext'

const HeroLanding = () => {
  const navigate = useNavigate()
  const { user } = useApp()
  const [selectedModule, setSelectedModule] = useState(null)
  const [mascotDialogue, setMascotDialogue] = useState("Konnichiwa! I'm Asahi! Ready for an adventure? 🌅")
  const [mascotAnimation, setMascotAnimation] = useState('idle')

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, 50])
  const y3 = useTransform(scrollY, [0, 500], [0, 25])

  // Cycle through mascot greetings
  useEffect(() => {
    const greetings = [
      "Konnichiwa! I'm Asahi! Ready for an adventure? 🌅",
      "Let's learn Japanese culture together! 🗾",
      "Time to become a cultural master! 🎌",
      "Your journey to Japan starts here! 🏯"
    ]
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % greetings.length
      setMascotDialogue(greetings[index])
      setMascotAnimation(index % 2 === 0 ? 'idle' : 'cheer')
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const modules = [
    {
      id: 'reading-room',
      title: 'Reading the Room',
      japanese: '空気を読む',
      description: 'Master unspoken social cues',
      icon: Book,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Beginner',
      duration: '5-10 min',
      xp: 100
    },
    {
      id: 'politeness',
      title: 'Politeness Levels',
      japanese: '敬語',
      description: 'Navigate formal interactions',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Intermediate',
      duration: '10-15 min',
      xp: 150
    },
    {
      id: 'restaurant',
      title: 'Restaurant Mastery',
      japanese: 'レストラン',
      description: 'Dining etiquette perfected',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Beginner',
      duration: '5-10 min',
      xp: 100
    },
    {
      id: 'train',
      title: 'Train Etiquette',
      japanese: '電車マナー',
      description: 'Navigate public transport',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      difficulty: 'Beginner',
      duration: '5-10 min',
      xp: 100
    }
  ]

  const handleStartAdventure = () => {
    setMascotAnimation('powerUp')
    setMascotDialogue("Let's go! がんばって！")
    setTimeout(() => navigate('/adventure'), 800)
  }

  const handleModuleHover = (module) => {
    setSelectedModule(module.id)
    setMascotAnimation('think')
    setMascotDialogue(`${module.japanese} - ${module.description}`)
  }

  const handleModuleLeave = () => {
    setSelectedModule(null)
    setMascotAnimation('idle')
    setMascotDialogue("Choose your learning path! 🌸")
  }

  return (
    <div className="anime-bg min-h-screen relative overflow-hidden">
      {/* Particle Effects */}
      <ParticleBackground type="sakura" count={20} />

      {/* Parallax Background Layers */}
      <motion.div
        className="parallax-layer parallax-back"
        style={{
          y: y1,
          backgroundImage: 'linear-gradient(180deg, #1A1A2E 0%, #7F7FD5 50%, #FFB6C1 100%)',
          position: 'absolute',
          inset: 0,
          zIndex: -3
        }}
      />

      <motion.div
        className="parallax-layer parallax-mid"
        style={{
          y: y2,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '40%',
          background: 'linear-gradient(to top, rgba(255, 183, 197, 0.3), transparent)',
          zIndex: -2
        }}
      />

      <motion.div
        className="parallax-layer parallax-front"
        style={{
          y: y3,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to top, rgba(255, 105, 180, 0.2), transparent)',
          zIndex: -1
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Animated Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1
            className="anime-title text-6xl md:text-8xl mb-4"
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Asahi × Family
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white japanese-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            朝日ファミリー
          </motion.p>

          <motion.p
            className="text-lg mt-4 text-pink-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Learn Japanese Culture the Anime Way! 🎌
          </motion.p>
        </motion.div>

        {/* Mascot Section */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
        >
          <AsahiMascot
            animation={mascotAnimation}
            dialogue={mascotDialogue}
            size="large"
          />
        </motion.div>

        {/* Start Adventure Button */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            className="anime-button pulse-button text-xl px-12 py-4"
            onClick={handleStartAdventure}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Play size={24} />
              Begin Your Journey
              <Sparkles size={24} />
            </span>
          </motion.button>

          <motion.div
            className="mt-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {user ? (
              <p className="text-lg">
                Welcome back, <span className="text-yellow-400 font-bold">{user.name || 'Hero'}</span>!
                <br />
                Level {user.level || 1} • {user.totalXP || 0} XP
              </p>
            ) : (
              <p className="text-lg">Start your cultural adventure today!</p>
            )}
          </motion.div>
        </motion.div>

        {/* Module Selection Cards */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Learning Path</h2>
          <p className="text-pink-200">Master Japanese culture through interactive scenarios</p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                onHoverStart={() => handleModuleHover(module)}
                onHoverEnd={handleModuleLeave}
                className="anime-card cursor-pointer group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-10 group-hover:opacity-20 rounded-xl transition-opacity`} />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    animate={selectedModule === module.id ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
                  <p className="text-lg text-pink-300 japanese-text mb-2">{module.japanese}</p>
                  <p className="text-sm text-gray-300 mb-4">{module.description}</p>

                  {/* Metadata */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-yellow-400">⏱️ {module.duration}</span>
                    <span className="text-green-400">⚡ +{module.xp} XP</span>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      module.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                      module.difficulty === 'Intermediate' ? 'bg-yellow-500 text-black' :
                      'bg-red-500 text-white'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-xl text-white mb-4">
            🌅 Learn Japanese culture through anime-style adventures
          </p>
          <p className="text-lg text-pink-200">
            Perfect for your next trip to Japan!
          </p>
        </motion.div>

        {/* Achievement Preview */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {['🏆', '🎌', '🌸', '⛩️', '🗾'].map((emoji, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring" }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 2.5, type: "spring" }}
      >
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-xl"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/profile')}
        >
          <Trophy size={24} />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default HeroLanding