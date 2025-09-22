// src/utils/fsrs.js

/**
 * Free Spaced Repetition Scheduler with cultural competency integration
 * Based on FSRS-4.5 with modifications for cultural learning
 */
class CulturalFSRS {
  constructor() {
    // Standard FSRS parameters optimized for language + cultural learning
    this.parameters = {
      w: [
        0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0234, 1.616,
        0.1544, 1.0824, 1.9813, 0.0953, 0.2975, 2.2042, 0.2407, 2.9466, 0.5034, 0.6567
      ],
      requestRetention: 0.87, // Slightly lower for cultural concepts (harder to measure)
      maximumInterval: 36500, // 100 years max
      culturalBoostFactor: 1.3 // Boost for high cultural significance items
    };
  }

  /**
   * Calculate next review date considering both linguistic and cultural factors
   */
  scheduleReview(item, response) {
    const { fsrsData, culturalContext } = item;
    
    // Adjust grade based on cultural appropriateness
    const culturalWeight = culturalContext.importance * 0.4; // Cultural significance factor
    const adjustedGrade = this.calculateCulturalAdjustedGrade(response, culturalWeight);
    
    // Calculate new stability using FSRS algorithm
    const newStability = this.calculateStability(fsrsData, adjustedGrade);
    const interval = this.calculateInterval(newStability);
    
    // Apply cultural boost for highly significant items
    const culturalMultiplier = culturalContext.importance > 0.8 ? 
      this.parameters.culturalBoostFactor : 1.0;
    
    const finalInterval = Math.round(interval * culturalMultiplier);
    
    return {
      ...fsrsData,
      stability: newStability,
      elapsed: 0,
      scheduled: finalInterval,
      reps: fsrsData.reps + 1,
      lastReview: new Date(),
      nextReview: new Date(Date.now() + finalInterval * 24 * 60 * 60 * 1000),
      state: this.determineState(adjustedGrade, fsrsData.state)
    };
  }

  /**
   * Combine linguistic correctness with cultural appropriateness
   */
  calculateCulturalAdjustedGrade(response, culturalWeight) {
    const { linguisticGrade, culturalGrade } = response;
    
    // Weight cultural appropriateness higher for interaction scenarios
    const culturalFactor = culturalWeight * 0.7;
    const linguisticFactor = (1 - culturalWeight) * 0.3;
    
    return (culturalGrade * culturalFactor) + (linguisticGrade * linguisticFactor);
  }

  /**
   * Generate review statistics with cultural competency breakdown
   */
  generateReviewStats(items, timeframe = 30) {
    const recentReviews = items.filter(item => {
      const daysSince = (Date.now() - item.fsrsData.lastReview) / (24 * 60 * 60 * 1000);
      return daysSince <= timeframe;
    });

    return {
      total: recentReviews.length,
      retention: this.calculateRetention(recentReviews),
      culturalAccuracy: this.calculateCulturalAccuracy(recentReviews),
      strengthByCategory: this.categorizeStrengths(recentReviews),
      recommendedFocus: this.generateFocusRecommendations(recentReviews)
    };
  }
}