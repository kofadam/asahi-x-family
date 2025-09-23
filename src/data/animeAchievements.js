// Anime-inspired achievements for Japanese learning
export const animeAchievements = {
  katakana: [
    {
      id: 'first_vowel',
      name: 'Hiragana Hero',
      description: 'Master your first katakana vowel',
      emoji: '🌸',
      animeRef: 'Like learning your first jutsu!'
    },
    {
      id: 'vowel_master',
      name: 'Vowel Village Chief',
      description: 'Master all 5 katakana vowels',
      emoji: '👑',
      animeRef: 'You\'ve unlocked the basics like a true shounen protagonist!'
    },
    {
      id: 'k_sounds',
      name: 'K-Sound Sensei',
      description: 'Master the K-series katakana',
      emoji: '⚔️',
      animeRef: 'Your katakana skills are getting sharper!'
    },
    {
      id: 'first_word',
      name: 'Word Wizard',
      description: 'Read your first complete katakana word',
      emoji: '🎭',
      animeRef: 'From single characters to full words - power up!'
    },
    {
      id: 'anime_word',
      name: 'Otaku Pride',
      description: 'Successfully read "アニメ" (anime)',
      emoji: '🎌',
      animeRef: 'You can now read the word that brought you here!'
    }
  ],

  speaking: [
    {
      id: 'first_greeting',
      name: 'Greeting Guardian',
      description: 'Learn your first Japanese greeting',
      emoji: '🙋',
      animeRef: 'Ready to greet NPCs in your Japan adventure!'
    },
    {
      id: 'polite_master',
      name: 'Politeness Paladin',
      description: 'Master both casual and polite greetings',
      emoji: '🎩',
      animeRef: 'You understand the power of proper respect levels!'
    },
    {
      id: 'arigatou',
      name: 'Gratitude Guru',
      description: 'Master saying thank you in Japanese',
      emoji: '🙏',
      animeRef: 'Your appreciation knows no language barriers!'
    }
  ],

  streaks: [
    {
      id: 'streak_3',
      name: 'Training Arc Begins',
      description: '3-day learning streak',
      emoji: '🔥',
      animeRef: 'Every hero needs consistent training!'
    },
    {
      id: 'streak_7',
      name: 'Weekly Warrior',
      description: '7-day learning streak',
      emoji: '⚡',
      animeRef: 'One week of dedication - you\'re getting stronger!'
    },
    {
      id: 'streak_30',
      name: 'Monthly Master',
      description: '30-day learning streak',
      emoji: '🌟',
      animeRef: 'A month of training! You\'ve reached a new level!'
    },
    {
      id: 'streak_100',
      name: 'Century Sensei',
      description: '100-day learning streak',
      emoji: '💯',
      animeRef: 'Legendary dedication! You\'re in the anime hall of fame!'
    }
  ],

  special: [
    {
      id: 'akihabara_ready',
      name: 'Akihabara Ready',
      description: 'Read all basic anime-related katakana words',
      emoji: '🏙️',
      animeRef: 'Ready to navigate Tokyo\'s anime paradise!'
    },
    {
      id: 'otaku_scholar',
      name: 'Otaku Scholar',
      description: 'Complete all pronunciation lessons',
      emoji: '🎓',
      animeRef: 'You\'ve mastered the basics - time for your Japan quest!'
    },
    {
      id: 'anime_ambassador',
      name: 'Anime Ambassador',
      description: 'Help spread the joy of Japanese learning',
      emoji: '🌍',
      animeRef: 'Like a true anime protagonist, you inspire others!'
    }
  ]
}

// Get achievement by ID
export const getAchievementById = (id) => {
  for (const category of Object.values(animeAchievements)) {
    const achievement = category.find(a => a.id === id)
    if (achievement) return achievement
  }
  return null
}

// Check if user qualifies for achievements
export const checkAnimeAchievements = (userProgress, lessonId) => {
  const newAchievements = []

  // Katakana achievements
  if (lessonId === 'lesson-001') {
    newAchievements.push('vowel_master')
  }
  if (lessonId === 'lesson-002') {
    newAchievements.push('k_sounds')
  }
  if (lessonId === 'lesson-003') {
    newAchievements.push('first_word', 'anime_word')
  }

  // Speaking achievements
  if (lessonId === 'lesson-005') {
    newAchievements.push('first_greeting', 'polite_master', 'arigatou')
  }

  return newAchievements
}