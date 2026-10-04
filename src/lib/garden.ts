import type { GardenSpot, GardenState } from '../types'
import { emptyGarden } from '../types'

export type ShopItem = {
  id: string
  name: string
  emoji: string
  cost: number
  blurb: string
  layer?: 'sky' | 'ground'
}

export const PETS: ShopItem[] = [
  { id: 'chick', name: '小雞', emoji: '🐥', cost: 6, blurb: '剛出世，好黏人' },
  { id: 'rabbit', name: '兔仔', emoji: '🐰', cost: 12, blurb: '鍾意食蘿蔔' },
  { id: 'cat', name: '小貓', emoji: '🐱', cost: 16, blurb: '會挨過來蹭你' },
  { id: 'dog', name: '小狗', emoji: '🐶', cost: 18, blurb: '聽到你就搖尾' },
  { id: 'panda', name: '熊貓', emoji: '🐼', cost: 28, blurb: '食飽就瞓' },
  { id: 'dragon', name: '小龍', emoji: '🐲', cost: 40, blurb: '家園守護者' },
]

export const DECORS: ShopItem[] = [
  { id: 'sun', name: '太陽', emoji: '☀️', cost: 6, blurb: '掛上天', layer: 'sky' },
  { id: 'moon', name: '月亮', emoji: '🌙', cost: 6, blurb: '夜晚陪伴', layer: 'sky' },
  { id: 'stars', name: '星空', emoji: '✨', cost: 8, blurb: '閃一閃', layer: 'sky' },
  { id: 'rainbow', name: '彩虹', emoji: '🌈', cost: 12, blurb: '雨後七色', layer: 'sky' },
  { id: 'cloud', name: '白雲', emoji: '☁️', cost: 5, blurb: '慢慢飄', layer: 'sky' },
  { id: 'flower', name: '小花', emoji: '🌸', cost: 4, blurb: '香香地', layer: 'ground' },
  { id: 'tree', name: '大樹', emoji: '🌳', cost: 7, blurb: '遮陰乘涼', layer: 'ground' },
  { id: 'mushroom', name: '蘑菇', emoji: '🍄', cost: 5, blurb: '矮矮圓圓', layer: 'ground' },
  { id: 'house', name: '小屋', emoji: '🏠', cost: 14, blurb: '寵物嘅家', layer: 'ground' },
  { id: 'fountain', name: '噴泉', emoji: '⛲', cost: 12, blurb: '水花四濺', layer: 'ground' },
  { id: 'lantern', name: '燈籠', emoji: '🏮', cost: 8, blurb: '暖暖光', layer: 'ground' },
  { id: 'balloon', name: '氣球', emoji: '🎈', cost: 4, blurb: '輕飄飄', layer: 'ground' },
  { id: 'pond', name: '小池', emoji: '💧', cost: 10, blurb: '可以照鏡', layer: 'ground' },
  { id: 'fence', name: '木欄', emoji: '🪵', cost: 6, blurb: '圍住草地', layer: 'ground' },
  { id: 'berry', name: '果樹', emoji: '🍎', cost: 9, blurb: '有得摘', layer: 'ground' },
]

export const DECOR_SPOT: Record<string, { left: string; top: string }> = {
  sun: { left: '8%', top: '8%' },
  moon: { left: '78%', top: '10%' },
  stars: { left: '62%', top: '6%' },
  rainbow: { left: '28%', top: '12%' },
  cloud: { left: '48%', top: '4%' },
  flower: { left: '22%', top: '72%' },
  tree: { left: '6%', top: '52%' },
  mushroom: { left: '72%', top: '70%' },
  house: { left: '68%', top: '48%' },
  fountain: { left: '40%', top: '62%' },
  lantern: { left: '84%', top: '56%' },
  balloon: { left: '16%', top: '42%' },
  pond: { left: '52%', top: '74%' },
  fence: { left: '30%', top: '80%' },
  berry: { left: '86%', top: '64%' },
}

export function petById(id: string): ShopItem | undefined {
  return PETS.find((p) => p.id === id)
}

export function decorById(id: string): ShopItem | undefined {
  return DECORS.find((d) => d.id === id)
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

export const MAX_PET_SLOTS = 6
export const MAX_YARD_LEVEL = 3
export const SLOT_COSTS = [12, 20, 32, 40, 52] as const
export const YARD_COSTS = [10, 18, 28] as const

const PET_XS: Record<number, number[]> = {
  1: [50],
  2: [32, 68],
  3: [24, 50, 76],
  4: [18, 39, 61, 82],
  5: [14, 32, 50, 68, 86],
  6: [12, 28, 44, 60, 76, 88],
}

export function isSpot(value: unknown): value is GardenSpot {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof (value as GardenSpot).x === 'number' &&
      Number.isFinite((value as GardenSpot).x) &&
      typeof (value as GardenSpot).y === 'number' &&
      Number.isFinite((value as GardenSpot).y),
  )
}

