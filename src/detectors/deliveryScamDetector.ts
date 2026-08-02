import type { DetectorContext, DetectorResult } from '../types.ts'

const deliveryScamPattern = /package.*delay|tracking issue|customs fee|reschedule delivery|address.*now|hold.*package|package on hold|delivery attempt failed|unable to deliver|delivery.*problem|confirm.*address/i
const legitimateDeliveryPattern = /package has shipped|has been shipped|order details|tracking info|tracking number|out for delivery|delivery scheduled|order confirmed|estimated delivery|scheduled for delivery|order summary|shipped and is scheduled/i
const suspiciousUrlCue = /bit\.ly|tinyurl|usps-redelivery|delivery-update|redelivery|track-package|verify-address|confirm-delivery|update-address/i
const feeRequestPattern = /fee|pay|\$\d|payment|charge|customs/i
const credentialCue = /confirm your|verify your|update your|enter your|provide your/i

export function deliveryScamDetector(context: DetectorContext): DetectorResult {
  const { lower, urlMatches } = context

  // Check for legitimate shipping language first — these are strong trust signals
  const isLegitimateShipping = legitimateDeliveryPattern.test(lower)
  const hasScamPattern = deliveryScamPattern.test(lower)

  if (!hasScamPattern && !lower.includes('delivery')) {
    return { detector: 'Delivery Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  // If it looks like a legitimate shipping notification, don't flag it
  if (isLegitimateShipping && !hasScamPattern) {
    return { detector: 'Delivery Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  const hasSuspiciousUrl = urlMatches.some((url) => suspiciousUrlCue.test(url))
  const hasFeeRequest = feeRequestPattern.test(lower)
  const hasCredentialRequest = credentialCue.test(lower)

  // Delivery mention alone without suspicious context → do not flag
  if (!hasScamPattern && !hasSuspiciousUrl && !hasFeeRequest && !hasCredentialRequest) {
    return { detector: 'Delivery Scam Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (hasScamPattern && hasSuspiciousUrl) {
    score = 30
    evidence.push(
      'The message claims a delivery problem and directs you to a suspicious URL. Scammers commonly impersonate shipping companies (USPS, FedEx, UPS) because nearly everyone is expecting a package. Legitimate carriers send tracking links to their official domains (usps.com, fedex.com), not to unfamiliar websites.',
    )
  } else if (hasScamPattern && hasFeeRequest) {
    score = 28
    evidence.push(
      'The message reports a delivery issue and requests a fee or payment. Real shipping companies do not ask for redelivery fees via email or SMS. This "small fee" tactic is designed to capture your credit card information.',
    )
  } else if (hasScamPattern && hasCredentialRequest) {
    score = 25
    evidence.push(
      'The message claims a delivery failure and asks you to confirm or verify personal information. Legitimate carriers never ask you to "verify your address" or "confirm your identity" through unsolicited messages.',
    )
  } else if (hasScamPattern) {
    score = 14
    evidence.push(
      'The message uses delivery-failure language (delayed package, tracking issue, address confirmation) that is commonly seen in shipping scams. While this could be a real notification, the specific phrasing is frequently used in phishing to create urgency.',
    )
  } else if (hasSuspiciousUrl) {
    score = 18
    evidence.push(
      'The message mentions delivery alongside a suspicious URL. Verify any delivery status through the official carrier website by typing the address directly into your browser, not by clicking links in messages.',
    )
  }

  return {
    detector: 'Delivery Scam Detector',
    score,
    confidence: hasSuspiciousUrl ? 95 : 82,
    evidence,
  }
}
