import type { DetectorContext, DetectorResult, EvidenceItem, InvestigationReport, RiskLevel, SourceType } from '../types.ts'
import { brandImpersonationDetector } from '../detectors/brandImpersonation.ts'
import { urlDetector } from '../detectors/urlDetector.ts'
import { credentialRequestDetector } from '../detectors/credentialRequestDetector.ts'
import { financialRequestDetector } from '../detectors/financialRequestDetector.ts'
import { deliveryScamDetector } from '../detectors/deliveryScamDetector.ts'
import { bankScamDetector } from '../detectors/bankScamDetector.ts'
import { jobScamDetector } from '../detectors/jobScamDetector.ts'
import { romanceWrongNumberDetector } from '../detectors/romanceWrongNumberDetector.ts'
import { urgencyDetector } from '../detectors/urgencyDetector.ts'
import { fearDetector } from '../detectors/fearDetector.ts'
import { rewardDetector } from '../detectors/rewardDetector.ts'
import { languageQualityDetector } from '../detectors/languageQualityDetector.ts'
import { trustSignalDetector } from '../detectors/trustSignalDetector.ts'
import { authorityDetector } from '../detectors/authorityDetector.ts'
import { RISK_BANDS } from '../constants/risk.ts'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function classifyRisk(score: number): RiskLevel {
  for (let index = RISK_BANDS.length - 1; index >= 0; index -= 1) {
    if (score >= RISK_BANDS[index].min) {
      return RISK_BANDS[index].label
    }
  }
  return 'Very Low'
}

function getUrlMatches(text: string) {
  const matches = Array.from(text.matchAll(/https?:\/\/[^\s]+|www\.[^\s]+/gi), (match) => match[0])
  const domains = Array.from(text.matchAll(/(?:^|\s)([a-z0-9-]+(?:\.[a-z0-9-]+)+\.[a-z]{2,}(?:\/[^\s]*)?)/gi), (match) => match[1])
  return [...matches, ...domains]
}

function summarizeRisk(score: number, riskLevel: RiskLevel) {
  if (riskLevel === 'Very Low') {
    return 'The message does not contain enough indicators to perform a meaningful scam analysis.'
  }

  if (score < 25) {
    return 'Based on the available evidence, Veridion estimates a low-risk message that still deserves basic verification.'
  }

  if (score < 45) {
    return 'Based on the available evidence, Veridion estimates a moderate-risk message with mixed support and some suspicious elements.'
  }

  if (score < 70) {
    return 'Based on the available evidence, Veridion estimates a high-risk message with several scam-aligned signals.'
  }

  return 'Based on the available evidence, Veridion estimates a critical-risk message that should be treated as highly suspicious.'
}

/**
 * Confidence calibration based on evidence agreement and strength.
 *
 * Key principle: confidence reflects HOW CERTAIN the engine is about its verdict,
 * not how dangerous the message is. Mixed signals should reduce confidence.
 */
function calculateConfidence(
  detectorResults: DetectorResult[],
  scoringContext: DetectorContext,
  positiveDetectorCount: number,
  negativeDetectorCount: number,
  totalPositiveScore: number,
  totalNegativeScore: number,
) {
  const firedDetectors = detectorResults.filter((item) => item.score !== 0)
  const totalFired = firedDetectors.length

  // Very short messages with no signals → high confidence that it's benign
  if (scoringContext.isVeryShort && totalFired === 0) {
    return 94
  }

  // No detectors fired → confident it's benign, but less so for longer messages
  if (totalFired === 0) {
    return scoringContext.wordCount >= 10 ? 88 : 92
  }

  // Mixed signals: both positive (scam) and negative (trust) detectors fired
  const hasMixedSignals = positiveDetectorCount > 0 && negativeDetectorCount > 0

  let confidence: number

  if (hasMixedSignals) {
    // Mixed signals → confidence should be notably lower
    const signalRatio = Math.abs(totalPositiveScore) / Math.max(Math.abs(totalPositiveScore) + Math.abs(totalNegativeScore), 1)
    // The more balanced the signals, the less confident we should be
    const balancePenalty = signalRatio > 0.3 && signalRatio < 0.7 ? 12 : 6
    confidence = 85 - balancePenalty
  } else if (positiveDetectorCount >= 3) {
    // Strong agreement among scam detectors
    confidence = 92
  } else if (positiveDetectorCount === 2) {
    confidence = 87
  } else if (positiveDetectorCount === 1) {
    // Only one detector fired → moderate confidence
    confidence = 80
  } else {
    // Only trust signals fired → confident it's benign
    confidence = negativeDetectorCount >= 2 ? 93 : 89
  }

  // Bonus for message completeness (more text = more evidence to analyze)
  if (scoringContext.wordCount >= 15) confidence += 2
  else if (scoringContext.wordCount >= 8) confidence += 1

  return clamp(confidence, 65, 97)
}

