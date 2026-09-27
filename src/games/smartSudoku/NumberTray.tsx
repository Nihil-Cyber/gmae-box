import { DIGITS, type Digit } from '../../lib/smartSudoku'
import { TILE } from './tiles'

type Props = {
  selected: Digit | null
  candidates: Digit[]
  strongHint: boolean
  disabled: boolean
  showNumbers: boolean
  onPick: (digit: Digit) => void
}

export function NumberTray({ selected, candidates, strongHint, disabled, showNumbers, onPick }: Props) {
  return (
    <div className="ss-tray">
      {DIGITS.map((digit) => {
        const ok = candidates.includes(digit)
        return (
          <button
            key={digit}
            type="button"
            disabled={disabled}
            className={[
              'ss-tile',
              TILE[digit],
              selected === digit ? 'is-on' : '',
              !ok ? (strongHint ? 'is-dimmer' : 'is-dim') : '',
            ].join(' ')}
            onClick={() => onPick(digit)}
            aria-label={`揀 ${digit}`}
          >
            {showNumbers ? digit : ''}
          </button>
        )
      })}
    </div>
  )
}
