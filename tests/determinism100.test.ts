import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDemoReport } from '../src/utils/scoring.ts'

const TEST_INPUTS = [
  { input: 'https://openai.com', type: 'url' as const },
  { input: 'https://paypal-login-security.xyz', type: 'url' as const },
  { input: 'Your Amazon package has shipped. Tracking info is available in your order details.', type: 'email' as const },
  { input: 'Your Microsoft account will be permanently disabled. Verify now: https://verify-account365.com', type: 'email' as const },
  { input: 'Can you purchase five Apple gift cards? I am in meetings. CEO', type: 'email' as const },
]

test('100 Consecutive Runs of Identical Inputs produce 100% BIT-FOR-BIT IDENTICAL Reports', () => {
  for (const item of TEST_INPUTS) {
    const baseline = buildDemoReport(item.input, item.type)

    for (let i = 0; i < 100; i++) {
      const current = buildDemoReport(item.input, item.type)

      assert.equal(current.scamProbability, baseline.scamProbability, `Run ${i}: scamProbability changed for ${item.input}`)
      assert.equal(current.riskLevel, baseline.riskLevel, `Run ${i}: riskLevel changed for ${item.input}`)
      assert.equal(current.severity, baseline.severity, `Run ${i}: severity changed for ${item.input}`)
      assert.equal(current.analysisConfidence, baseline.analysisConfidence, `Run ${i}: analysisConfidence changed for ${item.input}`)
      assert.equal(current.id, baseline.id, `Run ${i}: id changed for ${item.input}`)
      assert.deepEqual(current.evidence, baseline.evidence, `Run ${i}: evidence changed for ${item.input}`)
      assert.deepEqual(current.redFlags, baseline.redFlags, `Run ${i}: redFlags changed for ${item.input}`)
      assert.deepEqual(current.trustSignals, baseline.trustSignals, `Run ${i}: trustSignals changed for ${item.input}`)
    }
  }
})

test('Strict Alignment: Qualitative Verdict is ALWAYS strictly derived from Numerical Scam Score', () => {
  const samples = [
    'https://openai.com',
    'https://paypal-login-security.xyz',
    'Hi class, please bring your notebook tomorrow.',
    'Your bank account has been locked. Verify immediately.',
    'Invoice #3482 is overdue. Payment is required immediately.',
  ]

  for (const text of samples) {
    const report = buildDemoReport(text, 'email')
    const score = report.scamProbability

    if (score <= 10) assert.equal(report.riskLevel, 'Very Low', `Score ${score} must be Very Low`)
    else if (score <= 25) assert.equal(report.riskLevel, 'Low', `Score ${score} must be Low`)
    else if (score <= 45) assert.equal(report.riskLevel, 'Moderate', `Score ${score} must be Moderate`)
    else if (score <= 70) assert.equal(report.riskLevel, 'High', `Score ${score} must be High`)
    else assert.equal(report.riskLevel, 'Critical', `Score ${score} must be Critical`)
  }
})
