import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className="soft-panel rounded-[2rem] p-8 sm:p-10">
        <div className="mb-6 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          Explainable AI • Local-first • Safety coaching
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Spot scams before they become costly mistakes.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-700 font-medium">
          Veridion gives you a clear verdict, evidence-backed reasoning, and a practical next step instead of a generic warning.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/scan" className="rounded-full bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-500">Start investigation</Link>
          <Link to="/learn" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700">Explore lessons</Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ['Evidence first', 'Every verdict comes with a reason.'],
            ['Save progress', 'Your streak and XP stay in the browser.'],
            ['Learn faster', 'Quick lessons and guided practice build skills.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <p className="mt-1 text-sm text-slate-700">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="soft-panel glow-ring rounded-[2rem] p-6">
        <div className="rounded-[1.6rem] bg-gradient-to-br from-emerald-50 to-sky-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-bold">Live investigation preview</p>
            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">Demo mode</span>
          </div>
          <div className="mt-5 space-y-3">
            {[
              { label: 'AI verdict', value: 'Context-dependent, not definitive' },
              { label: 'Risk level', value: 'Moderate' },
              { label: 'Scam probability', value: '42%' },
              { label: 'Confidence', value: '83%' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700">{item.label}</p>
                <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
export default LandingPage
