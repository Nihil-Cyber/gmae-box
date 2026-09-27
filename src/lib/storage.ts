import type { QuizStat, Stats } from '../types'
import { emptyGarden, emptyQuiz, emptySmartSudoku } from '../types'
import { tickGarden } from './garden'

const KEY = 'gmae-box-progress-v1'
const LEGACY_KEY = 'wesley-math-progress-v1'

export const emptyStats = (): Stats => ({
  stars: 0,
  muted: false,
  addsub: emptyQuiz(),
  muldiv: emptyQuiz(),
  olympiad: emptyQuiz(),
  readchar: emptyQuiz(),
  vocab: emptyQuiz(),
  shapes: emptyQuiz(),
  sudoku: { wins: 0 },
  smartSudoku: emptySmartSudoku(),
  garden: emptyGarden(),
})

function mergeQuiz(base: QuizStat, extra?: Partial<QuizStat>): QuizStat {
  return { ...base, ...extra }
}

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
      addsub: mergeQuiz(base.addsub, parsed.addsub),
      muldiv: mergeQuiz(base.muldiv, parsed.muldiv),
      olympiad: mergeQuiz(base.olympiad, parsed.olympiad),
      readchar: mergeQuiz(base.readchar, parsed.readchar),
      vocab: mergeQuiz(base.vocab, parsed.vocab),
      shapes: mergeQuiz(base.shapes, parsed.shapes),
      sudoku: { ...base.sudoku, ...parsed.sudoku },
      smartSudoku: { ...base.smartSudoku, ...parsed.smartSudoku },
      garden: tickGarden({ ...base.garden, ...parsed.garden }),
    }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  } catch {
    return emptyStats()
  }
}

export function saveStats(stats: Stats): void {
  localStorage.setItem(KEY, JSON.stringify(stats))
}
