export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameId = 'addsub' | 'muldiv' | 'olympiad' | 'sudoku'
export type Screen = 'home' | GameId

export type Question = {
  prompt: string
  expression?: string
  answer: number | string
  input: 'number' | 'compare' | 'choice'
  choices?: string[]
}

export type QuizStat = {
  rounds: number
  firstTry: number
  questions: number
}

export type Stats = {
  stars: number
  muted: boolean
  addsub: QuizStat
  muldiv: QuizStat
  olympiad: QuizStat
  sudoku: { wins: number }
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '高級',
}
