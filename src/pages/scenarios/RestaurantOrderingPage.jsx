import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Target, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const RestaurantOrderingPage = () => {
  const { user } = useApp()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showPractice, setShowPractice] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const scenarios = [
    {
      id: 1,
      situation: "You enter a ramen shop and see a vending machine by the entrance. The staff is busy. What should you do first?",
      options: [
        { id: 'a', text: "Wait for staff to help you", correct: false },
        { id: 'b', text: "Buy a ticket from the vending machine", correct: true },
        { id: 'c', text: "Find a seat and wait", correct: false },
        { id: 'd', text: "Ask other customers for help", correct: false }
      ],
      explanation: "In ramen shops with vending machines, you buy your meal ticket first, then find a seat and hand the ticket to staff."
    },
    {
      id: 2,
      situation: "At a sushi restaurant, you want to order but don't speak much Japanese. What's the best approach?",
      options: [
        { id: 'a', text: "Point to items on the menu", correct: true },
        { id: 'b', text: "Try to pronounce everything in Japanese", correct: false },
        { id: 'c', text: "Order only items you know the names of", correct: false },
        { id: 'd', text: "Ask them to choose for you", correct: false }
      ],
      explanation: "Pointing to menu items is perfectly acceptable and commonly done. Most restaurants are used to helping foreign customers this way."
    },
    {
      id: 3,
      situation: "You're eating at an izakaya and want to order more drinks. How do you get the staff's attention?",
      options: [
        { id: 'a', text: "Wave your hands and shout", correct: false },
        { id: 'b', text: "Press the call button on the table", correct: true },
        { id: 'c', text: "Get up and find a server", correct: false },
        { id: 'd', text: "Wait until they pass by your table", correct: false }
      ],
      explanation: "Most izakayas and family restaurants have call buttons on tables. This is the standard way to get service."
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
        <h1 className="text-4xl font-bold text-white mb-2">Restaurant Ordering</h1>
        <p className="text-xl text-blue-100">Navigate dining experiences in Japan with confidence</p>
        <div className="inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium mt-2">
          Intermediate Level
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Restaurant Types */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Restaurant Types
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🍜 Ramen Shops</h3>
              <p className="text-blue-100">Order at vending machines, find a seat, hand ticket to staff. Slurping is encouraged!</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🍣 Sushi Bars</h3>
              <p className="text-blue-100">Sit at counter or table. Order individual pieces or sets. Don't mix wasabi in soy sauce.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🏮 Izakayas</h3>
              <p className="text-blue-100">Order drinks first, then food throughout the meal. Share dishes with your group.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🍽️ Family Restaurants</h3>
              <p className="text-blue-100">Similar to Western style. Menu often has pictures. Use call button for service.</p>
            </div>
          </div>
        </div>

        {/* Ordering Process */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">📋 Ordering Process</h2>
          <div className="space-y-4 text-blue-100">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">1. Seating</h3>
              <p>Wait to be seated or find available seats. Some places require removing shoes.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">2. Menu Study</h3>
              <p>Take time to read the menu. Many have pictures or plastic food displays to help.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">3. Ordering</h3>
              <p>Call staff with "Sumimasen" or use call button. Point to menu items if language is a barrier.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">4. Payment</h3>
              <p>Pay at register when leaving, not at table. Tipping is not customary in Japan.</p>
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
              Practice restaurant scenarios to build confidence for real dining experiences in Japan.
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
        <h2 className="text-2xl font-bold text-white mb-4">🗣️ Essential Phrases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Kore wo kudasai</div>
            <div className="text-blue-200 text-sm">koh-reh woh koo-dah-sigh</div>
            <div className="text-blue-100 mt-1">I'll have this (point to menu)</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Nani ga osusume desu ka?</div>
            <div className="text-blue-200 text-sm">nah-nee gah oh-soo-soo-meh deh-soo kah</div>
            <div className="text-blue-100 mt-1">What do you recommend?</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Mizu wo kudasai</div>
            <div className="text-blue-200 text-sm">mee-zoo woh koo-dah-sigh</div>
            <div className="text-blue-100 mt-1">Water, please</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Oishii desu</div>
            <div className="text-blue-200 text-sm">oh-ee-shee deh-soo</div>
            <div className="text-blue-100 mt-1">It's delicious</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Okaikei wo onegaishimasu</div>
            <div className="text-blue-200 text-sm">oh-kigh-keh-ee woh oh-neh-gigh-shee-mahs</div>
            <div className="text-blue-100 mt-1">Check, please</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-yellow-300 font-semibold">Gochisousama deshita</div>
            <div className="text-blue-200 text-sm">goh-chee-soh-sah-mah deh-shee-tah</div>
            <div className="text-blue-100 mt-1">Thank you for the meal (when leaving)</div>
          </div>
        </div>
      </div>

      {/* Cultural Tips */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎌 Important Cultural Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">Do's</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Say "Itadakimasu" before eating</li>
              <li>• Use both hands to receive items</li>
              <li>• Finish everything on your plate</li>
              <li>• Pour drinks for others, not yourself</li>
              <li>• Bow slightly when saying thank you</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">Don'ts</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Never stick chopsticks upright in rice</li>
              <li>• Don't pass food chopstick to chopstick</li>
              <li>• Avoid talking loudly</li>
              <li>• Don't tip (it's not customary)</li>
              <li>• Don't walk and eat at the same time</li>
            </ul>
          </div>
        </div>
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-white mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-blue-100">
            Many restaurants have realistic plastic food displays outside. Don't hesitate to point to what looks good - this is a completely acceptable way to order!
          </p>
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

export default RestaurantOrderingPage