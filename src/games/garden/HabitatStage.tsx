import { DECOR_SPOT, decorById } from '../../lib/garden'
import { DecoSprite } from './DecoSprite'
import { PetSprite, type PetKind, type PetMood } from './PetSprite'
import { decoKind, decoSize } from './ids'
import { size } from './tokens'

type Heart = { id: number; dx: number }

type Props = {
  happySky: boolean
  empty: boolean
  petKind?: PetKind
  petMood: PetMood
  petPatting: boolean
  skyItems: string[]
  groundItems: string[]
  leaving: string[]
  entering: string[]
  hearts: Heart[]
  onPet: () => void
  onHideDecor: (id: string) => void
  onHeartEnd: (id: number) => void
  onLeaveEnd: (id: string) => void
}

export function HabitatStage({
  happySky,
  empty,
  petKind,
  petMood,
  petPatting,
  skyItems,
  groundItems,
  leaving,
  entering,
  hearts,
  onPet,
  onHideDecor,
  onHeartEnd,
  onLeaveEnd,
}: Props) {
  return (
    <div className="g-theater-wrap">
      <div className="g-side-bits" aria-hidden>
        <span>⭐</span>
        <span>🌿</span>
        <span>🎀</span>
      </div>
      <div className="g-theater">
        <div className={`g-scene ${happySky ? 'is-happy' : 'is-calm'}`}>
          <div className="g-hill g-hill-far" />
          <div className="g-hill g-hill-mid" />
          <div className="g-hill g-hill-near" />
          <div className="g-stitch" />
          {skyItems.map((id) => (
            <DecoButton
              key={id}
              id={id}
              leaving={leaving.includes(id)}
              entering={entering.includes(id)}
              onHide={onHideDecor}
              onLeaveEnd={onLeaveEnd}
            />
          ))}
          {groundItems.map((id) => (
            <DecoButton
              key={id}
              id={id}
              leaving={leaving.includes(id)}
              entering={entering.includes(id)}
              onHide={onHideDecor}
              onLeaveEnd={onLeaveEnd}
            />
          ))}
          {empty ? (
            <>
              <p className="g-note">
                <i className="g-tape" />
                未有寵物。
                <br />
                去商店領養一隻啦！
              </p>
              <div className="g-cushion" aria-hidden />
            </>
          ) : petKind ? (
            <button type="button" className="g-pet" onClick={onPet} aria-label="摸一摸">
              <span className={petPatting ? 'pet-pat' : 'pet-idle'}>
                <PetSprite kind={petKind} mood={petMood} size={size.petPhone} />
              </span>
            </button>
          ) : null}
          {hearts.map((heart) => (
            <i
              key={heart.id}
              className="heart-pop"
              style={{ left: '48%', bottom: '28%', ['--dx' as string]: `${heart.dx}px` }}
              onAnimationEnd={() => onHeartEnd(heart.id)}
            >
              ♥
            </i>
          ))}
        </div>
      </div>
      <div className="g-side-bits" aria-hidden>
        <span>🌸</span>
        <span>Wesley 嘅家</span>
        <span>🔘</span>
      </div>
    </div>
  )
}

function DecoButton({
  id,
  leaving,
  entering,
  onHide,
  onLeaveEnd,
}: {
  id: string
  leaving: boolean
  entering: boolean
  onHide: (id: string) => void
  onLeaveEnd: (id: string) => void
}) {
  const item = decorById(id)
  const spot = DECOR_SPOT[id]
  if (!item || !spot) return null
  const kind = decoKind(id)
  return (
    <button
      type="button"
      className={`g-deco ${item.layer === 'sky' ? 'is-sky' : ''} ${entering ? 'deco-enter' : ''} ${leaving ? 'deco-leave' : ''}`}
      style={{ left: spot.left, top: spot.top }}
      onClick={() => onHide(id)}
      onAnimationEnd={() => {
        if (leaving) onLeaveEnd(id)
      }}
      aria-label={`收起${item.name}`}
    >
      <DecoSprite kind={kind} size={decoSize(kind)} />
    </button>
  )
}
