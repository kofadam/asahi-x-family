// Japanese language learning lessons - focused on katakana reading and basic speaking
import { katakanaData, katakanaWords, generatePracticeSet } from './katakana'

export const lessons = [
  {
    id: 'lesson-001',
    title: 'Katakana Vowels (ア・イ・ウ・エ・オ)',
    difficulty: 'Beginner',
    duration: '2-3 minutes',
    focus: 'Reading katakana vowel characters',
    unlocked: true,
    description: 'Learn to read the 5 basic katakana vowels - your first step toward reading anime titles!',
    learningObjectives: [
      'Recognize and read all 5 katakana vowels',
      'Understand the pronunciation of each vowel',
      'Practice reading vowels quickly'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'Meet the Katakana Vowels',
        content: 'Katakana vowels are the building blocks of Japanese pronunciation. These 5 characters appear in every anime title and character name you\'ve seen!',
        characters: katakanaData.vowels,
        animeExamples: [
          { title: 'アニメ', romaji: 'anime', english: 'Anime', vowels: ['ア', 'イ', 'エ'], description: 'The word that started it all!' },
          { title: 'エヴァンゲリオン', romaji: 'evangerion', english: 'Evangelion', vowels: ['エ', 'ア', 'エ', 'イ', 'オ'], description: 'Classic mecha series' },
          { title: 'アタック・オン・タイタン', romaji: 'attack on titan', english: 'Attack on Titan', vowels: ['ア', 'ア', 'オ', 'ア', 'イ', 'ア'], description: 'Popular action anime' },
          { title: 'オネピース', romaji: 'one piece', english: 'One Piece', vowels: ['オ', 'エ', 'イ', 'ウ'], description: 'Epic pirate adventure' }
        ],
        tip: '🎌 Fun fact: The ア in "アニメ" (anime) is the same ア you\'re learning now!'
      },
      {
        type: 'recognition',
        title: 'Character Recognition',
        instructions: 'Click the correct romaji reading for each katakana character.',
        characters: katakanaData.vowels.slice(0, 3), // Start with first 3
        practiceType: 'multiple_choice'
      },
      {
        type: 'recognition',
        title: 'All Five Vowels',
        instructions: 'Now try all five vowel characters!',
        characters: katakanaData.vowels,
        practiceType: 'multiple_choice'
      },
      {
        type: 'speed_drill',
        title: 'Speed Reading',
        instructions: 'Read these vowels as quickly as you can!',
        characters: generatePracticeSet(['vowels'], 8),
        timeLimit: 30
      }
    ]
  },

  {
    id: 'lesson-002',
    title: 'Katakana K-Sounds (カ・キ・ク・ケ・コ)',
    difficulty: 'Beginner',
    duration: '3-4 minutes',
    focus: 'Reading katakana K-series characters',
    unlocked: true,
    description: 'Learn the K-series katakana characters and combine them with vowels.',
    learningObjectives: [
      'Read all K-series katakana characters',
      'Distinguish between similar-looking characters',
      'Practice reading K-sounds with vowels'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'Understanding Japanese Character Series',
        content: 'Japanese uses syllable-based characters, not individual letters like English! Each character represents a full syllable (consonant + vowel). The K-series follows the pattern: K + vowel sound.',
        characters: katakanaData.kSounds,
        linguisticContext: {
          title: 'Why Character Series Exist',
          explanation: 'Japanese is structured around syllables called "mora." Unlike English where "K" is just a consonant sound, Japanese combines consonants with vowels to form complete syllables.',
          examples: [
            { series: 'K-series', pattern: 'K + vowel', examples: ['カ (ka)', 'キ (ki)', 'ク (ku)', 'ケ (ke)', 'コ (ko)'] },
            { series: 'S-series', pattern: 'S + vowel', examples: ['サ (sa)', 'シ (shi)', 'ス (su)', 'セ (se)', 'ソ (so)'] },
            { series: 'T-series', pattern: 'T + vowel', examples: ['タ (ta)', 'チ (chi)', 'ツ (tsu)', 'テ (te)', 'ト (to)'] }
          ],
          funFact: 'This is why you can\'t have a standalone "K" sound in Japanese - it must be paired with a vowel!'
        },
        tip: 'Think of each character as a complete "building block" of sound, not individual letters!'
      },
      {
        type: 'recognition',
        title: 'K-Series Recognition',
        instructions: 'Match each katakana character to its romaji reading.',
        characters: katakanaData.kSounds,
        practiceType: 'multiple_choice'
      },
      {
        type: 'mixed_practice',
        title: 'Vowels + K-Sounds',
        instructions: 'Mixed practice with vowels and K-sounds.',
        characters: [...katakanaData.vowels, ...katakanaData.kSounds],
        practiceType: 'typing'
      }
    ]
  },

  {
    id: 'lesson-003',
    title: 'Anime Words: アニメ, マンガ, ヒーロー',
    difficulty: 'Beginner',
    duration: '3-5 minutes',
    focus: 'Reading anime-related katakana words',
    unlocked: false,
    description: 'Read your first anime-related Japanese words - including アニメ itself!',
    learningObjectives: [
      'Read complete katakana words',
      'Recognize loan words from English',
      'Practice word-level reading fluency'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'Your First Anime Words',
        content: 'Time to read the words that matter most to anime fans! These are the katakana words you\'ll see everywhere in Japan.',
        words: katakanaWords.beginner.slice(0, 4),
        tip: '🎯 Pro tip: You\'ll see these words on signs in Akihabara and anime shops!'
      },
      {
        type: 'word_reading',
        title: 'Word Recognition',
        instructions: 'Read these katakana words and match them to their English meaning.',
        words: katakanaWords.beginner.slice(0, 4),
        practiceType: 'matching'
      },
      {
        type: 'word_building',
        title: 'Build the Word',
        instructions: 'Type the romaji for each katakana word.',
        words: katakanaWords.beginner.slice(0, 4),
        practiceType: 'typing'
      }
    ]
  },

  {
    id: 'lesson-004',
    title: 'Katakana S-Sounds (サ・シ・ス・セ・ソ)',
    difficulty: 'Beginner',
    duration: '3-4 minutes',
    focus: 'Reading katakana S-series characters',
    unlocked: false,
    description: 'Learn the S-series katakana, including the tricky シ (shi).',
    learningObjectives: [
      'Read all S-series katakana characters',
      'Master the シ (shi) character',
      'Practice S-sounds in combination'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'The S-Series Characters',
        content: 'The S-series includes one irregular sound: シ is "shi" not "si".',
        characters: katakanaData.sSounds,
        tip: 'シ (shi) looks like a sideways smile - it\'s happy to be different!'
      },
      {
        type: 'recognition',
        title: 'S-Series Practice',
        instructions: 'Practice reading the S-series characters.',
        characters: katakanaData.sSounds,
        practiceType: 'multiple_choice'
      },
      {
        type: 'mixed_practice',
        title: 'Review: Vowels + K + S',
        instructions: 'Mixed practice with all characters learned so far.',
        characters: [...katakanaData.vowels, ...katakanaData.kSounds, ...katakanaData.sSounds],
        practiceType: 'speed_drill',
        timeLimit: 45
      }
    ]
  },

  {
    id: 'lesson-005',
    title: 'Anime Character Greetings',
    difficulty: 'Beginner',
    duration: '4-5 minutes',
    focus: 'Speaking like your favorite anime characters',
    unlocked: false,
    description: 'Learn the greetings you\'ve heard countless times in anime - now you can say them properly!',
    learningObjectives: [
      'Pronounce basic Japanese greetings correctly',
      'Understand when to use each greeting',
      'Practice natural rhythm and intonation'
    ],
    steps: [
      {
        type: 'pronunciation',
        title: 'Greetings from Your Favorite Anime',
        content: 'These are the greetings you\'ve heard in every anime! Now learn to say them like a native.',
        phrases: [
          {
            japanese: 'おはよう',
            romaji: 'ohayou',
            english: 'Good morning (casual)',
            pronunciation: 'oh-HAH-yoh',
            usage: 'Like when anime classmates greet each other 🎒',
            animeExample: 'Heard in slice-of-life anime between friends'
          },
          {
            japanese: 'おはようございます',
            romaji: 'ohayou gozaimasu',
            english: 'Good morning (polite)',
            pronunciation: 'oh-HAH-yoh goh-ZAH-ee-mahs',
            usage: 'Like when students greet their sensei 🎓',
            animeExample: 'Every school anime when students bow to teachers'
          },
          {
            japanese: 'こんにちは',
            romaji: 'konnichiwa',
            english: 'Hello/Good afternoon',
            pronunciation: 'kohn-NEE-chee-wah',
            usage: 'The universal anime greeting! 👋',
            animeExample: 'Used by every protagonist meeting new characters'
          },
          {
            japanese: 'ありがとう',
            romaji: 'arigatou',
            english: 'Thank you (casual)',
            pronunciation: 'ah-ree-GAH-toh',
            usage: 'Express gratitude like your favorite character 💝',
            animeExample: 'Said with heartfelt emotion in dramatic moments'
          }
        ]
      },
      {
        type: 'pronunciation_practice',
        title: 'Pronunciation Practice',
        instructions: 'Listen and repeat each greeting. Focus on the rhythm!',
        phrases: [
          { japanese: 'おはよう', romaji: 'ohayou', english: 'Good morning (casual)' },
          { japanese: 'こんにちは', romaji: 'konnichiwa', english: 'Hello' },
          { japanese: 'ありがとう', romaji: 'arigatou', english: 'Thank you' }
        ],
        practiceType: 'repeat_after'
      },
      {
        type: 'usage_practice',
        title: 'When to Use Each Greeting',
        instructions: 'Choose the appropriate greeting for each situation.',
        scenarios: [
          {
            situation: 'Meeting your teacher at 9 AM',
            options: ['おはよう', 'おはようございます', 'こんにちは'],
            correct: 'おはようございます',
            explanation: 'Formal morning greeting for your teacher'
          },
          {
            situation: 'Greeting a friend at 2 PM',
            options: ['おはよう', 'こんにちは', 'ありがとう'],
            correct: 'こんにちは',
            explanation: 'Afternoon greeting, appropriate for friends'
          }
        ]
      }
    ]
  },

  {
    id: 'lesson-006',
    title: 'Katakana T-Sounds (タ・チ・ツ・テ・ト)',
    difficulty: 'Beginner',
    duration: '3-4 minutes',
    focus: 'Reading katakana T-series characters',
    unlocked: false,
    description: 'Learn the T-series including the unique sounds チ (chi) and ツ (tsu).',
    learningObjectives: [
      'Read all T-series katakana characters',
      'Distinguish between チ (chi) and ツ (tsu)',
      'Practice T-sounds in words'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'The T-Series Characters',
        content: 'The T-series has two special sounds: チ (chi) and ツ (tsu).',
        characters: katakanaData.tSounds,
        tip: 'チ and ツ look similar! チ has horizontal strokes, ツ has diagonal ones.'
      },
      {
        type: 'recognition',
        title: 'T-Series Recognition',
        instructions: 'Practice reading T-series characters, especially チ and ツ!',
        characters: katakanaData.tSounds,
        practiceType: 'multiple_choice'
      },
      {
        type: 'word_reading',
        title: 'T-Sound Words',
        instructions: 'Read katakana words containing T-sounds.',
        words: [
          { katakana: 'テレビ', romaji: 'terebi', english: 'TV' },
          { katakana: 'タクシー', romaji: 'takushii', english: 'taxi' },
          { katakana: 'チーズ', romaji: 'chiizu', english: 'cheese' }
        ],
        practiceType: 'matching'
      }
    ]
  }
]

// Helper functions
export const getAvailableLessons = () => {
  return lessons.filter(lesson => lesson.unlocked)
}

export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === id)
}

export const getNextLesson = (currentLessonId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId)
  if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
    return lessons[currentIndex + 1]
  }
  return null
}

export const getLessonProgress = (userProgress) => {
  return lessons.map(lesson => ({
    ...lesson,
    completed: userProgress?.lessons?.[lesson.id]?.completed || false,
    accuracyScore: userProgress?.lessons?.[lesson.id]?.accuracyScore || 0,
    lastCompleted: userProgress?.lessons?.[lesson.id]?.lastCompleted || null
  }))
}