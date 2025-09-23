import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, ChevronRight, Check, Info } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { initializeItem } from '../utils/spacedRepetition'
import { getStreakBonus } from '../utils/streakSystem'

const LearnPage = () => {
  const navigate = useNavigate()
  const { user, updateProgress, recordActivity, unlockAchievement } = useApp()
  const [currentLesson, setCurrentLesson] = useState(null)
  const [lessonStep, setLessonStep] = useState(0)
  const [userResponses, setUserResponses] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)

  // Sample lesson for demonstration
  const sampleLesson = {
    id: 'lesson-001',
    title: 'Reading the Room (Kuuki wo Yomu)',
    culturalContext: 'In Japan, "reading the air" (空気を読む) means understanding unspoken social cues and atmosphere. This skill is crucial for respectful interactions.',
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
  }

  useEffect(() => {
    setCurrentLesson(sampleLesson)
    recordActivity()
  }, [])

  const handleChoice = (choice) => {
    const responses = [...userResponses]
    responses[lessonStep] = choice
    setUserResponses(responses)
  }

  const handleNext = async () => {
    if (lessonStep < currentLesson.steps.length - 1) {
      setLessonStep(lessonStep + 1)
    } else {
      await completeLesson()
    }
  }

  const completeLesson = async () => {
    setIsCompleted(true)

    // Calculate score based on responses
    const culturalScore = userResponses.reduce((acc, response) => {
      return acc + (response?.culturalScore || 0)
    }, 0) / userResponses.filter(r => r?.culturalScore).length

    // Update progress with spaced repetition data
    const spacedRepData = initializeItem()
    await updateProgress(currentLesson.id, {
      completed: true,
      culturalScore,
      ...spacedRepData
    })

    // Calculate and award XP
    const baseXP = 50
    const streakBonus = getStreakBonus(user?.streakCount || 0)
    const totalXP = baseXP + streakBonus

    // Check for achievements
    if (user?.streakCount === 7) {
      await unlockAchievement('streak_7')
    }
  }

  const renderStepContent = () => {
    if (!currentLesson) return null
    const step = currentLesson.steps[lessonStep]

    switch (step.type) {
      case 'explanation':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.content}</p>
            {step.culturalNote && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-yellow-100">{step.culturalNote}</p>
                </div>
              </div>
            )}
            {step.example && (
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-blue-200 mb-2">Example:</p>
                <p className="text-white italic">{step.example}</p>
              </div>
            )}
          </div>
        )

      case 'scenario':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-lg text-white mb-4">{step.setup}</p>
              <p className="text-yellow-300 font-semibold mb-4">{step.question}</p>
            </div>
            <div className="space-y-3">
              {step.choices.map((choice) => {
                const isSelected = userResponses[lessonStep]?.id === choice.id
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className={`
                      w-full text-left p-4 rounded-lg transition-all
                      ${isSelected
                        ? 'bg-yellow-500/30 border-2 border-yellow-400'
                        : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
                      }
                    `}
                  >
                    <p className="text-white">{choice.text}</p>
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-sm text-blue-100">{choice.feedback}</p>
                        <p className="text-sm text-yellow-300 mt-1">
                          Cultural Appropriateness: {Math.round(choice.culturalScore * 100)}%
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 'practice':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.content}</p>
            <div className="space-y-2">
              {step.points.map((point, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <p className="text-white">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case 'reflection':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.content}</p>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
              {step.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start mb-2">
                  <span className="text-yellow-300 mr-2">•</span>
                  <p className="text-white">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Lesson Complete!</h2>
          <p className="text-xl text-blue-100 mb-6">
            Great job understanding "{currentLesson?.title}"
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-yellow-300 text-2xl font-bold">+50 XP</p>
              <p className="text-sm text-blue-200">Base Experience</p>
            </div>
            {user?.streakCount > 0 && (
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-orange-300 text-2xl font-bold">+{getStreakBonus(user.streakCount)} XP</p>
                <p className="text-sm text-blue-200">Streak Bonus</p>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            Continue Learning
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center text-white mb-2">
          <BookOpen className="w-5 h-5 mr-2" />
          <span className="text-sm">Lesson {lessonStep + 1} of {currentLesson?.steps.length}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-300 to-orange-300 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((lessonStep + 1) / currentLesson?.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
        {renderStepContent()}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={lessonStep === 1 && !userResponses[lessonStep]}
            className={`
              inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all
              ${lessonStep === 1 && !userResponses[lessonStep]
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              }
            `}
          >
            {lessonStep === currentLesson?.steps.length - 1 ? 'Complete Lesson' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnPage