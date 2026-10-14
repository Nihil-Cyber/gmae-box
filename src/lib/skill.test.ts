import { describe, expect, it } from 'vitest'
import { canEase, clampSkill, nextSkill, shouldPromote, stepSkill } from './skill'

describe('skill ladder', () => {
  it('promotes after 8 first-try corrects in a round of 10', () => {
    expect(shouldPromote(8)).toBe(true)
    expect(shouldPromote(7)).toBe(false)
    expect(shouldPromote(10)).toBe(true)
  })

  it('lets add/sub and mul/div reach 直式, others stop at 高級', () => {
    expect(nextSkill('addsub', 'hard')).toBe('expert')
    expect(nextSkill('muldiv', 'hard')).toBe('expert')
    expect(nextSkill('readchar', 'hard')).toBeNull()
    expect(clampSkill('shapes', 'expert')).toBe('hard')
  })

  it('steps down so a parent can ease a round that is too hard', () => {
    expect(stepSkill('addsub', 'expert', -1)).toBe('hard')
    expect(canEase('addsub', 'easy')).toBe(false)
    expect(canEase('vocab', 'medium')).toBe(true)
  })
})
