import type { QuizStat, Stats } from '../types'

const KEY = 'gmae-box-progress-v1'
const LEGACY_KEY = 'wesley-math-progress-v1'

const emptyQuiz = (): QuizStat => ({
  rounds: 0,
  firstTry: 0,
  questions: 0,
})

export const emptyStats = (): Stats => ({
  stars: 0,
  muted: false,
  addsub: emptyQuiz(),
  muldiv: emptyQuiz(),
  olympiad: emptyQuiz(),
  sudoku: { wins: 0 },
})

export function loadStats(): Stats {
  try {
    const fromNew = localStorage.getItem(KEY)
    const raw = fromNew ?? localStorage.getItem(LEGACY_KEY)
    if (!raw) return emptyStats()
    const parsed = JSON.parse(raw) as Partial<Stats>
    const base = emptyStats()
    const next: Stats = {
      ...base,
      ...parsed,
      addsub: { ...base.addsub, ...parsed.addsub },
      muldiv: { ...base.muldiv, ...parsed.muldiv },
      olympiad: { ...base.olympiad, ...parsed.olympiad },
      sudoku: { ...base.sudoku, ...parsed.sudoku },
    }
    if (!fromNew) localStorage.setItem(KEY, JSON.stringify(next))
    return next
  } catch {
    return emptyStats()
  }
}

export function saveStats(stats: Stats): void {
  localStorage.setItem(KEY, JSON.stringify(stats))
}