export function defaultDecorSpot(id: string): GardenSpot {
  const spot = DECOR_SPOT[id]
  if (!spot) return { x: 50, y: 70 }
  return { x: Number.parseFloat(spot.left), y: Number.parseFloat(spot.top) }
}

export function defaultPetSpot(index: number, total: number): GardenSpot {
  const n = Math.min(6, Math.max(1, total))
  const xs = PET_XS[n] ?? PET_XS[1]
  const x = xs[Math.min(Math.max(0, index), xs.length - 1)] ?? 50
  return { x, y: 74 + (index % 2) * 6 }
}

export function clampSpot(spot: GardenSpot, kind: 'pet' | 'sky' | 'ground', yardLevel = 0): GardenSpot {
  const extra = clamp(yardLevel, 0, MAX_YARD_LEVEL) * 1.4
  if (kind === 'sky') return { x: clamp(spot.x, 8, 92), y: clamp(spot.y, 6, 34 + extra) }
  if (kind === 'pet') return { x: clamp(spot.x, 10, 90), y: clamp(spot.y, 52 - extra, 86) }
  return { x: clamp(spot.x, 8, 92), y: clamp(spot.y, 42 - extra, 88) }
}

function cleanSpots(
  raw: Record<string, GardenSpot> | undefined,
  ids: string[],
  kindFor: (id: string) => 'pet' | 'sky' | 'ground',
  fallback: (id: string, index: number) => GardenSpot,
  yardLevel: number,
): Record<string, GardenSpot> {
  const next: Record<string, GardenSpot> = {}
  for (const [id, spot] of Object.entries(raw ?? {})) {
    if (isSpot(spot)) next[id] = clampSpot(spot, kindFor(id), yardLevel)
  }
  ids.forEach((id, index) => {
    if (!isSpot(next[id])) next[id] = clampSpot(fallback(id, index), kindFor(id), yardLevel)
  })
  return next
}

export function nextSlotCost(slots: number): number | null {
  if (slots >= MAX_PET_SLOTS) return null
  return SLOT_COSTS[slots - 1] ?? null
}

export function nextYardCost(level: number): number | null {
  if (level >= MAX_YARD_LEVEL) return null
  return YARD_COSTS[level] ?? null
}

export function normalizeGarden(garden: Partial<GardenState> | GardenState): GardenState {
  const base = { ...emptyGarden(), ...garden }
  const owned = base.ownedPets.filter(Boolean)
  const fromList = Array.isArray(base.placedPets) ? base.placedPets.filter((id) => owned.includes(id)) : []
  const fallback = base.activePet && owned.includes(base.activePet) ? [base.activePet] : []
  const petSlots = clamp(base.petSlots ?? 2, 2, MAX_PET_SLOTS)
  const placedPets = (fromList.length ? fromList : fallback).slice(0, petSlots)
  const yardLevel = clamp(base.yardLevel ?? 0, 0, MAX_YARD_LEVEL)
  const placedDecor = base.placedDecor.filter((id) => base.ownedDecor.includes(id) && Boolean(decorById(id)))
  return {
    ...base,
    ownedPets: owned,
    placedPets,
    placedDecor,
    petSlots,
    yardLevel,
    petSpots: cleanSpots(
      base.petSpots,
      placedPets,
      () => 'pet',
      (_id, index) => defaultPetSpot(index, placedPets.length),
      yardLevel,
    ),
    decorSpots: cleanSpots(
      base.decorSpots,
      placedDecor,
      (id) => (decorById(id)?.layer === 'sky' ? 'sky' : 'ground'),
      (id) => defaultDecorSpot(id),
      yardLevel,
    ),
    activePet: placedPets.includes(base.activePet ?? '') ? base.activePet : (placedPets[0] ?? null),
  }
}

export function tickGarden(garden: GardenState, now = Date.now()): GardenState {
  const base = normalizeGarden(garden)
  if (base.placedPets.length === 0) return { ...base, lastTick: now }
  const hours = Math.min(36, Math.max(0, (now - base.lastTick) / 3_600_000))
  if (hours < 0.02) return base
  return {
    ...base,
    hunger: clamp(base.hunger - hours * 7, 0, 100),
    happiness: clamp(base.happiness - hours * 5, 0, 100),
    lastTick: now,
  }
}

export function petMood(garden: GardenState): string {
  if (garden.placedPets.length === 0) return '去商店領養一隻寵物啦！'
  if (garden.hunger < 25) return '肚餓喇，想食零食。'
  if (garden.happiness < 30) return '有啲悶，摸一摸佢啦。'
  if (garden.happiness > 75 && garden.hunger > 60) return '好開心，想同你玩！'
  return '乖乖哋等緊你。'
}
