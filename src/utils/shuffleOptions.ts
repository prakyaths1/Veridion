export function shuffleOptions<T>(items: T[], seed: string) {
  const clone = [...items]
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(index)
    hash |= 0
  }

  for (let index = clone.length - 1; index > 0; index -= 1) {
    hash = (hash * 1664525 + 1013904223) >>> 0
    const swapIndex = hash % (index + 1)
    ;[clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]]
  }

  return clone
}