/**
 * Generate a dynamic explanation based on what actually triggered.
 */
function generateExplanation(
  riskLevel: RiskLevel,
  isInsufficientInfo: boolean,
  firedPositive: DetectorResult[],
  firedNegative: DetectorResult[],
  score: number,
  confidence: number,
) {
  if (isInsufficientInfo) {
    return 'Based on the available evidence, Veridion does not have enough indicators to perform a meaningful scam analysis. The message is too short to draw a reliable conclusion, so Veridion assigns a Very Low risk score with moderate confidence.'
  }

  const hasMixedSignals = firedPositive.length > 0 && firedNegative.length > 0

  if (firedPositive.length === 0 && firedNegative.length > 0) {
    const trustNames = firedNegative.map((d) => d.detector).join(', ')
    return `Veridion found no scam indicators in this message. Trust signals from ${trustNames} suggest this is a routine, legitimate communication. The ${riskLevel.toLowerCase()} risk assessment reflects the absence of suspicious patterns rather than confirmed safety — always verify unexpected messages through independent channels.`
  }

  if (firedPositive.length === 0) {
    return `Veridion found no scam indicators in this message. The ${riskLevel.toLowerCase()} risk assessment reflects the absence of suspicious patterns. Without any red flags, the message appears routine, but Veridion cannot confirm sender identity — always verify unexpected contacts independently.`
  }

  const scamNames = firedPositive.map((d) => d.detector).join(', ')

  if (hasMixedSignals) {
    const trustNames = firedNegative.map((d) => d.detector).join(', ')
    return `Veridion found conflicting signals in this message. Scam indicators from ${scamNames} raised the risk score to ${score}%, while trust signals from ${trustNames} partially offset the risk. Because the evidence points in both directions, the analysis confidence is ${confidence}% — lower than usual. Exercise caution and verify through independent channels before taking any action.`
  }

  if (firedPositive.length >= 3) {
    return `Veridion found ${firedPositive.length} independent scam-aligned indicators: ${scamNames}. When multiple detectors agree, the probability of a genuine scam increases significantly. The ${riskLevel.toLowerCase()} risk score of ${score}% reflects strong multi-signal agreement. Treat this message with high caution.`
  }

  return `Veridion flagged ${firedPositive.length} scam-aligned indicator${firedPositive.length > 1 ? 's' : ''}: ${scamNames}. The ${riskLevel.toLowerCase()} risk assessment (${score}%) is based on the strength and combination of these signals. Verify the sender's identity through an official channel before responding.`
}

/**
 * Generate contextual alternative explanations based on what detectors fired.
 */
function generateAlternatives(firedPositive: DetectorResult[], isInsufficientInfo: boolean): string[] {
  if (isInsufficientInfo) {
    return ['The message is too short to justify a meaningful scam conclusion.']
  }

  const alternatives: string[] = []
  const detectorNames = new Set(firedPositive.map((d) => d.detector))

  if (detectorNames.has('Delivery Scam Detector') || detectorNames.has('Brand Impersonation')) {
    alternatives.push('This could be a legitimate shipping or order notification from a real company that happens to use urgency language.')
  }
  if (detectorNames.has('Bank Scam Detector')) {
    alternatives.push('This could be a genuine security alert from your bank — verify by calling the number on the back of your card, not by clicking any links.')
  }
  if (detectorNames.has('Urgency Detector') || detectorNames.has('Fear Detector')) {
    alternatives.push('The urgency or warning language could reflect a genuine deadline or time-sensitive matter rather than a scam tactic.')
  }
  if (detectorNames.has('Financial Request Detector')) {
    alternatives.push('The financial language could relate to a legitimate invoice, bill, or refund notification rather than a scam request.')
  }
  if (detectorNames.has('Credential Request Detector')) {
    alternatives.push('Some legitimate services (password reset, 2FA setup) do ask for verification — check whether you initiated the request.')
  }

  if (!alternatives.length) {
    alternatives.push('The message could be routine communication that happens to use patterns commonly seen in scams.')
  }

  return alternatives.slice(0, 3)
}

