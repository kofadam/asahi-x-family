// FSRS-based spaced repetition algorithm
// Cultural Note: Optimized for respectful cultural learning, not linguistic perfection

// Default FSRS parameters (optimized for cultural learning)
const DEFAULT_PARAMS = {
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
  decay: -0.5,
  factor: 19 / 81,
  requestRetention: 0.9 // High retention for cultural appropriateness
}

// Calculate next review date based on FSRS algorithm
export const calculateNextReview = (item, rating) => {
  const { difficulty = 0.3, stability = 1, elapsedDays = 0 } = item

  // Rating: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
  const grade = Math.max(1, Math.min(4, rating))

  // Calculate new difficulty
  const newDifficulty = calculateDifficulty(difficulty, grade)

  // Calculate new stability
  const newStability = calculateStability(stability, difficulty, grade, elapsedDays)

  // Calculate interval
  const interval = calculateInterval(newStability, DEFAULT_PARAMS.requestRetention)

  // Next review date
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + Math.ceil(interval))

  return {
    difficulty: newDifficulty,
    stability: newStability,
    interval,
    nextReviewDate: nextReviewDate.toISOString(),
    lastReviewed: new Date().toISOString()
  }
}

// Calculate difficulty adjustment
const calculateDifficulty = (oldDifficulty, grade) => {
  const difficultyDelta = DEFAULT_PARAMS.w[6] - (grade - 3)
  const newDifficulty = oldDifficulty + difficultyDelta * DEFAULT_PARAMS.factor
  return Math.max(0, Math.min(1, newDifficulty))
}

// Calculate stability (memory strength)
const calculateStability = (oldStability, difficulty, grade, elapsedDays) => {
  const retrievability = Math.exp((DEFAULT_PARAMS.decay * elapsedDays) / oldStability)

  if (grade === 1) {
    // Failed recall - reset stability
    return DEFAULT_PARAMS.w[11] * Math.pow(difficulty, DEFAULT_PARAMS.w[12]) *
           Math.pow(oldStability, DEFAULT_PARAMS.w[13]) * Math.exp(DEFAULT_PARAMS.w[14] * (1 - retrievability))
  } else {
    // Successful recall - increase stability
    const hardPenalty = grade === 2 ? DEFAULT_PARAMS.w[15] : 1
    const easyBonus = grade === 4 ? DEFAULT_PARAMS.w[16] : 1

    return oldStability * (1 + Math.exp(DEFAULT_PARAMS.w[8]) *
           Math.pow(difficulty, DEFAULT_PARAMS.w[9]) *
           Math.pow(oldStability, DEFAULT_PARAMS.w[10]) *
           (Math.exp((1 - retrievability) * DEFAULT_PARAMS.w[7]) - 1) *
           hardPenalty * easyBonus)
  }
}

// Calculate optimal interval
const calculateInterval = (stability, requestRetention) => {
  return stability * Math.log(requestRetention) / Math.log(0.9)
}

// Get items due for review
export const getReviewItems = async (progress) => {
  if (!progress?.lessons) return []

  const now = new Date()
  const reviewItems = []

  Object.entries(progress.lessons).forEach(([lessonId, lessonData]) => {
    if (lessonData.nextReviewDate) {
      const reviewDate = new Date(lessonData.nextReviewDate)
      if (reviewDate <= now) {
        reviewItems.push({
          id: lessonId,
          type: 'lesson',
          ...lessonData
        })
      }
    }
  })

  // Sort by priority (overdue items first)
  reviewItems.sort((a, b) => {
    const dateA = new Date(a.nextReviewDate)
    const dateB = new Date(b.nextReviewDate)
    return dateA - dateB
  })

  return reviewItems
}

// Initialize new item for spaced repetition
export const initializeItem = () => ({
  difficulty: 0.3, // Start with moderate difficulty
  stability: 1, // Initial stability
  interval: 1, // First review tomorrow
  nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  lastReviewed: new Date().toISOString(),
  reviewCount: 0
})

// Cultural competency scoring (weighted more than linguistic accuracy)
export const calculateCulturalScore = (culturalAccuracy, linguisticAccuracy) => {
  // 70% weight on cultural appropriateness, 30% on language
  return (culturalAccuracy * 0.7) + (linguisticAccuracy * 0.3)
}