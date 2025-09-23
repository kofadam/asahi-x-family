import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, BookOpen, Users, Target, BarChart3, User, Menu, X } from 'lucide-react'
import { useApp } from '../../contexts/AppContext'

const Navigation = () => {
  const location = useLocation()
  const { user } = useApp()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', icon: Sun },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/practice', label: 'Practice', icon: Target },
    { path: '/review', label: 'Review', icon: Users },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🌅</span>
            <span className="text-xl font-bold text-white">Asahi x Family</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  ${
                    isActive(path)
                      ? 'bg-white/20 text-yellow-300'
                      : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive(path)
                        ? 'bg-white/20 text-yellow-300'
                        : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Review Reminder */}
        {user?.pendingReviews > 0 && (
          <div className="pb-4">
            <Link
              to="/review"
              className="flex items-center justify-center px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors"
            >
              <span className="mr-2">📚</span>
              <span>{user.pendingReviews} items ready for review!</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation