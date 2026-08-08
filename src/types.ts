export type SourceType = 'email' | 'sms' | 'url' | 'screenshot'

export type RiskLevel = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Critical'

export type ThreatSeverity = 'Informational' | 'Low' | 'Medium' | 'High' | 'Critical'

export interface EvidenceItem {
  label: string
  detail: string
  weight: number
  source: 'local-ai' | 'online-intelligence' | 'user-input'
}

export interface ParsedHeader {
  fromDisplayName?: string
  fromEmail?: string
  fromDomain?: string
  replyTo?: string
  returnPath?: string
  subject?: string
  headers?: Record<string, string>
}

export interface DetectorContext {
  input: string
  lower: string
  sourceType: SourceType
  urlMatches: string[]
  wordCount: number
  isVeryShort: boolean
  header?: ParsedHeader
  subject?: string
  body?: string
  urls?: string[]
  attachments?: string[]
  html?: string
}

export interface DetectorResult {
  detector: string
  score: number
  confidence: number
  evidence: string[]
}

export interface InvestigationReport {
  id: string
  title: string
  sourceType: SourceType
  summary: string
  explanation: string
  riskLevel: RiskLevel
  severity: ThreatSeverity
  trustScore: number
  scamProbability: number
  analysisConfidence: number
  threatLevel: string
  trustSignals: string[]
  redFlags: string[]
  evidence: EvidenceItem[]
  tactics: string[]
  timeline: Array<{ time: string; event: string }>
  actions: string[]
  suspiciousUrls: string[]
  suspiciousRequests: string[]
  languageAnalysis: string[]
  contextAnalysis: string[]
  whatImprovedConfidence: string[]
  whatReducedConfidence: string[]
  alternativeExplanations: string[]
  missingInformation: string[]
}

export interface Lesson {
  id: string
  levelId: number // 1 to 7
  unitNumber: string // e.g. "1.1", "2.3"
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readTime: string
  reward: number
  summary: string
  detail: string
  objectives: string[]
  explanation: string
  psychology: string
  scamExamples: string[]
  legitExamples: string[]
  redFlags: string[]
  protection: string[]
  mistakes: string[]
  takeaways: string[]
  isBossChallenge?: boolean
  diagram?: {
    title: string
    steps: string[]
  }
  quiz: Array<{
    prompt: string
    options: string[]
    answer: string
    explanation: string
  }>
}

export interface CurriculumLevel {
  id: number
  title: string
  description: string
  icon: string
  badgeName: string
  unitsCount: number
  minXpToUnlock: number
}

export interface QuizQuestion {
  id: number
  prompt: string
  options: string[]
  answer: string
  explanation: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  levelId?: number
}

export interface TopicMastery {
  category: string
  totalQuestions: number
  correctAnswers: number
  masteryPercentage: number
  tier: 'Unranked' | 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  category: string
}

export interface ProgressState {
  lessonsCompleted: string[]
  completedLevels: number[]
  xp: number
  userLevel: number
  streak: number
  quizCorrect: number
  quizAttempts: number
  weakAreas: string[]
  topicMastery: Record<string, { correct: number; total: number }>
  preAssessmentScore: number | null
  postAssessmentScore: number | null
  badgesUnlocked: string[]
  lastActiveDate?: string
}