/**
 * Generate specific missing information items based on context.
 */
function generateMissingInfo(firedPositive: DetectorResult[], isInsufficientInfo: boolean, sourceType: SourceType): string[] {
  if (isInsufficientInfo) {
    return ['The message does not contain enough indicators to perform a meaningful scam analysis.']
  }

  const items: string[] = []

  if (sourceType === 'email') {
    items.push('Checking the actual sender email address (not just the display name) would help verify authenticity.')
  }
  if (sourceType === 'sms') {
    items.push('Verifying the sender\'s phone number against known legitimate numbers would improve certainty.')
  }

  const detectorNames = new Set(firedPositive.map((d) => d.detector))

  if (detectorNames.has('Brand Impersonation') || detectorNames.has('Bank Scam Detector')) {
    items.push('Comparing this message format against past legitimate messages from the same company would help distinguish real alerts from phishing.')
  }
  if (detectorNames.has('URL Detector')) {
    items.push('Performing a WHOIS lookup on the domain would reveal its registration date — recently registered domains are more likely to be phishing infrastructure.')
  }
  if (detectorNames.has('Credential Request Detector')) {
    items.push('Confirming whether you recently initiated a password reset or verification request would clarify whether this is legitimate.')
  }

  if (!items.length) {
    items.push('Additional context such as a verified sender or known brand domain would improve certainty.')
  }

  return items.slice(0, 3)
}

/**
 * Deduplicate evidence strings to avoid repetition in the report.
 */
function deduplicateEvidence(evidenceStrings: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const item of evidenceStrings) {
    const normalized = item.toLowerCase().trim()
    if (!seen.has(normalized)) {
      seen.add(normalized)
      result.push(item)
    }
  }
  return result
}

