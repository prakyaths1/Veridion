import fs from 'node:fs'
import path from 'node:path'
import { loadAllBenchmarkSamples, syncMasterBenchmarkJson, type BenchmarkSample } from './datasetLoader.ts'
import { buildDemoReport } from '../src/utils/scoring.ts'

const riskLevels = ['Very Low', 'Low', 'Moderate', 'High', 'Critical'] as const

export interface EvaluationResult {
  timestamp: string
  total: number
  truePositives: number
  falsePositives: number
  trueNegatives: number
  falseNegatives: number
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  falsePositiveRate: number
  falseNegativeRate: number
  binaryConfusionMatrix: {
    tp: number
    fp: number
    tn: number
    fn: number
  }
  multiclassConfusionMatrix: Record<string, Record<string, number>>
  categoryMetrics: Record<string, { total: number; correct: number; accuracy: number }>
  sourceTypeMetrics: Record<string, { total: number; correct: number; accuracy: number; tp: number; fp: number; tn: number; fn: number }>
  datasetProvenance: Record<string, { datasetName: string; datasetType: string; count: number; license: string }>
  calibrationBuckets: Record<string, { total: number; correct: number; avgConfidence: number; actualAccuracy: number; status: string }>
  detectorContributions: Record<string, { firedTotal: number; firedOnTP: number; firedOnFP: number; firedOnTN: number; firedOnFN: number; totalScoreContribution: number }>
  misclassifications: Array<{
    id: string
    text: string
    category: string
    sourceType: string
    datasetName: string
    expectedRisk: string
    actualRisk: string
    expectedIsScam: boolean
    actualIsScam: boolean
    scamProbability: number
    confidence: number
    redFlags: string[]
    trustSignals: string[]
    firedDetectors: string[]
    likelyCause: string
    suggestedImprovement: string
  }>
  passedSampleIds: string[]
  failedSampleIds: string[]
}

