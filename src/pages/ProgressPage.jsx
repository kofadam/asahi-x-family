import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Award, Calendar, Target, ArrowLeft, Home, BookOpen } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const ProgressPage = () => {
  const { user, progress } = useApp()

  const stats = {
    weeklyProgress: [
      { day: 'Mon', xp: 120 },
      { day: 'Tue', xp: 85 },
      { day: 'Wed', xp: 150 },
      { day: 'Thu', xp: 0 },
      { day: 'Fri', xp: 200 },
      { day: 'Sat', xp: 175 },
      { day: 'Sun', xp: 90 }
    ]
  }

  const maxXP = Math.max(...stats.weeklyProgress.map(d => d.xp))

  return (
    <div className="max-w-5xl mx-auto">
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
        <h1 className="text-4xl font-bold text-white mb-4">Your Progress</h1>
        <p className="text-xl text-blue-100">
          Track your journey to cultural competency
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{user?.totalXP || 0}</div>
          <div className="text-sm text-blue-200">Total XP</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Calendar className="w-8 h-8 text-orange-300 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{user?.streakCount || 0}</div>
          <div className="text-sm text-blue-200">Day Streak</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Award className="w-8 h-8 text-green-300 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{user?.level || 1}</div>
          <div className="text-sm text-blue-200">Current Level</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Target className="w-8 h-8 text-purple-300 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">
            {progress?.culturalCompetencyScore || 0}%
          </div>
          <div className="text-sm text-blue-200">Cultural Score</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">This Week's Activity</h2>
        <div className="flex items-end justify-between h-40 gap-2">
          {stats.weeklyProgress.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-white/20 rounded-t relative flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-yellow-400 to-orange-300 rounded-t transition-all duration-300"
                  style={{ height: `${(day.xp / maxXP) * 100}%`, minHeight: day.xp > 0 ? '4px' : '0' }}
                />
              </div>
              <span className="text-xs text-blue-200 mt-2">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Achievements</h2>
        {user?.achievements?.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {/* Sample achievements */}
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🌱</div>
              <p className="text-white font-semibold">First Steps</p>
              <p className="text-sm text-blue-200">Complete your first lesson</p>
            </div>
          </div>
        ) : (
          <p className="text-blue-100">Complete lessons and maintain streaks to earn achievements!</p>
        )}
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
          Continue Learning
        </Link>
      </div>
    </div>
  )
}

export default ProgressPage