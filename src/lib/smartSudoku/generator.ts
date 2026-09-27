import type { Difficulty } from '../../types'
import { shuffle, randInt } from '../random'
import {
  BOX_H,
  BOX_W,
  DIGITS,
  SIZE,
  cloneBoard,
  countClues,
  emptyBoard,
  type Board,
  type Digit,
} from './board'
import { countSolutions } from './solver'
import { isSolvedBoard } from './validator'

export const CLUE_RANGE: Record<Difficulty, readonly [number, number]> = {
  easy: [18, 22],
  medium: [14, 18],
  hard: [10, 14],
}

function pattern(row: number, col: number): number {
  return (BOX_W * (row % BOX_H) + Math.floor(row / BOX_H) + col) % SIZE
}

function shuffledRows(): number[] {
  const bands = shuffle([0, 1, 2])
  const rows: number[] = []
  for (const band of bands) {
    for (const offset of shuffle([0, 1])) {
      rows.push(band * BOX_H + offset)
    }
  }
  return rows
}

function shuffledCols(): number[] {
  const stacks = shuffle([0, 1])
  const cols: number[] = []
  for (const stack of stacks) {
    for (const offset of shuffle([0, 1, 2])) {
      cols.push(stack * BOX_W + offset)
    }
  }
  return cols
}

export function generateSolvedBoard(): Board {
  const rows = shuffledRows()
  const cols = shuffledCols()
  const digits = shuffle([...DIGITS])
  const board = emptyBoard()
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      board[r]![c] = digits[pattern(rows[r]!, cols[c]!)] as Digit
    }
  }
  return board
}

function stripUnique(solution: Board, target: number): Board {
  const puzzle = cloneBoard(solution)
  const order = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE] as const),
  )
  let clues = SIZE * SIZE
  for (const [r, c] of order) {
    if (clues <= target) break
    const backup = puzzle[r]![c]!
    puzzle[r]![c] = 0
    if (countSolutions(puzzle, 2) === 1) {
      clues -= 1
    } else {
      puzzle[r]![c] = backup
    }
  }
  return puzzle
}

export function generatePuzzle(difficulty: Difficulty): { puzzle: Board; solution: Board } {
  const [min, max] = CLUE_RANGE[difficulty]
  let best: { puzzle: Board; solution: Board } | null = null
  let bestClues = 99

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const solution = generateSolvedBoard()
    const target = randInt(min, max)
    const puzzle = stripUnique(solution, target)
    const clues = countClues(puzzle)
    if (countSolutions(puzzle, 2) !== 1) continue
    if (clues >= min && clues <= max) {
      return { puzzle, solution }
    }
    if (clues < bestClues) {
      bestClues = clues
      best = { puzzle, solution }
    }
  }

  if (best) return best
  const solution = generateSolvedBoard()
  return { puzzle: stripUnique(solution, min), solution }
}

export function puzzleIsWellFormed(puzzle: Board, solution: Board): boolean {
  return isSolvedBoard(solution) && countSolutions(puzzle, 2) === 1
}