export function runComprehensiveEvaluation(): EvaluationResult {
  const samples = loadAllBenchmarkSamples()
  syncMasterBenchmarkJson(samples)

  let tp = 0
  let fp = 0
  let tn = 0
  let fn = 0

  const matrix: Record<string, Record<string, number>> = {}
  riskLevels.forEach((r1) => {
    matrix[r1] = {}
    riskLevels.forEach((r2) => {
      matrix[r1][r2] = 0
    })
  })

  const categoryCounts: Record<string, { total: number; correct: number }> = {}
  const sourceTypeCounts: Record<string, { total: number; correct: number; tp: number; fp: number; tn: number; fn: number }> = {}
  const provenanceCounts: Record<string, { datasetName: string; datasetType: string; count: number; license: string }> = {}

  const calibrationData: Record<string, { total: number; correct: number; confSum: number }> = {
    '60-69%': { total: 0, correct: 0, confSum: 0 },
    '70-79%': { total: 0, correct: 0, confSum: 0 },
    '80-84%': { total: 0, correct: 0, confSum: 0 },
    '85-89%': { total: 0, correct: 0, confSum: 0 },
    '90-94%': { total: 0, correct: 0, confSum: 0 },
    '95-99%': { total: 0, correct: 0, confSum: 0 },
  }

  const detectorContributions: Record<string, { firedTotal: number; firedOnTP: number; firedOnFP: number; firedOnTN: number; firedOnFN: number; totalScoreContribution: number }> = {}

  const misclassifications: EvaluationResult['misclassifications'] = []
  const passedSampleIds: string[] = []
  const failedSampleIds: string[] = []

  samples.forEach((sample) => {
    const report = buildDemoReport(sample.text, sample.sourceType)
    const actualIsScam = report.scamProbability >= 25

    const isCorrect = actualIsScam === sample.expectedIsScam

    if (sample.expectedIsScam && actualIsScam) {
      tp += 1
      passedSampleIds.push(sample.id)
    } else if (!sample.expectedIsScam && actualIsScam) {
      fp += 1
      failedSampleIds.push(sample.id)
    } else if (!sample.expectedIsScam && !actualIsScam) {
      tn += 1
      passedSampleIds.push(sample.id)
    } else if (sample.expectedIsScam && !actualIsScam) {
      fn += 1
      failedSampleIds.push(sample.id)
    }

    // 5x5 Multiclass matrix
    if (matrix[sample.expectedRisk] && matrix[sample.expectedRisk][report.riskLevel] !== undefined) {
      matrix[sample.expectedRisk][report.riskLevel] += 1
    }

    // Per-category counts
    if (!categoryCounts[sample.category]) {
      categoryCounts[sample.category] = { total: 0, correct: 0 }
    }
    categoryCounts[sample.category].total += 1
    if (isCorrect) categoryCounts[sample.category].correct += 1

    // Per-source-type counts
    if (!sourceTypeCounts[sample.sourceType]) {
      sourceTypeCounts[sample.sourceType] = { total: 0, correct: 0, tp: 0, fp: 0, tn: 0, fn: 0 }
    }
    sourceTypeCounts[sample.sourceType].total += 1
    if (isCorrect) sourceTypeCounts[sample.sourceType].correct += 1
    if (sample.expectedIsScam && actualIsScam) sourceTypeCounts[sample.sourceType].tp += 1
    else if (!sample.expectedIsScam && actualIsScam) sourceTypeCounts[sample.sourceType].fp += 1
    else if (!sample.expectedIsScam && !actualIsScam) sourceTypeCounts[sample.sourceType].tn += 1
    else if (sample.expectedIsScam && !actualIsScam) sourceTypeCounts[sample.sourceType].fn += 1

    // Dataset provenance counts
    const provKey = sample.datasetName
    if (!provenanceCounts[provKey]) {
      provenanceCounts[provKey] = { datasetName: sample.datasetName, datasetType: sample.datasetType, count: 0, license: sample.license }
    }
    provenanceCounts[provKey].count += 1

    // Detector contribution tracking
    const firedDetectorNames = report.evidence.map((e) => e.label)
    report.evidence.forEach((item) => {
      if (!detectorContributions[item.label]) {
        detectorContributions[item.label] = { firedTotal: 0, firedOnTP: 0, firedOnFP: 0, firedOnTN: 0, firedOnFN: 0, totalScoreContribution: 0 }
      }
      detectorContributions[item.label].firedTotal += 1
      detectorContributions[item.label].totalScoreContribution += item.weight

      if (sample.expectedIsScam && actualIsScam) detectorContributions[item.label].firedOnTP += 1
      else if (!sample.expectedIsScam && actualIsScam) detectorContributions[item.label].firedOnFP += 1
      else if (!sample.expectedIsScam && !actualIsScam) detectorContributions[item.label].firedOnTN += 1
      else if (sample.expectedIsScam && !actualIsScam) detectorContributions[item.label].firedOnFN += 1
    })

    // Misclassifications log
    if (!isCorrect) {
      const isFP = !sample.expectedIsScam && actualIsScam
      const likelyCause = isFP
        ? `Over-flagged due to keyword overlap in "${firedDetectorNames.join(', ')}"`
        : `Missed detection due to vocabulary edge case in "${sample.category}"`
      const suggestedImprovement = isFP
        ? `Add context gating to ${firedDetectorNames[0] ?? 'detector'} for safe transactional patterns.`
        : `Expand pattern coverage in relevant detector for ${sample.category}.`

      misclassifications.push({
        id: sample.id,
        text: sample.text,
        category: sample.category,
        sourceType: sample.sourceType,
        datasetName: sample.datasetName,
        expectedRisk: sample.expectedRisk,
        actualRisk: report.riskLevel,
        expectedIsScam: sample.expectedIsScam,
        actualIsScam,
        scamProbability: report.scamProbability,
        confidence: report.analysisConfidence,
        redFlags: report.redFlags,
        trustSignals: report.trustSignals,
        firedDetectors: firedDetectorNames,
        likelyCause,
        suggestedImprovement,
      })
    }

    // Confidence calibration bucketing
    const conf = report.analysisConfidence
    let bucket = '80-84%'
    if (conf >= 95) bucket = '95-99%'
    else if (conf >= 90) bucket = '90-94%'
    else if (conf >= 85) bucket = '85-89%'
    else if (conf >= 70) bucket = '70-79%'
    else if (conf >= 60) bucket = '60-69%'

    if (calibrationData[bucket]) {
      calibrationData[bucket].total += 1
      calibrationData[bucket].confSum += conf
      if (isCorrect) calibrationData[bucket].correct += 1
    }
  })

  const total = samples.length
  const accuracy = total > 0 ? (tp + tn) / total : 0
  const precision = tp + fp > 0 ? tp / (tp + fp) : 0
  const recall = tp + fn > 0 ? tp / (tp + fn) : 0
  const f1Score = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0
  const falsePositiveRate = fp + tn > 0 ? fp / (fp + tn) : 0
  const falseNegativeRate = fn + tp > 0 ? fn / (fn + tp) : 0

  const categoryMetrics: EvaluationResult['categoryMetrics'] = {}
  Object.entries(categoryCounts).forEach(([cat, val]) => {
    categoryMetrics[cat] = {
      total: val.total,
      correct: val.correct,
      accuracy: val.total > 0 ? Math.round((val.correct / val.total) * 1000) / 1000 : 0,
    }
  })

  const sourceTypeMetrics: EvaluationResult['sourceTypeMetrics'] = {}
  Object.entries(sourceTypeCounts).forEach(([st, val]) => {
    sourceTypeMetrics[st] = {
      total: val.total,
      correct: val.correct,
      accuracy: val.total > 0 ? Math.round((val.correct / val.total) * 1000) / 1000 : 0,
      tp: val.tp,
      fp: val.fp,
      tn: val.tn,
      fn: val.fn,
    }
  })

  const calibrationBuckets: EvaluationResult['calibrationBuckets'] = {}
  Object.entries(calibrationData).forEach(([b, val]) => {
    const avgConfidence = val.total > 0 ? Math.round((val.confSum / val.total) * 10) / 10 : 0
    const actualAccuracy = val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0
    const delta = Math.abs(actualAccuracy - avgConfidence)
    const status = val.total === 0 ? 'No Samples' : delta <= 8 ? 'Well Calibrated ✓' : actualAccuracy < avgConfidence ? 'Slightly Overconfident' : 'Conservative'

    calibrationBuckets[b] = {
      total: val.total,
      correct: val.correct,
      avgConfidence,
      actualAccuracy,
      status,
    }
  })

  return {
    timestamp: new Date().toISOString(),
    total,
    truePositives: tp,
    falsePositives: fp,
    trueNegatives: tn,
    falseNegatives: fn,
    accuracy: Math.round(accuracy * 1000) / 1000,
    precision: Math.round(precision * 1000) / 1000,
    recall: Math.round(recall * 1000) / 1000,
    f1Score: Math.round(f1Score * 1000) / 1000,
    falsePositiveRate: Math.round(falsePositiveRate * 1000) / 1000,
    falseNegativeRate: Math.round(falseNegativeRate * 1000) / 1000,
    binaryConfusionMatrix: { tp, fp, tn, fn },
    multiclassConfusionMatrix: matrix,
    categoryMetrics,
    sourceTypeMetrics,
    datasetProvenance: provenanceCounts,
    calibrationBuckets,
    detectorContributions,
    misclassifications,
    passedSampleIds,
    failedSampleIds,
  }
}

