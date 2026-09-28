import { describe, expect, it } from 'vitest'
import { makeMulDiv } from './mulDiv'

function parseMul(expression: string) {
  const match = /^(\d+) × (\d+)$/.exec(expression)
  expect(match).not.toBeNull()
  return { x: Number(match![1]), y: Number(match![2]) }
}

function parseDiv(expression: string) {
  const match = /^(\d+) ÷ (\d+)$/.exec(expression)
  expect(match).not.toBeNull()
  return { dividend: Number(match![1]), divisor: Number(match![2]) }
}

describe('makeMulDiv', () => {
  it('easy is multiplication tables 1 to 10', () => {
    for (let i = 0; i < 60; i += 1) {
      const q = makeMulDiv('easy')
      const { x, y } = parseMul(String(q.expression))
      expect(x).toBeGreaterThanOrEqual(1)
      expect(x).toBeLessThanOrEqual(10)
      expect(y).toBeGreaterThanOrEqual(1)
      expect(y).toBeLessThanOrEqual(10)
      expect(q.answer).toBe(x * y)
    }
  })

  it('medium uses 1–10 tables, and division answers stay below 25', () => {
    let sawMul = false
    let sawDiv = false
    for (let i = 0; i < 80; i += 1) {
      const q = makeMulDiv('medium')
      const expr = String(q.expression)
      if (expr.includes('×')) {
        sawMul = true
        const { x, y } = parseMul(expr)
        expect(x).toBeLessThanOrEqual(10)
        expect(y).toBeLessThanOrEqual(10)
        expect(q.answer).toBe(x * y)
      } else {
        sawDiv = true
        const { dividend, divisor } = parseDiv(expr)
        expect(divisor).toBeGreaterThanOrEqual(1)
        expect(divisor).toBeLessThanOrEqual(10)
        expect(Number(q.answer)).toBeGreaterThanOrEqual(1)
        expect(Number(q.answer)).toBeLessThan(25)
        expect(dividend).toBe(divisor * Number(q.answer))
      }
    }
    expect(sawMul).toBe(true)
    expect(sawDiv).toBe(true)
  })

  it('hard division answers stay below 25', () => {
    for (let i = 0; i < 80; i += 1) {
      const q = makeMulDiv('hard')
      const expr = String(q.expression)
      if (expr.includes('×')) {
        const { x, y } = parseMul(expr)
        expect(x).toBeLessThanOrEqual(10)
        expect(y).toBeLessThanOrEqual(10)
      } else {
        const { dividend, divisor } = parseDiv(expr)
        expect(Number(q.answer)).toBeGreaterThanOrEqual(2)
        expect(Number(q.answer)).toBeLessThan(25)
        expect(dividend).toBe(divisor * Number(q.answer))
      }
    }
  })
})
