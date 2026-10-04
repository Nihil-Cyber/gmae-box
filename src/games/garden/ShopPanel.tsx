import {
  DECORS,
  MAX_PET_SLOTS,
  MAX_YARD_LEVEL,
  PETS,
  nextSlotCost,
  nextYardCost,
  type ShopItem,
} from '../../lib/garden'
import { ShopCard } from './ShopCard'

export type ShopKind = 'pets' | 'decor' | 'upgrade'

type Props = {
  shopKind: ShopKind
  stars: number
  ownedPets: string[]
  ownedDecor: string[]
  placedDecor: string[]
  placedPets: string[]
  petSlots: number
  yardLevel: number
  flashId: string | null
  shakeId: string | null
  onKind: (kind: ShopKind) => void
  onBuy: (item: ShopItem, kind: ShopKind) => void
  onUse: (item: ShopItem) => void
}

export function ShopPanel({
  shopKind,
  stars,
  ownedPets,
  ownedDecor,
  placedDecor,
  placedPets,
  petSlots,
  yardLevel,
  flashId,
  shakeId,
  onKind,
  onBuy,
  onUse,
}: Props) {
  const slotCost = nextSlotCost(petSlots) ?? 52
  const yardCost = nextYardCost(yardLevel) ?? 28
  const upgrades: ShopItem[] = [
    {
      id: 'upgrade-slots',
      name: '多一隻位',
      emoji: '🐾',
      cost: slotCost,
      blurb:
        petSlots >= MAX_PET_SLOTS
          ? `而家最多同時 ${MAX_PET_SLOTS} 隻`
          : `而家 ${petSlots} 隻 → 買完可以 ${petSlots + 1} 隻一齊玩`,
    },
    {
      id: 'upgrade-yard',
      name: '家園擴建',
      emoji: '🌿',
      cost: yardCost,
      blurb:
        yardLevel >= MAX_YARD_LEVEL
          ? '草地已經係最大喇'
          : `草地同天空闊一格（${yardLevel} → ${yardLevel + 1}）`,
    },
  ]
  const items = shopKind === 'pets' ? PETS : shopKind === 'decor' ? DECORS : upgrades

  return (
    <div>
      <div className="g-awning" aria-hidden />
      <div className="g-shop">
        <div className="g-subtabs is-three">
          <button type="button" className={shopKind === 'pets' ? 'is-on' : ''} onClick={() => onKind('pets')}>
            寵物
          </button>
          <button type="button" className={shopKind === 'decor' ? 'is-on' : ''} onClick={() => onKind('decor')}>
            裝飾
          </button>
          <button type="button" className={shopKind === 'upgrade' ? 'is-on' : ''} onClick={() => onKind('upgrade')}>
            升級
          </button>
        </div>
        <div className="g-shop-grid">
          {items.map((item) => {
            const owned =
              shopKind === 'pets'
                ? ownedPets.includes(item.id)
                : shopKind === 'decor'
                  ? ownedDecor.includes(item.id)
                  : false
            const maxed =
              shopKind === 'upgrade' &&
              ((item.id === 'upgrade-slots' && petSlots >= MAX_PET_SLOTS) ||
                (item.id === 'upgrade-yard' && yardLevel >= MAX_YARD_LEVEL))
            return (
              <ShopCard
                key={item.id}
                item={item}
                kind={shopKind}
                owned={owned}
                active={false}
                placed={placedPets.includes(item.id) || placedDecor.includes(item.id)}
                maxed={maxed}
                stars={stars}
                flashing={flashId === item.id}
                shaking={shakeId === item.id}
                onBuy={() => onBuy(item, shopKind)}
                onUse={() => onUse(item)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
