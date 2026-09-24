export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuizGameId = 'addsub' | 'muldiv' | 'olympiad' | 'readchar' | 'vocab'
export type GameId = QuizGameId | 'sudoku'
export type Screen = 'home' | GameId | 'garden'
export type Tone = 'mint' | 'coral' | 'grape' | 'sky' | 'rose' | 'amber' | 'peach'

export type Question = {
  prompt: string
  expression?: string
  answer: number | string
  input: 'number' | 'compare' | 'choice'
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
  sudoku: { wins: number }
  garden: GardenState
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '高級',
}

export function emptyQuiz(): QuizStat {
  return { rounds: 0, firstTry: 0, questions: 0 }
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
