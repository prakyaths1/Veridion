import type { DetectorContext, DetectorResult } from '../types.ts'

// False authority claims — impersonating official organizations or authority figures
const governmentAuthorityPattern = /this is the irs|internal revenue|federal agent|fbi|dea agent|homeland security|social security administration|department of|treasury department|immigration|customs.*(?:officer|agent|official)|us marshal|court order|subpoena|tax audit|internal revenue service/i
const lawEnforcementPattern = /police.*(?:report|warrant|arrest|charge)|arrest warrant|active warrant|federal warrant|criminal investigation|under investigation|interpol|law enforcement|federal marshal|criminal prosecution/i
const corporateAuthorityPattern = /(?:urgent )?request from (?:ceo|executive|director|manager)|i am (?:the )?(?:ceo|executive|director|manager)|are you at your desk|compliance.*(?:department|officer|team)|fraud department|security team.*(?:alert|detected)|\bceo\b|\bcfo\b|bursar/i
const secrecyPattern = /don't call|do not call|cannot talk on phone|keep this confidential|in a meeting|busy in a meeting|don't tell anyone|keep this private/i

export function authorityDetector(context: DetectorContext): DetectorResult {
  const { lower, header, urlMatches } = context

  const fullHeaderStr = `${header?.fromDisplayName ?? ''} ${header?.fromEmail ?? ''} ${header?.subject ?? ''}`.toLowerCase()
  const combinedText = `${fullHeaderStr} ${lower}`

  const hasGovAuthority = governmentAuthorityPattern.test(combinedText)
  const hasLawEnforcement = lawEnforcementPattern.test(combinedText)
  const hasCorporateAuthority = corporateAuthorityPattern.test(combinedText)

  // If corporate authority is mentioned on a clean corporate email without suspicious links or urgency, skip
  const fromDomain = header?.fromDomain ?? ''
  const isInternalDomain = fromDomain === 'company.com' || fromDomain === 'university.edu' || fromDomain === 'k12school.org'
  if (hasCorporateAuthority && isInternalDomain && urlMatches.length === 0 && !secrecyPattern.test(combinedText)) {
    return { detector: 'Authority Detector', score: 0, confidence: 0, evidence: [] }
  }

  if (!hasGovAuthority && !hasLawEnforcement && !hasCorporateAuthority) {
    return { detector: 'Authority Detector', score: 0, confidence: 0, evidence: [] }
  }

  const evidence: string[] = []
  let score = 0

  if (hasGovAuthority) {
    score += 26
    evidence.push(
      'The message claims to be from a government agency (IRS, FBI, Social Security, customs). Real government agencies do not initiate contact through unsolicited emails, texts, or calls demanding immediate payment or personal information. The IRS, for example, always contacts taxpayers by mail first. This impersonation tactic exploits authority bias — people tend to comply without questioning when they believe an authority figure is giving orders.',
    )
  }

  if (hasLawEnforcement) {
    score += 26
    evidence.push(
      'The message threatens law enforcement action (arrest warrants, criminal charges, police reports). Scammers use these threats to create panic and prevent you from thinking clearly. Real legal proceedings are served through official channels, not via text messages or emails demanding immediate payment.',
    )
  }

  if (hasCorporateAuthority) {
    const hasSecrecy = secrecyPattern.test(combinedText)
    score += hasSecrecy ? 35 : 22
    evidence.push(
      hasSecrecy
        ? 'The message impersonates an executive (CEO, manager) while commanding secrecy or directing you not to call ("do not call me", "busy in a meeting"). This is a textbook Business Email Compromise (BEC) CEO fraud tactic designed to prevent out-of-band phone verification before you execute unauthorized wire or gift card requests.'
        : 'The message invokes corporate authority (CEO, manager, fraud department, compliance team) to pressure compliance. This is common in Business Email Compromise (BEC) scams, where attackers impersonate executives to trick employees into making unauthorized transfers or sharing sensitive data.',
    )
  }

  return {
    detector: 'Authority Detector',
    score: Math.min(score, 38),
    confidence: hasGovAuthority ? 94 : hasCorporateAuthority ? 92 : 85,
    evidence,
  }
}
