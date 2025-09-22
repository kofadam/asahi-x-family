// src/utils/adaptiveDifficulty.js

/**
 * Adjusts lesson difficulty based on user performance and cultural competency
 */
class AdaptiveDifficultyEngine {
  constructor(userProgress) {
    this.userProgress = userProgress;
    this.performanceWindow = 10; // Last 10 interactions
    this.culturalThreshold = 0.7; // Minimum cultural appropriateness
  }

  /**
   * Determine appropriate difficulty for next lesson/scenario
   */
  calculateNextDifficulty(currentModule, recentPerformance) {
    const culturalCompetency = this.userProgress.culturalCompetency;
    const recentAccuracy = this.calculateRecentAccuracy(recentPerformance);
    
    // Factors influencing difficulty
    const factors = {
      cultural: culturalCompetency.overallRating,
      linguistic: recentAccuracy.linguistic,
      consistency: this.calculateConsistency(recentPerformance),
      engagement: this.calculateEngagementLevel(),
      timeSpent: this.calculateEfficiency(recentPerformance)
    };
    
    // Difficulty adjustment algorithm
    let difficultyAdjustment = 0;
    
    // If cultural scores are low, focus on cultural understanding
    if (factors.cultural < this.culturalThreshold) {
      return {
        focus: 'cultural-understanding',
        complexity: 'simplified',
        scenarios: 'basic-politeness',
        explanation: 'detailed-cultural-context'
      };
    }
    
    // If consistency is high, increase challenge
    if (factors.consistency > 0.8 && factors.cultural > 0.8) {
      difficultyAdjustment += 0.2;
    }
    
    // If struggling, provide more support
    if (factors.linguistic < 0.6) {
      difficultyAdjustment -= 0.3;
    }
    
    return this.generateDifficultyProfile(difficultyAdjustment, factors);
  }

  /**
   * Generate personalized difficulty profile
   */
  generateDifficultyProfile(adjustment, factors) {
    const baseDifficulty = this.userProgress.preferences.difficultyLevel;
    
    return {
      scenarioComplexity: this.adjustComplexity(baseDifficulty, adjustment),
      culturalExplanationDepth: factors.cultural < 0.7 ? 'detailed' : 'standard',
      interactionSpeed: factors.consistency > 0.8 ? 'faster' : 'standard',
      mistakeToleranceLevel: factors.engagement < 0.6 ? 'high' : 'standard',
      focusAreas: this.identifyWeakAreas(factors),
      recommendedStudyTime: this.calculateOptimalStudyTime(factors)
    };
  }
}