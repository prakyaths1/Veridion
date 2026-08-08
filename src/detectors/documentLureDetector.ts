import type { DetectorContext, DetectorResult } from '../types.ts'

const documentActionPattern = /(?:review|view|open|access|sign|download|check|see)[\s\w]*(?:document|agenda|file|pdf|doc|contract|nda|attachment|folder|spreadsheet|sheet|memo|presentation)/i
const conversationalLurePattern = /(?:can you|please|quickly|take a look|review this|before today's meeting|shared a document)/i

export function documentLureDetector(context: DetectorContext): DetectorResult {
  const { lower, urlMatches } = context

  const hasDocumentAction = documentActionPattern.test(lower)
  const hasConversationalLure = conversationalLurePattern.test(lower)
  const hasExternalUrl = urlMatches.length > 0

  if (!hasExternalUrl) {
    return { detector: 'Document Lure Detector', score: 0, confidence: 0, evidence: [] }
  }

  if (hasDocumentAction || (hasConversationalLure && /http/i.test(lower))) {
    // Check if URL is a suspicious or non-standard document domain
    const isStandardKnownDocDomain = urlMatches.some((url) =>
      /\b(?:docs\.google\.com|drive\.google\.com|sharepoint\.com|onedrive\.live\.com|dropbox\.com|docusign\.net|docusign\.com)\b/i.test(url),
    )

    if (!isStandardKnownDocDomain) {
      return {
        detector: 'Document Lure Detector',
        score: 30,
        confidence: 93,
        evidence: [
          'The message prompts you to review or access a document/agenda via an external link. Attackers commonly use conversational pretexts ("review this before our meeting") paired with lookalike link destinations to steal credentials or deliver malicious payloads.',
        ],
      }
    }
  }

  return { detector: 'Document Lure Detector', score: 0, confidence: 0, evidence: [] }
}
