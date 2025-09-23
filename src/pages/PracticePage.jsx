import React from 'react'
import { Link } from 'react-router-dom'
import { Target, Lock, ArrowLeft, Home, BookOpen } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const PracticePage = () => {
  const { user } = useApp()

  const handleScenarioClick = (scenario) => {
    if (scenario.locked) {
      return // Do nothing if locked
    }

    if (scenario.action === 'practice') {
      // For now, redirect to lessons until we implement specific scenario practice
      window.location.href = '/lessons'
    } else if (scenario.action === 'coming-soon') {
      // Show coming soon message
      alert('🚧 This scenario is coming soon! Complete more lessons to unlock it.')
    }
  }

  const scenarios = [
    {
      id: 'reading-signs',
      title: 'Reading Street Signs',
      difficulty: 'Beginner',
      description: 'Practice reading katakana words on Japanese street signs and shop names',
      locked: false,
      action: 'practice'
    },
    {
      id: 'anime-shop',
      title: 'Akihabara Anime Shop',
      difficulty: 'Beginner',
      description: 'Read anime titles and merchandise names in katakana like a pro otaku!',
      locked: false,
      action: 'practice'
    },
    {
      id: 'convenience-store',
      title: 'Konbini Adventure',
      difficulty: 'Intermediate',
      description: 'Navigate a Japanese convenience store by reading product names in katakana',
      locked: true,
      action: 'coming-soon'
    },
    {
      id: 'restaurant-menu',
      title: 'Menu Reading Master',
      difficulty: 'Intermediate',
      description: 'Order food by reading katakana menu items at Japanese restaurants',
      locked: true,
      action: 'coming-soon'
    }
  ]

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

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Japanese Reading Practice</h1>
        <p className="text-xl text-blue-100">
          Practice reading katakana in real-world Japan scenarios! 🎌
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => handleScenarioClick(scenario)}
            className={`
              bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20
              ${scenario.locked ? 'opacity-60' : 'hover:bg-white/15 cursor-pointer hover:border-yellow-400/50'}
              transition-all
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <Target className="w-8 h-8 text-yellow-300" />
              {scenario.locked && <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{scenario.title}</h3>
            <p className="text-sm text-yellow-300 mb-2">{scenario.difficulty}</p>
            <p className="text-blue-100 mb-3">{scenario.description}</p>

            {!scenario.locked && scenario.action === 'practice' && (
              <div className="flex items-center text-green-400 text-sm">
                <span className="mr-2">▶</span>
                Click to practice reading!
              </div>
            )}

            {scenario.locked && (
              <p className="text-sm text-gray-400 mt-4">Complete more lessons to unlock</p>
            )}

            {scenario.action === 'coming-soon' && !scenario.locked && (
              <div className="flex items-center text-orange-400 text-sm">
                <span className="mr-2">🚧</span>
                Coming soon!
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 Practice Your Katakana Skills!</h2>
        <p className="text-blue-100 mb-4">
          These scenarios let you apply your katakana knowledge in real Japanese situations.
          Perfect for preparing for your Japan trip! 🇯🇵
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <span className="text-green-400 font-semibold">▶ Available Now:</span>
            <p className="text-blue-200 mt-1">Street signs and anime shop reading practice</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <span className="text-orange-400 font-semibold">🚧 Coming Soon:</span>
            <p className="text-blue-200 mt-1">Konbini adventures and menu reading challenges</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <Link
          to="/lessons"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default PracticePage