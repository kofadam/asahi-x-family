// Cultural Note: Streaks are important for building daily learning habits
// They provide motivation without pressure - users can maintain streaks
// even with minimal daily practice (respecting adult schedules)

export const calculateStreak = (currentStreak, lastActivityDate) => {
  if (!lastActivityDate) {
    return { newStreak: 1, isNewStreak: true }
  }

  const today = new Date()
  const lastActivity = new Date(lastActivityDate)

  // Reset time to midnight for date comparison
  today.setHours(0, 0, 0, 0)
  lastActivity.setHours(0, 0, 0, 0)

  const daysDifference = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24))

  if (daysDifference === 0) {
    // Same day - maintain streak
    return { newStreak: currentStreak, isNewStreak: false }
  } else if (daysDifference === 1) {
    // Next day - increment streak
    return { newStreak: currentStreak + 1, isNewStreak: true }
  } else {
    // Streak broken - start new one
    return { newStreak: 1, isNewStreak: true, streakBroken: true }
  }
}

export const checkStreakMaintained = (lastActivityDate) => {
  if (!lastActivityDate) {
    return { streakCount: 0, isActive: false }
  }

  const today = new Date()
  const lastActivity = new Date(lastActivityDate)

  today.setHours(0, 0, 0, 0)
  lastActivity.setHours(0, 0, 0, 0)

  const daysDifference = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24))

  if (daysDifference <= 1) {
    return { streakCount: true, isActive: true }
  } else {
    return { streakCount: 0, isActive: false }
  }
}

// Streak milestones for achievements
export const getStreakMilestone = (streakCount) => {
  const milestones = [
    { days: 3, id: 'streak_3', name: 'Getting Started', emoji: '🌱' },
    { days: 7, id: 'streak_7', name: 'Week Warrior', emoji: '🔥' },
    { days: 14, id: 'streak_14', name: 'Two Week Champion', emoji: '⚡' },
    { days: 30, id: 'streak_30', name: 'Monthly Master', emoji: '🌟' },
    { days: 60, id: 'streak_60', name: 'Dedication Sensei', emoji: '🎯' },
    { days: 100, id: 'streak_100', name: 'Century Club', emoji: '💯' },
    { days: 365, id: 'streak_365', name: 'Year of Learning', emoji: '🏆' }
  ]

  return milestones.find(m => m.days === streakCount) || null
}

// Streak protection for respectful adult learning
// Allows one "rest day" per week without breaking streak
export const hasStreakProtection = (user) => {
  const lastProtectionUsed = user?.lastStreakProtection
  if (!lastProtectionUsed) return true

  const daysSinceProtection = Math.floor(
    (new Date() - new Date(lastProtectionUsed)) / (1000 * 60 * 60 * 24)
  )

  return daysSinceProtection >= 7
}

// Calculate streak bonus XP
export const getStreakBonus = (streakCount) => {
  if (streakCount < 3) return 0
  if (streakCount < 7) return 5
  if (streakCount < 14) return 10
  if (streakCount < 30) return 15
  if (streakCount < 60) return 20
  if (streakCount < 100) return 25
  return 30
}