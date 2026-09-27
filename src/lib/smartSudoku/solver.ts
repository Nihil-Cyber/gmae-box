import { BOX_H, BOX_W, SIZE, cloneBoard, type Board, type CellValue } from './board'
import { isValidMove } from './validator'

const FULL = 0b1111110

function bitCount(n: number): number {
  let c = 0
  let x = n
  while (x) {
    x &= x - 1
    c += 1
  }
  return c
}

function boxOf(row: number, col: number): number {
  return Math.floor(row / BOX_H) * (SIZE / BOX_W) + Math.floor(col / BOX_W)
}

export function solveSudoku(board: Board): Board | null {
  const grid = cloneBoard(board)
  return fill(grid) ? grid : null
}

function fill(grid: Board): boolean {
  let bestR = -1
  let bestC = -1
  let bestCount = 7
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (grid[r]![c] !== 0) continue
      let n = 0
      for (let v = 1; v <= SIZE; v += 1) {
        if (isValidMove(grid, r, c, v)) n += 1
      }
      if (n === 0) return false
      if (n < bestCount) {
        bestCount = n
        bestR = r
        bestC = c
        if (n === 1) break
      }
    }
    if (bestCount === 1 && bestR !== -1) break
  }
  if (bestR === -1) return true

  for (let v = 1; v <= SIZE; v += 1) {
    if (!isValidMove(grid, bestR, bestC, v)) continue
    grid[bestR]![bestC] = v as CellValue
    if (fill(grid)) return true
    grid[bestR]![bestC] = 0
  }
  return false
}

export function countSolutions(board: Board, limit = 2): number {
  const rows = Array.from({ length: SIZE }, () => 0)
  const cols = Array.from({ length: SIZE }, () => 0)
  const boxes = Array.from({ length: SIZE }, () => 0)
  const empties: Array<[number, number]> = []

  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const v = board[r]![c]!
      if (v === 0) {
        empties.push([r, c])
        continue
      }
      const bit = 1 << v
      const b = boxOf(r, c)
      if (rows[r]! & bit || cols[c]! & bit || boxes[b]! & bit) return 0
      rows[r]! |= bit
      cols[c]! |= bit
      boxes[b]! |= bit
    }
  }

  let count = 0
  const search = (start: number): void => {
    if (count >= limit) return
    if (start === empties.length) {
      count += 1
      return
    }

    let pick = start
    let fewest = 7
    for (let i = start; i < empties.length; i += 1) {
      const [r, c] = empties[i]!
      const used = rows[r]! | cols[c]! | boxes[boxOf(r, c)]!
      const n = bitCount(FULL & ~used)
      if (n === 0) return
      if (n < fewest) {
        fewest = n
        pick = i
        if (n === 1) break
      }
    }

    const tmp = empties[start]!
    empties[start] = empties[pick]!
    empties[pick] = tmp

    const [r, c] = empties[start]!
    const b = boxOf(r, c)
    const avail = FULL & ~(rows[r]! | cols[c]! | boxes[b]!)
    for (let v = 1; v <= SIZE; v += 1) {
      const bit = 1 << v
      if ((avail & bit) === 0) continue
      rows[r]! |= bit
      cols[c]! |= bit
      boxes[b]! |= bit
      search(start + 1)
      rows[r]! &= ~bit
      cols[c]! &= ~bit
      boxes[b]! &= ~bit
      if (count >= limit) return
    }
  }

  search(0)
  return count
}
