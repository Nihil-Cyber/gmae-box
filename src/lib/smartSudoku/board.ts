export const SIZE = 6
export const BOX_H = 2
export const BOX_W = 3
export const DIGITS = [1, 2, 3, 4, 5, 6] as const

export type Digit = (typeof DIGITS)[number]
export type CellValue = 0 | Digit
export type Board = CellValue[][]

export function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => 0))
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row])
}

export function boxId(row: number, col: number): number {
  return Math.floor(row / BOX_H) * (SIZE / BOX_W) + Math.floor(col / BOX_W)
}

export function boxOrigin(row: number, col: number): [number, number] {
  return [Math.floor(row / BOX_H) * BOX_H, Math.floor(col / BOX_W) * BOX_W]
}

export function countClues(board: Board): number {
  let n = 0
  for (const row of board) {
    for (const cell of row) {
      if (cell !== 0) n += 1
    }
  }
  return n
}

export function cellsEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (a[r]![c] !== b[r]![c]) return false
    }
  }
  return true
}
