import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Settings, Bell, Moon, Save, ArrowLeft, Home, BookOpen } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const ProfilePage = () => {
  const { user, updateUser } = useApp()
  const [name, setName] = useState(user?.name || '')
  const [dailyGoal, setDailyGoal] = useState(user?.preferences?.dailyGoal || 15)
  const [notifications, setNotifications] = useState(user?.preferences?.notificationsEnabled || false)
  const [theme, setTheme] = useState(user?.preferences?.theme || 'auto')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    await updateUser({
      name,
      preferences: {
        ...user?.preferences,
        dailyGoal,
        notificationsEnabled: notifications,
        theme
      }
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto">
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
        <h1 className="text-4xl font-bold text-white mb-4">Your Profile</h1>
        <p className="text-xl text-blue-100">
          Customize your learning experience
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <User className="w-6 h-6 mr-2" />
          Personal Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-300"
              placeholder="Enter your name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-200">Member Since</p>
              <p className="text-lg text-white">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-blue-200">Total Study Days</p>
              <p className="text-lg text-white">{user?.streakCount || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-2" />
          Learning Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Daily Goal (minutes)
            </label>
            <select
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-300"
            >
              <option value={5}>5 minutes (Light)</option>
              <option value={10}>10 minutes (Casual)</option>
              <option value={15}>15 minutes (Regular)</option>
              <option value={30}>30 minutes (Serious)</option>
              <option value={60}>60 minutes (Intense)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded bg-white/10 border-white/20 text-yellow-400 focus:ring-yellow-400"
              />
              <div className="flex items-center text-white">
                <Bell className="w-5 h-5 mr-2" />
                <span>Enable daily reminders</span>
              </div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              <Moon className="w-4 h-4 inline mr-2" />
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-300"
            >
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/lessons"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Continue Learning
          </Link>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default ProfilePage