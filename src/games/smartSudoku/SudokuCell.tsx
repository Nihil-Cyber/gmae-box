import type { CellValue, Digit } from '../../lib/smartSudoku'
import { TILE } from './tiles'

type Props = {
  value: CellValue
  given: boolean
  selected: boolean
  peer: boolean
  same: boolean
  hint: boolean
  fx: 'shake' | 'bounce' | 'wave' | null
  waveDelay: number
  onClick: () => void
}

export function SudokuCell({
  value,
  given,
  selected,
  peer,
  same,
  hint,
  fx,
  waveDelay,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={[
        'ss-cell',
        value ? TILE[value as Digit] : '',
        given ? 'is-given' : '',
        selected ? 'is-selected' : '',
        peer ? 'is-peer' : '',
        same ? 'is-same' : '',
        hint ? 'is-hint' : '',
        fx ? `fx-${fx}` : '',
      ].join(' ')}
      style={fx === 'wave' ? { animationDelay: `${waveDelay}ms` } : undefined}
      onClick={onClick}
      aria-label={value ? `數字 ${value}` : '空格'}
    >
      {value ? <span className="ss-glyph">{value}</span> : null}
      {fx === 'bounce' ? (
        <span className="ss-sparkles" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      ) : null}
    </button>
  )
}
