import { describe, expect, it } from 'vitest'
import {
  BOX_H,
  BOX_W,
  DIGITS,
  SIZE,
  checkCompletion,
  cloneBoard,
  countClues,
  countSolutions,
  emptyBoard,
  generatePuzzle,
  generateSolvedBoard,
  getCandidates,
  getHint,
  isBlockValid,
  isColumnValid,
  isRowValid,
  isSolvedBoard,
  isValidMove,
  puzzleIsWellFormed,
  solveSudoku,
  type Board,
} from './index'
import { CLUE_RANGE } from './generator'

function setCell(board: Board, row: number, col: number, value: Board[number][number]): Board {
  const next = cloneBoard(board)
  next[row]![col] = value
  return next
}

describe('row / column / block validation', () => {
  it('accepts a generated solved board', () => {
    const board = generateSolvedBoard()
    expect(isSolvedBoard(board)).toBe(true)
    for (let r = 0; r < SIZE; r += 1) expect(isRowValid(board, r)).toBe(true)
    for (let c = 0; c < SIZE; c += 1) expect(isColumnValid(board, c)).toBe(true)
    for (let r = 0; r < SIZE; r += BOX_H) {
      for (let c = 0; c < SIZE; c += BOX_W) {
        expect(isBlockValid(board, r, c)).toBe(true)
      }
    }
  })

  it('rejects a duplicate in a row', () => {
    const board = generateSolvedBoard()
    board[0]![1] = board[0]![0]!
    expect(isRowValid(board, 0)).toBe(false)
    expect(isSolvedBoard(board)).toBe(false)
  })

  it('rejects a duplicate in a column', () => {
    const board = generateSolvedBoard()
    board[1]![0] = board[0]![0]!
    expect(isColumnValid(board, 0)).toBe(false)
  })

  it('rejects a duplicate in a 2×3 block', () => {
    const board = generateSolvedBoard()
    board[1]![1] = board[0]![0]!
    expect(isBlockValid(board, 0, 0)).toBe(false)
  })
})

describe('isValidMove and getCandidates', () => {
  it('forbids a number already in the row, column or block', () => {
    const board = emptyBoard()
    board[0]![0] = 1
    board[0]![4] = 2
    board[3]![0] = 3
    board[1]![1] = 4
    expect(isValidMove(board, 0, 2, 1)).toBe(false)
    expect(isValidMove(board, 2, 0, 3)).toBe(false)
    expect(isValidMove(board, 0, 2, 4)).toBe(false)
    expect(isValidMove(board, 0, 2, 5)).toBe(true)
  })

  it('lists remaining digits for an empty cell', () => {
    const board = emptyBoard()
    board[0]![0] = 1
    board[0]![1] = 2
    board[1]![0] = 3
    const candidates = getCandidates(board, 1, 1)
    expect(candidates).toEqual([4, 5, 6])
    expect(getCandidates(board, 0, 0)).toEqual([])
  })
})

describe('solver and unique solutions', () => {
  it('fills an empty board', () => {
    const solved = solveSudoku(emptyBoard())
    expect(solved).not.toBeNull()
    expect(isSolvedBoard(solved!)).toBe(true)
  })

  it('restores a puzzle to its unique solution', () => {
    const { puzzle, solution } = generatePuzzle('easy')
    const solved = solveSudoku(puzzle)
    expect(solved).toEqual(solution)
    expect(countSolutions(puzzle, 2)).toBe(1)
  })
})

describe('completion', () => {
  it('is false for a partial board and true for a solved one', () => {
    const board = generateSolvedBoard()
    expect(checkCompletion(board)).toBe(true)
    board[5]![5] = 0
    expect(checkCompletion(board)).toBe(false)
  })
})

describe('hint', () => {
  it('points at an empty cell with a legal value', () => {
    const { puzzle } = generatePuzzle('easy')
    const hint = getHint(puzzle)
    expect(hint).not.toBeNull()
    expect(puzzle[hint!.row]![hint!.col]).toBe(0)
    expect(hint!.candidates).toContain(hint!.value)
    expect(isValidMove(puzzle, hint!.row, hint!.col, hint!.value)).toBe(true)
  })
})

describe('puzzle generator', () => {
  it('builds 100 unique valid puzzles across difficulties', { timeout: 120000 }, () => {
    const mix = [
      ...Array.from({ length: 34 }, () => 'easy' as const),
      ...Array.from({ length: 33 }, () => 'medium' as const),
      ...Array.from({ length: 33 }, () => 'hard' as const),
    ]
    for (const difficulty of mix) {
      const { puzzle, solution } = generatePuzzle(difficulty)
      expect(isSolvedBoard(solution)).toBe(true)
      expect(countSolutions(puzzle, 2)).toBe(1)
      expect(solveSudoku(puzzle)).toEqual(solution)
      const clues = countClues(puzzle)
      const [min, max] = CLUE_RANGE[difficulty]
      expect(clues).toBeGreaterThanOrEqual(min)
      expect(clues).toBeLessThanOrEqual(max)
      expect(puzzleIsWellFormed(puzzle, solution)).toBe(true)
      expect(DIGITS.every((n) => solution.flat().includes(n))).toBe(true)
    }
  })
})

describe('setCell helper sanity', () => {
  it('clones before write', () => {
    const board = emptyBoard()
    const next = setCell(board, 0, 0, 1)
    expect(board[0]![0]).toBe(0)
    expect(next[0]![0]).toBe(1)
  })
})
