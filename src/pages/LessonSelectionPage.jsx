import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Star, Lock, CheckCircle } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { getLessonsWithUnlockStatus } from '../utils/lessonSystem'

const LessonSelectionPage = () => {
  const { progress } = useApp()
  const lessonsWithProgress = getLessonsWithUnlockStatus(progress).map(lesson => ({
    ...lesson,
    completed: progress?.lessons?.[lesson.id]?.completed || false,
    accuracyScore: progress?.lessons?.[lesson.id]?.accuracyScore || 0,
    lastCompleted: progress?.lessons?.[lesson.id]?.lastCompleted || null
  }))

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-red-400'
      default: return 'text-blue-400'
    }
  }

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 border-yellow-500/30'
      case 'Advanced': return 'bg-red-500/20 border-red-500/30'
      default: return 'bg-blue-500/20 border-blue-500/30'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Lesson</h1>
        <p className="text-xl text-blue-100">
          Build cultural competency one lesson at a time
        </p>
      </div>

      <div className="grid gap-6">
        {lessonsWithProgress.map((lesson) => (
          <div
            key={lesson.id}
            className={`
              bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20
              ${lesson.unlocked ? 'hover:bg-white/15 transition-all' : 'opacity-60'}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {lesson.completed ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : lesson.unlocked ? (
                  <BookOpen className="w-8 h-8 text-yellow-300" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`text-sm px-2 py-1 rounded border ${getDifficultyBg(lesson.difficulty)} ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                    <div className="flex items-center text-sm text-blue-200">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                </div>
              </div>

              {lesson.completed && (
                <div className="text-right">
                  <div className="flex items-center text-green-400 mb-1">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">{Math.round(lesson.accuracyScore * 100)}%</span>
                  </div>
                  <p className="text-xs text-blue-200">Accuracy</p>
                </div>
              )}
            </div>

            <p className="text-blue-100 mb-4">{lesson.description}</p>

            <div className="mb-4">
              <p className="text-sm text-blue-200 mb-2">Focus: {lesson.focus}</p>
              <div className="space-y-1">
                {lesson.learningObjectives?.map((objective, index) => (
                  <div key={index} className="flex items-start text-sm text-blue-100">
                    <span className="text-yellow-300 mr-2">•</span>
                    {objective}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              {lesson.unlocked ? (
                <Link
                  to={`/learn/${lesson.id}`}
                  className="inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
                >
                  {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                </Link>
              ) : (
                <div className="text-gray-400 text-sm">
                  Complete previous lessons to unlock
                </div>
              )}

              {lesson.completed && (
                <div className="text-xs text-blue-200">
                  Last completed: {new Date(lesson.lastCompleted).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-3">🎓 Learning Path</h3>
        <p className="text-blue-100 mb-4">
          Lessons are designed to build upon each other. Start with beginner lessons to build your foundation,
          then progress to intermediate topics for deeper cultural understanding.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="text-green-400 font-semibold mb-2">Beginner</h4>
            <p className="text-blue-200">Basic etiquette and social awareness</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="text-yellow-400 font-semibold mb-2">Intermediate</h4>
            <p className="text-blue-200">Complex social situations and customs</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="text-red-400 font-semibold mb-2">Advanced</h4>
            <p className="text-blue-200">Nuanced cultural understanding</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonSelectionPage