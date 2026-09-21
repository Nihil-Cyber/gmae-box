import type { Difficulty, Question } from '../types'
import { randInt } from './random'

function noCarryAdd(): { a: number; b: number } {
  const aOnes = randInt(0, 8)
  const bOnes = randInt(0, 9 - aOnes)
  const aTens = randInt(1, 8)
  const bTens = randInt(1, 9 - aTens)
  return { a: aTens * 10 + aOnes, b: bTens * 10 + bOnes }
}

function carryAdd(): { a: number; b: number } {
  const aOnes = randInt(1, 9)
  const bOnes = randInt(10 - aOnes, 9)
  const aTens = randInt(1, 9)
  const bTens = randInt(1, 9)
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

function borrowSub(): { a: number; b: number } {
  const aOnes = randInt(0, 8)
  const bOnes = randInt(aOnes + 1, 9)
  const aTens = randInt(2, 9)
  const bTens = randInt(1, aTens - 1)
  return { a: aTens * 10 + aOnes, b: bTens * 10 + bOnes }
}

function pair(difficulty: Difficulty, op: '+' | '-'): { a: number; b: number } {
  if (op === '+') {
    if (difficulty === 'easy') return noCarryAdd()
    if (difficulty === 'hard') return carryAdd()
    return Math.random() < 0.55 ? carryAdd() : noCarryAdd()
  }
  if (difficulty === 'easy') return noBorrowSub()
  if (difficulty === 'hard') return borrowSub()
  return Math.random() < 0.55 ? borrowSub() : noBorrowSub()
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
