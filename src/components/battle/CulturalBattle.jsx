import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Heart, Shield, Star, Target } from 'lucide-react'
import AsahiMascot from '../mascot/AsahiMascot'
import anime from 'animejs'

const CulturalBattle = ({ scenario, onComplete }) => {
  const [culturalPower, setCulturalPower] = useState(100)
  const [comboCount, setComboCount] = useState(0)
  const [specialCharge, setSpecialCharge] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [battlePhase, setBattlePhase] = useState('setup') // setup, choosing, result
  const [mascotReaction, setMascotReaction] = useState(null)
  const [opponentAnimation, setOpponentAnimation] = useState('idle')
  const [showSpecialMove, setShowSpecialMove] = useState(false)

  // Animate power bars
  useEffect(() => {
    anime({
      targets: '.power-gauge-fill',
      width: `${culturalPower}%`,
      easing: 'easeInOutQuad',
      duration: 800
    })
  }, [culturalPower])

  useEffect(() => {
    anime({
      targets: '.special-gauge-fill',
      width: `${specialCharge}%`,
      easing: 'easeInOutQuad',
      duration: 600
    })
  }, [specialCharge])

  const handleChoice = (choice, index) => {
    setSelectedChoice(index)
    setBattlePhase('result')
    setOpponentAnimation('react')

    // Battle effects
    const battleEffect = document.createElement('div')
    battleEffect.className = 'battle-flash'
    battleEffect.style.position = 'fixed'
    battleEffect.style.inset = '0'
    battleEffect.style.zIndex = '9999'
    battleEffect.style.pointerEvents = 'none'
    document.body.appendChild(battleEffect)

    setTimeout(() => {
      document.body.removeChild(battleEffect)
    }, 300)

    // Process result
    if (choice.result === 'perfect') {
      setCulturalPower(prev => Math.min(100, prev + choice.culturalPower || 50))
      setComboCount(prev => prev + 1)
      setSpecialCharge(prev => Math.min(100, prev + 25))
      setMascotReaction('success')
      setOpponentAnimation('hit')

      // Combo animation
      if (comboCount >= 2) {
        anime({
          targets: '.combo-counter',
          scale: [1, 1.5, 1],
          rotate: [0, 10, -10, 0],
          duration: 500
        })
      }
    } else if (choice.result === 'good') {
      setCulturalPower(prev => Math.min(100, prev + (choice.culturalPower || 30)))
      setComboCount(prev => prev + 1)
      setSpecialCharge(prev => Math.min(100, prev + 15))
      setMascotReaction('success')
    } else if (choice.result === 'mistake') {
      setCulturalPower(prev => Math.max(0, prev + (choice.culturalPower || -20)))
      setComboCount(0)
      setMascotReaction('mistake')
      setOpponentAnimation('attack')
    }

    setShowResult(true)
    setTimeout(() => {
      setShowResult(false)
      setBattlePhase('choosing')
      setOpponentAnimation('idle')
      if (onComplete) {
        onComplete(choice.result)
      }
    }, 3000)
  }

  const useSpecialMove = () => {
    if (specialCharge >= 100) {
      setShowSpecialMove(true)
      setSpecialCharge(0)
      setCulturalPower(100)
      setMascotReaction('encourage')

      // Epic special move animation
      anime.timeline()
        .add({
          targets: '.battle-screen',
          scale: [1, 1.1],
          duration: 200
        })
        .add({
          targets: '.special-move-overlay',
          opacity: [0, 1],
          scale: [0, 1],
          rotate: [0, 360],
          duration: 800,
          easing: 'easeOutExpo'
        })
        .add({
          targets: '.special-move-overlay',
          opacity: [1, 0],
          scale: [1, 2],
          duration: 400
        })

      setTimeout(() => {
        setShowSpecialMove(false)
      }, 2000)
    }
  }

  return (
    <div className="battle-screen relative min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-pink-600 p-8">
      {/* Special Move Overlay */}
      {showSpecialMove && (
        <motion.div
          className="special-move-overlay fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-6xl font-bold text-white impact-text animate-pulse">
            CULTURAL POWER!
            <div className="text-4xl mt-2">文化の力！</div>
          </div>
        </motion.div>
      )}

      {/* Opponent Section */}
      <motion.div
        className="opponent-section mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="opponent-character inline-block"
            animate={{
              x: opponentAnimation === 'attack' ? [0, -20, 0] : 0,
              scale: opponentAnimation === 'hit' ? [1, 0.9, 1] : 1,
              rotate: opponentAnimation === 'react' ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl mb-4">
              {scenario?.opponent?.emoji || '🏮'}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {scenario?.opponent?.name || 'Cultural Challenge'}
            </h2>
          </motion.div>

          {/* Opponent Dialogue */}
          <AnimatePresence>
            {battlePhase === 'setup' && (
              <motion.div
                className="dialogue-box mt-4 max-w-2xl mx-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <p className="text-white text-lg">
                  {scenario?.setup || "Let's test your cultural knowledge!"}
                </p>
                {scenario?.culturalContext && (
                  <p className="text-yellow-300 text-sm mt-2">
                    💡 {scenario.culturalContext}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Battle Interface */}
      <div className="battle-interface max-w-4xl mx-auto">
        {/* Power Gauges */}
        <div className="gauges-section mb-8 space-y-4">
          {/* Cultural Power Bar */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={24} />
              <div className="flex-1">
                <div className="power-gauge">
                  <div className="power-gauge-fill" style={{ width: `${culturalPower}%` }}>
                    <div className="text-white text-sm font-bold px-2">
                      Cultural Power: {culturalPower}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Special Move Gauge */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-400" size={24} />
              <div className="flex-1">
                <div className="power-gauge special-gauge">
                  <div
                    className={`power-gauge-fill special-gauge-fill ${specialCharge >= 100 ? 'special-move-ready' : ''}`}
                    style={{ width: `${specialCharge}%`, background: 'linear-gradient(90deg, #9370DB, #FFD700)' }}
                  >
                    <div className="text-white text-sm font-bold px-2">
                      Special: {specialCharge}%
                    </div>
                  </div>
                </div>
              </div>
              {specialCharge >= 100 && (
                <motion.button
                  className="anime-button pulse-button px-4 py-2 text-sm"
                  onClick={useSpecialMove}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  USE SPECIAL!
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Combo Counter */}
        {comboCount > 0 && (
          <motion.div
            className="combo-section text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="combo-counter inline-block">
              {comboCount} HIT COMBO!
              {comboCount >= 3 && <span className="ml-2">🔥</span>}
              {comboCount >= 5 && <span className="ml-1">⚡</span>}
              {comboCount >= 10 && <span className="ml-1">💫</span>}
            </div>
          </motion.div>
        )}

        {/* Choice Buttons */}
        <div className="choices-section">
          <h3 className="text-xl font-bold text-white text-center mb-4">
            What do you do?
          </h3>
          <div className="grid gap-4 max-w-2xl mx-auto">
            {scenario?.choices?.map((choice, index) => (
              <motion.button
                key={index}
                className={`choice-button relative p-4 text-left rounded-xl transition-all ${
                  selectedChoice === index
                    ? choice.result === 'perfect'
                      ? 'bg-green-500 text-white'
                      : choice.result === 'good'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur'
                }`}
                onClick={() => handleChoice(choice, index)}
                disabled={battlePhase === 'result'}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{choice.text}</span>
                  {selectedChoice === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-4"
                    >
                      {choice.result === 'perfect' ? '✅' :
                       choice.result === 'good' ? '👍' : '❌'}
                    </motion.div>
                  )}
                </div>

                {/* Result Feedback */}
                <AnimatePresence>
                  {selectedChoice === index && showResult && (
                    <motion.div
                      className="mt-3 pt-3 border-t border-white/30"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="text-sm">{choice.feedback}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-bold">
                          {choice.culturalPower > 0 ? '+' : ''}{choice.culturalPower} Power
                        </span>
                        {choice.combo && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">
                            COMBO!
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mascot Helper */}
        <div className="mascot-helper fixed bottom-8 right-8 z-30">
          <AsahiMascot
            animation={battlePhase === 'result' ? 'celebrate' : 'think'}
            reaction={mascotReaction}
            dialogue={scenario?.mascotHint}
            size="medium"
          />
        </div>
      </div>

      {/* Battle Effects Container */}
      <div className="battle-effects fixed inset-0 pointer-events-none z-40">
        {/* Add particle effects on success */}
        {showResult && selectedChoice !== null && scenario?.choices[selectedChoice]?.result === 'perfect' && (
          <motion.div
            className="success-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -100],
                  opacity: [1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.05
                }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CulturalBattle