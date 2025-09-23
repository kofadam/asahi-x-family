// Anime-inspired achievement system with Japanese terminology
export const achievements = {
  // Streak achievements - 連続記録 (renzoku kiroku)
  'otaku-dedication-1': {
    id: 'otaku-dedication-1',
    title: '🔥 Dedicated Otaku',
    titleJapanese: '真面目なオタク',
    description: 'Complete lessons for 3 consecutive days',
    type: 'streak',
    requirement: { streakCount: 3 },
    xpReward: 150,
    celebration: "Sugoi! Your dedication is showing! 頑張って！ 🌸"
  },
  'otaku-dedication-7': {
    id: 'otaku-dedication-7',
    title: '🌸 Weekly Warrior',
    titleJapanese: '週間戦士',
    description: 'Maintain a 7-day learning streak',
    type: 'streak',
    requirement: { streakCount: 7 },
    xpReward: 300,
    celebration: "Yatta! You're like a main character! やった！ 🎌"
  },
  'otaku-dedication-30': {
    id: 'otaku-dedication-30',
    title: '👑 Legendary Senpai',
    titleJapanese: '伝説の先輩',
    description: 'Study for 30 consecutive days',
    type: 'streak',
    requirement: { streakCount: 30 },
    xpReward: 1000,
    celebration: "Incredible! You're a true anime protagonist! 素晴らしい！ ✨"
  },

  // Lesson completion achievements - レッスン達成 (ressun tassei)
  'first-lesson': {
    id: 'first-lesson',
    title: '📚 Hajimari - First Steps',
    titleJapanese: '始まり',
    description: 'Complete your first lesson',
    type: 'lesson',
    requirement: { lessonsCompleted: 1 },
    xpReward: 100,
    celebration: "Your Japanese journey begins! はじまり！ 🌅"
  },
  'katakana-novice': {
    id: 'katakana-novice',
    title: '🌱 Katakana Kouhai',
    titleJapanese: 'カタカナ後輩',
    description: 'Complete 3 katakana lessons',
    type: 'lesson',
    requirement: { lessonsCompleted: 3 },
    xpReward: 250,
    celebration: "You're reading like an anime character! かっこいい！ 🎭"
  },
  'katakana-master': {
    id: 'katakana-master',
    title: '🎌 Katakana Sensei',
    titleJapanese: 'カタカナ先生',
    description: 'Complete all katakana lessons',
    type: 'lesson',
    requirement: { lessonsCompleted: 6 },
    xpReward: 500,
    celebration: "You've mastered katakana! Now you can read anime titles! 素晴らしい！ 🏆"
  },

  // XP achievements - 経験値 (keiken-chi)
  'xp-collector-500': {
    id: 'xp-collector-500',
    title: '⚡ Rising Hero',
    titleJapanese: '新星ヒーロー',
    description: 'Earn 500 experience points',
    type: 'mastery',
    requirement: { totalXP: 500 },
    xpReward: 200,
    celebration: "Your power level is increasing! パワーアップ！ ⚡"
  },
  'xp-collector-1000': {
    id: 'xp-collector-1000',
    title: '🌟 Elite Student',
    titleJapanese: 'エリート学生',
    description: 'Reach 1000 experience points',
    type: 'mastery',
    requirement: { totalXP: 1000 },
    xpReward: 300,
    celebration: "You're becoming unstoppable! 止められない！ 🚀"
  },
  'xp-collector-2500': {
    id: 'xp-collector-2500',
    title: '🏆 Otaku Legend',
    titleJapanese: 'オタク伝説',
    description: 'Accumulate 2500 experience points',
    type: 'mastery',
    requirement: { totalXP: 2500 },
    xpReward: 500,
    celebration: "Legendary status achieved! You're the main character now! 主人公！ 👑"
  },

  // Level achievements - レベル (reberu)
  'level-up-5': {
    id: 'level-up-5',
    title: '🌸 Beginner Graduate',
    titleJapanese: '初心者卒業',
    description: 'Reach level 5',
    type: 'mastery',
    requirement: { level: 5 },
    xpReward: 250,
    celebration: "You've graduated from newbie status! 卒業おめでとう！ 🎓"
  },
  'level-up-10': {
    id: 'level-up-10',
    title: '🌺 Intermediate Otaku',
    titleJapanese: '中級オタク',
    description: 'Reach level 10',
    type: 'mastery',
    requirement: { level: 10 },
    xpReward: 400,
    celebration: "Intermediate skills unlocked! 中級者になった！ 🔓"
  },
  'level-up-15': {
    id: 'level-up-15',
    title: '👘 Advanced Senpai',
    titleJapanese: '上級先輩',
    description: 'Reach level 15',
    type: 'mastery',
    requirement: { level: 15 },
    xpReward: 600,
    celebration: "Senpai status achieved! Everyone looks up to you! 先輩！ 🙇"
  },

  // Special achievements - 特別達成 (tokubetsu tassei)
  'anime-reader': {
    id: 'anime-reader',
    title: '📺 Anime Title Reader',
    titleJapanese: 'アニメタイトル読者',
    description: 'Successfully read 5 anime titles in katakana',
    type: 'special',
    requirement: { animeWordsRead: 5 },
    xpReward: 300,
    celebration: "Now you can read anime titles like a pro! アニメマスター！ 📺"
  },
  'perfect-score': {
    id: 'perfect-score',
    title: '💯 Perfectionist',
    titleJapanese: '完璧主義者',
    description: 'Get 100% accuracy on any lesson',
    type: 'special',
    requirement: { perfectAccuracy: true },
    xpReward: 200,
    celebration: "Perfect score! Your precision is incredible! 完璧！ ✨"
  },
  'speed-demon': {
    id: 'speed-demon',
    title: '🏃 Lightning Reader',
    titleJapanese: '稲妻読者',
    description: 'Complete a speed drill in under 15 seconds',
    type: 'special',
    requirement: { speedDrillTime: 15 },
    xpReward: 250,
    celebration: "Incredible speed! You're reading at light speed! 光速！ ⚡"
  },
  'culture-explorer': {
    id: 'culture-explorer',
    title: '🗾 Culture Explorer',
    titleJapanese: '文化探検家',
    description: 'Complete all scenario practices',
    type: 'practice',
    requirement: { scenariosCompleted: 4 },
    xpReward: 400,
    celebration: "You understand Japanese culture like a local! 文化マスター！ 🏮"
  },
  'complete-module': {
    id: 'complete-module',
    title: '🎯 Module Master',
    titleJapanese: 'モジュールマスター',
    description: 'Complete the full bowing etiquette module',
    type: 'practice',
    requirement: { modulesCompleted: 1 },
    xpReward: 500,
    celebration: "You've mastered the complete learning experience! 完全制覇！ 🏆"
  }
}

