import { describe, expect, it } from 'vitest'
import { emptyGarden } from '../types'
import { MAX_PET_SLOTS, nextSlotCost, nextYardCost, normalizeGarden } from './garden'

describe('garden upgrades', () => {
  it('moves a legacy activePet into placedPets', () => {
    const next = normalizeGarden({
      ...emptyGarden(),
      ownedPets: ['chick', 'rabbit'],
      activePet: 'rabbit',
    })
    expect(next.placedPets).toEqual(['rabbit'])
    expect(next.petSlots).toBe(2)
    expect(next.yardLevel).toBe(0)
  })

  it('caps placed pets by purchased slots', () => {
    const next = normalizeGarden({
      ...emptyGarden(),
      ownedPets: ['chick', 'rabbit', 'cat'],
      placedPets: ['chick', 'rabbit', 'cat'],
      petSlots: 2,
      activePet: 'cat',
    })
    expect(next.placedPets).toEqual(['chick', 'rabbit'])
    expect(next.activePet).toBe('chick')
  })

  it('defaults missing slot data to two pets at once', () => {
    const next = normalizeGarden({
      ownedPets: ['chick', 'cat'],
      ownedDecor: [],
      placedDecor: [],
      activePet: 'chick',
      hunger: 80,
      happiness: 80,
      lastTick: Date.now(),
    })
    expect(next.petSlots).toBe(2)
    expect(next.placedPets).toEqual(['chick'])
  })

  it('prices the next slot and yard upgrade', () => {
    expect(nextSlotCost(1)).toBe(12)
    expect(nextSlotCost(MAX_PET_SLOTS)).toBeNull()
    expect(nextYardCost(0)).toBe(10)
    expect(nextYardCost(3)).toBeNull()
  })
})
