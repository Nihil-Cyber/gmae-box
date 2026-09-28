import type { Difficulty, Question } from '../types'
import { randInt } from './random'

function timesTableMul(): { x: number; y: number } {
  return { x: randInt(1, 10), y: randInt(1, 10) }
}

function tableDiv(): { dividend: number; divisor: number; quotient: number } {
  const divisor = randInt(1, 10)
  const quotient = randInt(1, 10)
  return { dividend: divisor * quotient, divisor, quotient }
}

function divAnswerBelow25(): { dividend: number; divisor: number; quotient: number } {
  const divisor = randInt(2, 10)
  const quotient = randInt(2, 24)
  return { dividend: divisor * quotient, divisor, quotient }
}

export function makeMulDiv(difficulty: Difficulty): Question {
  const wantMul =
    difficulty === 'easy' ? true : difficulty === 'medium' ? Math.random() < 0.5 : Math.random() < 0.3

  if (wantMul) {
    const { x, y } = timesTableMul()
    return {
      prompt: '乘出嚟係幾多？',
      expression: `${x} × ${y}`,
      answer: x * y,
      input: 'number',
    }
  }

  const { dividend, divisor, quotient } =
    difficulty === 'hard' ? divAnswerBelow25() : tableDiv()
  return {
    prompt: '除出嚟係幾多？',
    expression: `${dividend} ÷ ${divisor}`,
    answer: quotient,
    input: 'number',
  }
}
