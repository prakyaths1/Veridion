import type { DetectorContext, DetectorResult } from '../types.ts'

// Active requests for money or payment — the user is being asked to DO something or redirect payments
const activeFinancialPattern = /(?:send money|wire transfer|wire payment|transfer funds|wire.*money|money.*wire|buy.*gift card|purchase.*gift card|need.*gift card|gift card|gift cards|gift card code|gift card codes|apple gift card|steam gift card|pay\s+immediately|pay\s+now|deposit\s+funds|cash\s+app|zelle|venmo|moneygram|western union|bitcoin|crypto.*send|pay\s+fee|processing fee|pay\s+fine|routing number.*changed|updated bank account|direct deposit banking|confirm.*direct deposit|payroll update|dispute.*transaction|amount charged\s*\$\d+|invoice #\d+ attached|call.*1-800|call.*customer service)/i

// Informational financial language — notifications about transactions already completed or paystub availability
const informationalFinancialPattern = /\b(?:refund.*processed|refund.*issued|payment.*received|payment.*confirmed|payment.*successful|invoice.*paid|transaction.*complete|your balance is|statement is ready|receipt for your payment|paystub.*available|earnings statement)\b/i

// Unusual payment methods that are almost always scam-only channels
const unusualPaymentPattern = /(?:gift card|gift cards|gift card code|gift card codes|steam|apple|western union|moneygram|wire transfer|bitcoin|cryptocurrency|crypto|cash app.*send|zelle.*send|venmo.*send|money order|prepaid card)/i

export function financialRequestDetector(context: DetectorContext): DetectorResult {
  const { lower } = context

  // Informational financial language without an active request → not suspicious
  if (informationalFinancialPattern.test(lower) && !activeFinancialPattern.test(lower)) {
    return { detector: 'Financial Request Detector', score: 0, confidence: 0, evidence: [] }
  }

  if (!activeFinancialPattern.test(lower)) {
    return { detector: 'Financial Request Detector', score: 0, confidence: 0, evidence: [] }
  }

  const usesUnusualMethod = unusualPaymentPattern.test(lower)

  if (usesUnusualMethod) {
    return {
      detector: 'Financial Request Detector',
      score: 38,
      confidence: 95,
      evidence: [
        'The message asks for payment through an unusual or untraceable method (gift cards, wire transfer, cryptocurrency, or peer-to-peer apps). Legitimate businesses accept standard payment methods and never demand gift card codes as payment. Scammers prefer these channels because the transactions are nearly impossible to reverse or trace.',
      ],
    }
  }

  return {
    detector: 'Financial Request Detector',
    score: 26,
    confidence: 88,
    evidence: [
      'The message asks you to send money, make a payment, or transfer funds. While some legitimate messages involve payments (invoices, bills), an unsolicited request for money — especially combined with urgency or unusual circumstances — is a common scam tactic. Verify any payment request through an independent channel before acting.',
    ],
  }
}
