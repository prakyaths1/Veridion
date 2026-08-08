import type { DetectorContext, DetectorResult } from '../types.ts'

// Workplace / professional context
const workplacePattern = /\b(?:team update|agenda|standup|sprint|quarterly|status update|as discussed|per our conversation|boardroom|conference)\b/i

// Shipping / transactional context
const transactionalPattern = /\b(?:package has shipped|has been shipped|order details|order confirmed|tracking info|out for delivery|delivery scheduled|estimated delivery|shipped and is scheduled|order summary)\b/i

// Educational context with strict word boundaries
const educationalPattern = /\b(?:class|school|homework|assignment|teacher|professor|lecture|semester|grade|syllabus|campus|library|textbook|student|exam|quiz)\b/i

// Personal / social context
const personalPattern = /\b(?:pick you up|dinner tonight|happy birthday|see you later|on my way|running late|good morning|good night|love you|miss you|how are you|call me when|let me know when)\b/i

// Health / appointment context
const healthPattern = /\b(?:dr\.|doctor|dentist|pharmacy|prescription|checkup|check-up|lab results|test results)\b/i

const credentialAskOverride = /(?:enter|confirm|verify|provide|submit|authenticate|scan)[\s\w]*(?:password|credentials|code|otp|qr|seed phrase|login|direct deposit|payroll|information)|scan (?:the|this|below)?\s*qr|don't call|do not call|cannot talk on phone|gift card|gift cards|steam|apple|itunes|call.*1-800|call.*customer service|dispute.*transaction|http/i

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
