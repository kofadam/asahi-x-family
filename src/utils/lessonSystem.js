// Cultural Note: Lesson progression respects adult learning principles
// Unlock system encourages progress while maintaining accessibility

import { lessons } from '../data/lessons'

// Check if a lesson should be unlocked based on user progress
export const checkLessonUnlock = (lessonId, userProgress) => {
  const lesson = lessons.find(l => l.id === lessonId)
  if (!lesson) return false

  // Always unlock the first few beginner lessons
  if (lesson.unlocked) return true

  // Get lesson index for progression logic
  const lessonIndex = lessons.findIndex(l => l.id === lessonId)
  if (lessonIndex === -1) return false

  // Check if previous lesson is completed
  if (lessonIndex > 0) {
    const previousLesson = lessons[lessonIndex - 1]
    const previousProgress = userProgress?.lessons?.[previousLesson.id]
    return previousProgress?.completed === true
  }

  return false
}

// Get all lessons with current unlock status
export const getLessonsWithUnlockStatus = (userProgress) => {
  return lessons.map(lesson => ({
    ...lesson,
    unlocked: checkLessonUnlock(lesson.id, userProgress)
  }))
}

// Get next recommended lesson for user
export const getNextRecommendedLesson = (userProgress) => {
  const lessonsWithStatus = getLessonsWithUnlockStatus(userProgress)

  // First, find any unlocked but incomplete lessons
  const incompleteLesson = lessonsWithStatus.find(lesson =>
    lesson.unlocked && !userProgress?.lessons?.[lesson.id]?.completed
  )

  if (incompleteLesson) return incompleteLesson

  // If all unlocked lessons are complete, return null (all caught up)
  return null
}

// Calculate overall cultural competency score
export const calculateCulturalCompetency = (userProgress) => {
  if (!userProgress?.lessons) return 0

  const completedLessons = Object.values(userProgress.lessons).filter(l => l.completed)
  if (completedLessons.length === 0) return 0

  const totalScore = completedLessons.reduce((sum, lesson) =>
    sum + (lesson.culturalScore || 0), 0
  )

  return Math.round((totalScore / completedLessons.length) * 100)
}

// Check if user has completed enough lessons to unlock achievements
export const checkProgressAchievements = (userProgress) => {
  const achievements = []
  const completedCount = Object.values(userProgress?.lessons || {})
    .filter(l => l.completed).length

  if (completedCount >= 1) achievements.push('first_lesson')
  if (completedCount >= 3) achievements.push('three_lessons')
  if (completedCount >= 5) achievements.push('five_lessons')

  // Check for high cultural scores
  const avgScore = calculateCulturalCompetency(userProgress)
  if (avgScore >= 90) achievements.push('cultural_master')
  if (avgScore >= 80) achievements.push('cultural_adept')

  return achievements
}

// Get lesson completion statistics
export const getLessonStats = (userProgress) => {
  const totalLessons = lessons.length
  const unlockedLessons = getLessonsWithUnlockStatus(userProgress)
    .filter(l => l.unlocked).length
  const completedLessons = Object.values(userProgress?.lessons || {})
    .filter(l => l.completed).length

  return {
    total: totalLessons,
    unlocked: unlockedLessons,
    completed: completedLessons,
    progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }
}