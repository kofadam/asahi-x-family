// src/utils/streakSystem.js

/**
 * Sophisticated streak system that maintains dignity while leveraging loss aversion
 */
class CulturalStreakSystem {
  constructor() {
    this.milestones = this.defineCulturalMilestones();
    this.protections = this.defineProtectionSystem();
  }

  /**
   * Culturally meaningful streak milestones
   */
  defineCulturalMilestones() {
    return [
      {
        days: 7,
        name: 'Rising Sun Week',
        culturalMeaning: 'Like the daily sunrise, consistent learning brings enlightenment',
        reward: 'Cultural Insight: Daily Reflection Practice',
        celebration: 'Seven days of cultural growth - the foundation is set!'
      },
      {
        days: 21,
        name: 'Habit Formation',
        culturalMeaning: 'Building lasting respect through consistent practice',
        reward: 'Advanced Cultural Scenarios Unlocked',
        celebration: 'Cultural learning has become part of your daily rhythm!'
      },
      {
        days: 50,
        name: 'Cultural Student',
        culturalMeaning: 'Demonstrating serious commitment to respectful learning',
        reward: 'Community Recognition + Advanced Features',
        celebration: 'You have shown the dedication of a true cultural student!'
      },
      {
        days: 100,
        name: 'Respectful Traveler',
        culturalMeaning: 'Ready to represent your culture respectfully in Japan',
        reward: 'Ambassador Status + Content Creation Access',
        celebration: 'You embody the spirit of respectful cultural exchange!'
      }
    ];
  }

  /**
   * Protection system that maintains dignity
   */
  defineProtectionSystem() {
    return {
      'cultural-rest': {
        name: 'Cultural Rest Day',
        description: 'Sometimes wisdom comes from reflection, not action',
        culturalBasis: 'Japanese concept of Ma (間) - the importance of pauses',
        cost: 0, // Free - respects need for reflection
        availability: 'Available after 7-day streak',
        usage: 'Once per week',
        effect: 'Maintains streak without study requirement'
      },
      
      'travel-mode': {
        name: 'Active Practice Mode',
        description: 'Using your skills in real Japan counts as practice',
        culturalBasis: 'Real-world application is the highest form of learning',
        cost: 0, // Free - rewards practical application
        availability: 'GPS detection in Japan OR manual activation',
        usage: 'During actual travel periods',
        effect: 'Streak continues with real-world cultural practice'
      },
      
      'family-support': {
        name: 'Family Learning Support',
        description: 'Teaching family members counts as reinforcing your knowledge',
        culturalBasis: 'Teaching deepens understanding',
        cost: 0, // Free - encourages knowledge sharing
        availability: 'Available with family progress sharing enabled',
        usage: 'When helping family members learn',
        effect: 'Streak maintained through teaching others'
      }
    };
  }

  /**
   * Update streak based on daily activity
   */
  updateStreak(userProgress, todayActivity) {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    const streakData = userProgress.streakData;
    const lastStudyDate = streakData.lastStudyDate ? 
      new Date(streakData.lastStudyDate).toDateString() : null;
    
    // Check if streak should continue
    if (this.shouldContinueStreak(todayActivity, lastStudyDate, yesterday, today)) {
      return this.continueStreak(streakData, today, todayActivity);
    }
    
    // Check if streak should be protected
    const protection = this.checkProtectionUsage(userProgress, today);
    if (protection) {
      return this.applyStreakProtection(streakData, protection, today);
    }
    
    // Streak breaks - handle gracefully
    return this.handleStreakBreak(streakData, today);
  }

  /**
   * Generate encouraging streak messages
   */
  generateStreakMessage(streakData) {
    const currentStreak = streakData.current;
    const nextMilestone = this.getNextMilestone(currentStreak);
    
    if (currentStreak === 0) {
      return {
        title: 'Ready for a New Dawn',
        message: 'Every expert was once a beginner. Start your cultural learning journey today!',
        motivation: 'cultural-beginning'
      };
    }
    
    if (currentStreak < 7) {
      return {
        title: `Day ${currentStreak} of Cultural Growth`,
        message: `Building the foundation, one day at a time. ${7 - currentStreak} days to your first milestone!`,
        motivation: 'foundation-building'
      };
    }
    
    return {
      title: `${currentStreak} Days of Cultural Learning`,
      message: `Your dedication to respectful learning shines bright. Next milestone: ${nextMilestone.name} in ${nextMilestone.days - currentStreak} days!`,
      motivation: 'milestone-progress'
    };
  }
}