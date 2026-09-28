import type { Difficulty, Question } from '../types'
import { randInt } from './random'

function singleDigitAdd(): { a: number; b: number } {
  return { a: randInt(1, 9), b: randInt(1, 9) }
}

function singleDigitSub(): { a: number; b: number } {
  const a = randInt(2, 9)
  const b = randInt(1, a - 1)
  return { a, b }
}

function within20Add(): { a: number; b: number } {
  for (let i = 0; i < 24; i += 1) {
    const a = randInt(1, 19)
    const b = randInt(1, 20 - a)
    if (a >= 10 || b >= 10 || a + b > 10) return { a, b }
  }
  return { a: 9, b: 8 }
}

function within20Sub(): { a: number; b: number } {
  const a = randInt(10, 20)
  const b = randInt(1, a - 1)
  return { a, b }
}

function noCarryAdd(): { a: number; b: number } {
  const aOnes = randInt(0, 8)
  const bOnes = randInt(0, 9 - aOnes)
  const aTens = randInt(1, 8)
  const bTens = randInt(1, 9 - aTens)
  return { a: aTens * 10 + aOnes, b: bTens * 10 + bOnes }
}

function noBorrowSub(): { a: number; b: number } {
  let aOnes = randInt(1, 9)
  let bOnes = randInt(0, aOnes)
  const aTens = randInt(2, 9)
  const bTens = randInt(1, aTens)
  if (aTens === bTens && aOnes === bOnes) {
    if (aOnes < 9) aOnes += 1
    else bOnes = Math.max(0, bOnes - 1)
  }
  const a = aTens * 10 + aOnes
  const b = bTens * 10 + bOnes
  if (a === b) return { a: a + 1, b }
  return { a, b }
}

function pair(difficulty: Difficulty, op: '+' | '-'): { a: number; b: number } {
  if (difficulty === 'easy') return op === '+' ? singleDigitAdd() : singleDigitSub()
  if (difficulty === 'medium') return op === '+' ? within20Add() : within20Sub()
  return op === '+' ? noCarryAdd() : noBorrowSub()
}

export function makeAddSub(difficulty: Difficulty): Question {
  const op: '+' | '-' = Math.random() < 0.5 ? '+' : '-'
  const { a, b } = pair(difficulty, op)
  const answer = op === '+' ? a + b : a - b
  return {
    prompt: op === '+' ? '加埋係幾多？' : '差幾多？',
    expression: `${a} ${op} ${b}`,
    answer,
    input: 'number',
  }
}
