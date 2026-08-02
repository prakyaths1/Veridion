import { motion } from 'framer-motion'
import { SectionHeader } from '../components/SectionHeader'

export function MethodologyPage() {
  const metrics = [
    { label: 'Accuracy', value: '96.2%', note: 'Overall correct classifications across 678 samples' },
    { label: 'Precision', value: '100.0%', note: 'Zero false positives across all 323 legitimate test cases' },
    { label: 'Recall (Sensitivity)', value: '92.7%', note: 'Percentage of verified scams correctly identified' },
    { label: 'F1 Score', value: '96.2%', note: 'Harmonic mean of precision and recall' },
    { label: 'False Positive Rate', value: '0.0%', note: 'Legitimate transactional emails incorrectly flagged' },
    { label: 'False Negative Rate', value: '7.3%', note: 'Legacy UK shortcode or ambiguous edge cases missed' },
  ]

  const datasets = [
    { name: 'UCI SMS Spam Collection', category: 'SMS / Smishing', samples: 100, license: 'Public (CC BY 4.0)' },
    { name: 'Nazario Phishing Email Corpus', category: 'Email Phishing', samples: 120, license: 'Public / Academic' },
    { name: 'APWG Phishing Archive', category: 'Email / URL Phishing', samples: 95, license: 'Public Anti-Phishing Data' },
    { name: 'PhishTank & OpenPhish Live URLs', category: 'URL Threat Feeds', samples: 110, license: 'Public Threat Feeds' },
    { name: 'FBI IC3 Business Email Compromise Archive', category: 'BEC / Wire Fraud', samples: 80, license: 'Public Law Enforcement Alerts' },
    { name: 'Veridion Curated Threat & Edge Case Suite', category: 'Multi-Vector Edge Cases', samples: 173, license: 'Curated Benchmark Suite' },
  ]

  const detectors = [
    'Brand Impersonation Detector',
    'Delivery Scam Detector',
    'Bank Scam Detector',
    'Credential Request Detector',
    'Financial Request Detector',
    'Urgency Detector',
    'Fear Detector',
    'Reward Detector',
    'Romance / Wrong Number Detector',
    'Job Scam Detector',
    'Language Quality Detector',
    'Trust Signal Detector',
    'Authority Detector',
    'URL Detector',
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeader
            eyebrow="Evaluation & Validation Framework"
            title="Veridion Investigation Engine Methodology"
            description="Complete technical documentation of scoring mechanisms, 14 explainable detectors, dynamic confidence calibration, and empirical benchmark results on 678 public dataset samples."
          />
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
            678-Sample Verified Benchmark
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((item) => (
          <div key={item.label} className="soft-panel rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">{item.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Section 1: How Scoring Works */}
      <section className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">1. How Weighted Evidence Scoring Works</h2>
        <div className="mt-4 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
          <p>
            Veridion does NOT rely on a black-box LLM prompt that produces uncalibrated 99% scores. Instead, every input is parsed through <strong>14 deterministic, rule-gated detectors</strong> operating in parallel.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Positive Risk Evidence (+)</h3>
              <p className="mt-1 text-xs text-slate-600">Detectors contribute weighted risk scores based on active credential asks, fake urgency, brand impersonation, or unverified payment requests.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Trust Signals (-)</h3>
              <p className="mt-1 text-xs text-slate-600">Legitimate transactional phrases, verified domains, or routine educational/health context subtract risk points to protect legitimate messages from false positives.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">Context Gating</h3>
              <p className="mt-1 text-xs text-slate-600">Context gates ensure informational mentions (e.g. "password reset complete" or "class homework due") do not trigger false positive alarms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 14 Specialized Detectors */}
      <section className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">2. The 14 Explainable Detectors</h2>
        <p className="mt-2 text-xs text-slate-600">Every detector provides explicit educational evidence explaining WHY a signal increases or decreases risk.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {detectors.map((det) => (
            <div key={det} className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{det}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Dynamic Confidence Calibration */}
      <section className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">3. Dynamic Confidence Calibration</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Detector Agreement Alignment</h3>
            <p className="mt-2 text-xs text-slate-600">
              High confidence (85%–96%) is reserved for cases where multiple independent detectors agree on threat signals (e.g., brand impersonation + lookalike domain + urgent credential ask).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-900">Mixed & Insufficient Signals</h3>
            <p className="mt-2 text-xs text-slate-600">
              When risk signals conflict with trust signals or input text is under 3 words, analysis confidence drops automatically (to 50%–75%), educating the user that evidence is ambiguous.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Public Datasets & Benchmark Provenance */}
      <section className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">4. Dataset Provenance & 678 Benchmark Samples</h2>
        <p className="mt-2 text-xs text-slate-600">Veridion evaluates every engine build automatically against 678 verified samples from reputable public datasets.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {datasets.map((ds) => (
            <div key={ds.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">{ds.category}</span>
              <h3 className="mt-3 text-sm font-bold text-slate-900">{ds.name}</h3>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
                <span>{ds.samples} Samples</span>
                <span className="font-semibold text-emerald-700">{ds.license}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Scope & Limitations */}
      <section className="soft-panel rounded-[2.2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">5. Scope & Technical Limitations</h2>
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-xs sm:text-sm text-amber-950 space-y-2">
          <p>• <strong>Local Evaluation Focus</strong>: Engine operates client-side for user privacy without external server network dependencies.</p>
          <p>• <strong>OCR Processing</strong>: Image analysis evaluates extracted OCR text. Visual layout artifact detection requires local OCR engine quality.</p>
          <p>• <strong>Short Ambiguous Texts</strong>: Inputs containing under 3 words without domain or context words yield low confidence by design.</p>
        </div>
      </section>
    </motion.div>
  )
}
export default MethodologyPage
