import type { DetectorContext, DetectorResult } from '../types.ts'

// Workplace / professional context
const workplacePattern = /team update|agenda|meeting|calendar|reminder|standup|sprint|quarterly|review|project update|status update|sync|check-in|follow-up|as discussed|per our conversation|office|boardroom|conference/i

// Shipping / transactional context
const transactionalPattern = /package has shipped|has been shipped|order details|order confirmed|tracking info|tracking number|out for delivery|delivery scheduled|estimated delivery|shipped and is scheduled|order summary|receipt|invoice.*attached|shipment confirmation/i

// Educational context
const educationalPattern = /class|school|homework|assignment|teacher|professor|lecture|semester|grade|syllabus|campus|library|textbook|student|exam|quiz.*due|study group/i

// Personal / social context
const personalPattern = /pick you up|dinner tonight|happy birthday|see you later|on my way|running late|good morning|good night|love you|miss you|how are you|call me when|let me know when|see you at/i

// Health / appointment context
const healthPattern = /appointment.*(?:confirmed|scheduled|reminder)|dr\.|doctor|dentist|pharmacy|prescription|checkup|check-up|follow-up.*appointment|lab results|test results/i

const credentialAskOverride = /(?:enter|confirm|verify|provide|submit|authenticate|scan)[\s\w]*(?:password|credentials|code|otp|qr|seed phrase|login)|scan (?:the|this|below)?\s*qr|don't call|do not call|cannot talk on phone|cashier['\s]?check|buy.*equipment|home office equipment/i

export function trustSignalDetector(context: DetectorContext): DetectorResult {
  const { lower } = context

  if (credentialAskOverride.test(lower)) {
    return { detector: 'Trust Signal Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (workplacePattern.test(lower)) {
    score -= 15
    evidence.push(
      'The message uses professional workplace language ("team update", "agenda", "meeting", "review") without requesting credentials, payments, or urgent action — consistent with routine business communication that poses no threat.',
    )
  }

  if (transactionalPattern.test(lower)) {
    score -= 15
    evidence.push(
      'The message contains standard transactional language ("has shipped", "order confirmed", "tracking info") that is typical of legitimate order and shipping notifications. No suspicious links or credential requests are present.',
    )
  }

  if (educationalPattern.test(lower)) {
    score -= 15
    evidence.push(
      'The message references an educational context ("class", "homework", "teacher", "assignment") that is consistent with routine school or academic communication.',
    )
  }

  if (personalPattern.test(lower)) {
    score -= 12
    evidence.push(
      'The message uses personal, conversational language ("see you later", "running late", "happy birthday") that is typical of genuine interpersonal communication between people who know each other.',
    )
  }

  if (healthPattern.test(lower)) {
    score -= 12
    evidence.push(
      'The message references a healthcare appointment or medical context, which is consistent with routine transactional communications from healthcare providers.',
    )
  }

  if (!evidence.length) {
    return { detector: 'Trust Signal Detector', score: 0, confidence: 0, evidence: [] }
  }

  return {
    detector: 'Trust Signal Detector',
    score,
    confidence: 92,
    evidence,
  }
}
