import type { DetectorContext, DetectorResult } from '../types.ts'

// Executive, financial, HR, IT, or security role tokens in From header or display name
const vipRolePattern = /(?:chief executive officer|ceo|chief financial officer|cfo|executive|director|payroll|human resources|\bhr\b|it support|helpdesk|bursar|administrator|admin|security team|fraud department)/i

// External/suspicious domain keywords often used in lookalike spoofing
const lookalikeDomainPattern = /(?:-payroll|-mail|-security|-verify|-auth|-support|-portal|-login|-docs|-drive|-account)\.(?:net|org|info|xyz|top|site|online|tech|work|co)/i

export function headerImpersonationDetector(context: DetectorContext): DetectorResult {
  const { header, lower } = context
  const fromEmail = header?.fromEmail ?? ''
  const fromDisplay = header?.fromDisplayName ?? ''
  const fromDomain = header?.fromDomain ?? ''

  const combinedHeaderStr = `${fromDisplay} ${fromEmail}`.toLowerCase()
  const matchesRole = vipRolePattern.test(combinedHeaderStr)

  // Check if header contains VIP/Executive/Department role
  if (!matchesRole) {
    return { detector: 'Header Impersonation Detector', score: 0, confidence: 0, evidence: [] }
  }

  // Check if domain is a suspicious lookalike or external domain
  const isLookalikeDomain = lookalikeDomainPattern.test(fromDomain)
  const isFreeOrGenericDomain = /@(gmail|yahoo|hotmail|outlook|protonmail|icloud)\.com$/i.test(fromEmail)

  if (isLookalikeDomain || isFreeOrGenericDomain) {
    return {
      detector: 'Header Impersonation Detector',
      score: 32,
      confidence: 96,
      evidence: [
        `The sender claims authority or department role ("${fromDisplay || fromEmail}") in the email header, but originates from an external or lookalike domain ("${fromDomain}"). This is a primary indicator of Business Email Compromise (BEC) and sender spoofing.`,
      ],
    }
  }

  // If header has role title but body asks for urgent external action
  const hasUrgentActionInBody = /review.*document|wire.*transfer|gift card|direct deposit|confirm.*information|paycheck|login|verify/i.test(lower)
  if (hasUrgentActionInBody && !fromDomain.endsWith('.edu') && !fromDomain.endsWith('.gov')) {
    return {
      detector: 'Header Impersonation Detector',
      score: 22,
      confidence: 90,
      evidence: [
        `The message sender claims an executive or administrative title ("${fromDisplay || fromEmail}") while requesting urgent external action. Verify sender identity out-of-band before taking any action.`,
      ],
    }
  }

  return { detector: 'Header Impersonation Detector', score: 0, confidence: 0, evidence: [] }
}
