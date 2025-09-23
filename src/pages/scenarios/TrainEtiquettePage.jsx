import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Target, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const TrainEtiquettePage = () => {
  const { user } = useApp()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showPractice, setShowPractice] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const scenarios = [
    {
      id: 1,
      situation: "You're waiting on the platform and the train arrives. There are passengers trying to exit while others are pushing to board. What should you do?",
      options: [
        { id: 'a', text: "Push forward to secure a spot", correct: false },
        { id: 'b', text: "Wait to the side and let passengers exit first", correct: true },
        { id: 'c', text: "Stand in the middle of the door", correct: false },
        { id: 'd', text: "Board immediately when doors open", correct: false }
      ],
      explanation: "Always let passengers exit before boarding. Stand to the sides of the doors and wait patiently. This is fundamental train etiquette in Japan."
    },
    {
      id: 2,
      situation: "The train is packed during rush hour and your phone rings. What's the appropriate response?",
      options: [
        { id: 'a', text: "Answer quietly and have a short conversation", correct: false },
        { id: 'b', text: "Let it ring and send a text message instead", correct: true },
        { id: 'c', text: "Answer normally - everyone will understand", correct: false },
        { id: 'd', text: "Leave the train to take the call", correct: false }
      ],
      explanation: "Phone calls are not allowed on trains. Phones should be on silent mode. If you must communicate, send a text message instead."
    },
    {
      id: 3,
      situation: "You're wearing a large backpack on a crowded train. What should you do with it?",
      options: [
        { id: 'a', text: "Keep it on your back as normal", correct: false },
        { id: 'b', text: "Hold it in front of you or place it on the floor", correct: true },
        { id: 'c', text: "Put it on an empty seat", correct: false },
        { id: 'd', text: "Hold it above your head", correct: false }
      ],
      explanation: "Remove your backpack and hold it in front of you or place it between your feet on crowded trains. This prevents it from hitting other passengers."
    },
    {
      id: 4,
      situation: "You see an elderly person standing while you're sitting in a regular seat. What's the polite thing to do?",
      options: [
        { id: 'a', text: "Continue sitting - it's a regular seat", correct: false },
        { id: 'b', text: "Offer your seat with a gesture", correct: true },
        { id: 'c', text: "Pretend not to notice", correct: false },
        { id: 'd', text: "Only move if they ask", correct: false }
      ],
      explanation: "It's courteous to offer your seat to elderly passengers, pregnant women, or people with disabilities, even in regular seats."
    }
  ]

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    setShowResult(true)
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetPractice = () => {
    setCurrentScenario(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/practice"
          className="flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Practice Scenarios
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
          <Target className="w-8 h-8 text-gray-900" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Train Etiquette</h1>
        <p className="text-xl text-blue-100">Navigate Japanese trains like a local</p>
        <div className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium mt-2">
          Beginner Level
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Essential Rules */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Essential Rules
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🚉 Platform Etiquette</h3>
              <p className="text-blue-100">Queue properly on platform markings. Let passengers exit before boarding.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🔇 Keep It Quiet</h3>
              <p className="text-blue-100">Keep conversations quiet and phones on silent. No phone calls - texting only.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">💺 Priority Seats</h3>
              <p className="text-blue-100">Offer priority seats to elderly, pregnant, or disabled passengers.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🎒 Backpack Rules</h3>
              <p className="text-blue-100">Remove backpack in crowded trains. Don't eat strong-smelling food.</p>
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🚊 Cultural Context</h2>
          <div className="space-y-4 text-blue-100">
            <p>
              Japanese trains are incredibly punctual and efficient. The system relies on everyone following social rules that prioritize group harmony and consideration.
            </p>
            <p>
              During rush hour (7-9 AM, 5-7 PM), trains can be extremely crowded, but everyone maintains order and courtesy. Station staff will help push people into cars when needed - this is normal!
            </p>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-white mb-2">⏰ Rush Hour Tips</h3>
              <p className="text-sm">
                If possible, avoid rush hours for a more comfortable experience. If you must travel during these times, prepare for very crowded conditions and follow the flow of other passengers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <PlayCircle className="w-6 h-6 mr-2 text-green-400" />
            Interactive Practice
          </h2>
          {showPractice && (
            <button
              onClick={resetPractice}
              className="flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          )}
        </div>

        {!showPractice ? (
          <div className="text-center">
            <p className="text-blue-100 mb-6">
              Practice train etiquette with real scenarios you might encounter on Japanese trains.
            </p>
            <button
              onClick={() => setShowPractice(true)}
              className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Practice
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-200">Scenario {currentScenario + 1} of {scenarios.length}</span>
                <div className="flex space-x-1">
                  {scenarios.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentScenario ? 'bg-yellow-400' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Situation</h3>
              <p className="text-blue-100 text-lg">{scenarios[currentScenario].situation}</p>
            </div>

            <div className="grid gap-3 mb-6">
              {scenarios[currentScenario].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    showResult
                      ? option.correct
                        ? 'bg-green-500/20 border-green-500 text-green-300'
                        : selectedAnswer?.id === option.id
                        ? 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-white/5 border-white/20 text-blue-100'
                      : selectedAnswer?.id === option.id
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                      : 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold mr-3">{option.id.toUpperCase()}.</span>
                  {option.text}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-white mb-2">
                  {selectedAnswer?.correct ? '✅ Correct!' : '❌ Not quite right'}
                </h4>
                <p className="text-blue-100">{scenarios[currentScenario].explanation}</p>
              </div>
            )}

            {showResult && (
              <div className="flex justify-center">
                {currentScenario < scenarios.length - 1 ? (
                  <button
                    onClick={nextScenario}
                    className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                  >
                    Next Scenario
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-green-400 font-semibold mb-4">🎉 Practice Complete!</p>
                    <button
                      onClick={resetPractice}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Practice Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Station Navigation */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🗺️ Station Navigation Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">Finding Your Platform</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Look for English signs - major stations have them</li>
              <li>• Use station maps near entrances</li>
              <li>• Follow colored lines on the floor</li>
              <li>• Ask station staff - they're very helpful</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">IC Card Usage</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Tap card on reader when entering</li>
              <li>• Keep card handy throughout journey</li>
              <li>• Tap again when exiting</li>
              <li>• Insufficient funds? Top up at machines</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Situations */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🤝 Common Situations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Lost or Confused?</h3>
            <p className="text-blue-100 text-sm">Station staff wear uniforms and are extremely helpful. Show them your destination on your phone if needed.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Missing Your Stop?</h3>
            <p className="text-blue-100 text-sm">Don't panic! Get off at the next station and take a train back. Most lines run frequently.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Emergency Stop?</h3>
            <p className="text-blue-100 text-sm">Stay calm and follow other passengers. Announcements will be made, though they may be in Japanese first.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Women-Only Cars</h3>
            <p className="text-blue-100 text-sm">During rush hours, some cars are women-only. Look for pink signs and follow other passengers' lead.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link
          to="/practice"
          className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Scenarios
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

export default TrainEtiquettePage