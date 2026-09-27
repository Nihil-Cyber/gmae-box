import {
  BOX_H,
  BOX_W,
  DIGITS,
  SIZE,
  boxOrigin,
  type Board,
  type Digit,
} from './board'

export function isValidMove(board: Board, row: number, col: number, value: number): boolean {
  if (!DIGITS.includes(value as Digit)) return false
  for (let i = 0; i < SIZE; i += 1) {
    if (i !== col && board[row]![i] === value) return false
    if (i !== row && board[i]![col] === value) return false
  }
  const [br, bc] = boxOrigin(row, col)
  for (let r = br; r < br + BOX_H; r += 1) {
    for (let c = bc; c < bc + BOX_W; c += 1) {
      if ((r !== row || c !== col) && board[r]![c] === value) return false
    }
  }
  return true
}

export function getCandidates(board: Board, row: number, col: number): Digit[] {
  if (board[row]![col] !== 0) return []
  return DIGITS.filter((n) => isValidMove(board, row, col, n))
}

function unitHasUniqueDigits(values: number[]): boolean {
  if (values.length !== SIZE) return false
  const seen = new Set<number>()
  for (const n of values) {
    if (!DIGITS.includes(n as Digit) || seen.has(n)) return false
    seen.add(n)
  }
  return true
}

export function isRowValid(board: Board, row: number): boolean {
  return unitHasUniqueDigits(board[row]!.slice())
}

export function isColumnValid(board: Board, col: number): boolean {
  return unitHasUniqueDigits(board.map((row) => row[col]!))
}

export function isBlockValid(board: Board, startRow: number, startCol: number): boolean {
  const values: number[] = []
  for (let r = startRow; r < startRow + BOX_H; r += 1) {
    for (let c = startCol; c < startCol + BOX_W; c += 1) {
      values.push(board[r]![c]!)
    }
  }
  return unitHasUniqueDigits(values)
}

export function isSolvedBoard(board: Board): boolean {
  for (let r = 0; r < SIZE; r += 1) {
    if (!isRowValid(board, r)) return false
  }
  for (let c = 0; c < SIZE; c += 1) {
    if (!isColumnValid(board, c)) return false
  }
  for (let r = 0; r < SIZE; r += BOX_H) {
    for (let c = 0; c < SIZE; c += BOX_W) {
      if (!isBlockValid(board, r, c)) return false
    }
  }
  return true
}

export function checkCompletion(board: Board): boolean {
  for (const row of board) {
    for (const cell of row) {
      if (cell === 0) return false
    }
  }
  return isSolvedBoard(board)
}
