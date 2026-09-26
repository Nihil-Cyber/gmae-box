import { DECORS, PETS, type ShopItem } from '../../lib/garden'
import { ShopCard } from './ShopCard'

type Props = {
  shopKind: 'pets' | 'decor'
  stars: number
  ownedPets: string[]
  ownedDecor: string[]
  placedDecor: string[]
  activePet: string | null
  flashId: string | null
  shakeId: string | null
  onKind: (kind: 'pets' | 'decor') => void
  onBuy: (item: ShopItem) => void
  onUse: (item: ShopItem) => void
}

export function ShopPanel({
  shopKind,
  stars,
  ownedPets,
  ownedDecor,
  placedDecor,
  activePet,
  flashId,
  shakeId,
  onKind,
  onBuy,
  onUse,
}: Props) {
  const items = shopKind === 'pets' ? PETS : DECORS
  return (
    <div>
      <div className="g-awning" aria-hidden />
      <div className="g-shop">
        <div className="g-subtabs">
          <button type="button" className={shopKind === 'pets' ? 'is-on' : ''} onClick={() => onKind('pets')}>
            寵物
          </button>
          <button type="button" className={shopKind === 'decor' ? 'is-on' : ''} onClick={() => onKind('decor')}>
            裝飾
          </button>
        </div>
        <div className="g-shop-grid">
          {items.map((item) => {
            const owned = shopKind === 'pets' ? ownedPets.includes(item.id) : ownedDecor.includes(item.id)
            return (
              <ShopCard
                key={item.id}
                item={item}
                kind={shopKind}
                owned={owned}
                active={activePet === item.id}
                placed={placedDecor.includes(item.id)}
                stars={stars}
                flashing={flashId === item.id}
                shaking={shakeId === item.id}
                onBuy={() => onBuy(item)}
                onUse={() => onUse(item)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