// Helper functions for achievement checking
export const checkAchievements = (user, progress) => {
  const newAchievements = []
  const userAchievements = user?.achievements || []

  Object.values(achievements).forEach(achievement => {
    if (userAchievements.includes(achievement.id)) return

    let earned = false
    const req = achievement.requirement

    // Check different types of requirements
    if (req.streakCount && user?.streakCount >= req.streakCount) earned = true
    if (req.totalXP && user?.totalXP >= req.totalXP) earned = true
    if (req.level && user?.level >= req.level) earned = true
    if (req.lessonsCompleted && progress?.totalLessonsCompleted >= req.lessonsCompleted) earned = true
    if (req.scenariosCompleted && progress?.totalScenariosCompleted >= req.scenariosCompleted) earned = true
    if (req.modulesCompleted && progress?.totalModulesCompleted >= req.modulesCompleted) earned = true

    // Special requirements
    if (req.perfectAccuracy && progress?.hasPerfecrScore) earned = true
    if (req.speedDrillTime && progress?.bestSpeedDrillTime <= req.speedDrillTime) earned = true
    if (req.animeWordsRead && progress?.animeWordsRead >= req.animeWordsRead) earned = true

    if (earned) {
      newAchievements.push(achievement)
    }
  })

  return newAchievements
}

export const getAchievementById = (id) => {
  return achievements[id]
}

export const getAchievementsByType = (type) => {
  return Object.values(achievements).filter(achievement => achievement.type === type)
}

export const calculateAchievementProgress = (achievement, user, progress) => {
  const req = achievement.requirement
  let current = 0
  let target = 0

  if (req.streakCount) {
    current = user?.streakCount || 0
    target = req.streakCount
  } else if (req.totalXP) {
    current = user?.totalXP || 0
    target = req.totalXP
  } else if (req.level) {
    current = user?.level || 1
    target = req.level
  } else if (req.lessonsCompleted) {
    current = progress?.totalLessonsCompleted || 0
    target = req.lessonsCompleted
  } else if (req.scenariosCompleted) {
    current = progress?.totalScenariosCompleted || 0
    target = req.scenariosCompleted
  }

  return {
    current,
    target,
    percentage: Math.min(100, (current / target) * 100),
    completed: current >= target
  }
}