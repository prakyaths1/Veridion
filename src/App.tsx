import { BookOpen, Cpu, FileText, Home, LayoutDashboard, Search, Target } from 'lucide-react'
import { useState, lazy, Suspense, useEffect, type Dispatch, type SetStateAction } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlassNav } from './components/GlassNav'
import { SkipLink } from './components/SkipLink'
import { STORAGE_KEYS } from './constants/storage'
import { quizQuestions } from './data/quizQuestions'
import { usePersistentState } from './hooks/usePersistentState'
import type { InvestigationReport, ProgressState } from './types'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const ScanPage = lazy(() => import('./pages/ScanPage'))
const ReportPage = lazy(() => import('./pages/ReportPage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const PracticePage = lazy(() => import('./pages/PracticePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))

function LoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-live="polite">
      <div className="flex items-center gap-3 text-emerald-700">
        <span className="h-3 w-3 animate-ping rounded-full bg-emerald-500" aria-hidden="true" />
        <span className="text-sm font-medium">Loading Veridion...</span>
      </div>
    </div>
  )
}

function AppShell({
  currentReport,
  investigations,
  progress,
  setProgress,
  setCurrentReport,
  onCompleteLesson,
  onAnswerQuiz,
}: {
  currentReport: InvestigationReport | null
  investigations: InvestigationReport[]
  progress: ProgressState
  setProgress: Dispatch<SetStateAction<ProgressState>>
  setCurrentReport: Dispatch<SetStateAction<InvestigationReport | null>>
  onCompleteLesson: (lessonId: string) => void
  onAnswerQuiz: (questionId: number, answer: string) => void
}) {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/scan', label: 'Scan', icon: Search },
    { to: '/report', label: 'Report', icon: FileText },
    { to: '/learn', label: 'Learn', icon: BookOpen },
    { to: '/practice', label: 'Practice', icon: Target },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/methodology', label: 'Methodology', icon: Cpu },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_26%),linear-gradient(135deg,_#f8f5eb,_#fbfbf8_48%,_#f1f8fb)] text-slate-800">
      <SkipLink />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <GlassNav items={navItems} />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/scan" element={<ScanPage setProgress={setProgress} setCurrentReport={setCurrentReport} />} />
              <Route path="/report" element={<ReportPage currentReport={currentReport} investigations={investigations} />} />
              <Route path="/learn" element={<LearnPage progress={progress} onCompleteLesson={onCompleteLesson} />} />
              <Route path="/practice" element={<PracticePage progress={progress} onAnswerQuiz={onAnswerQuiz} />} />
              <Route path="/dashboard" element={<DashboardPage investigations={investigations} progress={progress} />} />
              <Route path="/methodology" element={<MethodologyPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function App() {
  const [investigations, setInvestigations] = useState<InvestigationReport[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.investigations)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [currentReport, setCurrentReport] = useState<InvestigationReport | null>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.currentReport)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // Persistent educational state (persists across sessions in localStorage)
  const [progress, setProgress] = usePersistentState<ProgressState>(STORAGE_KEYS.progress, {
    lessonsCompleted: [],
    completedLevels: [1],
    xp: 120,
    userLevel: 1,
    streak: 3,
    quizCorrect: 0,
    quizAttempts: 0,
    weakAreas: [],
    topicMastery: {},
    preAssessmentScore: 750,
    postAssessmentScore: null,
    badgesUnlocked: ['Digital Defender'],
  })

  useEffect(() => {
    if (currentReport) {
      setInvestigations((prev) => (prev.some((item) => item.id === currentReport.id) ? prev : [currentReport, ...prev].slice(0, 6)))
    }
  }, [currentReport, setInvestigations])

  const handleCompleteLesson = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      lessonsCompleted: prev.lessonsCompleted.includes(lessonId) ? prev.lessonsCompleted : [...prev.lessonsCompleted, lessonId],
      xp: prev.xp + 30,
    }))
  }

  const handleAnswerQuiz = (questionId: number, answer: string) => {
    const question = quizQuestions.find((item) => item.id === questionId)
    if (!question) return

    const isCorrect = answer === question.answer
    setProgress((prev) => ({
      ...prev,
      quizAttempts: prev.quizAttempts + 1,
      quizCorrect: prev.quizCorrect + (isCorrect ? 1 : 0),
      xp: prev.xp + (isCorrect ? 45 : 15),
      weakAreas: isCorrect ? prev.weakAreas : [...prev.weakAreas, question.category],
    }))
  }

  return (
    <BrowserRouter>
      <AppShell
        currentReport={currentReport}
        investigations={investigations}
        progress={progress}
        setProgress={setProgress}
        setCurrentReport={setCurrentReport}
        onCompleteLesson={handleCompleteLesson}
        onAnswerQuiz={handleAnswerQuiz}
      />
    </BrowserRouter>
  )
}

export default App