import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../contexts/AppContext'

const AsahiMascot = ({ animation = 'idle', reaction = null, dialogue = null, size = 'medium' }) => {
  const { user } = useApp()
  const [currentForm, setCurrentForm] = useState('chibi')
  const [isAnimating, setIsAnimating] = useState(false)

  // Mascot evolution based on XP
  const mascotForms = {
    chibi: {
      level: "0-100 XP",
      name: "Sleepy Asahi",
      emoji: "😴",
      baseColor: "#FFB6C1",
      accentColor: "#FFE4E1",
      size: { width: 80, height: 80 },
      animations: {
        idle: { y: [0, -5, 0], transition: { duration: 2, repeat: Infinity } },
        yawn: { rotate: [-5, 5, -5], scale: [1, 0.9, 1] },
        celebrate: { rotate: [0, 360], scale: [1, 1.2, 1] },
        confused: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } }
      }
    },
    teen: {
      level: "100-500 XP",
      name: "Eager Asahi",
      emoji: "😊",
      baseColor: "#FF69B4",
      accentColor: "#FFD700",
      size: { width: 100, height: 100 },
      animations: {
        idle: { y: [0, -8, 0], rotate: [0, 2, 0, -2, 0], transition: { duration: 3, repeat: Infinity } },
        cheer: { y: [-20, 0], rotate: [0, 360], transition: { duration: 0.8 } },
        think: { scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] },
        powerUp: { scale: [1, 1.5, 1.2], filter: ["brightness(1)", "brightness(1.5)", "brightness(1.2)"] },
        bow: { rotateX: [0, 45, 0], transition: { duration: 1 } }
      }
    },
    adult: {
      level: "500-1000 XP",
      name: "Wise Asahi",
      emoji: "🌅",
      baseColor: "#DC143C",
      accentColor: "#FFD700",
      size: { width: 120, height: 120 },
      animations: {
        idle: { y: [0, -10, 0], rotate: [0, 1, -1, 0], transition: { duration: 4, repeat: Infinity } },
        teach: { scale: [1, 1.1, 1], x: [0, 10, -10, 0] },
        meditate: { filter: ["blur(0px)", "blur(2px)", "blur(0px)"], transition: { duration: 3 } },
        specialMove: { rotate: [0, 720], scale: [1, 1.5, 1], transition: { duration: 1 } },
        transform: { scale: [1, 0, 1.2], rotate: [0, 180, 360] }
      }
    },
    master: {
      level: "1000+ XP",
      name: "Asahi Sensei",
      emoji: "👑",
      baseColor: "#FFD700",
      accentColor: "#9370DB",
      size: { width: 140, height: 140 },
      animations: {
        idle: {
          y: [0, -15, 0],
          rotate: [0, 1, -1, 0],
          filter: ["hue-rotate(0deg)", "hue-rotate(10deg)", "hue-rotate(0deg)"],
          transition: { duration: 5, repeat: Infinity }
        },
        float: { y: [-20, -40, -20], transition: { duration: 2, repeat: Infinity } },
        blessing: { scale: [1, 1.3, 1], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] },
        ultimateMove: { rotate: [0, 1080], scale: [1, 2, 1], transition: { duration: 1.5 } },
        portal: { rotateY: [0, 360], opacity: [1, 0.5, 1] },
        wisdom: { scale: [1, 1.2, 1], y: [0, -20, 0] }
      }
    }
  }

  // Determine mascot form based on user XP
  useEffect(() => {
    const xp = user?.totalXP || 0
    if (xp >= 1000) setCurrentForm('master')
    else if (xp >= 500) setCurrentForm('adult')
    else if (xp >= 100) setCurrentForm('teen')
    else setCurrentForm('chibi')
  }, [user?.totalXP])

  const form = mascotForms[currentForm]
  const currentAnimation = form.animations[animation] || form.animations.idle

  // Reaction animations
  const reactionEmojis = {
    success: ["✨", "🌟", "💫", "⭐"],
    mistake: ["💦", "😅", "💧", "😓"],
    thinking: ["🤔", "💭", "🧐", "❓"],
    encourage: ["👍", "💪", "✊", "🎯"]
  }

  // Handle special evolution animation
  const handleEvolution = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  return (
    <div className="mascot-container relative">
      <AnimatePresence mode="wait">
        {/* Main Mascot Body */}
        <motion.div
          key={currentForm}
          className="mascot-body relative"
          style={{
            width: form.size.width,
            height: form.size.height,
            background: `radial-gradient(circle, ${form.baseColor}, ${form.accentColor})`,
            borderRadius: '50%',
            boxShadow: `0 0 30px ${form.baseColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${form.size.width * 0.6}px`
          }}
          animate={currentAnimation}
          initial={{ scale: 0, rotate: -180 }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Mascot Face */}
          <div className="mascot-face">
            {form.emoji}
          </div>

          {/* Aura effect for higher levels */}
          {(currentForm === 'adult' || currentForm === 'master') && (
            <motion.div
              className="aura absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, transparent 30%, ${form.accentColor}33 70%, transparent 100%)`,
                width: '150%',
                height: '150%',
                top: '-25%',
                left: '-25%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Sparkle effects for master form */}
          {currentForm === 'master' && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* Reaction Bubbles */}
        {reaction && reactionEmojis[reaction] && (
          <motion.div
            className="reaction-bubble absolute -top-4 -right-4"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-full p-2 shadow-lg">
              {reactionEmojis[reaction][Math.floor(Math.random() * reactionEmojis[reaction].length)]}
            </div>
          </motion.div>
        )}

        {/* Dialogue Box */}
        {dialogue && (
          <motion.div
            className="dialogue-bubble absolute -bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="dialogue-box px-4 py-2 text-white text-sm">
              {dialogue}
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-purple-800"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Badge */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {form.name}
        </div>
      </motion.div>

      {/* Evolution Effect */}
      {isAnimating && (
        <motion.div
          className="evolution-effect absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur-xl animate-pulse"></div>
        </motion.div>
      )}
    </div>
  )
}

export default AsahiMascot