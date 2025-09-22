// src/data/schemas/content.js
export const ContentSchema = {
  lesson: {
    id: String,
    title: String,
    description: String,
    
    culturalFramework: {
      principle: String, // Core cultural concept
      importance: String, // Why this matters for respectful interaction
      commonMistakes: [String], // What foreigners typically do wrong
      culturalContext: String // Historical/social background
    },
    
    prerequisites: [String], // Required completed lessons
    estimatedTime: Number, // Minutes
    difficulty: String, // 'beginner' | 'intermediate' | 'advanced'
    
    learningObjectives: [
      {
        type: String, // 'cultural' | 'linguistic' | 'practical'
        description: String,
        measurable: String // How success is evaluated
      }
    ],
    
    content: {
      introduction: {
        culturalSetup: String, // Why this situation matters
        animeConnection: String, // How users recognize this pattern
        respectfulApproach: String // The Asahi way to handle it
      },
      
      scenarios: [
        {
          id: String,
          title: String,
          setting: String,
          context: String,
          culturalCues: [String], // What to observe
          
          characters: [
            {
              role: String, // 'user' | 'shopkeeper' | 'customer'
              description: String,
              culturalExpectations: String
            }
          ],
          
          interactionFlow: [
            {
              step: Number,
              description: String,
              culturalNote: String,
              
              choices: [
                {
                  id: String,
                  text: String,
                  culturalAppropriateness: Number, // 0-1 scale
                  linguisticCorrectness: Number, // 0-1 scale
                  consequences: String,
                  feedback: String
                }
              ]
            }
          ],
          
          culturalExplanation: String, // Deep dive into why things work this way
          improvementTips: [String],
          realWorldApplication: String
        }
      ],
      
      spacedRepetitionItems: [
        {
          id: String,
          type: String, // 'recognition' | 'production' | 'cultural-judgment'
          content: Object,
          culturalWeight: Number, // How much cultural vs linguistic focus
          practiceVariations: [Object] // Different ways to practice same concept
        }
      ]
    },
    
    assessment: {
      culturalCompetency: [
        {
          scenario: String,
          correctApproach: String,
          commonMistakes: [String],
          scoringCriteria: Object
        }
      ],
      
      practicalApplication: [
        {
          situation: String,
          expectedBehavior: String,
          culturalSignificance: String
        }
      ]
    },
    
    achievements: [String], // IDs of achievements this lesson can unlock
    
    metadata: {
      createdBy: String,
      culturalReviewer: String, // Community member who verified cultural accuracy
      lastUpdated: Date,
      version: String,
      communityRating: Number,
      tags: [String]
    }
  }
};