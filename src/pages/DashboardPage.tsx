import { motion } from 'framer-motion'
import { Flame, Zap } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { curriculumLevels, lessons } from '../data/lessons'
import type { InvestigationReport, ProgressState } from '../types'

export default function DashboardPage({
  investigations: _investigations,
  progress,
}: {
  investigations: InvestigationReport[]
  progress: ProgressState
}) {
  // Compute user level based on XP
  const userLevel = useMemo(() => {
    let lvl = 1
    for (const cLvl of curriculumLevels) {
      if (progress.xp >= cLvl.minXpToUnlock) {
        lvl = cLvl.id
      }
    }
    return lvl
  }, [progress.xp])

  const currentLevelObj = curriculumLevels.find((l) => l.id === userLevel) ?? curriculumLevels[0]
  const nextLevelObj = curriculumLevels.find((l) => l.id === userLevel + 1)

  const xpProgressInLevel = useMemo(() => {
    if (!nextLevelObj) return 100
    const min = currentLevelObj.minXpToUnlock
    const max = nextLevelObj.minXpToUnlock
    const current = progress.xp - min
    const range = max - min
    return Math.min(100, Math.max(0, Math.round((current / range) * 100)))
  }, [progress.xp, currentLevelObj, nextLevelObj])

  // Compute category completion
  const categoryMastery = useMemo(() => {
    const map: Record<string, { total: number; completed: number }> = {}
    lessons.forEach((l) => {
      if (!map[l.category]) {
        map[l.category] = { total: 0, completed: 0 }
      }
      map[l.category].total += 1
      if (progress.lessonsCompleted.includes(l.id)) {
        map[l.category].completed += 1
      }
    })

    return Object.entries(map).map(([cat, val]) => {
      const percent = val.total > 0 ? Math.round((val.completed / val.total) * 100) : 0
      let tier = 'Unranked'
      if (percent >= 100) tier = '🥇 Gold'
      else if (percent >= 60) tier = '🥈 Silver'
      else if (percent >= 30) tier = '🥉 Bronze'

      return {
        category: cat,
        percent,
        tier,
        completed: val.completed,
        total: val.total,
      }
    })
  }, [progress.lessonsCompleted])

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header Panel */}
      <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <SectionHeader
          eyebrow="Progress & Analytics"
          title="Cyber Security Master Dashboard"
          description="Track your 7-level curriculum progress, Scam IQ placement assessment growth, and category threat mastery."
        />

        {/* Level & XP Header Card */}
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-3xl border border-emerald-500/30">
                {currentLevelObj.icon}
              </div>
              <div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                  Level {userLevel}: {currentLevelObj.badgeName}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {currentLevelObj.title}
                </h2>
              </div>
            </div>

            {/* Top Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-xl">
                  <Flame className="h-5 w-5 fill-amber-400" />
                  <span>{progress.streak}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Daily Streak</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-xl">
                  <Zap className="h-5 w-5 fill-emerald-400" />
                  <span>{progress.xp}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-200">Total XP</div>
              </div>
            </div>
          </div>

          {/* XP Level Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-200">
              <span>Progress to Level {userLevel + 1}</span>
              <span>{xpProgressInLevel}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-500"
                style={{ width: `${xpProgressInLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Scam IQ Score & Topic Mastery */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scam IQ Score Card */}
        <div className="soft-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Placement Analytics</span>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Verified Scam IQ</h3>

            <div className="mt-6 text-center">
              <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50 border-4 border-emerald-500/20 text-3xl font-extrabold text-emerald-600 shadow-inner">
                {progress.preAssessmentScore ?? 750}
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-700">Out of 1000 Max Score</p>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs font-medium text-slate-700">
              <div className="flex items-center justify-between">
                <span>Diagnostic Pre-Assessment:</span>
                <span className="font-bold text-slate-900">{progress.preAssessmentScore ?? '750'} / 1000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Post-Module Certification:</span>
                <span className="font-bold text-emerald-600">{progress.postAssessmentScore ? `${progress.postAssessmentScore} / 1000` : 'Pending'}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/practice"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-emerald-600"
            >
              Take Assessment →
            </Link>
          </div>
        </div>

        {/* Topic Mastery Radar Breakdown */}
        <div className="soft-panel rounded-[2rem] p-6 sm:p-8 lg:col-span-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Skill Tree Analytics</span>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">Threat Vector Topic Mastery</h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categoryMastery.map((cat: { category: string; percent: number; tier: string; completed: number; total: number }) => (
              <div key={cat.category} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{cat.category}</span>
                  <span className="font-semibold text-emerald-700">{cat.tier}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-700 font-medium">
                  <span>{cat.completed} / {cat.total} Units</span>
                  <span className="font-bold text-slate-700">{cat.percent}%</span>
                </div>

                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-500"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 2: Badges & Certifications Showcase */}
      <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Achievement System</span>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">Level Badges & Certifications</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {curriculumLevels.map((lvl) => {
            const isUnlocked = progress.xp >= lvl.minXpToUnlock || lvl.id === 1

            return (
              <div
                key={lvl.id}
                className={`rounded-2xl border p-5 transition ${
                  isUnlocked
                    ? 'border-emerald-200 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 bg-slate-50/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{lvl.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{lvl.badgeName}</h4>
                    <p className="text-[11px] font-semibold text-slate-500">Level {lvl.id} Badge</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">{lvl.description}</p>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  {isUnlocked ? '✓ Badge Earned' : `Requires ${lvl.minXpToUnlock} XP`}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
