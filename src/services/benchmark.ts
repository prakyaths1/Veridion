import type { SourceType } from '../types'

export interface BenchmarkExample {
  id: string
  label: string
  category: string
  text: string
  expectedRisk: string
  expectedProbability: number
  expectedConfidence: number
  redFlags: string[]
  trustSignals: string[]
  notes: string
}

export interface BenchmarkMatch {
  similarity: number
  topCategory: string
  referenceId: string
  referenceLabel: string
  patternSummary: string
}

const BENCHMARK_LIBRARY: BenchmarkExample[] = [
  {
    id: 'email-legit-001',
    label: 'Teacher reminder',
    category: 'School',
    text: 'Hi class, please bring your notebook to school tomorrow. Thanks!',
    expectedRisk: 'Very Low',
    expectedProbability: 3,
    expectedConfidence: 98,
    redFlags: [],
    trustSignals: ['Normal class homework reminder'],
    notes: 'Routine teacher reminder with a clear educational context.',
  },
  {
    id: 'email-phish-001',
    label: 'USPS delivery trap',
    category: 'Delivery',
    text: 'Your package is delayed. Confirm your address now at https://usps-redelivery-track.com/verify',
    expectedRisk: 'High',
    expectedProbability: 78,
    expectedConfidence: 98,
    redFlags: ['Delivery urgency', 'Credential or verification request', 'Suspicious URL'],
    trustSignals: [],
    notes: 'Classic fake delivery flow that combines urgency, pressure, and a suspicious domain.',
  },
  {
    id: 'sms-phish-001',
    label: 'Gift card ransom',
    category: 'Gift card',
    text: 'We need a gift card code immediately to process your refund today.',
    expectedRisk: 'Critical',
    expectedProbability: 94,
    expectedConfidence: 99,
    redFlags: ['Gift card request', 'Urgent financial pressure'],
    trustSignals: [],
    notes: 'Gift card requests are a high-confidence scam signal.',
  },
  {
    id: 'email-legit-002',
    label: 'Amazon shipment confirmation',
    category: 'Order confirmation',
    text: 'Your Amazon package has shipped. Tracking details are available in the order summary.',
    expectedRisk: 'Very Low',
    expectedProbability: 4,
    expectedConfidence: 94,
    redFlags: [],
    trustSignals: ['Known merchant context', 'Normal shipping update'],
    notes: 'Routine shopping update from a recognized merchant.',
  },
  {
    id: 'email-legit-003',
    label: 'TKS team update',
    category: 'Workplace',
    text: 'TKS team update: please review the agenda for tomorrow morning and share your comments before noon.',
    expectedRisk: 'Very Low',
    expectedProbability: 3,
    expectedConfidence: 95,
    redFlags: [],
    trustSignals: ['Professional team context'],
    notes: 'Low-risk office communication with a clear workflow signal.',
  },
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
}

export function compareInputToBenchmark(input: string, sourceType: SourceType): BenchmarkMatch | null {
  const normalizedInput = normalize(input)
  const words = normalizedInput.split(/\s+/).filter(Boolean)

  if (!words.length) {
    return null
  }

  let bestMatch: BenchmarkMatch | null = null

  for (const example of BENCHMARK_LIBRARY) {
    const exampleText = normalize(example.text)
    const exampleTokens = exampleText.split(/\s+/).filter(Boolean)
    const overlap = exampleTokens.filter((token) => words.includes(token)).length
    const sourceTypeBonus = example.category.toLowerCase().includes(sourceType) ? 6 : 0
    const categoryBonus = example.category.toLowerCase().includes('delivery') && sourceType === 'email' ? 4 : 0
    const similarity = Math.min(94, overlap * 12 + sourceTypeBonus + categoryBonus)

    if (!bestMatch || similarity > bestMatch.similarity) {
      bestMatch = {
        similarity,
        topCategory: example.category,
        referenceId: example.id,
        referenceLabel: example.label,
        patternSummary: `${example.label} is a strong reference example for ${example.category.toLowerCase()} style communication.`,
      }
    }
  }

  return bestMatch
}
