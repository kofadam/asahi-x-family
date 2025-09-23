import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, BookOpen, Target, Brain, RefreshCw, Trophy, ChevronRight } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const BowingEtiquetteModule = () => {
  const { user, progress, updateProgress, recordActivity } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [stepProgress, setStepProgress] = useState({})
  const [moduleCompleted, setModuleCompleted] = useState(false)

  const moduleId = 'bowing-etiquette-shop'

  const steps = [
    {
      id: 'cultural-insight',
      title: 'Cultural Insight',
      icon: BookOpen,
      description: 'Learn the cultural context behind bowing in Japanese shops',
      duration: '3 min'
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition',
      icon: Brain,
      description: 'Identify different types of bows and their appropriate contexts',
      duration: '5 min'
    },
    {
      id: 'interactive-practice',
      title: 'Interactive Practice',
      icon: Target,
      description: 'Practice real scenarios with immediate feedback',
      duration: '7 min'
    },
    {
      id: 'cultural-feedback',
      title: 'Cultural Feedback',
      icon: Trophy,
      description: 'Review your performance and cultural understanding',
      duration: '2 min'
    },
    {
      id: 'spaced-review',
      title: 'Spaced Review',
      icon: RefreshCw,
      description: 'Schedule review for optimal retention',
      duration: '1 min'
    }
  ]

  const handleStepComplete = (stepId) => {
    setStepProgress(prev => ({ ...prev, [stepId]: true }))

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setModuleCompleted(true)
      recordActivity('module_completed', { moduleId, totalSteps: steps.length })
    }
  }

  const renderCulturalInsight = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-4">Understanding Bowing in Japanese Shops</h2>

      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">🎌 Cultural Context</h3>
        <p className="text-blue-100 leading-relaxed">
          Bowing (ojigi) is fundamental to Japanese social interaction. In shops, it shows respect for the
          service you're receiving and acknowledges the staff's hospitality. The depth and duration of your
          bow communicates your level of gratitude and respect.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">🙇‍♀️ Types of Bows</h3>
          <div className="space-y-3 text-blue-100">
            <div>
              <span className="font-semibold text-white">Eshaku (15°):</span> Light bow for acknowledgment
            </div>
            <div>
              <span className="font-semibold text-white">Keirei (30°):</span> Standard respectful bow
            </div>
            <div>
              <span className="font-semibold text-white">Saikeirei (45°):</span> Deep bow for formal situations
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">🏪 Shop Context</h3>
          <div className="space-y-3 text-blue-100">
            <div>
              <span className="font-semibold text-white">Entering:</span> Light nod to acknowledge "Irasshaimase"
            </div>
            <div>
              <span className="font-semibold text-white">Receiving help:</span> Standard bow (30°)
            </div>
            <div>
              <span className="font-semibold text-white">Leaving:</span> Respectful bow with "Arigatou gozaimasu"
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">💡 Key Insight</h3>
        <p className="text-blue-100">
          Unlike Western customer service where "the customer is always right," Japanese service is based on
          mutual respect. Your bow shows appreciation for their care and creates harmony in the interaction.
        </p>
      </div>

      <button
        onClick={() => handleStepComplete('cultural-insight')}
        className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
      >
        Continue to Pattern Recognition
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  )

  const renderPatternRecognition = () => {
    const [selectedScenario, setSelectedScenario] = useState(null)
    const [showFeedback, setShowFeedback] = useState(false)

    const scenarios = [
      {
        id: 1,
        situation: "Staff member greets you with 'Irasshaimase!' as you enter",
        image: "👋",
        correctBow: "light-nod",
        options: [
          { id: "light-nod", text: "Light nod (5-10°)", correct: true },
          { id: "standard", text: "Standard bow (30°)", correct: false },
          { id: "deep", text: "Deep bow (45°)", correct: false },
          { id: "no-bow", text: "No response needed", correct: false }
        ],
        explanation: "A light nod acknowledges their greeting without overdoing it. This is a general welcome, not personal service."
      },
      {
        id: 2,
        situation: "Shop clerk spends 10 minutes helping you find the right item",
        image: "🛍️",
        correctBow: "standard",
        options: [
          { id: "light-nod", text: "Light nod (5-10°)", correct: false },
          { id: "standard", text: "Standard bow (30°)", correct: true },
          { id: "deep", text: "Deep bow (45°)", correct: false },
          { id: "no-bow", text: "Just say thank you", correct: false }
        ],
        explanation: "Personal assistance deserves a proper bow showing genuine appreciation for their time and effort."
      },
      {
        id: 3,
        situation: "You accidentally knock over a display and staff helps clean up",
        image: "😅",
        correctBow: "deep",
        options: [
          { id: "light-nod", text: "Light nod (5-10°)", correct: false },
          { id: "standard", text: "Standard bow (30°)", correct: false },
          { id: "deep", text: "Deep bow (45°)", correct: true },
          { id: "no-bow", text: "Just apologize verbally", correct: false }
        ],
        explanation: "A mistake that caused trouble requires a deep bow to properly convey your apology and gratitude for their understanding."
      }
    ]

    const handleSelection = (scenario, option) => {
      setSelectedScenario({ scenario, option })
      setShowFeedback(true)
    }

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-4">Pattern Recognition: Matching Bows to Situations</h2>

        <p className="text-blue-100 text-lg">
          Practice identifying the appropriate bow for different shop interactions. Consider the level of service and situation.
        </p>

        <div className="space-y-6">
          {scenarios.map((scenario, index) => (
            <div key={scenario.id} className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{scenario.image}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">Scenario {index + 1}</h3>
                  <p className="text-blue-100">{scenario.situation}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {scenario.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelection(scenario, option)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      selectedScenario?.scenario.id === scenario.id && selectedScenario?.option.id === option.id
                        ? option.correct
                          ? 'bg-green-500/20 border-green-500 text-green-300'
                          : 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10'
                    }`}
                    disabled={selectedScenario?.scenario.id === scenario.id}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              {selectedScenario?.scenario.id === scenario.id && showFeedback && (
                <div className="mt-4 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    {selectedScenario.option.correct ? '✅ Correct!' : '❌ Not quite right'}
                  </h4>
                  <p className="text-blue-100">{scenario.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => handleStepComplete('pattern-recognition')}
          disabled={!showFeedback}
          className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Interactive Practice
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (steps[currentStep].id) {
      case 'cultural-insight':
        return renderCulturalInsight()
      case 'pattern-recognition':
        return renderPatternRecognition()
      case 'interactive-practice':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Interactive Practice</h2>
            <p className="text-blue-100 text-lg mb-6">
              Let's practice with the existing shop scenario, now with enhanced focus on bowing etiquette!
            </p>
            <Link
              to="/practice/entering-shop"
              className="inline-flex items-center px-6 py-4 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <Target className="w-5 h-5 mr-2" />
              Practice Shop Scenarios
            </Link>
            <button
              onClick={() => handleStepComplete('interactive-practice')}
              className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              Mark as Complete
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )
      case 'cultural-feedback':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Cultural Feedback</h2>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">🎉 Excellent Work!</h3>
              <p className="text-blue-100 mb-4">
                You've completed the bowing etiquette module. Here's what you've mastered:
              </p>
              <ul className="list-disc list-inside text-blue-100 space-y-2">
                <li>Understanding the cultural significance of bowing in Japanese shops</li>
                <li>Recognizing appropriate bow types for different situations</li>
                <li>Practicing real-world scenarios with confidence</li>
              </ul>
            </div>
            <button
              onClick={() => handleStepComplete('cultural-feedback')}
              className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              Continue to Spaced Review
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )
      case 'spaced-review':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Spaced Review Scheduled</h2>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">📅 Review Schedule</h3>
              <p className="text-blue-100 mb-4">
                To help you remember what you've learned, we've scheduled review sessions:
              </p>
              <div className="space-y-2 text-blue-100">
                <div>✅ <strong>Tomorrow:</strong> Quick review of bow types</div>
                <div>✅ <strong>In 3 days:</strong> Pattern recognition practice</div>
                <div>✅ <strong>In 1 week:</strong> Full scenario review</div>
              </div>
            </div>
            <button
              onClick={() => setModuleCompleted(true)}
              className="w-full bg-yellow-400 text-gray-900 px-6 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center"
            >
              Complete Module
              <Trophy className="w-5 h-5 ml-2" />
            </button>
          </div>
        )
      default:
        return null
    }
  }

  if (moduleCompleted) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Module Complete!</h1>
          <p className="text-xl text-blue-100">
            You've mastered bowing etiquette in Japanese shops
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Achievement</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">100%</div>
              <div className="text-blue-100">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">5</div>
              <div className="text-blue-100">Steps Mastered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">~18</div>
              <div className="text-blue-100">Minutes Invested</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/practice"
            className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            <Target className="w-5 h-5 mr-2" />
            More Practice
          </Link>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Progress Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Bowing Etiquette in Shops</h1>
        <p className="text-xl text-blue-100 mb-6">
          Master the cultural art of respectful interaction
        </p>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 mb-4">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="text-blue-200 text-sm">
          Step {currentStep + 1} of {steps.length} • {steps[currentStep].duration}
        </div>
      </div>

      {/* Step Navigation */}
      <div className="grid grid-cols-5 gap-2 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === currentStep
          const isCompleted = stepProgress[step.id]

          return (
            <div
              key={step.id}
              className={`text-center p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-yellow-400/20 border border-yellow-400'
                  : isCompleted
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-white/5 border border-white/20'
              }`}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${
                isActive
                  ? 'text-yellow-400'
                  : isCompleted
                  ? 'text-green-400'
                  : 'text-blue-300'
              }`} />
              <div className={`text-xs font-medium ${
                isActive
                  ? 'text-yellow-400'
                  : isCompleted
                  ? 'text-green-400'
                  : 'text-blue-300'
              }`}>
                {step.title}
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
        {renderCurrentStep()}
      </div>
    </div>
  )
}

export default BowingEtiquetteModule