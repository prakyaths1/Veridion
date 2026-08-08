import type { DetectorContext, SourceType } from '../types.ts'
import { parseEmailHeaders, normalizeText } from './normalization.ts'

function extractUrls(text: string): string[] {
  const matches = Array.from(text.matchAll(/https?:\/\/[^\s]+|www\.[^\s]+/gi), (match) => match[0])
  const domains = Array.from(text.matchAll(/(?:^|\s)([a-z0-9-]+(?:\.[a-z0-9-]+)+\.[a-z]{2,}(?:\/[^\s]*)?)/gi), (match) => match[1])
  const seen = new Set<string>()
  const results: string[] = []
  for (const url of [...matches, ...domains]) {
    const norm = url.trim().toLowerCase()
    if (!seen.has(norm)) {
      seen.add(norm)
      results.push(url)
    }
  }
  return results
}

/**
 * Universal Input Adapter Interface for Version 1
 * Keeps scoring engine 100% input-agnostic so future sources (QR, social, extension) can be added seamlessly.
 */
export function buildDetectorContext(input: string, sourceType: SourceType): DetectorContext {
  const normalizedInput = normalizeText(input)
  const lower = normalizedInput.toLowerCase()
  const urlMatches = extractUrls(normalizedInput)
  const wordCount = normalizedInput.trim().split(/\s+/).filter(Boolean).length
  const isVeryShort = wordCount <= 2

  let context: DetectorContext = {
    input: normalizedInput,
    lower,
    sourceType,
    urlMatches,
    wordCount,
    isVeryShort,
    urls: urlMatches,
  }

  switch (sourceType) {
    case 'email': {
      const parsed = parseEmailHeaders(normalizedInput)
      context.header = parsed.header
      context.subject = parsed.subject
      context.body = parsed.body
      break
    }
    case 'sms': {
      // SMS adapter: extract shortcode/phone numbers if present
      const phoneMatch = normalizedInput.match(/(?:from:?\s*)?(\+?\d{10,12}|\b\d{5,6}\b)/i)
      if (phoneMatch) {
        context.header = {
          fromEmail: phoneMatch[1],
          fromDisplayName: 'SMS Shortcode / Sender',
        }
      }
      context.body = normalizedInput
      break
    }
    case 'url': {
      // URL adapter: ensure input URL is included in urlMatches
      if (!urlMatches.includes(normalizedInput) && (normalizedInput.includes('.') || normalizedInput.includes('http'))) {
        context.urlMatches = [normalizedInput, ...urlMatches]
        context.urls = context.urlMatches
      }
      context.body = `Submitted target URL review: ${normalizedInput}`
      break
    }
    case 'screenshot': {
      // Screenshot OCR adapter: treat extracted OCR text as body
      context.body = normalizedInput
      break
    }
  }

  return context
}
