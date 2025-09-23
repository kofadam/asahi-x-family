import React, { createContext, useContext, useState, useEffect } from 'react'
import { getStoredUser, saveUser, getStoredProgress, saveProgress } from '../utils/storage'
import { calculateStreak, checkStreakMaintained } from '../utils/streakSystem'
import { getReviewItems } from '../utils/spacedRepetition'

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

  // Update user
  const updateUser = async (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    await saveUser(updatedUser)
    return updatedUser
  }

  // Update progress
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
    setProgress(updatedProgress)
    await saveProgress(updatedProgress)

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

  const value = {
    user: user ? { ...user, pendingReviews } : null,
    progress,
    isLoading,
    updateUser,
    updateProgress,
    recordActivity,
    unlockAchievement,
    pendingReviews
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}