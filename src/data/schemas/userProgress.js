// src/data/schemas/userProgress.js
export const UserProgressSchema = {
  user: {
    id: String, // Generated UUID
    createdAt: Date,
    preferences: {
      studyTime: Number, // Minutes per day
      culturalTheme: String, // 'traditional' | 'modern' | 'anime'
      notifications: Boolean,
      shareProgress: Boolean, // Family sharing option
      difficultyLevel: String // 'beginner' | 'adaptive' | 'advanced'
    }
  },
  
  progress: {
    currentModule: String,
    completedLessons: {
      [lessonId]: {
        completedAt: Date,
        culturalScore: Number, // 0-1 scale
        linguisticScore: Number, // 0-1 scale
        timeSpent: Number, // Minutes
        attemptsCount: Number,
        masteryLevel: String // 'learning' | 'practicing' | 'mastered'
      }
    },
    
    culturalCompetency: {
      respectfulInteraction: Number, // 0-1 scale
      situationalAwareness: Number,
      politenessLevels: Number,
      mistakeRecovery: Number,
      overallRating: Number
    },
    
    achievements: {
      earned: [
        {
          id: String,
          earnedAt: Date,
          category: String,
          culturalSignificance: String
        }
      ],
      inProgress: [
        {
          id: String,
          progress: Number, // 0-1 scale
          requirements: Object
        }
      ]
    },
    
    streakData: {
      current: Number,
      longest: Number,
      lastStudyDate: Date,
      freezesUsed: Number,
      freezesAvailable: Number,
      history: [
        {
          date: Date,
          completed: Boolean,
          protected: Boolean,
          reason: String // 'study' | 'freeze' | 'travel-mode'
        }
      ]
    }
  },
  
  spacedRepetition: {
    items: [
      {
        id: String,
        type: String, // 'cultural-scenario' | 'katakana' | 'phrase'
        content: Object,
        fsrsData: {
          stability: Number,
          difficulty: Number,
          elapsed: Number,
          scheduled: Number,
          reps: Number,
          lapses: Number,
          state: String, // 'new' | 'learning' | 'review' | 'relearning'
          lastReview: Date,
          nextReview: Date
        },
        culturalContext: {
          importance: Number, // Cultural significance weight
          realWorldUsage: Number, // Practical application frequency
          difficultyFactor: Number // Cultural complexity
        }
      }
    ],
    
    reviewStats: {
      today: { due: Number, completed: Number, accuracy: Number },
      thisWeek: { total: Number, average: Number },
      retention: { overall: Number, cultural: Number, linguistic: Number }
    }
  }
};