import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, BookOpen, ArrowLeft, Home } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const ReviewPage = () => {
  const { pendingReviews } = useApp()

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
        <h1 className="text-4xl font-bold text-white mb-4">Spaced Review</h1>
        <p className="text-xl text-blue-100">
          Reinforce your learning with scientifically-timed reviews
        </p>
      </div>

      {pendingReviews > 0 ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <Clock className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            {pendingReviews} Items Ready for Review
          </h2>
          <p className="text-blue-100 mb-6">
            Review these items to strengthen your cultural understanding
          </p>
          <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Start Review Session
          </button>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <BookOpen className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">All Caught Up!</h2>
          <p className="text-blue-100">
            No reviews due right now. Keep learning new lessons to build your review queue.
          </p>
        </div>
      )}

      <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">How Spaced Repetition Works</h3>
        <div className="space-y-3 text-blue-100">
          <p>
            Our system uses the FSRS algorithm to optimize your learning retention:
          </p>
          <ul className="space-y-2 ml-4">
            <li>• Items you find easy will be reviewed less frequently</li>
            <li>• Challenging concepts will appear more often</li>
            <li>• Review timing adapts to your performance</li>
            <li>• Cultural appropriateness is weighted more than linguistic accuracy</li>
          </ul>
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
          Browse Lessons
        </Link>
      </div>
    </div>
  )
}

export default ReviewPage