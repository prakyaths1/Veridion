import test from 'node:test'
import assert from 'node:assert/strict'
import { lessons } from '../src/data/lessons.ts'

test('every lesson carries a complete educational module structure for the Learn experience', () => {
  assert.ok(lessons.length >= 1)

  for (const lesson of lessons) {
    assert.ok(lesson.title)
    assert.ok(lesson.summary)
    assert.ok(lesson.detail)
    assert.ok(lesson.objectives?.length)
    assert.ok(lesson.explanation)
    assert.ok(lesson.psychology)
    assert.ok(lesson.scamExamples?.length)
    assert.ok(lesson.legitExamples?.length)
    assert.ok(lesson.redFlags?.length)
    assert.ok(lesson.protection?.length)
    assert.ok(lesson.mistakes?.length)
    assert.ok(lesson.takeaways?.length)
    assert.ok(lesson.quiz?.length >= 3)
    assert.ok(lesson.quiz.every((item) => item.explanation))
  }
})
