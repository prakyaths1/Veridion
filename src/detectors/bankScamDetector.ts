import type { DetectorContext, DetectorResult } from '../types.ts'

const bankThreatPattern = /account locked|account.*locked|locked.*account|suspicious transaction|suspicious activity|verify identity|security alert|account frozen|verify.*credentials|unauthorized.*activity|unauthorized.*access|unusual.*activity/i
const bankMentionPattern = /bank|banking|financial institution/i
const legitimateBankPattern = /statement.*ready|balance.*is|payment.*received|payment.*confirmed|direct deposit|payroll|salary.*deposited|transaction.*complete|successfully.*processed/i
const credentialCue = /confirm your|verify your|update your|enter your|provide your|password|login|ssn|pin|credentials/i
const suspiciousUrlCue = /bank-secure|secure-login|verify-account|account-verify|banking-login|secure-bank|bank-alert/i

export function bankScamDetector(context: DetectorContext): DetectorResult {
  const { lower, urlMatches } = context
  const hasBankThreat = bankThreatPattern.test(lower)
  const hasBankMention = bankMentionPattern.test(lower)

  if (!hasBankThreat && !hasBankMention) {
    return { detector: 'Bank Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  // Legitimate banking notifications should not trigger
  if (legitimateBankPattern.test(lower) && !hasBankThreat) {
    return { detector: 'Bank Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  const hasCredentialRequest = credentialCue.test(lower)
  const hasSuspiciousUrl = urlMatches.some((url) => suspiciousUrlCue.test(url))

  const evidence: string[] = []
  let score = 0

  if (hasBankThreat && hasCredentialRequest && hasSuspiciousUrl) {
    score = 32
    evidence.push(
      'The message claims your bank account is at risk while requesting credentials and linking to a suspicious URL. This is a textbook bank phishing attack. Real banks never ask for your password, PIN, or SSN via email or text — they already have your information on file.',
    )
  } else if (hasBankThreat && (hasCredentialRequest || hasSuspiciousUrl)) {
    score = 26
    evidence.push(
      'The message uses bank security language (account locked, suspicious activity) combined with a request to verify credentials or a suspicious link. Banks handle security issues through their own secure portals, not through unsolicited messages asking you to click links.',
    )
  } else if (hasBankThreat) {
    score = 16
    evidence.push(
      'The message uses bank security alarm language (locked account, frozen account, suspicious transaction). While banks do send security alerts, the most common use of this language is in phishing. Call your bank directly using the number on your card to verify any alerts.',
    )
  } else if (hasBankMention && hasCredentialRequest) {
    score = 18
    evidence.push(
      'The message mentions banking in combination with a request for sensitive information. Even if the message looks official, banks will never ask for your full password or PIN via email or SMS.',
    )
  } else {
    // Bank mention alone without threat or credential request
    score = 0
    return { detector: 'Bank Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  return {
    detector: 'Bank Scam Detector',
    score,
    confidence: hasSuspiciousUrl ? 95 : hasBankThreat ? 88 : 78,
    evidence,
  }
}