export function generateEvaluationReportMarkdown(results: EvaluationResult): string {
  const emailCount = results.sourceTypeMetrics['email']?.total ?? 0
  const smsCount = results.sourceTypeMetrics['sms']?.total ?? 0
  const urlCount = results.sourceTypeMetrics['url']?.total ?? 0
  const screenshotCount = results.sourceTypeMetrics['screenshot']?.total ?? 0

  return `# Veridion Investigation Engine — Evaluation Report

**Evaluation Timestamp:** ${results.timestamp}  
**Total Benchmark Samples Evaluated:** ${results.total} labeled samples (${emailCount} Emails, ${smsCount} SMS, ${urlCount} URLs, ${screenshotCount} Screenshot OCR) across ${Object.keys(results.datasetProvenance).length} dataset source files  

---

## 1. Executive Summary Metrics

| Metric | Score | Percentage | Status |
|---|---|---|---|
| **Accuracy** | ${results.accuracy} | **${(results.accuracy * 100).toFixed(1)}%** | ${results.accuracy >= 0.92 ? 'Target Passed ✓' : 'Below Target'} |
| **Precision** | ${results.precision} | **${(results.precision * 100).toFixed(1)}%** | ${results.precision >= 0.93 ? 'Target Passed ✓' : 'Below Target'} |
| **Recall (Sensitivity)** | ${results.recall} | **${(results.recall * 100).toFixed(1)}%** | ${results.recall >= 0.88 ? 'Target Passed ✓' : 'Below Target'} |
| **F1 Score** | ${results.f1Score} | **${(results.f1Score * 100).toFixed(1)}%** | ${results.f1Score >= 0.91 ? 'Target Passed ✓' : 'Below Target'} |
| **False Positive Rate (FPR)** | ${results.falsePositiveRate} | **${(results.falsePositiveRate * 100).toFixed(1)}%** | ${results.falsePositiveRate <= 0.08 ? 'Target Passed ✓' : 'Above Target'} |
| **False Negative Rate (FNR)** | ${results.falseNegativeRate} | **${(results.falseNegativeRate * 100).toFixed(1)}%** | ${results.falseNegativeRate <= 0.12 ? 'Target Passed ✓' : 'Above Target'} |

---

## 2. Confusion Matrices

### Binary Confusion Matrix (Scam vs Legitimate)

| | Predicted Scam | Predicted Legit |
|---|---|---|
| **Actual Scam** | **TP = ${results.truePositives}** | FN = ${results.falseNegatives} |
| **Actual Legit** | FP = ${results.falsePositives} | **TN = ${results.trueNegatives}** |

### 5x5 Multiclass Risk Level Matrix

| Expected \\ Actual | Very Low | Low | Moderate | High | Critical |
|---|---|---|---|---|---|
${riskLevels.map((r1) => `| **${r1}** | ${riskLevels.map((r2) => results.multiclassConfusionMatrix[r1]?.[r2] ?? 0).join(' | ')} |`).join('\n')}

---

## 3. Dataset Inventory & Provenance Attribution

| Dataset Name | Dataset Type | Samples Contributed | License / Attribution |
|---|---|---|---|
${Object.values(results.datasetProvenance).map((d) => `| ${d.datasetName} | ${d.datasetType} | ${d.count} | ${d.license} |`).join('\n')}

---

## 4. Per-Source Type Accuracy Breakdown

| Source Type | Total Samples | Correct | Accuracy | TP | FP | TN | FN |
|---|---|---|---|---|---|---|---|
${Object.entries(results.sourceTypeMetrics).map(([st, m]) => `| **${st.toUpperCase()}** | ${m.total} | ${m.correct} | **${(m.accuracy * 100).toFixed(1)}%** | ${m.tp} | ${m.fp} | ${m.tn} | ${m.fn} |`).join('\n')}

---

## 5. Per-Category Performance Breakdown

| Category | Total Tested | Correct | Accuracy |
|---|---|---|---|
${Object.entries(results.categoryMetrics).map(([cat, m]) => `| ${cat} | ${m.total} | ${m.correct} | ${(m.accuracy * 100).toFixed(1)}% |`).join('\n')}

---

## 6. Confidence Calibration Buckets

| Confidence Bucket | Tested Samples | Mean Reported Confidence | Measured Empirical Accuracy | Calibration Status |
|---|---|---|---|---|
${Object.entries(results.calibrationBuckets).map(([b, c]) => `| ${b} | ${c.total} | ${c.avgConfidence}% | ${c.actualAccuracy}% | ${c.status} |`).join('\n')}

---

## 7. Detector Contribution Analysis

| Detector Name | Total Fired | Fired on TP | Fired on FP | Fired on TN | Fired on FN | Net Contribution Efficiency |
|---|---|---|---|---|---|---|
${Object.entries(results.detectorContributions).map(([name, d]) => {
  const efficiency = d.firedTotal > 0 ? Math.round(((d.firedOnTP + d.firedOnTN) / d.firedTotal) * 100) : 0
  return `| ${name} | ${d.firedTotal} | ${d.firedOnTP} | ${d.firedOnFP} | ${d.firedOnTN} | ${d.firedOnFN} | ${efficiency}% |`
}).join('\n')}

---

## 8. Summary & Reproducibility
This report is generated deterministically by running \`node --experimental-strip-types scripts/evaluateEngine.ts\`. All dataset samples are dynamically loaded from \`datasets/\`.
`
}

