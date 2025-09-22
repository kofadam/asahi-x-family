// src/utils/achievementSystem.js

/**
 * Cultural competency-focused achievement system
 * Emphasizes meaningful progress over arbitrary points
 */
class AchievementSystem {
  constructor() {
    this.achievements = this.loadAchievementDefinitions();
    this.culturalMilestones = this.loadCulturalMilestones();
  }

  /**
   * Achievement definitions with cultural significance
   */
  loadAchievementDefinitions() {
    return {
      'respectful-visitor': {
        name: 'Respectful Visitor',
        description: 'Demonstrate understanding of basic Japanese social etiquette',
        category: 'cultural-competency',
        difficulty: 'foundational',
        requirements: {
          completedLessons: ['reading-the-room', 'politeness-levels'],
          culturalScoreMinimum: 0.75,
          scenariosCompleted: 10,
          mistakeRecoveryDemonstrated: true
        },
        rewards: {
          access: ['intermediate-scenarios'],
          recognition: 'Cultural Foundation Certificate',
          communityStatus: 'Cultural Student'
        },
        culturalSignificance: 'Shows commitment to respectful cross-cultural interaction',
        celebrationMessage: 'You understand the foundation of respectful Japanese interaction!'
      },
      
      'cultural-navigator': {
        name: 'Cultural Navigator',
        description: 'Successfully read and respond to complex social situations',
        category: 'cultural-competency',
        difficulty: 'intermediate',
        requirements: {
          respectfulVisitorCompleted: true,
          complexScenariosCompleted: 25,
          culturalCueRecognition: 0.85,
          appropriateResponseRate: 0.80,
          diverseSituationsHandled: 5 // Different types of scenarios
        },
        rewards: {
          access: ['advanced-cultural-scenarios', 'real-world-challenges'],
          recognition: 'Cultural Navigation Certificate',
          communityStatus: 'Cultural Navigator'
        },
        culturalSignificance: 'Demonstrates sophisticated cultural awareness',
        celebrationMessage: 'You can navigate complex Japanese social situations with confidence!'
      },
      
      'asahi-ambassador': {
        name: 'Asahi Ambassador',
        description: 'Embody the Asahi x Family spirit of respectful cultural learning',
        category: 'cultural-mastery',
        difficulty: 'advanced',
        requirements: {
          allFoundationalAchievements: true,
          communityContributions: 3, // Helped improve content
          culturalMasteryScore: 0.90,
          teachingDemonstrated: true, // Explained concepts to others
          realWorldApplication: true // Used skills in actual Japan visit
        },
        rewards: {
          access: ['mentor-features', 'advanced-content-creation'],
          recognition: 'Asahi Ambassador Status',
          communityStatus: 'Cultural Ambassador'
        },
        culturalSignificance: 'Represents the highest level of respectful cultural competency',
        celebrationMessage: 'You embody the Asahi spirit of respectful cultural learning!'
      }
    };
  }

  /**
   * Check for newly earned achievements
   */
  checkAchievements(userProgress) {
    const newAchievements = [];
    
    for (const [achievementId, achievement] of Object.entries(this.achievements)) {
      if (this.isAchievementEarned(achievement, userProgress) && 
          !this.isAlreadyEarned(achievementId, userProgress)) {
        
        newAchievements.push({
          ...achievement,
          id: achievementId,
          earnedAt: new Date(),
          culturalProgress: this.calculateCulturalProgress(userProgress)
        });
      }
    }
    
    return newAchievements;
  }

  /**
   * Calculate cultural competency progress
   */
  calculateCulturalProgress(userProgress) {
    const competency = userProgress.culturalCompetency;
    
    return {
      overall: competency.overallRating,
      breakdown: {
        respectfulInteraction: competency.respectfulInteraction,
        situationalAwareness: competency.situationalAwareness,
        politenessLevels: competency.politenessLevels,
        mistakeRecovery: competency.mistakeRecovery
      },
      strengths: this.identifyStrengths(competency),
      growthAreas: this.identifyGrowthAreas(competency),
      nextMilestone: this.getNextCulturalMilestone(competency)
    };
  }
}