import type { DetectorContext, DetectorResult } from '../types.ts'

// Active request patterns: imperative verbs that ask the user to provide credentials, 2FA codes, seed phrases, or scan QR codes
const activeRequestPattern = /(?:enter|confirm|verify|provide|send|submit|update|share|give|input|type)[\s\w]*(?:password|verification code|one-time code|otp|login|ssn|pin|credit card|bank account|gift card|recovery code|seed phrase|wallet|credentials|social security|security code|cvv|account number|recovery phrase|12-word|24-word|secret key|personal access token)|(?:scan|camera)[\s\w]*(?:qr code|qr)|(?:connect|re-verify)[\s\w]*(?:wallet|metamask)|quota exceeded|storage.*full|mailbox.*full|upgrade.*quota|release messages/i
const reverseActivePattern = /(?:password|verification code|one-time code|otp|login details|ssn|pin|credit card|bank account|gift card|recovery code|seed phrase|wallet|credentials|security code|cvv|account number|recovery phrase|12-word|secret key)[\s\w]*(?:required|needed|must be|is required|is needed|enter|confirm|verify)/i
const trailingUrlImperativePattern = /(?:verify|reset|confirm|login|authenticate)\s+(?:now|today|here|immediately)?\s*:\s*https?:\/\/[^\s]+/i

// Informational patterns that mention credentials without requesting them
const informationalPattern = /login.*successful|password.*changed|password.*updated|password.*reset.*complete|credentials.*verified|login.*detected|signed in from|new sign-in|security code.*sent|code.*has been sent|we sent you|your code is/i

export function credentialRequestDetector(context: DetectorContext): DetectorResult {
  const { lower } = context

  // Informational mentions are NOT requests — skip them
  if (informationalPattern.test(lower)) {
    return { detector: 'Credential Request Detector', score: 0, confidence: 0, evidence: [] }
  }

  const hasActiveRequest = activeRequestPattern.test(lower) || reverseActivePattern.test(lower) || trailingUrlImperativePattern.test(lower)

  if (!hasActiveRequest) {
    return { detector: 'Credential Request Detector', score: 0, confidence: 0, evidence: [] }
  }

  return {
    detector: 'Credential Request Detector',
    score: 26,
    confidence: 94,
    evidence: [
      'The message actively asks you to provide sensitive credentials (password, PIN, SSN, verification code, or financial details). Legitimate companies already have your account information — they do not need you to "verify" or "confirm" it through unsolicited messages. This is one of the strongest indicators of a phishing attempt.',
    ],
  }
}
