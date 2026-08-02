export const RISK_BANDS = [
  { label: 'Very Low', min: 0 },
  { label: 'Low', min: 10 },
  { label: 'Moderate', min: 25 },
  { label: 'High', min: 45 },
  { label: 'Critical', min: 70 },
] as const

export const TRUST_SIGNAL_REDUCTIONS = {
  email: 4,
  sms: 3,
  url: 5,
  screenshot: 2,
} as const
