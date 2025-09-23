// Cultural Note: Each lesson focuses on practical situations travelers encounter
// Lessons prioritize cultural appropriateness over linguistic perfection

export const lessons = [
  {
    id: 'lesson-001',
    title: 'Reading the Room (Kuuki wo Yomu)',
    difficulty: 'Beginner',
    duration: '10-15 minutes',
    culturalFocus: 'Non-verbal communication and social awareness',
    unlocked: true,
    culturalContext: 'In Japan, "reading the air" (空気を読む) means understanding unspoken social cues and atmosphere. This skill is crucial for respectful interactions.',
    learningObjectives: [
      'Recognize subtle social cues in Japanese interactions',
      'Understand when to act vs. when to wait',
      'Avoid putting others in uncomfortable situations'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'Understanding Kuuki wo Yomu',
        content: 'Japanese social harmony relies on subtle, non-verbal communication. People express preferences indirectly to maintain group harmony.',
        culturalNote: 'This isn\'t about being passive - it\'s about respecting others\' comfort and maintaining social harmony.',
        example: 'When offered tea, a slight hesitation before accepting might mean they\'re being polite but don\'t actually want any.'
      },
      {
        type: 'scenario',
        title: 'Restaurant Entry Scenario',
        setup: 'You enter a small traditional restaurant in Kyoto. The owner greets you but seems to glance at a "Reserved" sign.',
        question: 'What should you do?',
        choices: [
          {
            id: 'a',
            text: 'Ask directly if there are any tables available',
            culturalScore: 0.6,
            feedback: 'Direct but misses the subtle cue. The glance at the sign was meant to communicate they\'re full.'
          },
          {
            id: 'b',
            text: 'Notice the glance, apologize for the intrusion, and politely leave',
            culturalScore: 1.0,
            feedback: 'Excellent! You read the non-verbal cue and responded appropriately without forcing an awkward rejection.'
          },
          {
            id: 'c',
            text: 'Wait for them to explicitly tell you if they\'re full',
            culturalScore: 0.3,
            feedback: 'This puts the owner in an uncomfortable position of having to directly refuse you.'
          }
        ]
      },
      {
        type: 'practice',
        title: 'Identifying Non-Verbal Cues',
        content: 'Common non-verbal cues in Japanese interactions:',
        points: [
          'Sucking air through teeth (uncomfortable/difficult)',
          'Indirect phrases like "It\'s a bit..." (polite refusal)',
          'Long pauses before answering (considering how to refuse politely)',
          'Changing the subject (avoiding direct confrontation)'
        ]
      },
      {
        type: 'reflection',
        title: 'Why This Matters',
        content: 'Understanding kuuki wo yomu helps you:',
        benefits: [
          'Avoid putting Japanese people in uncomfortable positions',
          'Show cultural awareness and earn respect',
          'Navigate social situations smoothly',
          'Build better relationships during your travels'
        ]
      }
    ]
  },
  {
    id: 'lesson-002',
    title: 'Proper Greetings and Bowing',
    difficulty: 'Beginner',
    duration: '8-12 minutes',
    culturalFocus: 'Physical etiquette and respect levels',
    unlocked: true,
    culturalContext: 'Bowing (お辞儀, ojigi) is fundamental to Japanese etiquette. The depth and duration convey different levels of respect and formality.',
    learningObjectives: [
      'Learn appropriate bow depths for different situations',
      'Understand when to bow vs. when to nod',
      'Master the timing of greetings'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'The Art of Bowing',
        content: 'Bowing in Japan isn\'t just politeness - it\'s a sophisticated communication system that shows respect, acknowledges social hierarchy, and maintains harmony.',
        culturalNote: 'As a foreigner, you\'re not expected to be perfect, but showing effort to bow appropriately demonstrates respect for Japanese culture.',
        example: 'A 15-degree nod when entering a shop shows respect without appearing to mock formal customs.'
      },
      {
        type: 'scenario',
        title: 'Convenience Store Interaction',
        setup: 'You enter a 7-Eleven in Tokyo. The clerk behind the counter notices you and says "Irasshaimase!" (Welcome!)',
        question: 'How should you respond?',
        choices: [
          {
            id: 'a',
            text: 'Give a deep 45-degree bow and say "Arigatou gozaimasu"',
            culturalScore: 0.4,
            feedback: 'Too formal for a casual setting. This level of formality might make the clerk uncomfortable.'
          },
          {
            id: 'b',
            text: 'Smile and give a slight nod (10-15 degrees) as acknowledgment',
            culturalScore: 1.0,
            feedback: 'Perfect! This shows respect while matching the casual nature of the interaction.'
          },
          {
            id: 'c',
            text: 'Wave and say "Hello" in English',
            culturalScore: 0.7,
            feedback: 'Friendly but misses the cultural context. A slight bow would show cultural awareness.'
          }
        ]
      },
      {
        type: 'practice',
        title: 'Bow Depths Guide',
        content: 'Different situations call for different bow depths:',
        points: [
          '5-10°: Casual acknowledgment (passing someone, entering shops)',
          '15°: Standard politeness (thanking clerks, saying goodbye)',
          '30°: Formal respect (meeting someone important, apologies)',
          '45°: Deep respect/apology (serious situations, formal ceremonies)'
        ]
      },
      {
        type: 'scenario',
        title: 'Temple Visit',
        setup: 'You\'re visiting Senso-ji Temple in Asakusa. As you approach the main hall, you see other visitors bowing before entering.',
        question: 'What\'s the appropriate response?',
        choices: [
          {
            id: 'a',
            text: 'Follow their lead with a respectful 30-degree bow',
            culturalScore: 1.0,
            feedback: 'Excellent cultural sensitivity! Observing and respectfully following local customs shows deep respect.'
          },
          {
            id: 'b',
            text: 'Just walk in without bowing since you\'re not Buddhist',
            culturalScore: 0.2,
            feedback: 'This misses the cultural significance. Bowing at temples is about respect for the sacred space, not religious belief.'
          },
          {
            id: 'c',
            text: 'Take photos of others bowing',
            culturalScore: 0.1,
            feedback: 'Very inappropriate. Sacred spaces require respectful behavior, not tourist photography.'
          }
        ]
      },
      {
        type: 'reflection',
        title: 'Beyond the Bow',
        content: 'Mastering Japanese greetings shows:',
        benefits: [
          'Respect for Japanese cultural values',
          'Effort to integrate rather than impose',
          'Understanding of social hierarchy and context',
          'Genuine interest in cultural exchange'
        ]
      }
    ]
  },
  {
    id: 'lesson-003',
    title: 'Train and Public Transport Etiquette',
    difficulty: 'Beginner',
    duration: '12-15 minutes',
    culturalFocus: 'Public behavior and consideration for others',
    unlocked: true,
    culturalContext: 'Japanese trains are marvels of efficiency and social cooperation. Understanding train etiquette is essential for respectful travel.',
    learningObjectives: [
      'Learn priority seating protocols',
      'Understand phone and conversation etiquette',
      'Master boarding and alighting procedures'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'The Philosophy of Train Etiquette',
        content: 'Japanese train etiquette is based on "meiwaku wo kakenai" (不迷惑をかけない) - not causing trouble for others. Every rule exists to maintain harmony in crowded spaces.',
        culturalNote: 'These aren\'t arbitrary rules - they\'re evolved solutions to help millions of people coexist peacefully in confined spaces.',
        example: 'Removing your backpack prevents accidentally hitting others when you turn around in crowded cars.'
      },
      {
        type: 'scenario',
        title: 'Rush Hour Yamanote Line',
        setup: 'It\'s 8:30 AM on the packed Yamanote Line. You see an elderly person standing while some seats are occupied by young people who appear to be sleeping.',
        question: 'What should you do?',
        choices: [
          {
            id: 'a',
            text: 'Tap the sleeping person and ask them to give up their seat',
            culturalScore: 0.2,
            feedback: 'Too direct and confrontational. This would create the exact disharmony train etiquette aims to avoid.'
          },
          {
            id: 'b',
            text: 'If you have a seat, offer it to the elderly person quietly',
            culturalScore: 1.0,
            feedback: 'Perfect! Leading by example while respecting everyone\'s dignity is the Japanese way.'
          },
          {
            id: 'c',
            text: 'Do nothing - it\'s not your responsibility',
            culturalScore: 0.5,
            feedback: 'Not wrong, but missing an opportunity to show cultural understanding and kindness.'
          }
        ]
      },
      {
        type: 'practice',
        title: 'Essential Train Etiquette',
        content: 'Key behaviors for respectful train travel:',
        points: [
          'Remove backpack in crowded cars (hold it in front or put it overhead)',
          'Move to the center of the car, don\'t block doors',
          'Keep phone on silent, avoid calls, text quietly',
          'Offer priority seats to elderly, pregnant, or disabled passengers',
          'Wait for people to exit before boarding',
          'Avoid eating strong-smelling foods'
        ]
      },
      {
        type: 'scenario',
        title: 'Phone Call Dilemma',
        setup: 'You\'re on the Shinkansen (bullet train) when you receive an urgent call from work. The call is important and will take about 5 minutes.',
        question: 'What\'s the most culturally appropriate response?',
        choices: [
          {
            id: 'a',
            text: 'Answer quietly and try to keep the conversation brief',
            culturalScore: 0.3,
            feedback: 'Still disruptive to others. Even quiet phone calls on trains are considered inconsiderate.'
          },
          {
            id: 'b',
            text: 'Go to the area between train cars to take the call',
            culturalScore: 1.0,
            feedback: 'Excellent! The vestibule areas are specifically for phone calls and won\'t disturb seated passengers.'
          },
          {
            id: 'c',
            text: 'Send a text saying you\'ll call back when off the train',
            culturalScore: 0.9,
            feedback: 'Very good alternative! This shows consideration for others and can often resolve the urgent matter.'
          }
        ]
      },
      {
        type: 'reflection',
        title: 'The Bigger Picture',
        content: 'Train etiquette reflects core Japanese values:',
        benefits: [
          'Consideration for others (思いやり, omoiyari)',
          'Maintaining harmony in shared spaces',
          'Personal responsibility for collective comfort',
          'Understanding that small actions have big impacts'
        ]
      }
    ]
  },
  {
    id: 'lesson-004',
    title: 'Restaurant Etiquette and Ordering',
    difficulty: 'Intermediate',
    duration: '15-20 minutes',
    culturalFocus: 'Dining customs and service interactions',
    unlocked: false,
    culturalContext: 'Japanese restaurants have distinct customs around seating, ordering, and payment. Understanding these shows respect for the establishment and staff.',
    learningObjectives: [
      'Navigate different restaurant types and their customs',
      'Understand proper chopstick etiquette',
      'Learn appropriate tipping culture (spoiler: don\'t tip!)'
    ],
    steps: [
      {
        type: 'explanation',
        title: 'Restaurant Culture Philosophy',
        content: 'Japanese restaurant service is based on "omotenashi" (おもてなし) - selfless hospitality. Staff take pride in providing excellent service without expecting tips.',
        culturalNote: 'Tipping can actually be offensive as it implies the staff need extra incentive to do their job well.',
        example: 'At a traditional restaurant, wait to be seated even if you see empty tables - there may be a system you\'re not aware of.'
      },
      {
        type: 'scenario',
        title: 'Traditional Restaurant Seating',
        setup: 'You enter a traditional kaiseki restaurant. There are several empty tables, but the host seems hesitant and mentions "reservation".',
        question: 'What\'s the most culturally appropriate response?',
        choices: [
          {
            id: 'a',
            text: 'Insist that you can see empty tables and ask to be seated',
            culturalScore: 0.2,
            feedback: 'This puts pressure on the staff and misses the cultural nuance of their indirect communication.'
          },
          {
            id: 'b',
            text: 'Apologize and ask if they might have availability later, or recommend another restaurant',
            culturalScore: 1.0,
            feedback: 'Perfect! This shows cultural sensitivity and helps the staff maintain face while being helpful.'
          },
          {
            id: 'c',
            text: 'Ask if you can wait to see if something opens up',
            culturalScore: 0.6,
            feedback: 'Better than insisting, but still misses the cue that they\'re trying to politely say they\'re full.'
          }
        ]
      },
      {
        type: 'practice',
        title: 'Essential Restaurant Etiquette',
        content: 'Key behaviors for respectful dining:',
        points: [
          'Wait to be seated, even if tables appear empty',
          'Say "Itadakimasu" before eating (expressing gratitude)',
          'Don\'t stick chopsticks upright in rice (funeral association)',
          'Pour drinks for others, let them pour for you',
          'Never tip - it can be offensive to suggest service wasn\'t already excellent',
          'Say "Gochisousama" after finishing (thanking for the meal)'
        ]
      }
    ]
  },
  {
    id: 'lesson-005',
    title: 'Gift-Giving and Omiyage Culture',
    difficulty: 'Intermediate',
    duration: '10-15 minutes',
    culturalFocus: 'Social obligations and relationship building',
    unlocked: false,
    culturalContext: 'Omiyage (お土産) - bringing back gifts from travels - is a fundamental part of Japanese social relationships and shows consideration for others.',
    learningObjectives: [
      'Understand when and why to bring omiyage',
      'Learn appropriate gift presentation',
      'Navigate the reciprocal nature of gift-giving'
    ],
    // Steps would be defined here...
    steps: []
  },
  {
    id: 'lesson-006',
    title: 'Shrine and Temple Visits',
    difficulty: 'Intermediate',
    duration: '12-18 minutes',
    culturalFocus: 'Sacred space etiquette and spiritual respect',
    unlocked: false,
    culturalContext: 'Shrines (神社) and temples (寺) are sacred spaces requiring specific behaviors. Respectful conduct shows understanding of Japanese spiritual traditions.',
    learningObjectives: [
      'Learn purification rituals at shrines',
      'Understand photography etiquette in sacred spaces',
      'Master proper prayer procedures'
    ],
    // Steps would be defined here...
    steps: []
  }
]

// Helper functions for lesson management
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
    culturalScore: userProgress?.lessons?.[lesson.id]?.culturalScore || 0,
    lastCompleted: userProgress?.lessons?.[lesson.id]?.lastCompleted || null
  }))
}