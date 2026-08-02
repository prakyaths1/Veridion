import fs from 'node:fs'
import path from 'node:path'
import { runComprehensiveEvaluation, enforceRegressionProtection } from './evaluateEngine.ts'

function main() {
  console.log('🛡️ Veridion Engine — Automated Regression Protection Check')
  const results = runComprehensiveEvaluation()
  enforceRegressionProtection(results)
  console.log('✅ Regression protection check PASSED with zero regressions.')
}

main()
