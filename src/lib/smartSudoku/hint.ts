import { SIZE, type Board, type Digit } from './board'
import { solveSudoku } from './solver'
import { getCandidates } from './validator'

export type Hint = {
  row: number
  col: number
  value: Digit
  candidates: Digit[]
}

export function getHint(board: Board): Hint | null {
  const solved = solveSudoku(board)
  if (!solved) return null

  let best: Hint | null = null
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (board[r]![c] !== 0) continue
      const candidates = getCandidates(board, r, c)
      if (candidates.length === 0) continue
      const value = solved[r]![c] as Digit
      if (!best || candidates.length < best.candidates.length) {
        best = { row: r, col: c, value, candidates }
      }
    }
  }
  return best
}
