type Props = {
  tab: 'scene' | 'shop'
  onTab: (tab: 'scene' | 'shop') => void
}

export function GardenTabs({ tab, onTab }: Props) {
  return (
    <div className="g-tabs">
      <button type="button" className={tab === 'scene' ? 'is-on' : ''} onClick={() => onTab('scene')}>
        家園
      </button>
      <button type="button" className={tab === 'shop' ? 'is-on' : ''} onClick={() => onTab('shop')}>
        商店
      </button>
    </div>
  )
}
