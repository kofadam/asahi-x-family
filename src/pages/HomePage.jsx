import React from 'react'
import { Link } from 'react-router-dom'
import { Sun, BookOpen, Users, Zap, Heart, Target, ArrowRight, Brain, RefreshCw, Trophy, Play } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const HomePage = () => {
  const { user, recordActivity } = useApp()

  const handleStartLearning = async () => {
    await recordActivity()
  }

  return (
    <div className="text-white">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🌅</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          Welcome Back{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Master katakana reading and essential Japanese phrases through anime-inspired learning! 🎌
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/lessons"
            onClick={handleStartLearning}
            className="inline-flex items-center px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Choose a Lesson
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>

          {user?.pendingReviews > 0 && (
            <Link
              to="/review"
              className="inline-flex items-center px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-400 transition-colors"
            >
              <Target className="w-5 h-5 mr-2" />
              Review {user.pendingReviews} Items
            </Link>
          )}
        </div>
      </div>

      {/* Featured: Complete Learning Module */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-8 mb-12 max-w-5xl mx-auto border border-yellow-500/30">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">✨ Try Our Complete Learning Experience</h2>
          <p className="text-xl text-blue-100">
            Experience the full learning cycle: Cultural Insight → Pattern Recognition → Interactive Practice → Cultural Feedback → Spaced Review
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">🙇‍♀️</span>
            <div>
              <h3 className="text-2xl font-bold text-white">How to Bow to a Stranger in a Shop</h3>
              <p className="text-blue-100">Master respectful interactions with Japanese cultural etiquette</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-300" />
              <div className="text-sm font-medium text-blue-300">Cultural Insight</div>
              <div className="text-xs text-blue-200">3 min</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Brain className="w-6 h-6 mx-auto mb-2 text-purple-300" />
              <div className="text-sm font-medium text-purple-300">Pattern Recognition</div>
              <div className="text-xs text-blue-200">5 min</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-green-300" />
              <div className="text-sm font-medium text-green-300">Interactive Practice</div>
              <div className="text-xs text-blue-200">7 min</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <div className="text-sm font-medium text-yellow-300">Cultural Feedback</div>
              <div className="text-xs text-blue-200">2 min</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <RefreshCw className="w-6 h-6 mx-auto mb-2 text-orange-300" />
              <div className="text-sm font-medium text-orange-300">Spaced Review</div>
              <div className="text-xs text-blue-200">1 min</div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/modules/bowing-etiquette"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Complete Module
              <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
            <p className="text-sm text-blue-200 mt-3">
              Experience the full learning cycle described in our methodology
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-blue-100 text-sm">
            This demonstrates our <strong>5-step learning methodology</strong> that combines cultural education,
            pattern recognition, interactive practice, immediate feedback, and spaced repetition for optimal retention.
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      {user && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-4xl mx-auto border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold">{user.streakCount || 0}</div>
              <div className="text-sm text-blue-200">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold">{user.totalXP || 0}</div>
              <div className="text-sm text-blue-200">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold">{user.level || 1}</div>
              <div className="text-sm text-blue-200">Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold">{user.achievements?.length || 0}</div>
              <div className="text-sm text-blue-200">Achievements</div>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
        <Link to="/lessons" className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <BookOpen className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Japanese Lessons</h3>
            <p className="text-blue-100">
              Learn katakana characters and basic Japanese pronunciation
            </p>
          </div>
        </Link>

        <Link to="/practice" className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Target className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Scenario Practice</h3>
            <p className="text-blue-100">
              Practice real-world situations you'll encounter in Japan
            </p>
          </div>
        </Link>

        <Link to="/review" className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Users className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Spaced Review</h3>
            <p className="text-blue-100">
              Scientifically optimized review schedule for retention
            </p>
          </div>
        </Link>

        <Link to="/progress" className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Zap className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-blue-100">
              See your cultural competency growth over time
            </p>
          </div>
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 opacity-60">
          <Heart className="w-12 h-12 text-yellow-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-blue-100">
            Coming soon: Share insights with fellow learners
          </p>
        </div>

        <Link to="/profile" className="group">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <Sun className="w-12 h-12 text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profile</h3>
            <p className="text-blue-100">
              Customize your learning experience and goals
            </p>
          </div>
        </Link>
      </div>

      {/* Mission Statement */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-blue-100">
          <strong>Our Mission:</strong> Help anime fans learn to read katakana and speak basic Japanese
          through bite-sized lessons perfect for your next Japan adventure! From reading anime titles
          to greeting people like your favorite characters! 🗾✨
        </p>
      </div>
    </div>
  )
}

export default HomePage