import { useEffect, useState } from 'react'
import type { ColumnOp } from '../types'
import { NumberPad } from './NumberPad'

type Props = {
  a: number
  b: number
  op: ColumnOp
  expected: number
  disabled?: boolean
  revealed?: boolean
  onSubmit: (value: string) => void
  onDigit?: () => void
}

function padCells(n: number, width: number): string[] {
  return String(n).padStart(width, ' ').split('')
}

function carryInto(op: ColumnOp, a: number, b: number, placeFromRight: number): boolean {
  if (placeFromRight <= 0) return false
  if (op === '+') {
    let carry = 0
    for (let p = 0; p < placeFromRight; p += 1) {
      const da = Math.floor(a / 10 ** p) % 10
      const db = Math.floor(b / 10 ** p) % 10
      const sum = da + db + carry
      carry = sum >= 10 ? 1 : 0
    }
    return carry === 1
  }
  let carry = 0
  for (let p = 0; p < placeFromRight; p += 1) {
    const da = Math.floor(a / 10 ** p) % 10
    const prod = da * b + carry
    carry = Math.floor(prod / 10)
  }
  return carry > 0
}

export function ColumnMath({
  a,
  b,
  op,
  expected,
  disabled = false,
  revealed = false,
  onSubmit,
  onDigit,
}: Props) {
  const width = Math.max(String(a).length, String(b).length, String(expected).length)
  const need = String(expected).length
  const [onesFirst, setOnesFirst] = useState('')
  const [marks, setMarks] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setOnesFirst('')
    setMarks({})
  }, [a, b, op, expected])

  function typedValue(): string {
    if (!onesFirst) return ''
    return String(Number(onesFirst.split('').reverse().join('')))
  }

  const aCells = padCells(a, width)
  const bCells = padCells(b, width)
  const answerShown = revealed ? String(expected).padStart(width, ' ') : null

  return (
    <div className="column-math">
      <div
        className="column-grid"
        style={{ gridTemplateColumns: `2.2rem repeat(${width}, 2.4rem)` }}
      >
        <span className="column-label" aria-hidden="true">
          進位
        </span>
        {Array.from({ length: width }, (_, i) => {
          const placeFromRight = width - 1 - i
          const show = carryInto(op, a, b, placeFromRight)
          if (!show) return <span key={`c-${i}`} />
          const on = marks[placeFromRight] === true
          return (
            <button
              key={`c-${i}`}
              type="button"
              className={`column-carry ${on ? 'on' : ''}`}
              aria-label={`第 ${placeFromRight + 1} 位進位`}
              disabled={disabled || revealed}
              onClick={() => setMarks((cur) => ({ ...cur, [placeFromRight]: !cur[placeFromRight] }))}
            >
              {on ? '1' : ''}
            </button>
          )
        })}

        <span />
        {aCells.map((ch, i) => (
          <span key={`a-${i}`} className="column-digit">
            {ch}
          </span>
        ))}

        <span className="column-op">{op}</span>
        {bCells.map((ch, i) => (
          <span key={`b-${i}`} className="column-digit">
            {ch}
          </span>
        ))}

        <span className="column-rule" style={{ gridColumn: `1 / span ${width + 1}` }} />

        <span />
        {Array.from({ length: width }, (_, i) => {
          const placeFromRight = width - 1 - i
          const filled = answerShown
            ? answerShown[i]!.trim()
            : onesFirst[placeFromRight] ?? ''
          const focused = !revealed && !disabled && onesFirst.length === placeFromRight
          const skip = placeFromRight >= need && !filled
          if (skip) return <span key={`r-${i}`} />
          return (
            <span
              key={`r-${i}`}
              className={`column-answer ${focused ? 'focus' : ''} ${filled ? 'filled' : ''}`}
            >
              {filled}
            </span>
          )
        })}
      </div>
      <NumberPad
        value={onesFirst}
        mode="digits"
        maxLen={need}
        disabled={disabled || revealed}
        onChange={(next) => {
          setOnesFirst(next)
          onDigit?.()
        }}
        onSubmit={() => {
          if (onesFirst.length < need) return
          onSubmit(typedValue())
        }}
      />
    </div>
  )
}
