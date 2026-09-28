import { DECOR_SPOT, decorById } from '../../lib/garden'
import { DecoSprite } from './DecoSprite'
import { PetSprite, type PetKind, type PetMood } from './PetSprite'
import { decoKind, decoSize, isPetKind } from './ids'
import { size } from './tokens'

type Heart = { id: number; dx: number; slot?: number }

type Props = {
  happySky: boolean
  yardLevel: number
  pets: PetKind[]
  petMood: PetMood
  petPatting: boolean
  skyItems: string[]
  groundItems: string[]
  leaving: string[]
  entering: string[]
  hearts: Heart[]
  onPet: (id: PetKind) => void
  onHideDecor: (id: string) => void
  onHeartEnd: (id: number) => void
  onLeaveEnd: (id: string) => void
}

export function HabitatStage({
  happySky,
  yardLevel,
  pets,
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
  const crowd = pets.length >= 3
  const petPx = crowd ? Math.round(size.petPhone * 0.78) : pets.length === 2 ? Math.round(size.petPhone * 0.9) : size.petPhone
  return (
    <div className="g-theater-wrap">
      <div className="g-side-bits" aria-hidden>
        <span>⭐</span>
        <span>🌿</span>
        <span>🎀</span>
      </div>
      <div className={`g-theater is-yard-${yardLevel}`}>
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
          {pets.length === 0 ? (
            <>
              <p className="g-note">
                <i className="g-tape" />
                未有寵物。
                <br />
                去商店領養一隻啦！
              </p>
              <div className="g-cushion" aria-hidden />
            </>
          ) : (
            pets.filter(isPetKind).map((kind, index) => (
              <button
                key={kind}
                type="button"
                className={`g-pet is-${index + 1}-of-${pets.length} ${crowd ? 'is-crowd' : ''}`}
                onClick={() => onPet(kind)}
                aria-label="摸一摸"
              >
                <span className={petPatting ? 'pet-pat' : 'pet-idle'}>
                  <PetSprite kind={kind} mood={petMood} size={petPx} />
                </span>
              </button>
            ))
          )}
          {hearts.map((heart) => (
            <i
              key={heart.id}
              className="heart-pop"
              style={{ left: heartLeft(pets.length, heart.slot ?? 0), bottom: '28%', ['--dx' as string]: `${heart.dx}px` }}
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

function heartLeft(total: number, slot: number): string {
  if (total <= 1) return '48%'
  const map: Record<number, string[]> = {
    2: ['32%', '68%'],
    3: ['24%', '50%', '76%'],
    4: ['16%', '39%', '61%', '84%'],
  }
  return map[total]?.[slot] ?? '48%'
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
