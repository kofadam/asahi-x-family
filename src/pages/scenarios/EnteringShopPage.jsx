import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Target, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const EnteringShopPage = () => {
  const { user } = useApp()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showPractice, setShowPractice] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const scenarios = [
    {
      id: 1,
      situation: "You're entering a small electronics shop in Akihabara. The staff member greets you with 'Irasshaimase!' What should you do?",
      options: [
        { id: 'a', text: "Say 'Hello' loudly in English", correct: false },
        { id: 'b', text: "Give a slight bow and continue browsing", correct: true },
        { id: 'c', text: "Ignore them and start looking around", correct: false },
        { id: 'd', text: "Say 'Arigato' immediately", correct: false }
      ],
      explanation: "A slight bow acknowledges their greeting respectfully. You don't need to respond verbally to 'Irasshaimase' - it's a general welcome to all customers."
    },
    {
      id: 2,
      situation: "You want to look at an expensive camera behind the counter. How do you get the staff's attention?",
      options: [
        { id: 'a', text: "Wave your hand and shout 'Excuse me!'", correct: false },
        { id: 'b', text: "Say 'Sumimasen' politely", correct: true },
        { id: 'c', text: "Point at the item and snap your fingers", correct: false },
        { id: 'd', text: "Wait silently until they notice you", correct: false }
      ],
      explanation: "'Sumimasen' is the polite way to get someone's attention in Japan. It means 'excuse me' and shows respect."
    },
    {
      id: 3,
      situation: "You've decided not to buy anything after browsing for 10 minutes. What do you say when leaving?",
      options: [
        { id: 'a', text: "Nothing, just leave quietly", correct: false },
        { id: 'b', text: "'Sorry for wasting your time'", correct: false },
        { id: 'c', text: "'Arigatou gozaimasu' with a slight bow", correct: true },
        { id: 'd', text: "'Maybe next time' in English", correct: false }
      ],
      explanation: "Even without purchasing, saying 'Arigatou gozaimasu' (thank you) shows appreciation for their service and hospitality."
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
        <h1 className="text-4xl font-bold text-white mb-2">Entering a Shop</h1>
        <p className="text-xl text-blue-100">Master the art of Japanese shop etiquette</p>
        <div className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium mt-2">
          Beginner Level
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Key Points */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Essential Steps
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">1. Entering</h3>
              <p className="text-blue-100">Staff will greet you with "Irasshaimase" (welcome). A slight bow in response is polite but not required.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">2. Browsing</h3>
              <p className="text-blue-100">Browse respectfully. Avoid unnecessary touching of items unless you're seriously considering a purchase.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">3. Getting Help</h3>
              <p className="text-blue-100">Use "Sumimasen" (excuse me) to politely get staff attention when you need assistance.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">4. Leaving</h3>
              <p className="text-blue-100">Say "Arigatou gozaimasu" (thank you) when leaving, even if you didn't buy anything.</p>
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🎌 Cultural Context</h2>
          <div className="space-y-4 text-blue-100">
            <p>
              Japanese customer service is exceptionally formal and respectful. Staff undergo extensive training to provide the best possible experience for customers.
            </p>
            <p>
              The concept of "omotenashi" (hospitality) means staff will go out of their way to help you, even if your Japanese is limited. Don't hesitate to ask for assistance!
            </p>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-white mb-2">💡 Pro Tip</h3>
              <p className="text-sm">
                If you're unsure about something, pointing and simple gestures work well. Japanese staff are very patient and understanding with foreign customers.
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
              Test your knowledge with realistic shop scenarios. Choose the most appropriate response in each situation.
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

      {/* Useful Phrases */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🗣️ Useful Phrases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Sumimasen</div>
            <div className="text-blue-200 text-sm">soo-mee-mah-sen</div>
            <div className="text-blue-100 mt-1">Excuse me / I'm sorry</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Arigatou gozaimasu</div>
            <div className="text-blue-200 text-sm">ah-ree-gah-toh goh-zah-ee-mahs</div>
            <div className="text-blue-100 mt-1">Thank you (formal)</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Kore wa ikura desu ka?</div>
            <div className="text-blue-200 text-sm">koh-reh wah ee-koo-rah deh-soo kah</div>
            <div className="text-blue-100 mt-1">How much is this?</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Mite mo ii desu ka?</div>
            <div className="text-blue-200 text-sm">mee-teh moh ee deh-soo kah</div>
            <div className="text-blue-100 mt-1">May I take a look?</div>
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

export default EnteringShopPage