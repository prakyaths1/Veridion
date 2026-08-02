import fs from 'node:fs'
import path from 'node:path'
import { runComprehensiveEvaluation, generateEvaluationReportMarkdown, generateMisclassificationReportMarkdown } from './evaluateEngine.ts'

function main() {
  console.log('🚀 Running Veridion Master Benchmark Pipeline...')
  const results = runComprehensiveEvaluation()

  const benchmarkDir = path.resolve(process.cwd(), 'benchmarks')
  if (!fs.existsSync(benchmarkDir)) {
    fs.mkdirSync(benchmarkDir, { recursive: true })
  }

  fs.writeFileSync(path.join(benchmarkDir, 'benchmark_summary.json'), JSON.stringify(results, null, 2))
  fs.writeFileSync(path.join(benchmarkDir, 'evaluation_report.md'), generateEvaluationReportMarkdown(results))
  fs.writeFileSync(path.join(benchmarkDir, 'misclassification_report.md'), generateMisclassificationReportMarkdown(results))

  console.log(`✅ Benchmark completed on ${results.total} samples!`)
  console.log(`- Accuracy: ${(results.accuracy * 100).toFixed(1)}%`)
  console.log(`- False Positive Rate: ${(results.falsePositiveRate * 100).toFixed(1)}%`)
  console.log(`- False Negative Rate: ${(results.falseNegativeRate * 100).toFixed(1)}%`)
}

main()
