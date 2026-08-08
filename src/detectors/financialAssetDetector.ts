import type { DetectorContext, DetectorResult } from '../types.ts'

const financialAssetActionPattern = /(?:confirm|verify|update|change|submit|provide|re-verify)[\s\w]*(?:direct deposit|payroll|bank account|paycheck|routing number|w-2|w2|tax form|ssn|banking details|payment info)/i
const paycheckPenaltyPattern = /(?:delay|hold|pause|cancel)[\s\w]*(?:next paycheck|payroll|salary|deposit|payment)/i

export function financialAssetDetector(context: DetectorContext): DetectorResult {
  const { lower, urlMatches } = context

  const hasAssetAction = financialAssetActionPattern.test(lower)
  const hasPaycheckPenalty = paycheckPenaltyPattern.test(lower)

  if (!hasAssetAction && !hasPaycheckPenalty) {
    return { detector: 'Financial Asset Detector', score: 0, confidence: 0, evidence: [] }
  }

  const score = urlMatches.length > 0 || hasPaycheckPenalty ? 30 : 20
  const confidence = 94

  return {
    detector: 'Financial Asset Detector',
    score,
    confidence,
    evidence: [
      'The message demands verification or updates to sensitive direct deposit, payroll, or banking information. Legitimate HR and payroll departments never ask employees to update bank routing numbers or deposit details through links in unsolicited emails.',
    ],
  }
}
