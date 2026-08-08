import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDemoReport } from '../src/utils/scoring.ts'

const LEGITIMATE_URLS = [
  'https://google.com',
  'https://support.microsoft.com/en-us/account',
  'https://github.com/prakyaths1/Veridion',
  'https://amazon.com/gp/css/order-history',
  'https://chase.com/personal/banking',
  'https://paypal.com/myaccount/summary',
  'https://usps.com/quick-tools/tracking.htm',
  'https://zoom.us/j/123456789',
  'https://dropbox.com/home',
  'https://instructure.com/login',
]

const MALICIOUS_URLS = [
  'https://micr0soft-account-verify.com',
  'https://github-security-login.xyz',
  'https://invoice-payment-center.net',
  'https://paypal-login-security.xyz',
  'https://amazon.com.verify-login.xyz',
  'https://chase-security-alert.net',
  'https://docusign-sign-document.com',
  'https://canvas-login.help',
  'https://powerschool-update.com',
  'https://usps-redelivery-track.com',
]

test('10/10 Legitimate URLs evaluate as Safe (Very Low / Low Risk)', () => {
  for (const url of LEGITIMATE_URLS) {
    const report = buildDemoReport(url, 'url')
    assert.ok(
      report.riskLevel === 'Very Low' || report.riskLevel === 'Low',
      `Expected ${url} to be Very Low or Low, got ${report.riskLevel} (${report.scamProbability}%)`
    )
    assert.ok(report.scamProbability <= 15, `Expected ${url} scamProbability <= 15, got ${report.scamProbability}`)
  }
})

test('10/10 Malicious Infrastructure URLs evaluate as High or Critical Risk', () => {
  for (const url of MALICIOUS_URLS) {
    const report = buildDemoReport(url, 'url')
    assert.ok(
      report.riskLevel === 'High' || report.riskLevel === 'Critical',
      `Expected ${url} to be High or Critical, got ${report.riskLevel} (${report.scamProbability}%)`
    )
    assert.ok(report.scamProbability >= 35, `Expected ${url} scamProbability >= 35, got ${report.scamProbability}`)
  }
})
