import { useMemo } from 'react'

type Props = {
  show: boolean
}

export function Confetti({ show }: Props) {
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        delay: `${(i % 8) * 0.08}s`,
        duration: `${1.6 + (i % 5) * 0.18}s`,
        color: ['#E24C3B', '#E7A41A', '#1F8F6D', '#2B78B5', '#5A4A8A'][i % 5],
      })),
    [],
  )

  if (!show) return null

  return (
    <div className="confetti" aria-hidden>
      {bits.map((bit) => (
        <i
          key={bit.id}
          style={{
            left: bit.left,
            background: bit.color,
            animationDelay: bit.delay,
            animationDuration: bit.duration,
          }}
        />
      ))}
    </div>
  )
}
