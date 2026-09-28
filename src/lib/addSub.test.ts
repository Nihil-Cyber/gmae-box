import { describe, expect, it } from 'vitest'
import { makeAddSub } from './addSub'

function parse(expression: string): { a: number; op: '+' | '-'; b: number } {
  const match = /^(\d+) ([+-]) (\d+)$/.exec(expression)
  expect(match).not.toBeNull()
  return { a: Number(match![1]), op: match![2] as '+' | '-', b: Number(match![3]) }
}

function sample(difficulty: 'easy' | 'medium' | 'hard', n = 80) {
  return Array.from({ length: n }, () => makeAddSub(difficulty))
}

describe('makeAddSub', () => {
  it('easy uses single-digit add/sub', () => {
    for (const q of sample('easy')) {
      const { a, op, b } = parse(String(q.expression))
      expect(a).toBeGreaterThanOrEqual(1)
      expect(a).toBeLessThanOrEqual(9)
      expect(b).toBeGreaterThanOrEqual(1)
      expect(b).toBeLessThanOrEqual(9)
      expect(q.answer).toBe(op === '+' ? a + b : a - b)
      if (op === '-') expect(a).toBeGreaterThan(b)
    }
  })

  it('medium stays within 20', () => {
    for (const q of sample('medium')) {
      const { a, op, b } = parse(String(q.expression))
      expect(a).toBeGreaterThanOrEqual(1)
      expect(a).toBeLessThanOrEqual(20)
      expect(b).toBeGreaterThanOrEqual(1)
      expect(b).toBeLessThanOrEqual(20)
      const answer = op === '+' ? a + b : a - b
      expect(q.answer).toBe(answer)
      expect(answer).toBeGreaterThanOrEqual(0)
      expect(answer).toBeLessThanOrEqual(20)
    }
  })

  it('hard is two-digit without carry or borrow', () => {
    for (const q of sample('hard')) {
      const { a, op, b } = parse(String(q.expression))
      expect(a).toBeGreaterThanOrEqual(10)
      expect(b).toBeGreaterThanOrEqual(10)
      const aOnes = a % 10
      const bOnes = b % 10
      if (op === '+') {
        expect(aOnes + bOnes).toBeLessThan(10)
        expect(Math.floor(a / 10) + Math.floor(b / 10)).toBeLessThan(10)
        expect(q.answer).toBe(a + b)
      } else {
        expect(aOnes).toBeGreaterThanOrEqual(bOnes)
        expect(Math.floor(a / 10)).toBeGreaterThanOrEqual(Math.floor(b / 10))
        expect(q.answer).toBe(a - b)
      }
    }
  })
})
