type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  maxLen?: number
}

export function NumberPad({
  value,
  onChange,
  onSubmit,
  disabled = false,
  maxLen = 4,
}: Props) {
  function append(digit: string) {
    if (disabled) return
    if (value === '0') onChange(digit)
    else if (value.length < maxLen) onChange(value + digit)
  }

  function backspace() {
    if (disabled) return
    onChange(value.slice(0, -1))
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✓']

  return (
    <div className="pad">
      {keys.map((key) => {
        const isOk = key === '✓'
        const isDel = key === '⌫'
        return (
          <button
            key={key}
            type="button"
            className={`key ${isOk ? 'ok' : ''} ${isDel ? 'warn' : ''}`}
            disabled={disabled}
            onClick={() => {
              if (isOk) onSubmit()
              else if (isDel) backspace()
              else append(key)
            }}
          >
            {isDel ? '刪除' : isOk ? '確定' : key}
          </button>
        )
      })}
    </div>
  )
}
