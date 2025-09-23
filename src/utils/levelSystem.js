// Anime-inspired leveling system
export const calculateLevel = (totalXP) => {
  if (totalXP < 100) return 1
  if (totalXP < 300) return 2
  if (totalXP < 600) return 3
  if (totalXP < 1000) return 4
  if (totalXP < 1500) return 5
  if (totalXP < 2200) return 6
  if (totalXP < 3000) return 7
  if (totalXP < 4000) return 8
  if (totalXP < 5200) return 9
  if (totalXP < 6600) return 10
  if (totalXP < 8200) return 11
  if (totalXP < 10000) return 12
  if (totalXP < 12000) return 13
  if (totalXP < 14500) return 14
  if (totalXP < 17500) return 15
  if (totalXP < 21000) return 16
  if (totalXP < 25000) return 17
  if (totalXP < 30000) return 18
  if (totalXP < 36000) return 19
  return 20 // Max level
}

export const getXPForLevel = (level) => {
  const xpRequirements = [
    0,    // Level 1
    100,  // Level 2
    300,  // Level 3
    600,  // Level 4
    1000, // Level 5
    1500, // Level 6
    2200, // Level 7
    3000, // Level 8
    4000, // Level 9
    5200, // Level 10
    6600, // Level 11
    8200, // Level 12
    10000, // Level 13
    12000, // Level 14
    14500, // Level 15
    17500, // Level 16
    21000, // Level 17
    25000, // Level 18
    30000, // Level 19
    36000  // Level 20
  ]

  return xpRequirements[level - 1] || 0
}

export const getXPProgressForCurrentLevel = (totalXP) => {
  const currentLevel = calculateLevel(totalXP)
  const currentLevelXP = getXPForLevel(currentLevel)
  const nextLevelXP = getXPForLevel(currentLevel + 1)

  if (currentLevel >= 20) {
    return {
      currentLevel,
      currentLevelXP: totalXP - currentLevelXP,
      nextLevelXP: 0,
      progressPercentage: 100,
      isMaxLevel: true
    }
  }

  const progressXP = totalXP - currentLevelXP
  const neededXP = nextLevelXP - currentLevelXP
  const progressPercentage = (progressXP / neededXP) * 100

  return {
    currentLevel,
    currentLevelXP: progressXP,
    nextLevelXP: neededXP,
    progressPercentage: Math.min(100, progressPercentage),
    isMaxLevel: false
  }
}

export const getLevelTitle = (level) => {
  if (level === 1) return "新人 Newbie"
  if (level <= 3) return "学生 Student"
  if (level <= 5) return "初心者 Beginner"
  if (level <= 8) return "中級者 Intermediate"
  if (level <= 12) return "上級者 Advanced"
  if (level <= 15) return "先輩 Senpai"
  if (level <= 18) return "先生 Sensei"
  return "伝説 Legend"
}

export const checkLevelUp = (oldXP, newXP) => {
  const oldLevel = calculateLevel(oldXP)
  const newLevel = calculateLevel(newXP)

  return {
    leveledUp: newLevel > oldLevel,
    oldLevel,
    newLevel,
    levelsGained: newLevel - oldLevel
  }
}