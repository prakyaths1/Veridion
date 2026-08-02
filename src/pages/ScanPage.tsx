import { motion } from 'framer-motion'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { STORAGE_KEYS } from '../constants/storage'
import { buildEvidenceContext, collectOnlineIntelligence } from '../services/intelligence'
import type { InvestigationReport, ProgressState, SourceType } from '../types'
import { buildDemoReport } from '../utils/scoring'

export function ScanPage({ setProgress, setCurrentReport }: { setProgress: Dispatch<SetStateAction<ProgressState>>; setCurrentReport: Dispatch<SetStateAction<InvestigationReport | null>> }) {
  const [input, setInput] = useState('')
  const [sourceType, setSourceType] = useState<SourceType>('email')
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [steps, setSteps] = useState<string[]>([])
  const navigate = useNavigate()

  const sourceOptions: Array<{ value: SourceType; label: string; hint: string }> = [
    { value: 'email', label: 'Email', hint: 'Corporate, personal, and emerging scam patterns' },
    { value: 'sms', label: 'SMS', hint: 'Short-form social engineering and smishing' },
    { value: 'url', label: 'URL', hint: 'Domains, brand impersonation, and bad destinations' },
    { value: 'screenshot', label: 'Screenshot', hint: 'Image review is a coming-soon capability' },
  ]

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setInput(`Screenshot uploaded: ${file.name}`)
      setSourceType('screenshot')
    }
  }

  const handleAnalyze = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!input.trim()) return

    // Reset previous investigation — clear stale metrics before starting
    setCurrentReport(null)
    window.localStorage.removeItem(STORAGE_KEYS.currentReport)

    const stepsToShow = ['Reading content...', 'Extracting evidence...', 'Checking sender...', 'Analyzing language...', 'Checking URLs...', 'Comparing scam indicators...', 'Generating investigation...']
    setSteps(stepsToShow)
    setIsAnalyzing(true)

    // Navigate immediately so the user sees the analyzing state with zeroed metrics
    navigate('/report')

    // Small delay so the analyzing state renders before computation
    await new Promise((resolve) => window.setTimeout(resolve, 120))

    const onlineSignals = await collectOnlineIntelligence(input, input)
    const evidenceContext = buildEvidenceContext(sourceType, input)
    const report = buildDemoReport(input, sourceType, fileName || undefined, onlineSignals)

    window.localStorage.setItem(STORAGE_KEYS.currentReport, JSON.stringify(report))
    window.localStorage.setItem(STORAGE_KEYS.investigations, JSON.stringify([report]))
    window.localStorage.setItem('veridion-evidence-context', JSON.stringify(evidenceContext))
    setCurrentReport(report)
    setProgress((prev) => ({ ...prev, xp: prev.xp + 40, streak: prev.streak + 1 }))
    setIsAnalyzing(false)
  }

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
      <div className="soft-panel glow-ring rounded-[2rem] p-6 sm:p-8">
        <SectionHeader eyebrow="Investigation intake" title="Inspect suspicious content" description="Paste an email, SMS, website URL, or upload a screenshot. Veridion builds an evidence-led report and distinguishes low-risk messages from likely deception." />
        <form onSubmit={handleAnalyze} className="mt-7 space-y-4">
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">Content source</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {sourceOptions.map((option) => (
                <button key={option.value} type="button" onClick={() => setSourceType(option.value)} className={`rounded-[1.2rem] border p-3 text-left transition ${sourceType === option.value ? 'border-emerald-300 bg-emerald-50 text-emerald-900 shadow-[0_0_0_1px_rgba(16,185,129,0.16)]' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'}`}>
                  <div className="text-sm font-semibold">{option.label}</div>
                  <div className="mt-1 text-xs font-medium text-slate-700">{option.hint}</div>
                </button>
              ))}
            </div>
          </div>

          <label className="block text-sm text-slate-700">
            Paste content
            <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={10} className="mt-2 w-full rounded-[1.4rem] border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" placeholder="Try: Your Amazon account has been locked. Verify immediately." />
          </label>

          <label className="flex cursor-pointer items-center justify-center rounded-[1.4rem] border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 text-sm text-emerald-800 transition hover:border-emerald-500 hover:bg-emerald-100">
            <span>{fileName ? `Uploaded: ${fileName}` : 'Upload screenshot • image analysis is coming soon'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>

          <button type="submit" className="w-full rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white shadow-[0_8px_28px_rgba(16,185,129,0.20)] transition hover:bg-emerald-500">
            {isAnalyzing ? 'Analyzing…' : 'Run investigation'}
          </button>
        </form>
      </div>

      <div className="soft-panel rounded-[2rem] p-6 sm:p-8">
        {isAnalyzing ? (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-700">Analysis pipeline</p>
            {steps.map((step, index) => (
              <motion.div key={`${step}-${index}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-[1.2rem] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  {step}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Why this feels trustworthy</h3>
            <div className="grid gap-3">
              {[
                'Every conclusion is explained with evidence rather than assumed.',
                'The system distinguishes low-risk from suspicious content instead of over-classifying.',
                'Online intelligence hooks are abstracted so real services can be added later without breaking the app.',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-[1.2rem] border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">Recent investigations</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="rounded-[1rem] border border-slate-200 bg-white p-3">USPS delivery phishing</div>
                <div className="rounded-[1rem] border border-slate-200 bg-white p-3">Amazon shipment confirmation</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}
export default ScanPage
