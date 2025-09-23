import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookOpen, ChevronRight, ChevronLeft, Check, ArrowLeft, Volume2 } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { initializeItem } from '../utils/spacedRepetition'
import { getStreakBonus } from '../utils/streakSystem'
import { getLessonById } from '../data/lessons'
import { checkLessonUnlock } from '../utils/lessonSystem'

const LearnPage = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const { user, progress, updateProgress, recordActivity, unlockAchievement } = useApp()
  const [currentLesson, setCurrentLesson] = useState(null)
  const [lessonStep, setLessonStep] = useState(0)
  const [userResponses, setUserResponses] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
  const [currentChoices, setCurrentChoices] = useState([])

  useEffect(() => {
    if (!lessonId) {
      navigate('/lessons')
      return
    }

    const lesson = getLessonById(lessonId)
    if (!lesson) {
      navigate('/lessons')
      return
    }

    // Check dynamic unlock status
    const isUnlocked = checkLessonUnlock(lesson.id, progress)
    if (!isUnlocked) {
      navigate('/lessons')
      return
    }

    setCurrentLesson(lesson)
    setIsLoading(false)
    recordActivity()
  }, [lessonId, navigate, recordActivity, progress])

  // Generate choices when character changes in recognition or speed_drill steps
  useEffect(() => {
    const currentStep = currentLesson?.steps[lessonStep]
    if ((currentStep?.type === 'recognition' || currentStep?.type === 'speed_drill') && currentStep.characters) {
      const stepChar = currentStep.characters[currentCharacterIndex]
      if (stepChar) {
        const choices = generateChoices(stepChar.romaji, currentStep.characters)
        setCurrentChoices(choices)
      }
    } else {
      setCurrentChoices([])
    }
  }, [currentLesson, lessonStep, currentCharacterIndex])

  const handleChoice = (choice) => {
    setCurrentAnswer(choice)
    setShowFeedback(true)

    // Add to responses array (don't overwrite by step, append each answer)
    setUserResponses(prev => [...prev, choice])
  }

  const handleNext = async () => {
    const currentStep = currentLesson.steps[lessonStep]

    // If it's a recognition or speed_drill step and we haven't finished all characters, move to next character
    if ((currentStep.type === 'recognition' || currentStep.type === 'speed_drill') && currentCharacterIndex < currentStep.characters.length - 1) {
      setCurrentCharacterIndex(currentCharacterIndex + 1)
      setShowFeedback(false)
      setCurrentAnswer('')
      return
    }

    // Otherwise, move to next step
    setShowFeedback(false)
    setCurrentAnswer('')
    setCurrentCharacterIndex(0)

    if (lessonStep < currentLesson.steps.length - 1) {
      setLessonStep(lessonStep + 1)
    } else {
      await completeLesson()
    }
  }

  const handlePrevious = () => {
    if (lessonStep > 0) {
      setShowFeedback(false)
      setCurrentAnswer('')
      setCurrentCharacterIndex(0)
      setLessonStep(lessonStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
    if (stepIndex >= 0 && stepIndex < currentLesson.steps.length) {
      setShowFeedback(false)
      setCurrentAnswer('')
      setCurrentCharacterIndex(0)
      setLessonStep(stepIndex)
    }
  }


  const completeLesson = async () => {
    setIsCompleted(true)

    // Calculate accuracy based on responses
    const correctAnswers = userResponses.filter(response => response?.correct).length
    const accuracy = userResponses.length > 0 ? correctAnswers / userResponses.length : 1

    // Update progress
    const spacedRepData = initializeItem()
    await updateProgress(currentLesson.id, {
      completed: true,
      accuracyScore: accuracy,
      lastCompleted: new Date().toISOString(),
      ...spacedRepData
    })

    // Check for achievements
    if (user?.streakCount === 7) {
      await unlockAchievement('streak_7')
    }
  }

  const renderStepContent = () => {
    if (!currentLesson) return null
    const step = currentLesson.steps[lessonStep]

    switch (step.type) {
      case 'explanation':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.content}</p>

            {step.characters && (
              <div className="grid grid-cols-5 gap-4">
                {step.characters.map((char, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-4xl font-bold text-white mb-2">{char.katakana}</div>
                    <div className="text-yellow-300 font-semibold">{char.romaji}</div>
                    <div className="text-sm text-blue-200">{char.sound}</div>
                  </div>
                ))}
              </div>
            )}

            {step.words && (
              <div className="space-y-3">
                {step.words.map((word, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">{word.katakana}</div>
                      <div className="text-yellow-300">{word.romaji}</div>
                    </div>
                    <div className="text-blue-100">{word.english}</div>
                    {word.animeContext && (
                      <div className="text-sm text-purple-300 mt-1">{word.animeContext}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step.phrases && (
              <div className="space-y-4">
                {step.phrases.map((phrase, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl font-bold text-white">{phrase.japanese}</div>
                      <button className="text-yellow-300 hover:text-yellow-200">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-yellow-300 mb-1">{phrase.romaji}</div>
                    <div className="text-blue-100 mb-2">{phrase.english}</div>
                    {phrase.pronunciation && (
                      <div className="text-sm text-gray-300">Pronunciation: {phrase.pronunciation}</div>
                    )}
                    {phrase.usage && (
                      <div className="text-sm text-blue-200 mt-2">{phrase.usage}</div>
                    )}
                    {phrase.animeExample && (
                      <div className="text-sm text-purple-300 mt-1 italic">🎌 {phrase.animeExample}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {step.animeExamples && (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-yellow-300 mb-3">🎌 See These Vowels in Popular Anime!</h4>
                {step.animeExamples.map((example, index) => (
                  <div key={index} className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xl font-bold text-white">{example.title}</div>
                      <div className="text-sm text-purple-200">{example.description}</div>
                    </div>
                    <div className="text-yellow-300 mb-2">{example.romaji} = {example.english}</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-blue-200">Vowels you know:</span>
                      {example.vowels.map((vowel, vIndex) => (
                        <span key={vIndex} className="bg-yellow-400/20 text-yellow-200 px-2 py-1 rounded text-sm font-semibold">
                          {vowel}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step.linguisticContext && (
              <div className="space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">🧠 {step.linguisticContext.title}</h4>
                  <p className="text-blue-100 mb-4">{step.linguisticContext.explanation}</p>

                  <div className="space-y-3">
                    {step.linguisticContext.examples.map((example, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">{example.series}</span>
                          <span className="text-sm text-blue-200">{example.pattern}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {example.examples.map((ex, exIndex) => (
                            <span key={exIndex} className="bg-blue-400/20 text-blue-200 px-2 py-1 rounded text-sm">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {step.linguisticContext.funFact && (
                    <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-200 text-sm">🌟 <strong>Fun Fact:</strong> {step.linguisticContext.funFact}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step.tip && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="text-yellow-100">💡 {step.tip}</div>
              </div>
            )}
          </div>
        )

      case 'recognition': {
        const currentChar = step.characters[currentCharacterIndex]
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.instructions}</p>

            {/* Character Progress */}
            <div className="text-center text-blue-200 text-sm">
              Character {currentCharacterIndex + 1} of {step.characters.length}
            </div>

            {step.characters && currentChar && (
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-4">{currentChar.katakana}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Use stable choice options */}
                  {currentChoices.map((choice, choiceIndex) => (
                    <button
                      key={choiceIndex}
                      onClick={() => handleChoice({
                        answer: choice,
                        correct: choice === currentChar.romaji,
                        character: currentChar.katakana
                      })}
                      className={`
                        px-4 py-3 rounded-lg font-semibold transition-all
                        ${showFeedback && currentAnswer?.answer === choice
                          ? currentAnswer.correct
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                      disabled={showFeedback}
                    >
                      {choice}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-4 text-center">
                    {currentAnswer?.correct ? (
                      <div className="text-green-400 font-semibold">
                        ✓ Correct! {currentChar.katakana} = {currentChar.romaji}
                      </div>
                    ) : (
                      <div className="text-red-400 font-semibold">
                        ✗ Not quite! {currentChar.katakana} = {currentChar.romaji}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>
        )
      }

      case 'word_reading':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.instructions}</p>

            <div className="space-y-4">
              {step.words.map((word, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-white mb-2">{word.katakana}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {generateWordChoices(word.english, step.words).map((choice, choiceIndex) => (
                      <button
                        key={choiceIndex}
                        onClick={() => handleChoice({
                          answer: choice,
                          correct: choice === word.english,
                          word: word.katakana
                        })}
                        className={`
                          px-4 py-3 rounded-lg font-semibold transition-all
                          ${showFeedback && currentAnswer?.answer === choice
                            ? currentAnswer.correct
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                          }
                        `}
                        disabled={showFeedback}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>

                  {showFeedback && (
                    <div className="mt-4 text-center">
                      <div className={`font-semibold ${currentAnswer?.correct ? 'text-green-400' : 'text-red-400'}`}>
                        {currentAnswer?.correct ? '✓ Correct!' : '✗ Incorrect!'}
                      </div>
                      <div className="text-blue-100 mt-2">
                        {word.katakana} ({word.romaji}) = {word.english}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 'speed_drill': {
        const speedChar = step.characters[currentCharacterIndex]
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">{step.title}</h3>
            <p className="text-lg text-blue-100">{step.instructions}</p>

            {/* Character Progress */}
            <div className="text-center text-blue-200 text-sm">
              Character {currentCharacterIndex + 1} of {step.characters.length}
              {step.timeLimit && <span className="ml-4">⏱️ {step.timeLimit}s limit</span>}
            </div>

            {step.characters && speedChar && (
              <div className="text-center">
                <div className="text-8xl font-bold text-white mb-6">{speedChar.katakana}</div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-md mx-auto">
                  {currentChoices.map((choice, choiceIndex) => (
                    <button
                      key={choiceIndex}
                      onClick={() => handleChoice({
                        answer: choice,
                        correct: choice === speedChar.romaji,
                        character: speedChar.katakana
                      })}
                      className={`
                        px-4 py-3 rounded-lg font-semibold transition-all text-lg
                        ${showFeedback && currentAnswer?.answer === choice
                          ? currentAnswer.correct
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                      disabled={showFeedback}
                    >
                      {choice}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-6 text-center">
                    <div className={`text-2xl font-bold mb-2 ${currentAnswer?.correct ? 'text-green-400' : 'text-red-400'}`}>
                      {currentAnswer?.correct ? '⚡ Correct!' : '⚡ Keep going!'}
                    </div>
                    <div className="text-blue-100">
                      {speedChar.katakana} = {speedChar.romaji}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      }

      default:
        return (
          <div className="text-center text-white">
            <p>Lesson type not yet implemented: {step.type}</p>
          </div>
        )
    }
  }

  // Helper function to generate multiple choice options
  const generateChoices = (correct, allChars) => {
    const choices = [correct]
    const otherChoices = allChars.filter(c => c.romaji !== correct).map(c => c.romaji)

    while (choices.length < 4 && otherChoices.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherChoices.length)
      choices.push(otherChoices.splice(randomIndex, 1)[0])
    }

    return choices.sort(() => Math.random() - 0.5)
  }

  // Helper function for word choices
  const generateWordChoices = (correct, allWords) => {
    const choices = [correct]
    const otherChoices = allWords.filter(w => w.english !== correct).map(w => w.english)

    while (choices.length < 3 && otherChoices.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherChoices.length)
      choices.push(otherChoices.splice(randomIndex, 1)[0])
    }

    return choices.sort(() => Math.random() - 0.5)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-white text-xl">Loading lesson...</div>
      </div>
    )
  }

  if (isCompleted) {
    const accuracy = userResponses.length > 0 ?
      (userResponses.filter(r => r?.correct).length / userResponses.length) * 100 : 100

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Lesson Complete!</h2>
          <p className="text-xl text-blue-100 mb-6">
            Great job learning "{currentLesson?.title}"
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-yellow-300 text-2xl font-bold">{Math.round(accuracy)}%</p>
              <p className="text-sm text-blue-200">Accuracy</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-orange-300 text-2xl font-bold">+{getStreakBonus(user?.streakCount || 0)} XP</p>
              <p className="text-sm text-blue-200">Streak Bonus</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/lessons')}
              className="px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Choose Next Lesson
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </button>
        <div className="flex items-center justify-between text-white mb-2">
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            <span className="text-sm">Step {lessonStep + 1} of {currentLesson?.steps.length}</span>
          </div>
          <div className="text-sm text-blue-200">
            {currentLesson?.steps[lessonStep]?.title}
          </div>
        </div>

        {/* Step Navigation Dots */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {currentLesson?.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200 hover:scale-110
                ${index === lessonStep
                  ? 'bg-yellow-400'
                  : index < lessonStep
                    ? 'bg-green-400'
                    : 'bg-white/30 hover:bg-white/50'
                }
              `}
              title={`${step.title} ${index < lessonStep ? '(completed)' : index === lessonStep ? '(current)' : ''}`}
            />
          ))}
        </div>

        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-300 to-orange-300 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((lessonStep + 1) / currentLesson?.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          {lessonStep > 0 ? (
            <button
              onClick={handlePrevious}
              className="inline-flex items-center px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={handleNext}
            disabled={!showFeedback && !['explanation', 'speed_drill'].includes(currentLesson?.steps[lessonStep]?.type)}
            className={`
              inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all
              ${!showFeedback && !['explanation', 'speed_drill'].includes(currentLesson?.steps[lessonStep]?.type)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              }
            `}
          >
            {(() => {
              const currentStep = currentLesson?.steps[lessonStep]
              if ((currentStep?.type === 'recognition' || currentStep?.type === 'speed_drill') && currentCharacterIndex < currentStep.characters.length - 1) {
                return 'Next Character'
              }
              return lessonStep === currentLesson?.steps.length - 1 ? 'Complete Lesson' : 'Next Step'
            })()}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LearnPage