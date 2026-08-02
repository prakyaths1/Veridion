import type { DetectorContext, DetectorResult } from '../types.ts'
import { KNOWN_BRANDS } from '../constants/brands.ts'

const credentialRequestCue = /(?:enter|confirm|verify|provide|send|submit|update|share)\s[\w\s]*(?:password|credentials|ssn|pin|credit card|bank account|gift card|recovery code|seed phrase|wallet|otp|verification code)|(?:password|credentials|ssn|pin|credit card)\s[\w\s]*(?:required|needed|enter|confirm|verify)/i
const informationalCredentialCue = /password.*(?:changed|updated|reset|successful)|login.*(?:successful|detected)|signed in from|new sign-in|credentials.*verified|code.*sent|we sent you/i
const urgencyCue = /immediately|urgent|final notice|act now|right now|within 24 hours|within 48 hours|locked|suspended|expires/i
const suspiciousUrlCue = /(?:bit\.ly|tinyurl|is\.gd|\b[a-z0-9]+-(?:alert|login|secure|verify|update|auth|cancel|support|security|wallet|account|delivery|track)\b|\.(?:xyz|top|club|icu|buzz|tk|ml|ga|cf|gq|work|click|link|info))/i
// Brands that appear inside legitimate domains should not count
const brandInSafeDomainPattern = /(?:support|help|docs|mail|calendar|drive)\.(?:google|apple|microsoft)\.com|(?:amazon|paypal|netflix|chase)\.com(?:\/|$|\?)/i

export function brandImpersonationDetector(context: DetectorContext): DetectorResult {
  const { lower, urlMatches } = context
  const matches = KNOWN_BRANDS.filter((brand) => lower.includes(brand))

  if (!matches.length) {
    return { detector: 'Brand Impersonation', score: 0, confidence: 0, evidence: [] }
  }

  // If brand appears only within a known safe domain URL, skip
  if (brandInSafeDomainPattern.test(lower)) {
    const textWithoutSafeUrls = lower.replace(brandInSafeDomainPattern, '')
    const remainingMatches = KNOWN_BRANDS.filter((brand) => textWithoutSafeUrls.includes(brand))
    if (!remainingMatches.length) {
      return { detector: 'Brand Impersonation', score: 0, confidence: 0, evidence: [] }
    }
  }

  // Informational credential mentions are NOT requests
  if (informationalCredentialCue.test(lower)) {
    return { detector: 'Brand Impersonation', score: 0, confidence: 0, evidence: [] }
  }

  const hasSuspiciousUrl = urlMatches.some((url) => suspiciousUrlCue.test(url))
  const hasCredentialRequest = credentialRequestCue.test(lower)
  const hasUrgency = urgencyCue.test(lower)
  const brandList = matches.join(', ')

  // Brand mention alone is NOT impersonation — many legitimate messages reference brands
  if (!hasSuspiciousUrl && !hasCredentialRequest && !hasUrgency) {
    return { detector: 'Brand Impersonation', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (hasSuspiciousUrl && hasCredentialRequest) {
    score = 28
    evidence.push(
      `The message mentions ${brandList} alongside a suspicious URL and a request for sensitive credentials. This is the hallmark of brand impersonation phishing: scammers create fake login pages that mimic trusted companies to steal your information.`,
    )
  } else if (hasSuspiciousUrl) {
    score = 22
    evidence.push(
      `The message references ${brandList} and includes a suspicious URL. Legitimate companies send links to their own verified domains (e.g., amazon.com, not amazon-verify-login.com). The mismatch between the brand name and the link destination is a strong phishing indicator.`,
    )
  } else if (hasCredentialRequest && hasUrgency) {
    score = 25
    evidence.push(
      `The message uses ${brandList}'s name while urgently requesting credentials. Real companies rarely ask you to "verify" or "confirm" passwords via email or SMS. This combination of brand authority + urgency + credential request is a classic social engineering tactic.`,
    )
  } else if (hasCredentialRequest) {
    score = 18
    evidence.push(
      `The message mentions ${brandList} alongside a request for sensitive information. While some legitimate communications reference credentials, the combination warrants caution — verify by contacting ${brandList} through their official website or app, not through this message.`,
    )
  } else if (hasUrgency) {
    score = 12
    evidence.push(
      `The message references ${brandList} with urgent language. Scammers exploit brand trust to create false urgency. However, urgency alone with a brand name is only a moderate signal — some legitimate notifications (shipping deadlines, payment reminders) also use time pressure.`,
    )
  }

  return {
    detector: 'Brand Impersonation',
    score,
    confidence: hasSuspiciousUrl ? 96 : 85,
    evidence,
  }
}
