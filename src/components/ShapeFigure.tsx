import type { ShapeFigure as Figure, ShapeKind } from '../types'

function geometry(kind: ShapeKind) {
  switch (kind) {
    case 'circle':
      return <circle cx="50" cy="50" r="32" />
    case 'ring':
      return (
        <g fillRule="evenodd">
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="16" />
        </g>
      )
    case 'square':
      return <rect x="20" y="20" width="60" height="60" rx="4" />
    case 'triangle':
      return <polygon points="50,16 86,84 14,84" />
    case 'diamond':
      return <polygon points="50,12 88,50 50,88 12,50" />
    case 'star':
      return (
        <polygon points="50,12 61,38 90,38 67,56 76,84 50,68 24,84 33,56 10,38 39,38" />
      )
    case 'heart':
      return (
        <path d="M50 86 C22 64 14 46 14 34 C14 22 24 14 34 14 C42 14 48 18 50 26 C52 18 58 14 66 14 C76 14 86 22 86 34 C86 46 78 64 50 86Z" />
      )
    case 'hexagon':
      return <polygon points="50,14 82,32 82,68 50,86 18,68 18,32" />
    case 'pentagon':
      return <polygon points="50,14 86,42 72,84 28,84 14,42" />
    case 'plus':
      return <polygon points="38,18 62,18 62,38 82,38 82,62 62,62 62,82 38,82 38,62 18,62 18,38 38,38" />
    case 'oval':
      return <ellipse cx="50" cy="50" rx="22" ry="34" />
    case 'crescent':
      return (
        <g fillRule="evenodd">
          <circle cx="46" cy="50" r="30" />
          <circle cx="62" cy="42" r="24" />
        </g>
      )
    case 'arrow':
      return <polygon points="50,12 82,46 64,46 64,88 36,88 36,46 18,46" />
    case 'trap':
      return <polygon points="28,22 72,22 88,82 12,82" />
  }
}

export function ShapeFigure({ figure }: { figure: Figure }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g transform={`rotate(${figure.rotation} 50 50)`} fill={figure.color}>
        {geometry(figure.kind)}
      </g>
    </svg>
  )
}
