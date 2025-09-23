import React, { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Heart, Target, BookOpen } from 'lucide-react'

const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (achievement) {
      setIsVisible(true)
      setShouldAnimate(true)

      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setShouldAnimate(false)
        setTimeout(() => {
          setIsVisible(false)
          onClose()
        }, 300)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!isVisible || !achievement) return null

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'streak': return <Zap className="w-8 h-8" />
      case 'lesson': return <BookOpen className="w-8 h-8" />
      case 'practice': return <Target className="w-8 h-8" />
      case 'mastery': return <Trophy className="w-8 h-8" />
      case 'special': return <Heart className="w-8 h-8" />
      default: return <Star className="w-8 h-8" />
    }
  }

  const getAchievementStyle = (type) => {
    switch (type) {
      case 'streak': return 'from-yellow-400 to-orange-500'
      case 'lesson': return 'from-blue-400 to-purple-500'
      case 'practice': return 'from-green-400 to-teal-500'
      case 'mastery': return 'from-purple-400 to-pink-500'
      case 'special': return 'from-pink-400 to-red-500'
      default: return 'from-yellow-400 to-orange-500'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 pointer-events-none">
      <div className={`
        transform transition-all duration-300 ease-out
        ${shouldAnimate ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
      `}>
        {/* Main notification card */}
        <div className={`
          bg-gradient-to-r ${getAchievementStyle(achievement.type)}
          text-white rounded-xl p-6 max-w-sm shadow-2xl
          border-2 border-white/30 backdrop-blur-sm
          pointer-events-auto cursor-pointer
          hover:scale-105 transition-transform duration-200
        `} onClick={() => {
          setShouldAnimate(false)
          setTimeout(() => {
            setIsVisible(false)
            onClose()
          }, 300)
        }}>
          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 text-yellow-300 animate-pulse">
            ✨
          </div>
          <div className="absolute -bottom-1 -left-1 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }}>
            ⭐
          </div>

          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="flex-shrink-0 p-3 bg-white/20 rounded-full">
              {getAchievementIcon(achievement.type)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="text-sm font-medium text-white/90 mb-1">
                🎉 Achievement Unlocked! やった！
              </div>
              <div className="text-lg font-bold mb-1">
                {achievement.title}
              </div>
              <div className="text-sm text-white/80">
                {achievement.description}
              </div>
              {achievement.xpReward && (
                <div className="text-xs text-yellow-200 mt-2 font-medium">
                  +{achievement.xpReward} XP! ⚡
                </div>
              )}
            </div>
          </div>

          {/* Bottom encouragement */}
          <div className="mt-3 pt-3 border-t border-white/20 text-center">
            <div className="text-sm font-medium text-white">
              {achievement.celebration || "Sugoi! Keep going! がんばって！ 💪"}
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute text-yellow-300 text-sm animate-ping
                ${i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}
              `}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              {['✨', '⭐', '🌟', '💫', '🎉', '🎊'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AchievementNotification