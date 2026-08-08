import type { DetectorContext, DetectorResult } from '../types.ts'

// Threat-context fear language — threats of consequences or severe technical alarms
const threatFearPattern = /account.*disabled|permanently disabled|will be disabled|account.*suspended|will be suspended|will be locked|will be frozen|legal action|police.*report|arrest|warrant|irs.*penalty|penalty.*irs|fine.*imposed|criminal.*charges|face.*consequences|failure.*result|reported to|collections.*agency|trojan.*(?:virus|spyware)|windows (?:defender|security) alert|system error #0x|computer.*infected|files.*deleted|call.*support.*1-800/i

// Informational fear language — notifications about completed security actions
const informationalFearPattern = /was suspended|has been locked|was locked|was frozen|for your protection|as a precaution|no action needed|no action required|security measure|we detected|we noticed/i

export function fearDetector(context: DetectorContext): DetectorResult {
  const { lower } = context

  if (!threatFearPattern.test(lower)) {
    return { detector: 'Fear Detector', score: 0, confidence: 0, evidence: [] }
  }

  // If the fear language is informational and protective, reduce the signal
  if (informationalFearPattern.test(lower)) {
    return {
      detector: 'Fear Detector',
      score: 5,
      confidence: 68,
      evidence: [
        'The message mentions account security actions but uses protective language ("for your protection", "no action needed"). While this is commonly seen in legitimate security notifications, scammers sometimes mimic this tone. Verify through your account dashboard if uncertain.',
      ],
    }
  }

  return {
    detector: 'Fear Detector',
    score: 18,
    confidence: 90,
    evidence: [
      'The message threatens negative consequences (account suspension, legal action, penalties, arrest) to pressure you into compliance. This is a fear-based social engineering tactic: scammers create a sense of danger to override your critical thinking. Legitimate organizations resolve disputes through formal channels, not threatening text messages or emails.',
    ],
  }
}
