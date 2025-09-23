import React from 'react'
import { motion } from 'framer-motion'
import AsahiMascot from '../mascot/AsahiMascot'
import ParticleBackground from '../effects/ParticleBackground'

const LoadingSpinner = () => {
  return (
    <div className="anime-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <ParticleBackground type="firefly" count={10} />

      <div className="text-center">
        {/* Animated Mascot */}
        <motion.div
          className="mb-8"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AsahiMascot
            animation="think"
            dialogue="Loading your adventure..."
            size="large"
          />
        </motion.div>

        {/* Torii Gate Spinner */}
        <motion.div
          className="anime-spinner mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="text-6xl">⛩️</div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="anime-title text-3xl mb-4"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Preparing Your Journey
        </motion.h2>

        <motion.p
          className="text-pink-200 japanese-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          旅の準備中...
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner