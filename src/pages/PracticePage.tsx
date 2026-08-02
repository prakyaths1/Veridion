import { motion } from 'framer-motion'
import { Flame, Sparkles, Target, Trophy, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DiagnosticAssessment } from '../components/DiagnosticAssessment'
import { SectionHeader } from '../components/SectionHeader'
import { quizQuestions } from '../data/quizQuestions'
import type { ProgressState, QuizQuestion } from '../types'

export default function PracticePage({
  progress,
  onAnswerQuiz,
}: {
  progress: ProgressState
  onAnswerQuiz: (questionId: number, answer: string) => void
}) {
  const [activeTab, setActiveTab] = useState<'adaptive' | 'categories' | 'assessment'>('adaptive')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [streakCombo, setStreakCombo] = useState<number>(0)

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(quizQuestions.map((q) => q.category))
    return ['All', ...Array.from(set)]
  }, [])

  // Filtered practice questions
  const questionsToServe = useMemo(() => {
    if (activeTab === 'adaptive' && progress.weakAreas.length > 0) {
      // Prioritize weak areas
      const weakSet = new Set(progress.weakAreas)
      const weakFiltered = quizQuestions.filter((q) => weakSet.has(q.category))
      return weakFiltered.length > 0 ? weakFiltered : quizQuestions
    }

    if (selectedCategory !== 'All') {
      return quizQuestions.filter((q) => q.category === selectedCategory)
    }

    return quizQuestions
  }, [activeTab, selectedCategory, progress.weakAreas])

  const currentQ: QuizQuestion = questionsToServe[currentQuestionIndex % questionsToServe.length] ?? quizQuestions[0]

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === currentQ.answer
    setHasSubmitted(true)

    if (isCorrect) {
      setStreakCombo((prev) => prev + 1)
    } else {
      setStreakCombo(0)
    }

    onAnswerQuiz(currentQ.id, selectedAnswer)
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setHasSubmitted(false)
    setCurrentQuestionIndex((prev) => (prev + 1) % questionsToServe.length)
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <SectionHeader
          eyebrow="Adaptive Practice & Assessment"
          title="Master Threat Patterns Through Drills"
          description="Test your recognition skills with adaptive scenarios that target your weak areas and track your Scam IQ."
        />

        {/* Tab Toggle */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('adaptive')}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'adaptive'
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>Adaptive Practice</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'categories'
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <Target className="h-4 w-4" />
            <span>Topic Drills</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'assessment'
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>Scam IQ Placement Test</span>
          </button>
        </div>
      </div>

      {/* Tab 1 & 2: Practice Question View */}
      {(activeTab === 'adaptive' || activeTab === 'categories') && (
        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg">
                <Flame className="h-5 w-5 fill-amber-500" />
                <span>{streakCombo}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700">Combo Streak</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-lg">
                <Zap className="h-5 w-5 fill-emerald-500" />
                <span>{progress.xp} XP</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700">Total Earned</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-slate-900">
                {progress.quizAttempts > 0 ? Math.round((progress.quizCorrect / progress.quizAttempts) * 100) : 100}%
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700">Overall Accuracy</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-lg font-bold text-slate-900">
                {progress.quizCorrect} / {progress.quizAttempts}
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700">Drills Mastered</p>
            </div>
          </div>

          {/* Category Selector Filter if Categories Tab */}
          {activeTab === 'categories' && (
            <div className="soft-panel rounded-2xl p-4 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 shrink-0">Filter Topic:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat)
                    setCurrentQuestionIndex(0)
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Drill Question Card */}
          <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                {currentQ.category} • {currentQ.difficulty}
              </span>
              <span className="text-xs font-medium text-slate-500">Drill #{currentQuestionIndex + 1}</span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{currentQ.prompt}</h3>

              <div className="mt-6 space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt
                  const isCorrect = opt === currentQ.answer

                  let style = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'

                  if (hasSubmitted) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold'
                    } else if (isSelected) {
                      style = 'border-rose-500 bg-rose-100 text-rose-900 font-bold'
                    }
                  } else if (isSelected) {
                    style = 'border-emerald-500 bg-emerald-50 text-slate-900 ring-2 ring-emerald-500/20'
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={hasSubmitted}
                      onClick={() => setSelectedAnswer(opt)}
                      className={`w-full rounded-2xl border p-4 text-left font-medium transition ${style}`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>

              {/* Action / Feedback Section */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {!hasSubmitted ? (
                  <button
                    type="button"
                    disabled={!selectedAnswer}
                    onClick={handleSubmitAnswer}
                    className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-100 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 shadow-lg shadow-emerald-600/25"
                  >
                    Next Practice Scenario →
                  </button>
                )}
              </div>

              {hasSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 rounded-2xl border p-5 text-sm leading-relaxed ${
                    selectedAnswer === currentQ.answer
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-rose-300 bg-rose-50 text-rose-950'
                  }`}
                >
                  <p className="font-bold">
                    {selectedAnswer === currentQ.answer ? '🎉 Spot on! +45 XP' : '❌ Not quite. +15 XP'}
                  </p>
                  <p className="mt-1">{currentQ.explanation}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pre/Post Assessment */}
      {activeTab === 'assessment' && (
        <DiagnosticAssessment
          type={progress.preAssessmentScore ? 'post' : 'pre'}
          onComplete={(score, weakAreas) => {
            console.log('Assessment complete:', score, weakAreas)
          }}
        />
      )}
    </motion.section>
  )
}
