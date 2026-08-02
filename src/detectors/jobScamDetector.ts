import type { DetectorContext, DetectorResult } from '../types.ts'

const jobScamPattern = /easy money|no experience.*(?:needed|required)|daily income|whatsapp interview|task scam|remote worker|data entry|work from home|earn.*(?:\$\d+|\$\d[\d,]*|per day|per hour|per week)|guaranteed (?:income|salary)|be your own boss/i
const fakCheckPattern = /cashier['\s]?check|check.*(?:equipment|setup|supplies)|send.*(?:you a|you)?\s*check|buy.*(?:equipment|supplies)|home office (?:equipment|setup)/i

export function jobScamDetector(context: DetectorContext): DetectorResult {
  const { lower } = context
  const hasJobScam = jobScamPattern.test(lower)
  const hasFakeCheck = fakCheckPattern.test(lower)

  if (!hasJobScam && !hasFakeCheck) {
    return { detector: 'Job Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (hasJobScam && hasFakeCheck) {
    score = 48
    evidence.push(
      'The message combines a too-good-to-be-true job offer with a check-sending scheme. This is a classic fake-check fraud: you receive a fraudulent cashier\'s check, deposit it, and are asked to forward part of the funds. When the check bounces days later, you owe the bank the full amount. These scams target job seekers and students.',
    )
  } else if (hasJobScam) {
    score = 26
    evidence.push(
      'The message advertises high income for minimal effort or experience. Legitimate employers do not guarantee income, interview via WhatsApp, or promise "easy money." Job scams either harvest personal information (SSN, bank details for "direct deposit setup") or involve fake check schemes.',
    )
  } else {
    score = 18
    evidence.push(
      'The message mentions sending a check for equipment or supplies, which is a common setup for check fraud. The check will appear to clear initially but will bounce within days, leaving you liable for any money you\'ve already spent or forwarded.',
    )
  }

  return {
    detector: 'Job Scam Detector',
    score,
    confidence: hasJobScam && hasFakeCheck ? 93 : 88,
    evidence,
  }
}
