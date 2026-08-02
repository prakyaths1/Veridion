import type { DetectorContext, DetectorResult } from '../types.ts'

const suspiciousDomainPattern = /(bit\.ly|tinyurl|is\.gd|cutt\.ly|ow\.ly|paypal-|\b[a-z0-9]+-(?:alert|login|secure|verify|update|auth|cancel|support|security|wallet|account|delivery|track|confirm|billing|join)\b|\b(?:dhl|usps|fedex|chase|bofa|citi|wellsfargo|apple|amazon|google|netflix|paypal|phantom|metamask|coinbase|zoom)-[a-z0-9-]+)/i
const compoundPhishingPattern = /\b(?:paypal|amazon|apple|chase|bofa|dhl|usps|fedex|google|microsoft|phantom|metamask|coinbase|zoom)-[a-z0-9-]*\.[a-z]{2,6}/i
const brandSpoofSubdomainPattern = /(?:amazon|paypal|apple|google|microsoft|chase|bofa|dhl|fedex|usps|wells|citi)\.com\.[a-z0-9-]+\.[a-z]+/i
const ipAddressUrl = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i
const excessiveHyphens = /[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-/i
const suspiciousTld = /\.(xyz|top|club|icu|buzz|tk|ml|ga|cf|gq|work|click|link|info)\b/i
const httpOnlyPattern = /http:\/\//i

// Known legitimate domains that should NOT trigger
const safeDomainList = [
  'google.com', 'amazon.com', 'apple.com', 'microsoft.com', 'microsoftonline.com',
  'github.com', 'wikipedia.org', 'facebook.com', 'twitter.com', 'linkedin.com',
  'youtube.com', 'netflix.com', 'paypal.com', 'chase.com', 'wellsfargo.com',
  'bankofamerica.com', 'capitalone.com', 'usps.com', 'ups.com', 'fedex.com',
  'zoom.us', 'dropbox.com', 'icloud.com', 'outlook.com', 'live.com',
  'office.com', 'adobe.com', 'cloudflare.com', 'amazonaws.com'
]

function isDomainSafe(url: string): boolean {
  try {
    const rawHost = (url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`).split('/')[2]?.split(':')[0]?.toLowerCase()
    if (!rawHost) return false
    return safeDomainList.some((domain) => rawHost === domain || rawHost.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

export function urlDetector(context: DetectorContext): DetectorResult {
  const { urlMatches } = context

  if (!urlMatches.length) {
    return { detector: 'URL Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  // Check if ALL URLs are known-safe
  const allSafe = urlMatches.every((url) => isDomainSafe(url))
  if (allSafe) {
    return { detector: 'URL Detector', score: 0, confidence: 0, evidence: [] }
  }

  for (const url of urlMatches) {
    // Skip known safe domains
    if (isDomainSafe(url)) continue

    const lowerUrl = url.toLowerCase()
    const isCompoundPhish = compoundPhishingPattern.test(lowerUrl) || brandSpoofSubdomainPattern.test(lowerUrl)

    if (isCompoundPhish) {
      score += 75
      evidence.push(
        `Critical Phishing URL detected: "${url}". This domain combines a major brand name with authentication action keywords or embeds a real brand domain inside a fake subdomain (e.g. "paypal-login-security.xyz" or "amazon.com.verify-login.xyz"). Legitimate companies never use lookalike domains or subdomain traps for login portals. This is a definitive critical phishing indicator.`,
      )
    } else if (suspiciousDomainPattern.test(url)) {
      score += 35
      evidence.push(
        `Suspicious URL detected: "${url}". This domain contains keywords designed to mimic a trusted brand (e.g., "secure-login", "verify-account", "bank-alert"). Legitimate companies use their own registered domains (amazon.com, paypal.com), not hyphenated variations. This is a strong phishing indicator.`,
      )
    } else if (ipAddressUrl.test(url)) {
      score += 25
      evidence.push(
        `The URL uses a raw IP address instead of a domain name: "${url}". Legitimate websites almost always use readable domain names. IP-based URLs are commonly used in phishing to bypass domain reputation checks and hide the true destination.`,
      )
    } else if (excessiveHyphens.test(url)) {
      score += 18
      evidence.push(
        `The URL contains an excessive hyphenated structure: "${url}". Domain names with many hyphens (e.g., "secure-bank-login-verify.com") are a technique used to make phishing URLs look official while using cheap, newly registered domains.`,
      )
    } else if (suspiciousTld.test(url)) {
      score += 15
      evidence.push(
        `The URL uses a suspicious top-level domain: "${url}". TLDs like .xyz, .top, .club, and .icu are frequently used for throwaway phishing domains because they are cheap to register and disposable.`,
      )
    }
  }

  if (httpOnlyPattern.test(urlMatches.join(' ')) && score > 0) {
    score += 4
    evidence.push(
      'One or more URLs use plain HTTP instead of HTTPS. While some legitimate sites still use HTTP, the absence of encryption means any data you submit (passwords, credit card numbers) is sent in plain text and can be intercepted.',
    )
  }

  if (!evidence.length) {
    return { detector: 'URL Detector', score: 0, confidence: 0, evidence: [] }
  }

  return {
    detector: 'URL Detector',
    score: Math.min(score, 85),
    confidence: score >= 30 ? 96 : 80,
    evidence,
  }
}
