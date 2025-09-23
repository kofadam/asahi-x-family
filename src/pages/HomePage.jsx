import React from 'react'
import { Link } from 'react-router-dom'
import { Sun, BookOpen, Users, Zap, Heart, Target, ArrowRight } from 'lucide-react'
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