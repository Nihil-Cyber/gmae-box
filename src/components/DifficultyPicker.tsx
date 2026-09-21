import type { Difficulty } from '../types'
import { DIFFICULTY_LABEL } from '../types'

type Props = {
  value: Difficulty
  onChange: (value: Difficulty) => void
  hints: Record<Difficulty, string>
}

export function DifficultyPicker({ value, onChange, hints }: Props) {
  return (
    <div className="diff-grid">
      {(['easy', 'medium', 'hard'] as const).map((level) => (
        <button
          key={level}
          type="button"
          className={`diff-btn ${value === level ? 'active' : ''}`}
          onClick={() => onChange(level)}
        >
          <strong>{DIFFICULTY_LABEL[level]}</strong>
          <span>{hints[level]}</span>
        </button>
      ))}
    </div>
  )
}
