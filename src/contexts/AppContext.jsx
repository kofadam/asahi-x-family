import React, { createContext, useContext, useState, useEffect } from 'react'
import { getStoredUser, saveUser, getStoredProgress, saveProgress } from '../utils/storage'
import { calculateStreak, checkStreakMaintained } from '../utils/streakSystem'
import { getReviewItems } from '../utils/spacedRepetition'
import { checkAchievements } from '../data/achievements'
import { calculateLevel, checkLevelUp } from '../utils/levelSystem'

const AppContext = createContext(null)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingReviews, setPendingReviews] = useState(0)
  const [achievementNotification, setAchievementNotification] = useState(null)

  // Initialize user and progress from localStorage
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const storedUser = await getStoredUser()
        const storedProgress = await getStoredProgress()

        if (storedUser) {
          // Update streak based on last activity
          const updatedStreak = checkStreakMaintained(storedUser.lastActivityDate)
          const updatedUser = {
            ...storedUser,
            streakCount: updatedStreak.streakCount,
            lastActivityDate: updatedStreak.isActive ? new Date().toISOString() : storedUser.lastActivityDate
          }
          setUser(updatedUser)
          await saveUser(updatedUser)
        } else {
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            name: '',
            streakCount: 0,
            totalXP: 0,
            level: 1,
            lastActivityDate: null,
            createdAt: new Date().toISOString(),
            achievements: [],
            preferences: {
              dailyGoal: 15, // minutes
              notificationsEnabled: false,
              theme: 'auto'
            }
          }
          setUser(newUser)
          await saveUser(newUser)
        }

        if (storedProgress) {
          setProgress(storedProgress)
          // Calculate pending reviews
          const reviews = await getReviewItems(storedProgress)
          setPendingReviews(reviews.length)
        } else {
          // Initialize empty progress
          const newProgress = {
            lessons: {},
            scenarios: {},
            totalLessonsCompleted: 0,
            totalScenariosCompleted: 0,
            culturalCompetencyScore: 0,
            lastUpdated: new Date().toISOString()
          }
          setProgress(newProgress)
          await saveProgress(newProgress)
        }
      } catch (error) {
        console.error('Error initializing app:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  // Update user and check for new achievements and level-ups
  const updateUser = async (updates) => {
    const oldXP = user?.totalXP || 0
    const updatedUser = { ...user, ...updates }

    // Calculate level based on XP
    if (updatedUser.totalXP !== undefined) {
      updatedUser.level = calculateLevel(updatedUser.totalXP)
    }

    setUser(updatedUser)
    await saveUser(updatedUser)

    // Check for level-up
    const levelUpResult = checkLevelUp(oldXP, updatedUser.totalXP || 0)
    if (levelUpResult.leveledUp) {
      // Create level-up notification (similar to achievement)
      const levelUpNotification = {
        id: `level-up-${levelUpResult.newLevel}`,
        title: `🎉 Level Up! レベルアップ！`,
        description: `You reached level ${levelUpResult.newLevel}!`,
        type: 'special',
        xpReward: 0,
        celebration: `Congratulations! You're now level ${levelUpResult.newLevel}! おめでとう！ 🎊`
      }
      setAchievementNotification(levelUpNotification)
    }

    // Check for new achievements
    const newAchievements = checkAchievements(updatedUser, progress)
    if (newAchievements.length > 0 && !levelUpResult.leveledUp) {
      // Show the first new achievement (only if no level-up to avoid notification spam)
      setAchievementNotification(newAchievements[0])

      // Add all new achievements to user's achievement list
      const allNewAchievementIds = newAchievements.map(a => a.id)
      const updatedUserWithAchievements = {
        ...updatedUser,
        achievements: [...(updatedUser.achievements || []), ...allNewAchievementIds],
        totalXP: (updatedUser.totalXP || 0) + newAchievements.reduce((sum, a) => sum + (a.xpReward || 0), 0)
      }
      setUser(updatedUserWithAchievements)
      await saveUser(updatedUserWithAchievements)
      return updatedUserWithAchievements
    }

    return updatedUser
  }

  // Update progress and check for achievements
  const updateProgress = async (lessonId, data) => {
    const updatedProgress = {
      ...progress,
      lessons: {
        ...progress.lessons,
        [lessonId]: {
          ...progress.lessons[lessonId],
          ...data,
          lastReviewed: new Date().toISOString()
        }
      },
      lastUpdated: new Date().toISOString()
    }

    // Update lesson completion count if this is a new completion
    if (data.completed && !progress?.lessons?.[lessonId]?.completed) {
      updatedProgress.totalLessonsCompleted = (progress?.totalLessonsCompleted || 0) + 1
    }

    // Track perfect scores
    if (data.accuracyScore === 100) {
      updatedProgress.hasPerfecrScore = true
    }

    // Track speed drill times
    if (data.speedDrillTime) {
      updatedProgress.bestSpeedDrillTime = Math.min(
        updatedProgress.bestSpeedDrillTime || Infinity,
        data.speedDrillTime
      )
    }

    setProgress(updatedProgress)
    await saveProgress(updatedProgress)

    // Check for progress-based achievements
    const newAchievements = checkAchievements(user, updatedProgress)
    if (newAchievements.length > 0) {
      // Show the first new achievement
      setAchievementNotification(newAchievements[0])

      // Update user with new achievements and XP
      const allNewAchievementIds = newAchievements.map(a => a.id)
      const updatedUserWithAchievements = {
        ...user,
        achievements: [...(user?.achievements || []), ...allNewAchievementIds],
        totalXP: (user?.totalXP || 0) + newAchievements.reduce((sum, a) => sum + (a.xpReward || 0), 0)
      }
      setUser(updatedUserWithAchievements)
      await saveUser(updatedUserWithAchievements)
    }

    // Recalculate pending reviews
    const reviews = await getReviewItems(updatedProgress)
    setPendingReviews(reviews.length)

    return updatedProgress
  }

  // Record daily activity for streak
  const recordActivity = async () => {
    const today = new Date().toISOString().split('T')[0]
    const lastActivity = user?.lastActivityDate?.split('T')[0]

    if (today !== lastActivity) {
      const streakData = calculateStreak(user?.streakCount || 0, user?.lastActivityDate)
      await updateUser({
        streakCount: streakData.newStreak,
        lastActivityDate: new Date().toISOString()
      })
    }
  }

  // Add achievement
  const unlockAchievement = async (achievementId) => {
    if (user?.achievements?.includes(achievementId)) {
      return false // Already unlocked
    }

    await updateUser({
      achievements: [...(user?.achievements || []), achievementId],
      totalXP: (user?.totalXP || 0) + 100 // Each achievement gives 100 XP
    })

    return true
  }

  // Clear achievement notification
  const clearAchievementNotification = () => {
    setAchievementNotification(null)
  }

  const value = {
    user: user ? { ...user, pendingReviews } : null,
    progress,
    isLoading,
    updateUser,
    updateProgress,
    recordActivity,
    unlockAchievement,
    pendingReviews,
    achievementNotification,
    clearAchievementNotification
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}