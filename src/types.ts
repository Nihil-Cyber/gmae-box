export type BasicDifficulty = 'easy' | 'medium' | 'hard'
export type Difficulty = BasicDifficulty | 'expert'
export type QuizGameId =
  | 'addsub'
  | 'muldiv'
  | 'olympiad'
  | 'readchar'
  | 'vocab'
  | 'shapes'
export type GameId = QuizGameId | 'sudoku' | 'smartSudoku'
export type Screen = 'home' | GameId | 'garden' | 'skill'
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

export type ColumnOp = '+' | '×'

export type ColumnProblem = {
  a: number
  b: number
  op: ColumnOp
}

export type Question = {
  prompt: string
  expression?: string
  picture?: string
  figures?: [ShapeFigure, ShapeFigure]
  column?: ColumnProblem
  answer: number | string
  input: 'number' | 'compare' | 'choice' | 'same'
  choices?: string[]
  speak?: string
}

export type QuizStat = {
  rounds: number
  firstTry: number
  questions: number
  skill: Difficulty
}

export type GardenSpot = {
  x: number
  y: number
}

export type GardenState = {
  ownedPets: string[]
  ownedDecor: string[]
  placedDecor: string[]
  placedPets: string[]
  petSpots: Record<string, GardenSpot>
  decorSpots: Record<string, GardenSpot>
  activePet: string | null
  petSlots: number
  yardLevel: number
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
  expert: '直式',
}

export const SKILL_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

export function emptyQuiz(): QuizStat {
  return { rounds: 0, firstTry: 0, questions: 0, skill: 'easy' }
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
    placedPets: [],
    petSpots: {},
    decorSpots: {},
    activePet: null,
    petSlots: 2,
    yardLevel: 0,
    hunger: 80,
    happiness: 80,
    lastTick: Date.now(),
  }
}
