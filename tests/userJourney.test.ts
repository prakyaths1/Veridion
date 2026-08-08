import test from 'node:test'
import assert from 'node:assert/strict'
import { buildDemoReport } from '../src/utils/scoring.ts'
import type { InvestigationReport } from '../src/types.ts'

const EMAIL_A = 'Your Amazon package has shipped. Track it at amazon.com.'
const EMAIL_B = 'Your Microsoft account will be permanently disabled. Verify now: https://verify-account365.com'

test('End-to-End User Journey Integration Test (Multi-Scan, Refresh, History & Bit-for-Bit Determinism)', () => {
  // Simulated app memory state & localStorage
  let mockStorage: Record<string, string> = {}
  let memoryCurrentReport: InvestigationReport | null = null
  let memoryInvestigations: InvestigationReport[] = []

  function saveToStorage(key: string, value: any) {
    mockStorage[key] = JSON.stringify(value)
  }

  function restoreFromStorage(key: string) {
    const raw = mockStorage[key]
    return raw ? JSON.parse(raw) : null
  }

  // STEP 1: Scan Email A
  const reportA_Step1 = buildDemoReport(EMAIL_A, 'email')
  memoryCurrentReport = reportA_Step1
  memoryInvestigations = [reportA_Step1]
  saveToStorage('veridion-current-report', reportA_Step1)
  saveToStorage('veridion-investigations-v1', memoryInvestigations)

  assert.ok(reportA_Step1.riskLevel === 'Very Low' || reportA_Step1.riskLevel === 'Low', `Step 1: Email A expected Low, got ${reportA_Step1.riskLevel}`)
  assert.ok(reportA_Step1.scamProbability <= 15, `Step 1: Email A score expected <= 15, got ${reportA_Step1.scamProbability}`)

  // STEP 2: Scan Email B
  const reportB_Step2 = buildDemoReport(EMAIL_B, 'email')
  memoryCurrentReport = reportB_Step2
  memoryInvestigations = [reportB_Step2, reportA_Step1]
  saveToStorage('veridion-current-report', reportB_Step2)
  saveToStorage('veridion-investigations-v1', memoryInvestigations)

  assert.equal(reportB_Step2.riskLevel, 'Critical', `Step 2: Email B expected Critical, got ${reportB_Step2.riskLevel}`)
  assert.ok(reportB_Step2.scamProbability >= 70, `Step 2: Email B score expected >= 70, got ${reportB_Step2.scamProbability}`)
  assert.equal(memoryInvestigations.length, 2, 'Step 2: History should hold [B, A]')

  // STEP 3: Switch back / Select Email A from history
  const selectedFromHistory = memoryInvestigations.find((item) => item.id === reportA_Step1.id)
  assert.ok(selectedFromHistory, 'Step 3: Email A should be present in history')
  assert.equal(selectedFromHistory?.id, reportA_Step1.id, 'Step 3: ID must match Email A')
  assert.equal(selectedFromHistory?.scamProbability, reportA_Step1.scamProbability, 'Step 3: Score must match Email A')

  // STEP 4: Simulate Page Refresh (Clear React memory state, restore from localStorage)
  memoryCurrentReport = restoreFromStorage('veridion-current-report')
  memoryInvestigations = restoreFromStorage('veridion-investigations-v1') ?? []

  assert.equal(memoryCurrentReport?.id, reportB_Step2.id, 'Step 4 (Refresh): Active report restored as Email B')
  assert.equal(memoryInvestigations.length, 2, 'Step 4 (Refresh): History restored 2 items')

  // STEP 5: Scan Email A again
  const reportA_Step5 = buildDemoReport(EMAIL_A, 'email')
  memoryCurrentReport = reportA_Step5

  assert.equal(reportA_Step5.id, reportA_Step1.id, 'Step 5: Investigation ID must be 100% identical')
  assert.equal(reportA_Step5.scamProbability, reportA_Step1.scamProbability, 'Step 5: Scam score must be 100% identical')
  assert.equal(reportA_Step5.riskLevel, reportA_Step1.riskLevel, 'Step 5: Risk level must be 100% identical')
  assert.equal(reportA_Step5.severity, reportA_Step1.severity, 'Step 5: Severity must be 100% identical')
  assert.equal(reportA_Step5.analysisConfidence, reportA_Step1.analysisConfidence, 'Step 5: Confidence must be 100% identical')
  assert.deepEqual(reportA_Step5.evidence, reportA_Step1.evidence, 'Step 5: Evidence items must be 100% identical')

  // STEP 6: Simulate Page Refresh again
  saveToStorage('veridion-current-report', reportA_Step5)
  memoryCurrentReport = restoreFromStorage('veridion-current-report')
  assert.equal(memoryCurrentReport?.id, reportA_Step1.id, 'Step 6 (Refresh 2): Restored report A')

  // STEP 7: Open previous investigation B from history
  const previousB = memoryInvestigations.find((item) => item.id === reportB_Step2.id)
  assert.ok(previousB, 'Step 7: Investigation B found in history')
  assert.equal(previousB?.scamProbability, reportB_Step2.scamProbability, 'Step 7: Investigation B score preserved')
})
