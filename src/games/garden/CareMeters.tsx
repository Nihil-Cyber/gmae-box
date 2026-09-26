type Props = {
  hunger: number
  happiness: number
}

export function CareMeters({ hunger, happiness }: Props) {
  return (
    <div className="g-meters">
      <div className="g-meter">
        <span>飽肚</span>
        <div className="g-meter-track">
          <b
            className="g-meter-fill meter-fill"
            style={{ width: `${hunger}%` }}
            role="meter"
            aria-label="飽肚"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(hunger)}
          />
        </div>
      </div>
      <div className="g-meter">
        <span>開心</span>
        <div className="g-meter-track">
          <b
            className="g-meter-fill meter-fill is-happy"
            style={{ width: `${happiness}%` }}
            role="meter"
            aria-label="開心"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(happiness)}
          />
        </div>
      </div>
    </div>
  )
}
