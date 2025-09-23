import React from 'react'
import Navigation from './Navigation'
import AchievementNotification from '../ui/AchievementNotification'
import { useApp } from '../../contexts/AppContext'

const Layout = ({ children }) => {
  const { user, achievementNotification, clearAchievementNotification } = useApp()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {user?.streakCount > 0 && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 text-orange-200 border border-orange-400/50 backdrop-blur-sm animate-pulse">
              <span className="text-3xl mr-3 animate-bounce">🔥</span>
              <div className="text-center">
                <div className="font-bold text-lg">{user.streakCount} 日連続!</div>
                <div className="text-xs text-orange-300">
                  {user.streakCount >= 7 ? "Weekly Warrior! 週間戦士！" : "Keep it up! がんばって！"}
                </div>
              </div>
              <span className="text-2xl ml-3 animate-spin" style={{ animationDuration: '3s' }}>⚡</span>
            </div>
          </div>
        )}

        {children}
      </main>

      <footer className="mt-auto py-6 text-center text-blue-200 text-sm">
        <p>
          Built with respect for cultural exchange •
          <a
            href="https://github.com/kofadam/asahi-x-family"
            className="hover:text-white ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache 2.0 License
          </a>
        </p>
      </footer>

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={achievementNotification}
        onClose={clearAchievementNotification}
      />
    </div>
  )
}

export default Layout