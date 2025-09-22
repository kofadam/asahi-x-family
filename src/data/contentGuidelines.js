// src/data/contentGuidelines.js

/**
 * Comprehensive guidelines for community content creation
 * Ensures cultural accuracy and respectful representation
 */
export const ContentCreationGuidelines = {
  culturalAccuracy: {
    requirements: [
      'All cultural explanations must be accurate and respectful',
      'Sources should include native Japanese perspectives',
      'Avoid stereotypes or oversimplifications',
      'Context for regional or generational differences when relevant'
    ],
    
    reviewProcess: [
      'Initial submission by community member',
      'Cultural accuracy review by Japanese culture expert',
      'Educational effectiveness review by language learning specialist',
      'Technical implementation review by development team',
      'Community feedback period before final approval'
    ],
    
    sources: [
      'Japanese cultural studies academic sources',
      'Native Japanese speaker consultation',
      'Ethnographic research on Japanese social norms',
      'Contemporary Japanese media and social observations'
    ]
  },
  
  contentTypes: {
    'cultural-scenario': {
      structure: {
        setting: 'Specific location/context (shop, restaurant, etc.)',
        participants: 'Character roles and cultural expectations',
        situation: 'What triggers the interaction',
        culturalCues: 'Observable elements that guide behavior',
        appropriateResponses: 'Range of culturally acceptable reactions',
        commonMistakes: 'What foreign visitors typically do wrong',
        culturalExplanation: 'Why the appropriate responses work',
        practiceVariations: 'Different ways to practice the same concept'
      },
      
      qualityStandards: [
        'Scenarios must reflect real-world situations',
        'Cultural advice must be actionable and specific',
        'Language level appropriate for target audience',
        'Inclusive of different ages/backgrounds of learners',
        'Respectful of all parties in the interaction'
      ]
    },
    
    'cultural-explanation': {
      structure: {
        concept: 'The cultural principle being explained',
        context: 'When/where this principle applies',
        manifestation: 'How this appears in daily life',
        respectfulApproach: 'How visitors should respond',
        commonMisunderstandings: 'Frequent foreign visitor mistakes',
        practicalTips: 'Specific actionable advice'
      },
      
      tone: [
        'Educational but not preachy',
        'Respectful of both Japanese and foreign perspectives',
        'Practical and applicable',
        'Encouraging rather than intimidating'
      ]
    }
  },
  
  communityContribution: {
    process: {
      1: 'Submit content proposal in GitHub issues',
      2: 'Initial feedback from community maintainers',
      3: 'Create content following templates and guidelines',
      4: 'Submit pull request with completed content',
      5: 'Peer review process with cultural accuracy check',
      6: 'Revisions based on feedback',
      7: 'Final approval and integration into learning system',
      8: 'Recognition for contributors in achievement system'
    },
    
    recognition: {
      'cultural-contributor': 'First accepted cultural content submission',
      'scenario-creator': '5 accepted scenario contributions',
      'cultural-expert': '10+ contributions with high community rating',
      'asahi-mentor': 'Outstanding contributions to cultural understanding'
    }
  }
};