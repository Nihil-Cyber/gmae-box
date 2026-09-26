import type { ShopItem } from '../../lib/garden'
import { DecoSprite, DECO_META } from './DecoSprite'
import { PetSprite, PET_BLURBS, PET_CARD_BG, PET_NAMES } from './PetSprite'
import { decoKind, isPetKind } from './ids'

type Props = {
  item: ShopItem
  kind: 'pets' | 'decor'
  owned: boolean
  active: boolean
  placed: boolean
  stars: number
  flashing: boolean
  shaking: boolean
  onBuy: () => void
  onUse: () => void
}

export function ShopCard({
  item,
  kind,
  owned,
  active,
  placed,
  stars,
  flashing,
  shaking,
  onBuy,
  onUse,
}: Props) {
  const short = !owned && stars < item.cost
  const deco = kind === 'decor' ? decoKind(item.id) : null
  const zone = deco ? DECO_META[deco].zone : null
  const blurb =
    kind === 'pets' && isPetKind(item.id) ? PET_BLURBS[item.id] : deco ? DECO_META[deco].blurb : item.blurb
  const name = kind === 'pets' && isPetKind(item.id) ? PET_NAMES[item.id] : deco ? DECO_META[deco].name : item.name

  let action = (
    <button type="button" className="toy-btn toy-btn--honey" onClick={onBuy}>
      ⭐ {item.cost} 購買
    </button>
  )
  if (short) {
    action = (
      <button type="button" className={`toy-btn toy-btn--short ${shaking ? 'soft-shake' : ''}`} onClick={onBuy}>
        ⭐ {item.cost}・仲差 {item.cost - stars} 粒
      </button>
    )
  } else if (owned && kind === 'pets') {
    action = (
      <button type="button" className="toy-btn toy-btn--mint" disabled={active} onClick={onUse}>
        {active ? '而家喺度' : '帶出嚟'}
      </button>
    )
  } else if (owned && kind === 'decor') {
    action = (
      <button type="button" className={`toy-btn ${placed ? 'toy-btn--cream' : 'toy-btn--mint'}`} onClick={onUse}>
        {placed ? '收起' : '擺出'}
      </button>
    )
  }

  return (
    <article className={`g-card ${active ? 'is-active' : ''} ${flashing ? 'card-flash' : ''}`}>
      <div
        className={`g-card-art ${zone === 'sky' ? 'is-sky' : zone === 'ground' ? 'is-ground' : ''}`}
        style={kind === 'pets' && isPetKind(item.id) ? { background: PET_CARD_BG[item.id] } : undefined}
      >
        {zone && <span className="g-tag">{zone === 'sky' ? '天空' : '地面'}</span>}
        {kind === 'pets' && isPetKind(item.id) && <PetSprite kind={item.id} size={88} />}
        {deco && <DecoSprite kind={deco} size={78} />}
        {owned && kind === 'pets' && active && <span className="g-owned-tick">✓</span>}
        {owned && kind === 'decor' && placed && <span className="g-placed-mark" title="擺咗出嚟">✓</span>}
      </div>
      <strong>{name}</strong>
      <p>{blurb}</p>
      {action}
    </article>
  )
}
