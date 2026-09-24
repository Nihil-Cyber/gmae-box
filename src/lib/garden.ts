import type { GardenState } from '../types'
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

export function tickGarden(garden: GardenState, now = Date.now()): GardenState {
  const base = { ...emptyGarden(), ...garden }
  if (!base.activePet) return { ...base, lastTick: now }
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
  if (!garden.activePet) return '去商店領養一隻寵物啦！'
  if (garden.hunger < 25) return '肚餓喇，想食零食。'
  if (garden.happiness < 30) return '有啲悶，摸一摸佢啦。'
  if (garden.happiness > 75 && garden.hunger > 60) return '好開心，想同你玩！'
  return '乖乖哋等緊你。'
}
