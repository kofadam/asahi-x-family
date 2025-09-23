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

    // Navigate to the scenario page
    const scenarioRoutes = {
      'scenario-001': '/practice/entering-shop',
      'scenario-002': '/practice/train-etiquette',
      'scenario-003': '/practice/restaurant-ordering',
      'scenario-004': '/practice/temple-visits'
    }

    const route = scenarioRoutes[scenario.id]
    if (route) {
      window.location.href = route
    }
  }

  const scenarios = [
    {
      id: 'scenario-001',
      title: 'Entering a Shop',
      difficulty: 'Beginner',
      description: 'Practice appropriate greetings and behavior when entering Japanese shops',
      locked: false
    },
    {
      id: 'scenario-002',
      title: 'Train Etiquette',
      difficulty: 'Beginner',
      description: 'Learn proper behavior on Japanese trains and stations',
      locked: false
    },
    {
      id: 'scenario-003',
      title: 'Restaurant Ordering',
      difficulty: 'Intermediate',
      description: 'Navigate ordering in various types of Japanese restaurants',
      locked: true
    },
    {
      id: 'scenario-004',
      title: 'Temple Visits',
      difficulty: 'Intermediate',
      description: 'Show proper respect when visiting temples and shrines',
      locked: true
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
        <h1 className="text-4xl font-bold text-white mb-4">Practice Scenarios</h1>
        <p className="text-xl text-blue-100">
          Apply your cultural knowledge in real-world situations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => handleScenarioClick(scenario)}
            className={`
              bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20
              ${scenario.locked ? 'opacity-60' : 'hover:bg-white/15 cursor-pointer'}
              transition-all
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <Target className="w-8 h-8 text-yellow-300" />
              {scenario.locked && <Lock className="w-5 h-5 text-gray-400" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{scenario.title}</h3>
            <p className="text-sm text-yellow-300 mb-2">{scenario.difficulty}</p>
            <p className="text-blue-100">{scenario.description}</p>
            {scenario.locked && (
              <p className="text-sm text-gray-400 mt-4">Complete more lessons to unlock</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Coming Soon: More Scenarios</h2>
        <p className="text-blue-100">
          We're developing more practice scenarios based on community feedback. Each scenario
          will help you build confidence for real interactions in Japan.
        </p>
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