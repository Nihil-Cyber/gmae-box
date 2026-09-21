import { shuffle } from './random'

export type Grid = number[][]

function clone(grid: Grid): Grid {
  return grid.map((row) => [...row])
}

function isValid(grid: Grid, r: number, c: number, n: number): boolean {
  for (let i = 0; i < 4; i += 1) {
    if (grid[r]![i] === n || grid[i]![c] === n) return false
  }
  const br = Math.floor(r / 2) * 2
  const bc = Math.floor(c / 2) * 2
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      if (grid[br + i]![bc + j] === n) return false
    }
  }
  return true
}

function fill(grid: Grid): boolean {
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      if (grid[r]![c] !== 0) continue
      for (const n of shuffle([1, 2, 3, 4])) {
        if (!isValid(grid, r, c, n)) continue
        grid[r]![c] = n
        if (fill(grid)) return true
        grid[r]![c] = 0
      }
      return false
    }
  }
  return true
}

function countSolutions(grid: Grid, limit = 2): number {
  let count = 0
  const search = (): void => {
    if (count >= limit) return
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        if (grid[r]![c] !== 0) continue
        for (let n = 1; n <= 4; n += 1) {
          if (!isValid(grid, r, c, n)) continue
          grid[r]![c] = n
          search()
          grid[r]![c] = 0
        }
        return
      }
    }
    count += 1
  }
  search()
  return count
}

function emptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
}

export function generateSudoku(clues: number): { puzzle: Grid; solution: Grid } {
  const solution = emptyGrid()
  fill(solution)
  const puzzle = clone(solution)
  const positions = shuffle(
    Array.from({ length: 16 }, (_, i) => [Math.floor(i / 4), i % 4] as const),
  )
  let remaining = 16
  for (const [r, c] of positions) {
    if (remaining <= clues) break
    const backup = puzzle[r]![c]!
    puzzle[r]![c] = 0
    if (countSolutions(clone(puzzle)) === 1) {
      remaining -= 1
    } else {
      puzzle[r]![c] = backup
    }
  }
  return { puzzle, solution }
}

export function hasConflict(grid: Grid, r: number, c: number): boolean {
  const n = grid[r]![c]!
  if (n === 0) return false
  for (let i = 0; i < 4; i += 1) {
    if (i !== c && grid[r]![i] === n) return true
    if (i !== r && grid[i]![c] === n) return true
  }
  const br = Math.floor(r / 2) * 2
  const bc = Math.floor(c / 2) * 2
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      const rr = br + i
      const cc = bc + j
      if ((rr !== r || cc !== c) && grid[rr]![cc] === n) return true
    }
  }
  return false
}

export function isComplete(grid: Grid, solution: Grid): boolean {
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      if (grid[r]![c] !== solution[r]![c]) return false
    }
  }
  return true
}

export function findHint(grid: Grid, solution: Grid): { r: number; c: number; n: number } | null {
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      if (grid[r]![c] === 0) return { r, c, n: solution[r]![c]! }
    }
  }
  return null
}
