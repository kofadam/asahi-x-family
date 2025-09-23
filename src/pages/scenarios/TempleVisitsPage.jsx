import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home, Target, CheckCircle, PlayCircle, RotateCcw } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const TempleVisitsPage = () => {
  const { user } = useApp()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showPractice, setShowPractice] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const scenarios = [
    {
      id: 1,
      situation: "You arrive at a Shinto shrine and see a torii gate at the entrance. How should you pass through it?",
      options: [
        { id: 'a', text: "Walk straight through the center", correct: false },
        { id: 'b', text: "Bow slightly and walk to one side", correct: true },
        { id: 'c', text: "Run through quickly to not block others", correct: false },
        { id: 'd', text: "Touch the torii for good luck", correct: false }
      ],
      explanation: "Bow slightly when passing through torii gates and walk to the side rather than the center, which is reserved for the kami (spirits)."
    },
    {
      id: 2,
      situation: "At the purification fountain, you need to cleanse yourself. What's the correct first step?",
      options: [
        { id: 'a', text: "Splash water on your face", correct: false },
        { id: 'b', text: "Take the ladle with your right hand and rinse your left", correct: true },
        { id: 'c', text: "Drink the water for purification", correct: false },
        { id: 'd', text: "Pour water over your head", correct: false }
      ],
      explanation: "Start by taking the ladle with your right hand and rinsing your left hand, then switch hands and rinse your right hand."
    },
    {
      id: 3,
      situation: "You're ready to pray at the main shrine. What's the proper sequence?",
      options: [
        { id: 'a', text: "Clap once, bow twice, pray, bow once", correct: false },
        { id: 'b', text: "Bow twice, clap twice, pray, bow once", correct: true },
        { id: 'c', text: "Bow once, clap once, pray, bow twice", correct: false },
        { id: 'd', text: "Just pray silently without bowing or clapping", correct: false }
      ],
      explanation: "The traditional sequence is: bow twice, clap twice, make your prayer, then bow once more. This is called '2-2-1'."
    },
    {
      id: 4,
      situation: "You want to take a photo inside a Buddhist temple's main hall. What should you do?",
      options: [
        { id: 'a', text: "Take photos quietly without flash", correct: false },
        { id: 'b', text: "Ask permission first or look for signs", correct: true },
        { id: 'c', text: "Take photos only of decorations, not Buddha statues", correct: false },
        { id: 'd', text: "Take photos quickly before anyone notices", correct: false }
      ],
      explanation: "Always check for signs or ask permission before photographing inside temple buildings. Many prohibit photography entirely."
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
        <h1 className="text-4xl font-bold text-white mb-2">Temple Visits</h1>
        <p className="text-xl text-blue-100">Show proper respect at sacred spaces</p>
        <div className="inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium mt-2">
          Intermediate Level
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Temple vs Shrine */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Temples vs Shrines
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">🏛️ Buddhist Temples</h3>
              <p className="text-blue-100">Look for pagodas, Buddha statues, and incense. Bow before entering main halls.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">⛩️ Shinto Shrines</h3>
              <p className="text-blue-100">Recognized by torii gates. Purify hands and mouth at water basin before approaching.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">📸 Photography</h3>
              <p className="text-blue-100">Check for signs before taking photos. Main halls often prohibit photography inside.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">👥 Crowds</h3>
              <p className="text-blue-100">Be patient and respectful. Move quietly and avoid blocking other visitors' prayers.</p>
            </div>
          </div>
        </div>

        {/* Proper Worship */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🙏 Proper Worship</h2>
          <div className="space-y-4 text-blue-100">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">Shrine Worship (2-2-1)</h3>
              <p className="text-sm">
                1. Bow twice deeply<br/>
                2. Clap twice<br/>
                3. Make your prayer<br/>
                4. Bow once more
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">Temple Worship</h3>
              <p className="text-sm">
                1. Light incense if available<br/>
                2. Place hands together in prayer<br/>
                3. Bow respectfully<br/>
                4. Make silent prayer
              </p>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-white mb-2">💰 Offerings</h3>
              <p className="text-sm">
                Small coins (5 or 50 yen) are traditional. Place gently in offering box - don't throw loudly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purification Ritual */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🚿 Purification at Shrines</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">1️⃣</div>
            <h3 className="font-semibold text-yellow-300 mb-2">Right Hand</h3>
            <p className="text-blue-100 text-sm">Take ladle with right hand, rinse left hand</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">2️⃣</div>
            <h3 className="font-semibold text-yellow-300 mb-2">Left Hand</h3>
            <p className="text-blue-100 text-sm">Switch ladle to left hand, rinse right hand</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">3️⃣</div>
            <h3 className="font-semibold text-yellow-300 mb-2">Mouth</h3>
            <p className="text-blue-100 text-sm">Cup water in right hand, rinse mouth (don't drink)</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">4️⃣</div>
            <h3 className="font-semibold text-yellow-300 mb-2">Ladle</h3>
            <p className="text-blue-100 text-sm">Hold ladle upright to rinse handle, return to stand</p>
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
              Practice proper temple and shrine etiquette through realistic scenarios you'll encounter in Japan.
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

      {/* Etiquette Guidelines */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">📜 Etiquette Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">Respectful Behavior</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Bow when passing through torii gates</li>
              <li>• Walk to the side of main pathways</li>
              <li>• Keep voices low and conversations quiet</li>
              <li>• Dress modestly (cover shoulders and knees)</li>
              <li>• Turn off phone or keep it silent</li>
              <li>• Follow any specific rules posted</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-300 mb-3">What to Avoid</h3>
            <ul className="space-y-2 text-blue-100">
              <li>• Don't touch sacred objects or altars</li>
              <li>• Avoid pointing at Buddhist statues</li>
              <li>• Don't wear hats inside main halls</li>
              <li>• Don't eat or drink in sacred areas</li>
              <li>• Avoid flash photography</li>
              <li>• Don't disturb people praying</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special Occasions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎋 Special Occasions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">New Year (Hatsumode)</h3>
            <p className="text-blue-100 text-sm">First shrine visit of the year. Expect crowds and longer wait times. Traditional time for prayers and wishes.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Festivals (Matsuri)</h3>
            <p className="text-blue-100 text-sm">Special ceremonies with different etiquette. Follow the lead of locals and respect any barriers or designated areas.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Ema (Wooden Plaques)</h3>
            <p className="text-blue-100 text-sm">Write wishes on wooden plaques and hang them up. Use respectful language even in other languages.</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-300 mb-2">Omamori (Amulets)</h3>
            <p className="text-blue-100 text-sm">Good luck charms for various purposes. Don't open them - it's believed to release the protective power.</p>
          </div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-white mb-2">⚠️ Important</h3>
          <p className="text-sm text-blue-100">
            During busy periods like New Year, be extra patient and follow crowd control instructions from shrine staff.
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

export default TempleVisitsPage