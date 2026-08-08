import type { DetectorContext, DetectorResult } from '../types.ts'

const rewardPattern = /congratulations.*(?:won|winner|selected|chosen)|you(?:'ve| have) (?:won|been selected|been chosen)|prize|lottery|free iphone|free gift|claim your reward|exclusive offer.*act now|million dollars|thousand dollars.*claim|jackpot|chances to win|win cash|txt\s*>?\s*[a-z0-9]+|call \d{10,11} to claim|claim code|(?:\d{2,4}%|double|triple|100x).*(?:returns|profit|yield|payout)|[£$€]\d+.*(?:prize|cash|reward|won|claim|bonus)|free entry/i

export function rewardDetector(context: DetectorContext): DetectorResult {
  const { lower } = context

  if (!rewardPattern.test(lower)) {
    return { detector: 'Reward Detector', score: 0, confidence: 0, evidence: [] }
  }

  return {
    detector: 'Reward Detector',
    score: 26,
    confidence: 90,
    evidence: [
      'The message promises an unexpected reward, prize, or windfall. This exploits the "reciprocity" and "greed" psychological levers — you feel excited about winning and are willing to overlook red flags. Legitimate sweepstakes never ask for fees, personal information, or gift card codes to claim prizes.',
    ],
  }
}
