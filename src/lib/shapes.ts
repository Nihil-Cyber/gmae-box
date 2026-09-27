import type { Difficulty, Question, ShapeFigure, ShapeKind } from '../types'
import { pick, shuffle } from './random'

const COLORS = ['#e24c3b', '#e7a41a', '#2b78b5', '#1f8f6d', '#5a4a8a', '#d4527a']

const EASY: ShapeKind[] = ['circle', 'square', 'triangle', 'star', 'heart']
const MEDIUM: ShapeKind[] = [...EASY, 'diamond', 'hexagon', 'plus', 'oval']
const HARD: ShapeKind[] = [...MEDIUM, 'pentagon', 'crescent', 'arrow', 'trap', 'ring']

const ROTATABLE = new Set<ShapeKind>([
  'triangle',
  'star',
  'heart',
  'plus',
  'hexagon',
  'pentagon',
  'arrow',
  'trap',
])

const NEAR: [ShapeKind, ShapeKind][] = [
  ['square', 'diamond'],
  ['circle', 'oval'],
  ['circle', 'ring'],
  ['star', 'pentagon'],
  ['triangle', 'arrow'],
  ['hexagon', 'pentagon'],
  ['square', 'plus'],
  ['oval', 'ring'],
  ['diamond', 'hexagon'],
  ['heart', 'crescent'],
]

function pool(difficulty: Difficulty): ShapeKind[] {
  if (difficulty === 'easy') return EASY
  if (difficulty === 'medium') return MEDIUM
  return HARD
}

function figure(kind: ShapeKind, color: string, rotation = 0): ShapeFigure {
  return { kind, color, rotation }
}

function twist(kind: ShapeKind, difficulty: Difficulty): number {
  if (difficulty === 'easy' || !ROTATABLE.has(kind)) return 0
  const turns = difficulty === 'hard' ? [0, 90, 180, 270] : [0, 180]
  return pick(turns)
}

function otherKind(from: ShapeKind, kinds: ShapeKind[]): ShapeKind {
  const rest = kinds.filter((k) => k !== from)
  return pick(rest.length ? rest : kinds)
}

export function makeShapes(difficulty: Difficulty): Question {
  const kinds = pool(difficulty)
  const color = pick(COLORS)
  const same = Math.random() < 0.5

  let left: ShapeFigure
  let right: ShapeFigure

  if (same) {
    const kind = pick(kinds)
    left = figure(kind, color, 0)
    right = figure(kind, color, twist(kind, difficulty))
  } else if (difficulty === 'hard' && Math.random() < 0.7) {
    const pair = pick(NEAR)
    const order = shuffle(pair)
    left = figure(order[0]!, color, twist(order[0]!, difficulty))
    right = figure(order[1]!, color, twist(order[1]!, difficulty))
  } else {
    const a = pick(kinds)
    const b = otherKind(a, kinds)
    left = figure(a, color, 0)
    right = figure(b, color, twist(b, difficulty))
  }

  return {
    prompt: '兩個圖形係咪一樣？',
    figures: [left, right],
    input: 'same',
    answer: same ? '一樣' : '唔同',
    speak: '兩個圖形係咪一樣',
  }
}