export function buildDemoReport(input: string, sourceType: SourceType, uploadedFile?: string, onlineSignals?: Array<{ source: string; available: boolean; summary: string }>): InvestigationReport {
  const lower = input.toLowerCase().trim()
  const urlMatches = getUrlMatches(lower)
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length
  const isVeryShort = wordCount <= 2
  const context: DetectorContext = {
    input,
    lower,
    sourceType,
    urlMatches,
    wordCount,
    isVeryShort,
  }

  const detectorResults = [
    brandImpersonationDetector(context),
    urlDetector(context),
    credentialRequestDetector(context),
    financialRequestDetector(context),
    deliveryScamDetector(context),
    bankScamDetector(context),
    jobScamDetector(context),
    romanceWrongNumberDetector(context),
    urgencyDetector(context),
    fearDetector(context),
    rewardDetector(context),
    languageQualityDetector(context),
    trustSignalDetector(context),
    authorityDetector(context),
  ]

  const firedPositive = detectorResults.filter((item) => item.score > 0)
  const firedNegative = detectorResults.filter((item) => item.score < 0)
  const totalPositiveScore = firedPositive.reduce((sum, item) => sum + item.score, 0)
  const totalNegativeScore = Math.abs(firedNegative.reduce((sum, item) => sum + item.score, 0))

  // Diminishing returns: first 3 positive detectors contribute linearly, rest at 60%
  let adjustedPositiveScore = 0
  const sortedPositive = [...firedPositive].sort((a, b) => b.score - a.score)
  for (let i = 0; i < sortedPositive.length; i++) {
    adjustedPositiveScore += i < 3 ? sortedPositive[i].score : Math.round(sortedPositive[i].score * 0.6)
  }

  const totalEvidence = detectorResults.flatMap((item) => item.evidence)
  const isInsufficientInfo = isVeryShort && !totalEvidence.length && !urlMatches.length

  // Calculate score: positive signals minus trust signals
  const score = clamp(adjustedPositiveScore - totalNegativeScore, 0, 100)
  const riskLevel = classifyRisk(score)
  const scamProbability = Math.round(score)

  // Collect and deduplicate evidence
  const redFlags = deduplicateEvidence(firedPositive.flatMap((item) => item.evidence))
  const trustSignals = deduplicateEvidence(firedNegative.flatMap((item) => item.evidence))
  const suspiciousUrls = urlMatches
  const suspiciousRequests = detectorResults.filter((item) => item.detector === 'Credential Request Detector').flatMap((item) => item.evidence)
  const languageAnalysis = detectorResults.filter((item) => item.detector === 'Language Quality Detector').flatMap((item) => item.evidence)
  const contextAnalysis = deduplicateEvidence(firedPositive.filter((item) => item.detector !== 'Language Quality Detector').flatMap((item) => item.evidence))
  const whatImprovedConfidence = deduplicateEvidence(firedPositive.flatMap((item) => item.evidence))
  const whatReducedConfidence = trustSignals

  const alternativeExplanations = generateAlternatives(firedPositive, isInsufficientInfo)
  const missingInformation = generateMissingInfo(firedPositive, isInsufficientInfo, sourceType)

  const evidence: EvidenceItem[] = detectorResults
    .filter((item) => item.score !== 0)
    .slice(0, 6)
    .map((item) => ({
      label: item.detector,
      detail: item.evidence[0] ?? 'Detector reported supporting evidence.',
      weight: item.score > 0 ? Math.max(3, Math.min(10, Math.round(item.score / 3))) : Math.max(1, Math.min(5, Math.round(Math.abs(item.score) / 3))),
      source: 'local-ai' as const,
    }))

  if (sourceType === 'screenshot' && uploadedFile) {
    evidence.push({
      label: 'Image upload',
      detail: 'Image analysis coming soon.',
      weight: 0,
      source: 'user-input',
    })
  }

  if (onlineSignals?.length) {
    evidence.push({
      label: 'Online intelligence',
      detail: `Connected intelligence services reported ${onlineSignals.filter((signal) => signal.available).length} providers as available and ${onlineSignals.filter((signal) => !signal.available).length} as unavailable in this local demo build.`,
      weight: 5,
      source: 'online-intelligence',
    })
  }

  const confidence = calculateConfidence(detectorResults, context, firedPositive.length, firedNegative.length, totalPositiveScore, totalNegativeScore)

  const summary = isInsufficientInfo
    ? 'Overall Assessment: Insufficient Information.'
    : riskLevel === 'Very Low'
      ? 'The message appears routine and does not contain strong scam indicators.'
      : riskLevel === 'Low'
        ? 'The message looks mostly benign, but a few scam-like cues are worth checking.'
        : riskLevel === 'Moderate'
          ? 'The message shows some suspicious elements and deserves a careful check.'
          : riskLevel === 'High'
            ? 'The message has multiple scam-aligned indicators and should be treated with caution.'
            : 'The message contains several strong scam indicators and should be handled carefully.'

  const explanation = generateExplanation(riskLevel, isInsufficientInfo, firedPositive, firedNegative, scamProbability, confidence)

  const timeline = [
    { time: '00:00', event: 'Input type detected and normalized for analysis.' },
    { time: '00:10', event: 'Independent detectors produced risk evidence.' },
    { time: '00:20', event: 'Scores were combined into a weighted report.' },
  ]

  const actions = score >= 45
    ? [
        'Do not click the link or open the attachment unless you have independently verified the sender.',
        'Avoid sharing passwords, verification codes, banking details, payment details, or recovery codes.',
        'If the message appears to be part of a live campaign, report it and preserve the original message as evidence.',
      ]
    : [
        'Treat the message as routine unless you have a separate reason to question the sender.',
        'Keep the message in your evidence trail if the contact is unexpected, but do not escalate it further without verification.',
        'Use a known contact channel to confirm the sender before taking any action.',
      ]

  const riskDescription = summarizeRisk(score, riskLevel)

  return {
    id: `investigation-${Date.now()}`,
    title: sourceType === 'url' ? 'Link-based review' : `${sourceType.toUpperCase()} review`,
    sourceType,
    summary: `${summary} ${riskDescription}`,
    explanation,
    riskLevel,
    trustScore: Math.round(clamp(100 - score, 0, 100)),
    scamProbability,
    analysisConfidence: confidence,
    threatLevel: riskLevel === 'Critical' ? 'Immediate caution' : riskLevel === 'High' ? 'Elevated attention' : 'Contained risk',
    trustSignals: trustSignals.slice(0, 5),
    redFlags: redFlags.slice(0, 5),
    evidence,
    tactics: firedPositive.map((item) => item.detector),
    timeline,
    actions,
    suspiciousUrls,
    suspiciousRequests: suspiciousRequests.slice(0, 5),
    languageAnalysis: languageAnalysis.slice(0, 5),
    contextAnalysis: contextAnalysis.slice(0, 5),
    whatImprovedConfidence: whatImprovedConfidence.slice(0, 5),
    whatReducedConfidence: whatReducedConfidence.slice(0, 5),
    alternativeExplanations: alternativeExplanations.slice(0, 3),
    missingInformation: missingInformation.slice(0, 3),
  }
}
