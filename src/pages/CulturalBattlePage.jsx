import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CulturalBattle from '../components/battle/CulturalBattle'
import ParticleBackground from '../components/effects/ParticleBackground'
import { useApp } from '../contexts/AppContext'

const CulturalBattlePage = () => {
  const { scenarioId } = useParams()
  const navigate = useNavigate()
  const { updateUser, user } = useApp()
  const [battleComplete, setBattleComplete] = useState(false)
  const [totalScore, setTotalScore] = useState(0)

  // Scenario data - in production this would come from a data file
  const scenarios = {
    'crowded-train': {
      id: 'crowded-train',
      title: 'The Crowded Train',
      opponent: {
        name: 'Rush Hour Challenge',
        emoji: '🚃'
      },
      setup: "It's rush hour on the Yamanote Line. Someone's backpack is hitting other passengers. What do you do?",
      culturalContext: 'Japanese trains require extreme spatial awareness and quiet consideration.',
      choices: [
        {
          text: 'Loudly tell them their bag is in the way',
          result: 'mistake',
          feedback: 'Too direct! This breaks the wa (harmony) and embarrasses everyone.',
          culturalPower: -20
        },
        {
          text: 'Gently tap their shoulder and gesture to their bag',
          result: 'perfect',
          feedback: 'Perfect! Subtle, respectful, and effective. You maintained harmony.',
          culturalPower: 50,
          combo: true
        },
        {
          text: 'Say nothing but move away annoyed',
          result: 'good',
          feedback: 'Avoiding conflict is good, but helping would be better.',
          culturalPower: 20
        },
        {
          text: 'Make eye contact and point at their bag',
          result: 'good',
          feedback: 'Non-verbal communication works, though a gentle tap might be clearer.',
          culturalPower: 30,
          combo: true
        }
      ],
      mascotHint: "Sometimes silence and subtle gestures speak louder than words..."
    },
    'konbini': {
      id: 'konbini',
      title: 'Convenience Store Encounter',
      opponent: {
        name: 'Konbini Protocol',
        emoji: '🏪'
      },
      setup: "You're buying items at 7-Eleven. The staff greets you formally. How do you respond?",
      culturalContext: 'Konbini staff use keigo (formal language). Customers should be polite but brief.',
      choices: [
        {
          text: 'Silent transaction with a slight bow at the end',
          result: 'perfect',
          feedback: 'Excellent! Respectful, efficient, and appropriate.',
          culturalPower: 50,
          combo: true
        },
        {
          text: 'Chat about the weather while they scan',
          result: 'mistake',
          feedback: 'Staff are working efficiently. Keep interactions brief!',
          culturalPower: -10
        },
        {
          text: 'Say "Arigatou gozaimasu" and bow deeply',
          result: 'good',
          feedback: 'Polite, though a deep bow might be excessive for konbini.',
          culturalPower: 30
        },
        {
          text: 'Smile and nod without speaking',
          result: 'good',
          feedback: 'Friendly and appropriate. A slight bow would perfect it.',
          culturalPower: 35,
          combo: true
        }
      ],
      mascotHint: "Konbini interactions are like a dance - smooth, quick, and respectful!"
    },
    'restaurant-entry': {
      id: 'restaurant-entry',
      title: 'Restaurant Entry',
      opponent: {
        name: 'Dining Etiquette Master',
        emoji: '🍱'
      },
      setup: "You enter a traditional restaurant. There's a small step up and shoes at the entrance. What's the proper sequence?",
      culturalContext: 'Traditional restaurants often have genkan (entryway) where shoes must be removed.',
      choices: [
        {
          text: 'Walk in with shoes and look for a table',
          result: 'mistake',
          feedback: 'Major mistake! Never wear shoes past the genkan!',
          culturalPower: -30
        },
        {
          text: 'Remove shoes, step up backwards, arrange shoes neatly pointing out',
          result: 'perfect',
          feedback: 'Perfect! You know the complete proper etiquette.',
          culturalPower: 50,
          combo: true
        },
        {
          text: 'Take off shoes and leave them randomly',
          result: 'good',
          feedback: 'You removed shoes correctly, but arrangement matters too.',
          culturalPower: 25
        },
        {
          text: 'Watch what others do first',
          result: 'good',
          feedback: 'Smart strategy! Observation is a valuable cultural skill.',
          culturalPower: 35,
          combo: true
        }
      ],
      mascotHint: "The genkan is sacred - treat it with respect! Your shoes tell a story..."
    }
  }

  const currentScenario = scenarios[scenarioId] || scenarios['crowded-train']

  const handleBattleComplete = async (result) => {
    const xpGained = result === 'perfect' ? 50 : result === 'good' ? 30 : 10
    setTotalScore(prev => prev + xpGained)

    // Update user XP
    if (user) {
      await updateUser({
        totalXP: (user.totalXP || 0) + xpGained
      })
    }

    // Mark battle as complete after all choices
    setTimeout(() => {
      setBattleComplete(true)
    }, 1000)
  }

  const handleContinue = () => {
    navigate('/adventure')
  }

  const handleRetry = () => {
    setBattleComplete(false)
    setTotalScore(0)
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground type="firefly" count={15} />

      {!battleComplete ? (
        <CulturalBattle
          scenario={currentScenario}
          onComplete={handleBattleComplete}
        />
      ) : (
        <motion.div
          className="battle-complete flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-pink-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <div className="text-8xl mb-4">
                {totalScore >= 150 ? '🏆' : totalScore >= 100 ? '⭐' : '👍'}
              </div>
            </motion.div>

            <motion.h2
              className="text-4xl font-bold text-white mb-4 impact-text"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Battle Complete!
            </motion.h2>

            <motion.div
              className="text-2xl text-yellow-300 mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              +{totalScore} XP Earned!
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={handleContinue}
                className="anime-button px-8 py-3 text-lg"
              >
                Continue Adventure
              </button>

              <button
                onClick={handleRetry}
                className="block mx-auto text-white underline hover:text-yellow-300"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CulturalBattlePage