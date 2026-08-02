import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, CheckCircle2, Lock, ShieldCheck, Trophy } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { curriculumLevels, lessons } from '../data/lessons'
import type { ProgressState } from '../types'

export default function LearnPage({
  progress,
  onCompleteLesson,
}: {
  progress: ProgressState
  onCompleteLesson: (lessonId: string) => void
}) {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'learn' | 'examples' | 'protect' | 'quiz'>('learn')
  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<string, string>>>({})
  const [quizFeedback, setQuizFeedback] = useState<Record<string, Record<string, boolean>>>({})

  const currentLevel = curriculumLevels.find((lvl) => lvl.id === selectedLevelId) ?? curriculumLevels[0]

  const activeLevelLessons = useMemo(() => {
    return lessons.filter((lesson) => lesson.levelId === selectedLevelId)
  }, [selectedLevelId])

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? null

  // Keyboard escape listener for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedLessonId) {
        setSelectedLessonId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedLessonId])

  const openLesson = (id: string) => {
    setSelectedLessonId(id)
    setActiveTab('learn')
  }

  const handleQuizAnswer = (lessonId: string, questionPrompt: string, answer: string) => {
    const lesson = lessons.find((item) => item.id === lessonId)
    if (!lesson) return

    const question = lesson.quiz.find((item) => item.prompt === questionPrompt)
    if (!question) return

    const isCorrect = question.answer === answer
    setQuizAnswers((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] ?? {}),
        [questionPrompt]: answer,
      },
    }))
    setQuizFeedback((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] ?? {}),
        [questionPrompt]: isCorrect,
      },
    }))

    if (isCorrect) {
      onCompleteLesson(lessonId)
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Curriculum Header */}
      <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <SectionHeader
          eyebrow="Duolingo of Scam Awareness"
          title="Veridion 7-Level Master Curriculum"
          description="Progress through 7 structured units from Internet Safety Basics to AI-Generated Threats and Web3 Crypto Defense."
        />

        {/* Level Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2.5 overflow-x-auto pb-2">
          {curriculumLevels.map((lvl) => {
            const isUnlocked = progress.xp >= lvl.minXpToUnlock || lvl.id === 1
            const isSelected = selectedLevelId === lvl.id
            const levelLessons = lessons.filter((l) => l.levelId === lvl.id)
            const completedCount = levelLessons.filter((l) => progress.lessonsCompleted.includes(l.id)).length
            const isFullyCompleted = completedCount > 0 && completedCount === levelLessons.length

            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => isUnlocked && setSelectedLevelId(lvl.id)}
                disabled={!isUnlocked}
                className={`relative flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                    : isUnlocked
                      ? 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                      : 'border-slate-300 bg-slate-200/90 text-slate-700 font-medium cursor-not-allowed'
                }`}
              >
                <span className="text-base">{lvl.icon}</span>
                <span className="whitespace-nowrap">L{lvl.id}: {lvl.badgeName}</span>

                {isFullyCompleted && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                )}

                {!isUnlocked && (
                  <Lock className="h-3.5 w-3.5 text-slate-600" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Level Banner */}
      <div className="rounded-[2.2rem] p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border border-slate-700/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{currentLevel.icon}</span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                {currentLevel.title}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {currentLevel.badgeName} Path
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200">
              {currentLevel.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-md">
            <div className="text-2xl font-extrabold text-emerald-400">
              {activeLevelLessons.filter((l) => progress.lessonsCompleted.includes(l.id)).length} / {activeLevelLessons.length}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-200">Units Completed</div>
          </div>
        </div>
      </div>

      {/* Unit Tree Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeLevelLessons.map((lesson) => {
          const isComplete = progress.lessonsCompleted.includes(lesson.id)
          const isBoss = Boolean(lesson.isBossChallenge)

          return (
            <motion.button
              key={lesson.id}
              type="button"
              onClick={() => openLesson(lesson.id)}
              whileHover={{ y: -3 }}
              className={`relative flex flex-col justify-between rounded-[1.8rem] border p-6 text-left transition shadow-sm ${
                isBoss
                  ? 'border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-50 to-white hover:border-amber-400 hover:shadow-amber-500/10 shadow-md'
                  : isComplete
                    ? 'border-emerald-200 bg-emerald-50/40 hover:border-emerald-400 hover:bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    isBoss
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : isComplete
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isBoss ? <Trophy className="h-3.5 w-3.5 text-amber-600" /> : <BookOpen className="h-3.5 w-3.5" />}
                    Unit {lesson.unitNumber}
                  </span>

                  {isComplete ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-slate-700">+{lesson.reward} XP</span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">{lesson.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium line-clamp-2">{lesson.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
                <span>{lesson.readTime}</span>
                <span className={`font-bold ${isComplete ? 'text-emerald-700' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                  {isComplete ? 'Review Unit' : isBoss ? 'Start Boss Challenge →' : 'Start Unit →'}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Lesson Details Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2.2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 text-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Unit {selectedLesson.unitNumber} • {selectedLesson.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedLesson.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLessonId(null)}
                  className="rounded-full bg-slate-100 p-2 font-bold text-slate-700 hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>

              {/* Tabs Header */}
              <div className="mt-6 flex border-b border-slate-200">
                {(['learn', 'examples', 'protect', 'quiz'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-bold uppercase tracking-wider transition border-b-2 ${
                      activeTab === tab
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'learn' ? '1. Learn' : tab === 'examples' ? '2. Real Examples' : tab === 'protect' ? '3. Protection' : '4. Unit Quiz'}
                  </button>
                ))}
              </div>

              {/* Tab 1: Learn */}
              {activeTab === 'learn' && (
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Core Concept</h4>
                    <p className="mt-2 text-base leading-relaxed text-slate-700">{selectedLesson.explanation}</p>
                  </div>

                  <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800">Psychological Mechanism</h4>
                    <p className="mt-1 text-sm leading-relaxed text-sky-900">{selectedLesson.psychology}</p>
                  </div>

                  {selectedLesson.objectives.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Unit Learning Objectives</h4>
                      <ul className="mt-2 space-y-2">
                        {selectedLesson.objectives.map((obj) => (
                          <li key={obj} className="flex items-start gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Examples */}
              {activeTab === 'examples' && (
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700">Scam Pattern Examples</h4>
                    <div className="mt-3 space-y-3">
                      {selectedLesson.scamExamples.map((ex) => (
                        <div key={ex} className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-900">
                          🚨 "{ex}"
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Legitimate Communication Examples</h4>
                    <div className="mt-3 space-y-3">
                      {selectedLesson.legitExamples.map((ex) => (
                        <div key={ex} className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900">
                          ✅ "{ex}"
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Protection */}
              {activeTab === 'protect' && (
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">Defensive Habits</h4>
                    <ul className="mt-3 space-y-2">
                      {selectedLesson.protection.map((prot) => (
                        <li key={prot} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{prot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">Key Takeaways</h4>
                    <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-2">
                      {selectedLesson.takeaways.map((take) => (
                        <p key={take} className="text-sm font-medium text-amber-900">💡 {take}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Unit Quiz */}
              {activeTab === 'quiz' && (
                <div className="mt-6 space-y-6">
                  {selectedLesson.quiz.map((q, idx) => {
                    const selected = quizAnswers[selectedLesson.id]?.[q.prompt]
                    const isCorrect = quizFeedback[selectedLesson.id]?.[q.prompt]

                    return (
                      <div key={q.prompt} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                        <p className="text-sm font-bold text-slate-900">
                          Question {idx + 1}: {q.prompt}
                        </p>

                        <div className="mt-4 space-y-2.5">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleQuizAnswer(selectedLesson.id, q.prompt, opt)}
                              className={`w-full rounded-xl border p-3.5 text-left text-sm font-medium transition ${
                                selected === opt
                                  ? isCorrect
                                    ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                                    : 'border-rose-500 bg-rose-100 text-rose-900'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>

                        {selected && (
                          <div className={`mt-4 rounded-xl border p-4 text-xs leading-relaxed ${
                            isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'
                          }`}>
                            <span className="font-bold">{isCorrect ? 'Correct! 🎉 ' : 'Incorrect. '}</span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
