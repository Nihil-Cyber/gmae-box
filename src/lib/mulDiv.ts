import type { Difficulty, Question } from '../types'
import { randInt } from './random'

function range(difficulty: Difficulty): { lo: number; hi: number } {
  if (difficulty === 'easy') return { lo: 1, hi: 5 }
  if (difficulty === 'hard') return { lo: 6, hi: 9 }
  return { lo: 1, hi: 9 }
}

export function makeMulDiv(difficulty: Difficulty): Question {
  const { lo, hi } = range(difficulty)
  const wantDiv =
    difficulty === 'easy' ? Math.random() < 0.35 : Math.random() < 0.5
  const x = randInt(lo, hi)
  const y = randInt(lo, hi)

  if (!wantDiv) {
    return {
      prompt: '乘出嚟係幾多？',
      expression: `${x} × ${y}`,
      answer: x * y,
      input: 'number',
    }
  }

  const product = x * y
  return {
    prompt: '除出嚟係幾多？',
    expression: `${product} ÷ ${x}`,
    answer: y,
    input: 'number',
  }
}
