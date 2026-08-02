import type { InvestigationReport } from '../types'

export function getRiskPalette(level: InvestigationReport['riskLevel']) {
  switch (level) {
    case 'Critical':
      return { accent: '#e11d48', glow: 'rgba(225,29,72,0.15)', text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' }
    case 'High':
      return { accent: '#d97706', glow: 'rgba(217,119,6,0.15)', text: 'text-amber-800', bg: 'bg-amber-50', border: 'border-amber-200' }
    case 'Moderate':
      return { accent: '#0284c7', glow: 'rgba(2,132,199,0.15)', text: 'text-sky-800', bg: 'bg-sky-50', border: 'border-sky-200' }
    case 'Low':
      return { accent: '#059669', glow: 'rgba(5,150,105,0.15)', text: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-200' }
    default:
      return { accent: '#64748b', glow: 'rgba(100,116,139,0.15)', text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' }
  }
}
