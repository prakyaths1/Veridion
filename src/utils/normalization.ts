import type { ParsedHeader } from '../types.ts'

export function parseEmailHeaders(input: string): { header: ParsedHeader; subject: string; body: string } {
  const lines = input.split(/\r?\n/)
  const header: ParsedHeader = {}
  let subject = ''
  let bodyStartIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Blank line usually separates headers from body
    if (!line) {
      bodyStartIndex = i + 1
      break
    }

    const fromMatch = line.match(/^From:\s*(.+)$/i)
    if (fromMatch) {
      const rawFrom = fromMatch[1].trim()
      const emailAngleMatch = rawFrom.match(/^(?:"?([^"<]+)"?\s*)?<([^>]+)>$/)
      if (emailAngleMatch) {
        header.fromDisplayName = emailAngleMatch[1]?.trim() ?? ''
        header.fromEmail = emailAngleMatch[2].trim().toLowerCase()
      } else {
        header.fromEmail = rawFrom.toLowerCase()
        if (rawFrom.includes('@')) {
          header.fromDisplayName = rawFrom.split('@')[0]
        }
      }
      if (header.fromEmail && header.fromEmail.includes('@')) {
        header.fromDomain = header.fromEmail.split('@')[1]
      }
      continue
    }

    const subjectMatch = line.match(/^Subject:\s*(.+)$/i)
    if (subjectMatch) {
      subject = subjectMatch[1].trim()
      header.subject = subject
      continue
    }

    const replyToMatch = line.match(/^Reply-To:\s*(.+)$/i)
    if (replyToMatch) {
      header.replyTo = replyToMatch[1].trim()
      continue
    }

    const returnPathMatch = line.match(/^Return-Path:\s*(.+)$/i)
    if (returnPathMatch) {
      header.returnPath = returnPathMatch[1].trim()
      continue
    }

    // If a line doesn't match standard header key: value format and we haven't seen blank line yet,
    // it might be body text without formal headers
    if (!line.includes(':') && i === 0) {
      bodyStartIndex = 0
      break
    }
  }

  const body = lines.slice(bodyStartIndex).join('\n').trim()

  return {
    header,
    subject,
    body: body || input,
  }
}

/**
 * Unicode NFKC canonicalization & zero-width character stripping
 */
export function normalizeText(input: string): string {
  if (!input) return ''
  return input
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '') // Remove zero-width spaces & soft hyphens
    .trim()
}

/**
 * Replace common homoglyphs and leetspeak characters (0->o, 1->i, @->a, 3->e, etc.)
 */
export function dehomoglyph(input: string): string {
  if (!input) return ''
  return input
    .toLowerCase()
    .replace(/0/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/3/g, 'e')
    .replace(/5/g, 's')
    .replace(/8/g, 'b')
}
