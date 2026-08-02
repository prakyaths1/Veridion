import type { DetectorContext, DetectorResult } from '../types.ts'

// Strong urgency — language that creates artificial time pressure
const strongUrgencyPattern = /final notice|act now|right now|within 24 hours|within 48 hours|account will be|will be suspended|will be locked|will be closed|will be terminated|expires today|last chance|failure to respond|immediate action|respond immediately|action required immediately/i

// Mild urgency — words that can appear in both scam and legitimate contexts
const mildUrgencyPattern = /immediately|urgent|today|asap|hurry|don't delay|time sensitive|limited time/i

// Scam context amplifiers — urgency is much more suspicious alongside these
const scamContextPattern = /verify|confirm|credentials|password|login|click|suspended|locked|frozen|unauthorized|gift card|wire|send money/i

// Normal urgency contexts that are not suspicious
const normalUrgencyContext = /meeting|appointment|due|deadline|class|school|homework|assignment|sprint|standup|agenda|review|please.*before|submit.*by|reminder/i

export function urgencyDetector(context: DetectorContext): DetectorResult {
  const { lower } = context
  const hasStrongUrgency = strongUrgencyPattern.test(lower)
  const hasMildUrgency = mildUrgencyPattern.test(lower)

  if (!hasStrongUrgency && !hasMildUrgency) {
    return { detector: 'Urgency Detector', score: 0, confidence: 0, evidence: [] }
  }

  const hasScamContext = scamContextPattern.test(lower)
  const hasNormalContext = normalUrgencyContext.test(lower)

  // Normal contexts with mild urgency → not suspicious
  if (!hasStrongUrgency && hasMildUrgency && hasNormalContext && !hasScamContext) {
    return { detector: 'Urgency Detector', score: 0, confidence: 0, evidence: [] }
  }

  if (hasStrongUrgency && hasScamContext) {
    return {
      detector: 'Urgency Detector',
      score: 16,
      confidence: 93,
      evidence: [
        'The message creates strong artificial time pressure ("act now", "final notice", "within 24 hours") combined with a suspicious request. This is a deliberate psychological tactic: scammers impose tight deadlines to prevent you from pausing, thinking critically, or verifying the request through independent channels.',
      ],
    }
  }

  if (hasStrongUrgency) {
    return {
      detector: 'Urgency Detector',
      score: 10,
      confidence: 82,
      evidence: [
        'The message uses strong urgency language ("final notice", "immediate action required", "expires today"). While some legitimate communications use deadlines, artificial urgency is one of the most common social engineering tactics — it is designed to make you act before you think.',
      ],
    }
  }

  // Mild urgency with scam context
  if (hasScamContext) {
    return {
      detector: 'Urgency Detector',
      score: 8,
      confidence: 78,
      evidence: [
        'The message uses time-pressure language alongside a request that could be suspicious. Even mild urgency ("today", "immediately") becomes a risk signal when paired with requests for credentials, payments, or account actions.',
      ],
    }
  }

  // Mild urgency alone — minimal signal
  return {
    detector: 'Urgency Detector',
    score: 4,
    confidence: 65,
    evidence: [
      'The message uses mild time-pressure language. This is common in both legitimate and scam communications. On its own, urgency is a weak signal — it becomes more concerning when combined with requests for sensitive information or suspicious links.',
    ],
  }
}
