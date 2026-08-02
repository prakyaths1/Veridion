import type { DetectorContext, DetectorResult } from '../types.ts'

// Broken English / poor grammar indicators
const brokenFormattingPattern = /!{3,}|\$\$\$|!!!.*!!!|click here.*click here/i
const allCapsPattern = /[A-Z]{8,}/ // case-sensitive check on original input
const smsSlang = /\b(ur|plz|u|r|b4|2moro|wanna|gonna|gotta|thx|pls|txt|msg)\b/i

// Professional / clean language signals
const professionalPattern = /please see the attached|please find attached|as discussed|per our conversation|as per our|for your reference|kind regards|best regards|sincerely|thank you for your time|looking forward to|hope this finds you|quarterly|annual report/i

export function languageQualityDetector(context: DetectorContext): DetectorResult {
  const { input, lower, sourceType } = context
  const hasBrokenEnglish = brokenFormattingPattern.test(lower) || allCapsPattern.test(input)
  const hasSmsSlang = smsSlang.test(lower)
  const hasProfessionalLanguage = professionalPattern.test(lower)

  // SMS context: casual language is normal and should not trigger
  if (sourceType === 'sms' && hasSmsSlang && !hasBrokenEnglish) {
    return { detector: 'Language Quality Detector', score: 0, confidence: 0, evidence: [] }
  }

  if (hasProfessionalLanguage) {
    return {
      detector: 'Language Quality Detector',
      score: -5,
      confidence: 80,
      evidence: [
        'The message uses professional, well-structured language ("please see attached", "kind regards", "as discussed") that is consistent with legitimate business communication. While sophisticated scammers can mimic professional tone, clean formatting reduces the overall risk profile.',
      ],
    }
  }

  if (hasBrokenEnglish) {
    return {
      detector: 'Language Quality Detector',
      score: 7,
      confidence: 72,
      evidence: [
        'The message contains unusual formatting patterns (excessive capitalization, repeated punctuation, or erratic style) that are statistically more common in scam communications. While poor formatting alone does not confirm a scam, it is a supporting indicator when combined with other red flags.',
      ],
    }
  }

  // SMS slang in email context — mild signal
  if (hasSmsSlang && sourceType === 'email') {
    return {
      detector: 'Language Quality Detector',
      score: 3,
      confidence: 60,
      evidence: [
        'The email uses casual shorthand ("ur", "plz", "u") which is unusual for professional email communication. This is a weak signal on its own but may indicate an informal or potentially suspicious source.',
      ],
    }
  }

  return { detector: 'Language Quality Detector', score: 0, confidence: 0, evidence: [] }
}
