import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDemoReport } from '../src/utils/scoring.ts'

// ============================================================
// LEGITIMATE MESSAGE TESTS — Must stay Very Low / Low
// ============================================================

test('Hi is treated as insufficient information and very low risk', () => {
  const report = buildDemoReport('Hi', 'email')
  assert.equal(report.riskLevel, 'Very Low')
  assert.ok(report.scamProbability <= 9)
  assert.ok(report.analysisConfidence >= 85)
  assert.ok(report.summary.toLowerCase().includes('low-risk') || report.summary.toLowerCase().includes('meaningful scam analysis'))
})

test('Teacher reminder remains legitimate and low risk', () => {
  const report = buildDemoReport('Hi class, please bring your notebook to school tomorrow. Thanks!', 'email')
  assert.equal(report.riskLevel, 'Very Low')
  assert.ok(report.scamProbability <= 10)
  assert.ok(report.analysisConfidence >= 85)
  assert.ok(report.trustSignals.length > 0)
})

test('Amazon shipment confirmation stays low risk (FP regression)', () => {
  const report = buildDemoReport('Your Amazon package has shipped. Tracking info is available in the order details.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low')
  assert.ok(report.scamProbability <= 15, `Expected scamProbability <= 15, got ${report.scamProbability}`)
  assert.ok(report.analysisConfidence >= 85)
})

test('Amazon package with delivery time stays low risk (FP regression)', () => {
  const report = buildDemoReport("Your Amazon package containing 'Wireless Ergonomic Mouse' has shipped and is scheduled for delivery by 8 PM tomorrow.", 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 15, `Expected scamProbability <= 15, got ${report.scamProbability}`)
})

test('TKS email stays low risk', () => {
  const report = buildDemoReport('TKS team update: please review the agenda for tomorrow morning and share your comments before noon.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low')
  assert.ok(report.scamProbability <= 15)
  assert.ok(report.analysisConfidence >= 85)
})

test('Dentist appointment SMS stays low risk', () => {
  const report = buildDemoReport('Your dentist appointment with Dr. Smith is scheduled for tomorrow at 2:00 PM. Reply 1 to confirm or 2 to reschedule.', 'sms')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low')
  assert.ok(report.scamProbability <= 10)
})

