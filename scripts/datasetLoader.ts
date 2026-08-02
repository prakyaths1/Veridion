import fs from 'node:fs'
import path from 'node:path'

export interface BenchmarkSample {
  id: string
  sourceType: 'email' | 'sms' | 'url' | 'screenshot'
  category: string
  text: string
  expectedRisk: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Critical'
  expectedIsScam: boolean
  groundTruthLabel: 'legitimate' | 'phishing' | 'smishing' | 'scam'
  explanation: string
  datasetName: string
  datasetSource: string
  datasetType: 'Public Dataset' | 'Curated Test Cases'
  license: string
}

function discoverJsonFiles(dirPath: string): string[] {
  let results: string[] = []
  if (!fs.existsSync(dirPath)) return results

  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      results = results.concat(discoverJsonFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'benchmark.json') {
      results.push(fullPath)
    }
  }

  return results
}

export function loadAllBenchmarkSamples(): BenchmarkSample[] {
  const datasetsDir = path.resolve(process.cwd(), 'datasets')
  const jsonFiles = discoverJsonFiles(datasetsDir)

  const sampleMap = new Map<string, BenchmarkSample>()

  for (const filePath of jsonFiles) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && item.id && item.text && item.sourceType) {
            const normalized: BenchmarkSample = {
              id: String(item.id),
              sourceType: item.sourceType,
              category: item.category ?? 'Uncategorized',
              text: item.text,
              expectedRisk: item.expectedRisk ?? (item.expectedIsScam ? 'High' : 'Very Low'),
              expectedIsScam: Boolean(item.expectedIsScam),
              groundTruthLabel: item.groundTruthLabel ?? (item.expectedIsScam ? 'phishing' : 'legitimate'),
              explanation: item.explanation ?? item.notes ?? 'Ground-truth benchmark test case.',
              datasetName: item.datasetName ?? 'Veridion Curated Test Suite',
              datasetSource: item.datasetSource ?? 'Veridion Research',
              datasetType: item.datasetType ?? (item.datasetName?.includes('UCI') || item.datasetName?.includes('Nazario') ? 'Public Dataset' : 'Curated Test Cases'),
              license: item.license ?? 'MIT / Project License',
            }
            sampleMap.set(normalized.id, normalized)
          }
        }
      }
    } catch (err) {
      console.warn(`Warning: Could not parse JSON file ${filePath}:`, err)
    }
  }

  // Fallback to datasets/benchmark.json if modular files yielded fewer than 10 samples
  if (sampleMap.size < 10) {
    const masterPath = path.join(datasetsDir, 'benchmark.json')
    if (fs.existsSync(masterPath)) {
      const raw = fs.readFileSync(masterPath, 'utf-8')
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          const normalized: BenchmarkSample = {
            id: String(item.id),
            sourceType: item.sourceType,
            category: item.category ?? 'Uncategorized',
            text: item.text,
            expectedRisk: item.expectedRisk ?? (item.expectedIsScam ? 'High' : 'Very Low'),
            expectedIsScam: Boolean(item.expectedIsScam),
            groundTruthLabel: item.groundTruthLabel ?? (item.expectedIsScam ? 'phishing' : 'legitimate'),
            explanation: item.explanation ?? item.notes ?? 'Ground-truth benchmark test case.',
            datasetName: item.datasetName ?? 'Veridion Curated Test Suite',
            datasetSource: item.datasetSource ?? 'Veridion Research',
            datasetType: item.datasetType ?? 'Curated Test Cases',
            license: item.license ?? 'MIT / Project License',
          }
          sampleMap.set(normalized.id, normalized)
        }
      }
    }
  }

  const samples = Array.from(sampleMap.values())
  return samples
}

export function syncMasterBenchmarkJson(samples: BenchmarkSample[]): void {
  const masterPath = path.resolve(process.cwd(), 'datasets/benchmark.json')
  fs.writeFileSync(masterPath, JSON.stringify(samples, null, 2), 'utf-8')
}
