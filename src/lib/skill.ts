import type { Difficulty, QuizGameId } from '../types'
import { SKILL_ORDER } from '../types'

export const PROMOTE_FIRST_TRY = 8
export const ROUND_SIZE = 10

export const QUIZ_TITLES: Record<QuizGameId, string> = {
  addsub: '加加減減',
  muldiv: '乘乘除除',
  olympiad: '奧數挑戰',
  readchar: '認一認字',
  vocab: '單字配對',
  shapes: '圖形一樣',
}

export function maxSkill(game: QuizGameId): Difficulty {
  return game === 'addsub' || game === 'muldiv' ? 'expert' : 'hard'
}

export function contentLevel(difficulty: Difficulty): 'easy' | 'medium' | 'hard' {
  return difficulty === 'expert' ? 'hard' : difficulty
}

function indexOf(skill: Difficulty): number {
  const i = SKILL_ORDER.indexOf(skill)
  return i < 0 ? 0 : i
}

export function isSkill(value: unknown): value is Difficulty {
  return typeof value === 'string' && SKILL_ORDER.includes(value as Difficulty)
}

export function clampSkill(game: QuizGameId, skill: Difficulty): Difficulty {
  const max = indexOf(maxSkill(game))
  const i = Math.max(0, Math.min(max, indexOf(skill)))
  return SKILL_ORDER[i]!
}

export function stepSkill(game: QuizGameId, skill: Difficulty, delta: number): Difficulty {
  return clampSkill(game, SKILL_ORDER[indexOf(skill) + delta] ?? skill)
}

export function canEase(game: QuizGameId, skill: Difficulty): boolean {
  return stepSkill(game, skill, -1) !== skill
}

export function nextSkill(game: QuizGameId, skill: Difficulty): Difficulty | null {
  const next = stepSkill(game, skill, 1)
  return next === skill ? null : next
}

export function shouldPromote(firstTry: number, total = ROUND_SIZE): boolean {
  return firstTry >= PROMOTE_FIRST_TRY && firstTry <= total
}
