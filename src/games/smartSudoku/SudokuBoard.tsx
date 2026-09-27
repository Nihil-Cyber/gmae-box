import { type Board, type CellValue } from '../../lib/smartSudoku'
import { SudokuCell } from './SudokuCell'

type FxMap = Record<string, 'shake' | 'bounce' | 'wave' | null>

type Props = {
  board: Board
  given: boolean[][]
  selected: [number, number] | null
  sameDigit: CellValue
  hintCell: [number, number] | null
  fx: FxMap
  waving: boolean
  onCell: (row: number, col: number) => void
}

function isPeer(sr: number, sc: number, r: number, c: number): boolean {
  if (sr === r && sc === c) return false
  if (sr === r || sc === c) return true
  return Math.floor(sr / 2) === Math.floor(r / 2) && Math.floor(sc / 3) === Math.floor(c / 3)
}

export function SudokuBoard({
  board,
  given,
  selected,
  sameDigit,
  hintCell,
  fx,
  waving,
  onCell,
}: Props) {
  return (
    <div className="ss-board" role="grid" aria-label="6 乘 6 數獨">
      {board.map((row, r) =>
        row.map((value, c) => {
          const key = `${r}-${c}`
          const selectedHere = selected?.[0] === r && selected?.[1] === c
          const peer = selected ? isPeer(selected[0], selected[1], r, c) : false
          return (
            <SudokuCell
              key={key}
              value={value}
              given={given[r]![c]!}
              selected={selectedHere}
              peer={peer}
              same={sameDigit !== 0 && value === sameDigit && !selectedHere}
              hint={hintCell?.[0] === r && hintCell?.[1] === c}
              fx={waving ? 'wave' : (fx[key] ?? null)}
              waveDelay={(r + c) * 45}
              onClick={() => onCell(r, c)}
            />
          )
        }),
      )}
    </div>
  )
}