export function generateMisclassificationReportMarkdown(results: EvaluationResult): string {
  return `# Veridion Engine — Misclassification & Diagnostic Report

**Evaluation Timestamp:** ${results.timestamp}  
**Total Misclassifications:** ${results.misclassifications.length} of ${results.total} samples (${((results.misclassifications.length / Math.max(results.total, 1)) * 100).toFixed(1)}%).

${results.misclassifications.length === 0
  ? '✓ **Zero misclassifications observed across all benchmark samples!**'
  : results.misclassifications.map((m, i) => `### ${i + 1}. [${m.id}] ${m.category} (${m.sourceType.toUpperCase()})
- **Dataset Source:** ${m.datasetName}
- **Input Text:** "${m.text}"
- **Expected:** ${m.expectedRisk} (IsScam: ${m.expectedIsScam})
- **Predicted:** ${m.actualRisk} (Probability: ${m.scamProbability}%, Confidence: ${m.confidence}%)
- **Detectors Triggered:** ${m.firedDetectors.join(', ') || 'None'}
- **Red Flags:** ${m.redFlags.join('; ') || 'None'}
- **Trust Signals:** ${m.trustSignals.join('; ') || 'None'}
- **Likely Cause of Failure:** ${m.likelyCause}
- **Suggested Improvement:** ${m.suggestedImprovement}
`).join('\n---\n')}
`
}

