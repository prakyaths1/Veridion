import type { DetectorContext, DetectorResult } from '../types.ts'

const romancePattern = /wrong number|sorry to bother|are we still meeting|let's be friends|let's chat|you're nice|you seem nice|investment advice|i can help you invest|stuck at customs|diplomatic package|wire money|western union|moneygram|darling|sweetheart|i am stranded|i am stuck|send me money|help me financially|i need.*\$\d/i
const cryptoLurePattern = /(?:invest|trade|earn|deposit).*(?:crypto|bitcoin|btc|eth|sol|forex)|crypto.*(?:profit|returns|opportunity|advisor)|guaranteed.*(?:returns|profit|income|daily)|automated.*ai.*arbitrage|trading bot/i

export function romanceWrongNumberDetector(context: DetectorContext): DetectorResult {
  const { lower } = context
  const hasRomancePattern = romancePattern.test(lower)
  const hasCryptoLure = cryptoLurePattern.test(lower)

  if (!hasRomancePattern && !hasCryptoLure) {
    return { detector: 'Romance / Wrong Number Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (hasRomancePattern && hasCryptoLure) {
    score = 28
    evidence.push(
      'The message combines a stranger-contact or romantic approach with a cryptocurrency/investment pitch. This is a "pig butchering" scam pattern: the scammer builds a relationship through a fake wrong number or romantic interest, then steers the conversation toward a fraudulent investment platform. This is currently one of the fastest-growing scam types.',
    )
  } else if (hasRomancePattern) {
    score = 22
    evidence.push(
      'The message uses patterns common in romance or wrong-number scams: unsolicited personal contact, requests for money, claims of being stranded, or terms of endearment combined with financial requests. These scams build emotional trust before requesting money, often claiming emergencies at customs, hospitals, or airports.',
    )
  } else if (hasCryptoLure) {
    score = 38
    evidence.push(
      'The message promotes cryptocurrency or investment opportunities with promised high-percentage returns or automated trading bots. Legitimate financial investments never guarantee extraordinary profits. This pattern is commonly used in pig-butchering and high-yield investment scam platforms designed to harvest deposits.',
    )
  }

  return {
    detector: 'Romance / Wrong Number Detector',
    score,
    confidence: hasRomancePattern && hasCryptoLure ? 91 : 85,
    evidence,
  }
}
