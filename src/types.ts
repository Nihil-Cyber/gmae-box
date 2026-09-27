export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuizGameId =
  | 'addsub'
  | 'muldiv'
  | 'olympiad'
  | 'readchar'
  | 'vocab'
  | 'shapes'
export type GameId = QuizGameId | 'sudoku' | 'smartSudoku'
export type Screen = 'home' | GameId | 'garden'
export type Tone = 'mint' | 'coral' | 'grape' | 'sky' | 'rose' | 'amber' | 'peach' | 'teal'

export type ShapeKind =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'star'
  | 'heart'
  | 'hexagon'
  | 'pentagon'
  | 'plus'
  | 'oval'
  | 'crescent'
  | 'arrow'
  | 'trap'
  | 'ring'

export type ShapeFigure = {
  kind: ShapeKind
  color: string
  rotation: number
}

export type Question = {
  prompt: string
  expression?: string
  figures?: [ShapeFigure, ShapeFigure]
  answer: number | string
  input: 'number' | 'compare' | 'choice' | 'same'
  choices?: string[]
  speak?: string
}

export type QuizStat = {
  rounds: number
  firstTry: number
  questions: number
}

export type GardenState = {
  ownedPets: string[]
  ownedDecor: string[]
  placedDecor: string[]
  activePet: string | null
  hunger: number
  happiness: number
  lastTick: number
}

export type Stats = {
  stars: number
  muted: boolean
  addsub: QuizStat
  muldiv: QuizStat
  olympiad: QuizStat
  readchar: QuizStat
  vocab: QuizStat
  shapes: QuizStat
  sudoku: { wins: number }
  smartSudoku: SmartSudokuProgress
  garden: GardenState
}

export type SmartSudokuProgress = {
  completed: number
  easy: number
  medium: number
  hard: number
  streak: number
  lastWinDay: string | null
  bestTime: number | null
  hintsUsed: number
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '高級',
}

export function emptyQuiz(): QuizStat {
  return { rounds: 0, firstTry: 0, questions: 0 }
}

export function emptySmartSudoku(): SmartSudokuProgress {
  return {
    completed: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    streak: 0,
    lastWinDay: null,
    bestTime: null,
    hintsUsed: 0,
  }
}

export function emptyGarden(): GardenState {
  return {
    ownedPets: [],
    ownedDecor: [],
    placedDecor: [],
    activePet: null,
    hunger: 80,
    happiness: 80,
    lastTick: Date.now(),
  }
}