test('Legitimate bank statement email stays low risk', () => {
  const report = buildDemoReport('Your Chase bank statement for July is now available. Log in to your account at chase.com to view your statement.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 15, `Expected scamProbability <= 15, got ${report.scamProbability}`)
})

test('Password change confirmation stays low risk', () => {
  const report = buildDemoReport('Your password was successfully changed. If you did not make this change, contact support at support.google.com.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 15, `Expected scamProbability <= 15, got ${report.scamProbability}`)
})

test('Brand mention in casual SMS context stays low risk', () => {
  const report = buildDemoReport('I just ordered a new laptop from Amazon. Should arrive by Thursday.', 'sms')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 10)
})

test('Homework due today stays low risk despite urgency word', () => {
  const report = buildDemoReport('Reminder: homework is due today by 5 PM. Please submit via the class portal.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 10)
})

test('Legitimate refund notification stays low risk', () => {
  const report = buildDemoReport('Your refund of $29.99 has been processed. It should appear in your account within 3-5 business days.', 'email')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low', `Expected Very Low or Low, got ${report.riskLevel}`)
  assert.ok(report.scamProbability <= 15, `Expected scamProbability <= 15, got ${report.scamProbability}`)
})

test('Known safe URL stays low risk', () => {
  const report = buildDemoReport('https://calendar.google.com/', 'url')
  assert.ok(report.riskLevel === 'Very Low' || report.riskLevel === 'Low')
  assert.ok(report.scamProbability <= 10)
})

// ============================================================
// SCAM / PHISHING TESTS — Must escalate to High / Critical
// ============================================================

test('USPS phishing escalates to high or critical risk', () => {
  const report = buildDemoReport('Your package is delayed. Confirm your address now at https://usps-redelivery-track.com/verify', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical')
  assert.ok(report.scamProbability >= 40)
  assert.ok(report.redFlags.length > 0)
  assert.ok(report.evidence.length >= 2)
})

test('Bank phishing escalates to high or critical risk', () => {
  const report = buildDemoReport('Your bank account has been locked. Verify your credentials immediately at secure-login-now.com', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical')
  assert.ok(report.scamProbability >= 40)
  assert.ok(report.redFlags.length > 0)
})

test('Gift card scam escalates to high or critical risk', () => {
  const report = buildDemoReport('We need a gift card code immediately to process your refund today.', 'sms')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical')
  assert.ok(report.scamProbability >= 25)
  assert.ok(report.redFlags.length > 0)
})

test('Wrong number scam is classified as suspicious', () => {
  const report = buildDemoReport("Hey, this is not a wrong number. Let's be friends and talk on WhatsApp, I can help you invest in crypto.", 'sms')
  assert.ok(report.riskLevel === 'Moderate' || report.riskLevel === 'High' || report.riskLevel === 'Critical', `Expected at least Moderate, got ${report.riskLevel}`)
  assert.ok(report.scamProbability >= 25, `Expected scamProbability >= 25, got ${report.scamProbability}`)
})

test('Fake job scam is classified as suspicious', () => {
  const report = buildDemoReport('We need remote workers for easy money. Daily income from WhatsApp interview tasks. No experience needed.', 'sms')
  assert.ok(report.riskLevel === 'Moderate' || report.riskLevel === 'High' || report.riskLevel === 'Critical')
  assert.ok(report.scamProbability >= 25)
})

test('Romance wire fraud escalates to high or critical (FN regression)', () => {
  const report = buildDemoReport('Hi darling, I am stuck at customs and urgently need $800 to release my diplomatic package. Please wire money via Western Union.', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical', `Expected High or Critical, got ${report.riskLevel}`)
  assert.ok(report.scamProbability >= 40, `Expected scamProbability >= 40, got ${report.scamProbability}`)
})

test('IRS gift card scam escalates to critical', () => {
  const report = buildDemoReport('This is the IRS. You owe $3,200 in back taxes. Failure to respond within 24 hours will result in arrest warrant. Pay immediately with Apple gift cards to avoid legal action.', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical', `Expected High or Critical, got ${report.riskLevel}`)
  assert.ok(report.scamProbability >= 50, `Expected scamProbability >= 50, got ${report.scamProbability}`)
})

test('Phishing URL is classified as high risk', () => {
  const report = buildDemoReport('https://paypal-secure-login-now.com/account-restore', 'url')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical')
  assert.ok(report.scamProbability >= 25)
})

// ============================================================
// MANUAL REGRESSION TESTS — 5 High-Impact Attack Vectors
// ============================================================

test('CEO fraud requesting Apple gift cards escalates to Critical', () => {
  const report = buildDemoReport('I am the CEO. I need you to urgently buy $500 Apple gift cards for a client meeting right now. I am in a meeting, do not call me.', 'email')
  assert.ok(report.riskLevel === 'Critical', `Expected Critical, got ${report.riskLevel} (${report.scamProbability}%)`)
  assert.ok(report.scamProbability >= 70)
})

test('Crypto scam promising 250% returns escalates to High or Critical', () => {
  const report = buildDemoReport('Earn 250% returns on your crypto investment with our automated trading bot platform.', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical', `Expected High or Critical, got ${report.riskLevel} (${report.scamProbability}%)`)
  assert.ok(report.scamProbability >= 40)
})

test('Fake check job scam with cashier check escalates to High or Critical', () => {
  const report = buildDemoReport('Congratulations on your remote data entry job offer. We will mail you a cashier check to buy home office equipment.', 'email')
  assert.ok(report.riskLevel === 'High' || report.riskLevel === 'Critical', `Expected High or Critical, got ${report.riskLevel} (${report.scamProbability}%)`)
  assert.ok(report.scamProbability >= 40)
})

test('PayPal phishing URL (paypal-login-security.xyz) escalates to Critical', () => {
  const report = buildDemoReport('Log in to update account: https://paypal-login-security.xyz', 'url')
  assert.ok(report.riskLevel === 'Critical', `Expected Critical, got ${report.riskLevel} (${report.scamProbability}%)`)
  assert.ok(report.scamProbability >= 70)
})

test('Amazon subdomain spoof URL (amazon.com.verify-login.xyz) escalates to Critical', () => {
  const report = buildDemoReport('Click here to verify your account: https://amazon.com.verify-login.xyz', 'url')
  assert.ok(report.riskLevel === 'Critical', `Expected Critical, got ${report.riskLevel} (${report.scamProbability}%)`)
  assert.ok(report.scamProbability >= 70)
})

// ============================================================
// CONFIDENCE CALIBRATION TESTS
// ============================================================

test('Mixed signals reduce confidence', () => {
  // Message with both scam-like and trust-building elements
  const report = buildDemoReport('Team update: Your bank account has been locked. Please review the agenda for tomorrow morning.', 'email')
  assert.ok(report.analysisConfidence <= 85, `Expected confidence <= 85 for mixed signals, got ${report.analysisConfidence}`)
})

test('Single detector should not produce very high confidence', () => {
  const report = buildDemoReport('act now before it expires today', 'sms')
  assert.ok(report.analysisConfidence <= 88, `Expected confidence <= 88 for single detector, got ${report.analysisConfidence}`)
})

// ============================================================
// EVIDENCE QUALITY TESTS
// ============================================================

test('Evidence strings explain WHY, not just WHAT', () => {
  const report = buildDemoReport('Your bank account has been locked. Verify your credentials immediately at secure-login-now.com', 'email')
  // Evidence should contain educational explanations
  const allEvidence = [...report.redFlags, ...report.trustSignals]
  const hasExplanatoryContent = allEvidence.some((e) =>
    e.toLowerCase().includes('because') ||
    e.toLowerCase().includes('this is') ||
    e.toLowerCase().includes('designed to') ||
    e.toLowerCase().includes('scammers') ||
    e.toLowerCase().includes('legitimate') ||
    e.length > 80
  )
  assert.ok(hasExplanatoryContent, 'Evidence should contain educational explanations, not just labels')
})

test('Alternative explanations are contextual', () => {
  const report = buildDemoReport('Your bank account has been locked. Verify your credentials immediately at secure-login-now.com', 'email')
  assert.ok(report.alternativeExplanations.length > 0, 'Should have alternative explanations')
  assert.ok(report.alternativeExplanations.some((a) => a.length > 20), 'Alternative explanations should be substantive')
})
