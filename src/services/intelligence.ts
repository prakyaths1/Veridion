import type { SourceType } from '../types'

export interface IntelligenceSignal {
  source: string
  summary: string
  confidence: number
  available: boolean
}

export async function collectOnlineIntelligence(_url: string, _text: string): Promise<IntelligenceSignal[]> {
  const providers = [
    { source: 'Google Safe Browsing', configured: Boolean(import.meta.env.VITE_GOOGLE_SAFE_BROWSING_KEY) },
    { source: 'VirusTotal', configured: Boolean(import.meta.env.VITE_VIRUSTOTAL_KEY) },
    { source: 'OpenPhish', configured: Boolean(import.meta.env.VITE_OPENPHISH_KEY) },
    { source: 'URLhaus', configured: Boolean(import.meta.env.VITE_URLHAUS_KEY) },
  ]

  return providers.map((provider) => ({
    source: provider.source,
    summary: provider.configured
      ? 'Ready for live intelligence ingestion when an API key is available.'
      : 'Not configured in this local demo build. The app will continue with explainable local analysis.',
    confidence: provider.configured ? 0.9 : 0.2,
    available: provider.configured,
  }))
}

export function buildEvidenceContext(sourceType: SourceType, url?: string) {
  const base = [
    'Local AI analysis is available in this build.',
    'Online intelligence services can be plugged in later through environment variables.',
  ]

  if (sourceType === 'url' && url) {
    base.push(`The URL review was anchored on the submitted destination: ${url}`)
  }

  if (sourceType === 'screenshot') {
    base.push('The screenshot was treated as a visual cue rather than a definitive proof of malice.')
  }

  return base
}
