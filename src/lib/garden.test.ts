import { describe, expect, it } from 'vitest'
import { emptyGarden } from '../types'
import {
  DECORS,
  MAX_PET_SLOTS,
  PETS,
  clampSpot,
  defaultPetSpot,
  nextSlotCost,
  nextYardCost,
  normalizeGarden,
} from './garden'

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
    expect(next.petSpots.rabbit).toEqual(defaultPetSpot(0, 1))
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

  it('keeps a moved pet spot', () => {
    const next = normalizeGarden({
      ...emptyGarden(),
      ownedPets: ['chick'],
      placedPets: ['chick'],
      petSpots: { chick: { x: 22, y: 80 } },
    })
    expect(next.petSpots.chick).toEqual({ x: 22, y: 80 })
  })

  it('fills default decor spots and keeps custom ones', () => {
    const next = normalizeGarden({
      ...emptyGarden(),
      ownedDecor: ['sun', 'flower'],
      placedDecor: ['sun', 'flower'],
      decorSpots: { flower: { x: 40, y: 70 } },
    })
    expect(next.decorSpots.sun.y).toBeLessThan(40)
    expect(next.decorSpots.flower).toEqual({ x: 40, y: 70 })
  })

  it('raises a one-slot save to two pets at once', () => {
    const next = normalizeGarden({
      ...emptyGarden(),
      ownedPets: ['chick', 'rabbit'],
      placedPets: ['chick', 'rabbit'],
      petSlots: 1,
    })
    expect(next.petSlots).toBe(2)
    expect(next.placedPets).toEqual(['chick', 'rabbit'])
  })

  it('prices the next slot and yard upgrade past four pets', () => {
    expect(nextSlotCost(1)).toBe(12)
    expect(nextSlotCost(4)).toBe(40)
    expect(nextSlotCost(5)).toBe(52)
    expect(nextSlotCost(6)).toBe(64)
    expect(nextSlotCost(MAX_PET_SLOTS - 1)).toEqual(expect.any(Number))
    expect(nextSlotCost(MAX_PET_SLOTS)).toBeNull()
    expect(nextYardCost(0)).toBe(10)
    expect(nextYardCost(3)).toBeNull()
  })

  it('lets slot upgrades grow with every pet kind', () => {
    expect(MAX_PET_SLOTS).toBe(PETS.length)
    expect(defaultPetSpot(11, 12).x).toBeGreaterThanOrEqual(10)
    expect(defaultPetSpot(11, 12).x).toBeLessThanOrEqual(90)
  })

  it('lists the sticker pets and decorations in the shop', () => {
    expect(PETS.map((item) => item.id)).toEqual([
      'chick', 'rabbit', 'cat', 'dog', 'panda', 'dragon',
      'penguin', 'frog', 'hamster', 'pig', 'turtle', 'owl',
    ])
    expect(DECORS.map((item) => item.id)).toEqual([
      'sun', 'moon', 'stars', 'rainbow', 'cloud',
      'flower', 'tree', 'mushroom', 'house', 'fountain',
      'lantern', 'balloon', 'pond', 'fence', 'berry',
      'kite', 'swing', 'bench', 'bush', 'snowman', 'pinwheel',
    ])
  })

  it('keeps pets on the grass', () => {
    expect(clampSpot({ x: -8, y: 9 }, 'pet').x).toBe(10)
    expect(clampSpot({ x: 50, y: 90 }, 'sky').y).toBe(34)
  })
})
