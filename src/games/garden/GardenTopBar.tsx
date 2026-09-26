type Props = {
  stars: number
  onBack: () => void
}

export function GardenTopBar({ stars, onBack }: Props) {
  return (
    <div className="g-top">
      <button type="button" className="g-back toy-btn toy-btn--cream" onClick={onBack} aria-label="返回">
        ←
      </button>
      <h2>我嘅家園</h2>
      <div className="g-stars" aria-label={`已有 ${stars} 粒星星`}>
        ⭐ {stars}
      </div>
    </div>
  )
}
