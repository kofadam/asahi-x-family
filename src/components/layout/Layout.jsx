import React from 'react'
import Navigation from './Navigation'
import { useApp } from '../../contexts/AppContext'

const Layout = ({ children }) => {
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {user?.streakCount > 0 && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
              <span className="text-2xl mr-2">🔥</span>
              <span className="font-semibold">{user.streakCount} Day Streak!</span>
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
    </div>
  )
}

export default Layout