type Props = {
  feeding: boolean
  shaking: boolean
  onPat: () => void
  onFeed: () => void
}

export function CareButtons({ feeding, shaking, onPat, onFeed }: Props) {
  return (
    <div className="g-care">
      <button type="button" className="toy-btn toy-btn--cream" onClick={onPat}>
        摸一摸
      </button>
      <button
        type="button"
        className={`toy-btn toy-btn--honey ${shaking ? 'soft-shake' : ''}`}
        onClick={onFeed}
      >
        餵零食
        <span className="g-star-chip">⭐1</span>
      </button>
      {feeding && (
        <span className="g-snack snack-x" aria-hidden>
          <span className="snack-y">🍪</span>
        </span>
      )}
    </div>
  )
}
