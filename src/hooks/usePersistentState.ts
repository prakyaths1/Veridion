import { useEffect, useState } from 'react'

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T

    // Fallback migration check for legacy 'sentinel-' keys
    const legacyKey = key.replace('veridion-', 'sentinel-')
    const legacyRaw = window.localStorage.getItem(legacyKey)
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw) as T
      window.localStorage.setItem(key, legacyRaw)
      return parsed
    }

    return fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => loadFromStorage(key, fallback))

  useEffect(() => {
    saveToStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