export function enforceRegressionProtection(current: EvaluationResult) {
  const baselinePath = path.resolve(process.cwd(), 'benchmarks/baseline.json')
  const historyPath = path.resolve(process.cwd(), 'benchmarks/history.json')

  const updateBaselineFlag = process.argv.includes('--update-baseline')

  if (!fs.existsSync(baselinePath) || updateBaselineFlag) {
    console.log('📌 Saving current evaluation metrics as baseline...')
    fs.writeFileSync(baselinePath, JSON.stringify(current, null, 2), 'utf-8')

    let history = []
    if (fs.existsSync(historyPath)) {
      try {
        history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'))
      } catch (err) {}
    }
    history.push({ timestamp: current.timestamp, total: current.total, accuracy: current.accuracy, fpr: current.falsePositiveRate, fnr: current.falseNegativeRate, f1Score: current.f1Score })
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8')

    console.log('✓ Baseline saved successfully.')
    return
  }

  const baseline: EvaluationResult = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'))

  const regressions: string[] = []

  if (current.accuracy < baseline.accuracy) {
    regressions.push(`Accuracy decreased: baseline ${(baseline.accuracy * 100).toFixed(1)}% -> current ${(current.accuracy * 100).toFixed(1)}%`)
  }

  if (current.falsePositiveRate > baseline.falsePositiveRate) {
    regressions.push(`False Positive Rate increased: baseline ${(baseline.falsePositiveRate * 100).toFixed(1)}% -> current ${(current.falsePositiveRate * 100).toFixed(1)}%`)
  }

  if (current.falseNegativeRate > baseline.falseNegativeRate) {
    regressions.push(`False Negative Rate increased: baseline ${(baseline.falseNegativeRate * 100).toFixed(1)}% -> current ${(current.falseNegativeRate * 100).toFixed(1)}%`)
  }

  // Individual sample regressions (passed in baseline, failed now)
  const baselinePassedSet = new Set(baseline.passedSampleIds ?? [])
  const regressedSampleIds = current.failedSampleIds.filter((id) => baselinePassedSet.has(id))

  if (regressedSampleIds.length > 0) {
    regressions.push(`Sample Regression: ${regressedSampleIds.length} sample(s) that previously passed are now failing: ${regressedSampleIds.join(', ')}`)
  }

  if (regressions.length > 0) {
    console.error('\n' + '='.repeat(70))
    console.error('🚨 REGRESSION DETECTED IN VERIDION INVESTIGATION ENGINE 🚨')
    console.error('='.repeat(70))
    regressions.forEach((r) => console.error(` ❌ ${r}`))
    console.error('='.repeat(70))
    console.error('Benchmark run failed. Resolve regressions or run with --update-baseline if intentional.\n')
    process.exit(1)
  }

  console.log('✓ Zero regressions detected against baseline!')
}

function main() {
  console.log('🔍 Running Veridion Automated Evaluation & Regression Pipeline...')
  const results = runComprehensiveEvaluation()

  const benchmarkDir = path.resolve(process.cwd(), 'benchmarks')
  if (!fs.existsSync(benchmarkDir)) {
    fs.mkdirSync(benchmarkDir, { recursive: true })
  }

  fs.writeFileSync(path.join(benchmarkDir, 'benchmark_summary.json'), JSON.stringify(results, null, 2))
  fs.writeFileSync(path.join(benchmarkDir, 'evaluation_report.md'), generateEvaluationReportMarkdown(results))
  fs.writeFileSync(path.join(benchmarkDir, 'misclassification_report.md'), generateMisclassificationReportMarkdown(results))

  console.log('\n📊 EXECUTIVE EVALUATION RESULTS:')
  console.log(`- Samples Evaluated: ${results.total}`)
  console.log(`- Accuracy: ${(results.accuracy * 100).toFixed(1)}%`)
  console.log(`- Precision: ${(results.precision * 100).toFixed(1)}%`)
  console.log(`- Recall (Sensitivity): ${(results.recall * 100).toFixed(1)}%`)
  console.log(`- F1 Score: ${(results.f1Score * 100).toFixed(1)}%`)
  console.log(`- False Positive Rate: ${(results.falsePositiveRate * 100).toFixed(1)}%`)
  console.log(`- False Negative Rate: ${(results.falseNegativeRate * 100).toFixed(1)}%`)
  console.log(`\nGenerated artifacts:`)
  console.log(` - benchmarks/evaluation_report.md`)
  console.log(` - benchmarks/benchmark_summary.json`)
  console.log(` - benchmarks/misclassification_report.md`)

  enforceRegressionProtection(results)
}

if (import.meta.url.endsWith(path.basename(process.argv[1] ?? ''))) {
  main()
}
