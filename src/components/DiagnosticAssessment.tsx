import { motion } from 'framer-motion'
import { ShieldAlert, Trophy } from 'lucide-react'
import { useState } from 'react'
import { quizQuestions } from '../data/quizQuestions'

export function DiagnosticAssessment({
  type,
  onComplete,
}: {
  type: 'pre' | 'post'
  onComplete: (score: number, weakAreas: string[]) => void
}) {
  const assessmentQuestions = quizQuestions.slice(0, 10)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [weakCategories, setWeakCategories] = useState<string[]>([])

  const currentQ = assessmentQuestions[currentIndex]

  const handleNext = () => {
    if (!selectedOption) return

    const updated = { ...userAnswers, [currentQ.id]: selectedOption }
    setUserAnswers(updated)
    setSelectedOption(null)

    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Calculate final score
      let correct = 0
      const weakMap = new Set<string>()

      assessmentQuestions.forEach((q) => {
        if (updated[q.id] === q.answer) {
          correct += 1
        } else {
          weakMap.add(q.category)
        }
      })

      const scorePercent = Math.round((correct / assessmentQuestions.length) * 100)
      const scamIqScore = Math.round(500 + scorePercent * 4.5) // Scale 500-950

      setFinalScore(scamIqScore)
      setWeakCategories(Array.from(weakMap))
      setIsFinished(true)

      onComplete(scamIqScore, Array.from(weakMap))
    }
  }

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="soft-panel rounded-[2rem] p-6 text-center sm:p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
          <Trophy className="h-10 w-10" />
        </div>

        <span className="mt-4 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          {type === 'pre' ? 'Pre-Assessment Complete' : 'Post-Assessment Certification Complete'}
        </span>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Your Verified Scam IQ: <span className="text-emerald-600">{finalScore}</span> / 1000
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
          {type === 'pre'
            ? 'Baseline placement complete! We have tailored your 7-Level Master Curriculum path based on your diagnostic results.'
            : 'Outstanding progress! Your knowledge growth reflects high resilience against modern phishing, smishing, and AI threat vectors.'}
        </p>

        {weakCategories.length > 0 && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-left">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <span>Recommended Focus Topics:</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {weakCategories.map((cat) => (
                <span key={cat} className="rounded-lg bg-white px-3 py-1 text-xs font-medium text-amber-800 shadow-sm border border-amber-200">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
          >
            Continue Learning Path
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="soft-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {type === 'pre' ? 'Diagnostic Pre-Assessment' : 'Post-Module Certification Assessment'}
          </span>
          <h3 className="text-lg font-bold text-slate-900">
            Question {currentIndex + 1} of {assessmentQuestions.length}
          </h3>
        </div>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / assessmentQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-600">{currentQ.category} • {currentQ.difficulty}</p>
        <p className="mt-2 text-xl font-semibold leading-snug text-slate-900">{currentQ.prompt}</p>

        <div className="mt-6 space-y-3">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`w-full rounded-2xl border p-4 text-left font-medium transition ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 text-slate-900 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            disabled={!selectedOption}
            onClick={handleNext}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-100 disabled:cursor-not-allowed"
          >
            {currentIndex === assessmentQuestions.length - 1 ? 'Finish Assessment' : 'Next Question →'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
