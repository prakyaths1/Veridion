import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Counter } from '../components/Counter'
import { ScoreRing } from '../components/ScoreRing'
import type { EvidenceItem, InvestigationReport } from '../types'
import { getRiskPalette } from '../utils/riskPalette'

export function ReportPage({ currentReport, investigations }: { currentReport: InvestigationReport | null; investigations: InvestigationReport[] }) {
  const report = currentReport ?? investigations[0]
  const palette = getRiskPalette(report?.riskLevel ?? 'Moderate')
  const reduceMotion = useReducedMotion()

  const [expandedEvidence, setExpandedEvidence] = useState<number | null>(0)
  const [activeConfidenceTab, setActiveConfidenceTab] = useState<'drivers' | 'reducers' | 'alternatives' | 'missing'>('drivers')

  if (!report) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25 }}
        className="space-y-8"
      >
        {/* Zeroed metrics panel — Ready to Analyze state */}
        <section
          aria-label="Investigation Ready State"
          className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8"
          style={{ background: 'linear-gradient(135deg, rgba(100,116,139,0.15), rgba(255,255,255,0.96))' }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider bg-slate-50 text-slate-700 border-slate-200">
                  <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse" aria-hidden="true" />
                  Ready to Analyze
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Investigation Report
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Run an investigation on any suspicious email, SMS, URL, or message to see an evidence-backed report here. All metrics will animate from zero as results are computed.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/scan"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  <span>Start an investigation</span>
                </Link>
              </div>
            </div>

            {/* Zeroed Score Rings */}
            <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-md">
              <h2 className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Calibrated AI Confidence Metrics
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <ScoreRing value={0} label="Scam Risk" tone="#64748b" />
                </div>
                <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <ScoreRing value={0} label="Trust Index" tone="#10b981" />
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/90 p-3.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>Analysis Confidence</span>
                  <span className="font-bold text-slate-900">0%</span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-700"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    )
  }

  const toggleEvidence = (index: number) => {
    setExpandedEvidence((prev) => (prev === index ? null : index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className="space-y-8"
    >
      {/* ACT 1: VERDICT BANNER & CORE METRICS */}
      <section
        aria-label="Investigation Verdict Header"
        className={`relative overflow-hidden rounded-[2.2rem] border ${palette.border} p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8`}
        style={{ background: `linear-gradient(135deg, ${palette.glow}, rgba(255,255,255,0.96))` }}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider ${palette.bg} ${palette.text} ${palette.border}`}>
                <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
                {report.riskLevel} Risk Verdict
              </span>
              <span className="rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs font-medium text-slate-700 shadow-xs">
                {report.threatLevel}
              </span>
              <span className="rounded-full border border-slate-200 bg-white/90 px-3.5 py-1 text-xs font-medium text-slate-700 shadow-xs">
                {report.sourceType.toUpperCase()} Intake
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {report.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              {report.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <span>+ Scan another message</span>
              </Link>
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800"
              >
                <span>Test your instincts on this pattern →</span>
              </Link>
            </div>
          </div>

          {/* Core Score Ring Gauge Panel */}
          <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/95 p-6 shadow-sm backdrop-blur-md">
            <h2 className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Calibrated AI Confidence Metrics
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <ScoreRing value={report.scamProbability} label="Scam Risk" tone={palette.accent} />
              </div>
              <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <ScoreRing value={report.trustScore} label="Trust Index" tone="#10b981" />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/90 p-3.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Analysis Confidence</span>
                <span className="font-bold text-slate-900"><Counter value={report.analysisConfidence} />%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-700"
                  style={{ width: `${report.analysisConfidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 2: WHY VERIDION REACHED THIS CONCLUSION & CONFIDENCE CALIBRATION */}
      <section aria-labelledby="reasoning-heading" className="soft-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Act 2 • Educational Reasoning</p>
            <h2 id="reasoning-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why the AI Reached This Conclusion
            </h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
            Transparent AI Reasoning
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <p className="text-base leading-relaxed text-slate-800 sm:text-lg">
            {report.explanation}
          </p>
        </div>

        {/* Progressive Disclosure: Confidence Breakdown Tabs */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Confidence Calibration Breakdown
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 border-b border-slate-200 pb-3" role="tablist">
            {(
              [
                ['drivers', 'Improved Confidence', report.whatImprovedConfidence.length],
                ['reducers', 'Reduced Confidence', report.whatReducedConfidence.length],
                ['alternatives', 'Alternative Scenarios', report.alternativeExplanations.length],
                ['missing', 'Missing Context', report.missingInformation.length],
              ] as const
            ).map(([tabKey, tabTitle, count]) => (
              <button
                key={tabKey}
                role="tab"
                aria-selected={activeConfidenceTab === tabKey}
                aria-controls={`panel-${tabKey}`}
                id={`tab-${tabKey}`}
                onClick={() => setActiveConfidenceTab(tabKey)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  activeConfidenceTab === tabKey
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tabTitle} ({count})
              </button>
            ))}
          </div>

          <div className="mt-4">
            {activeConfidenceTab === 'drivers' && (
              <div id="panel-drivers" role="tabpanel" aria-labelledby="tab-drivers" className="grid gap-2.5 sm:grid-cols-2">
                {report.whatImprovedConfidence.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-900">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeConfidenceTab === 'reducers' && (
              <div id="panel-reducers" role="tabpanel" aria-labelledby="tab-reducers" className="grid gap-2.5 sm:grid-cols-2">
                {report.whatReducedConfidence.length ? (
                  report.whatReducedConfidence.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-900">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">!</span>
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
                    No confidence reducers surfaced; evidence consistently pointed in one direction.
                  </div>
                )}
              </div>
            )}

            {activeConfidenceTab === 'alternatives' && (
              <div id="panel-alternatives" role="tabpanel" aria-labelledby="tab-alternatives" className="grid gap-2.5 sm:grid-cols-2">
                {report.alternativeExplanations.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-700 shadow-xs">
                    <span className="mt-0.5 text-slate-400">💡</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeConfidenceTab === 'missing' && (
              <div id="panel-missing" role="tabpanel" aria-labelledby="tab-missing" className="grid gap-2.5 sm:grid-cols-2">
                {report.missingInformation.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-3.5 text-xs text-sky-900">
                    <span className="mt-0.5 text-sky-600">❓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ACT 3: INTERACTIVE EXPANDABLE EVIDENCE WALKTHROUGH */}
      <section aria-labelledby="evidence-heading" className="soft-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Act 3 • Evidence Audit</p>
            <h2 id="evidence-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Assembled Evidence & Detector Signals
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Click any item to inspect detector details ({report.evidence.length} signals found)
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {report.evidence.map((item: EvidenceItem, idx: number) => {
            const isExpanded = expandedEvidence === idx
            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isExpanded ? 'border-emerald-300 bg-emerald-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleEvidence(idx)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.label}</h3>
                      <p className="text-xs text-slate-500">{item.source === 'local-ai' ? 'Local AI Rule Detector' : item.source === 'online-intelligence' ? 'Online Intelligence' : 'User Input'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      +{item.weight} pts weight
                    </span>
                    <span className="text-slate-400 text-sm font-bold">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      className="border-t border-slate-200/80 bg-white px-5 py-4 text-xs text-slate-700"
                    >
                      <p className="leading-relaxed text-sm text-slate-800">{item.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ACT 4: SCAM PSYCHOLOGY & RED FLAGS VS TRUST SIGNALS */}
      <section aria-labelledby="psychology-heading" className="grid gap-6 lg:grid-cols-2">
        {/* Psychological Manipulation Tactics */}
        <div className="soft-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Act 4 • Behavioral Psychology</p>
            <h2 id="psychology-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Scam Tactics Identified
            </h2>
            <p className="mt-2 text-xs text-slate-600">
              Understanding what psychological lever the scammer tried to pull helps you spot similar tricks in the future.
            </p>

            <div className="mt-6 space-y-3">
              {report.tactics.length ? (
                report.tactics.map((tactic, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">{tactic}</span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800 border border-amber-200">
                        Triggered
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-600">
                      Designed to reduce critical verification by creating immediate urgency or authority compliance.
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
                  No explicit psychological manipulation pattern detected.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Signals Comparison Side-by-Side */}
        <div className="soft-panel flex flex-col justify-between rounded-[2rem] p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Signal Contrast</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Red Flags vs Trust Cues
            </h2>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  🚩 Top Red Flags ({report.redFlags.length})
                </h3>
                <div className="mt-2 space-y-1.5">
                  {report.redFlags.length ? (
                    report.redFlags.map((flag, idx) => (
                      <div key={idx} className="rounded-lg border border-rose-200 bg-rose-50/70 px-3 py-2 text-xs font-medium text-rose-900">
                        {flag}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                      No red flags identified.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  🛡️ Trust Signals ({report.trustSignals.length})
                </h3>
                <div className="mt-2 space-y-1.5">
                  {report.trustSignals.length ? (
                    report.trustSignals.map((signal, idx) => (
                      <div key={idx} className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs font-medium text-emerald-900">
                        {signal}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
                      No reassuring trust signals detected.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 5: ACTIONABLE RECOMMENDATIONS & DEFENSE CHECKLIST */}
      <section aria-labelledby="actions-heading" className="soft-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-700">Act 5 • Safety Action Plan</p>
            <h2 id="actions-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Recommended Protective Steps
            </h2>
          </div>
          <span className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white">
            Actionable Checklist
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {report.actions.map((action: string, idx: number) => (
            <div key={idx} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                  {idx + 1}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-800 font-medium sm:text-sm">
                  {action}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                Recommended step
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-emerald-950 p-6 text-white">
          <div>
            <h3 className="text-lg font-semibold">Want to sharpen your defense skills?</h3>
            <p className="mt-1 text-xs text-slate-300">
              Practice identifying similar phishing techniques in our interactive learning modules.
            </p>
          </div>
          <Link
            to="/learn"
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Explore Learning Modules →
          </Link>
        </div>
      </section>
    </motion.div>
  )
}
export default ReportPage
