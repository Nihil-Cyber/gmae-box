import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { GardenSpot } from '../../types'
import { clampSpot, decorById, type ShopItem } from '../../lib/garden'
import { DecoSprite } from './DecoSprite'
import { PetSprite, PET_NAMES, type PetKind, type PetMood } from './PetSprite'
import { decoKind, decoSize, isPetKind } from './ids'
import { size } from './tokens'
import { usePetWander } from './usePetWander'

type Heart = { id: number; dx: number; petId?: string; slot?: number }

type DragState = {
  id: string
  kind: 'pet' | 'sky' | 'ground'
  spot: GardenSpot
  grabX: number
  grabY: number
  startX: number
  startY: number
  moved: boolean
  onTap: () => void
}

type Props = {
  happySky: boolean
  yardLevel: number
  pets: PetKind[]
  petSpots: Record<string, GardenSpot>
  decorSpots: Record<string, GardenSpot>
  petMood: PetMood
  petPatting: boolean
  wanderPaused: boolean
  skyItems: string[]
  groundItems: string[]
  leaving: string[]
  entering: string[]
  hearts: Heart[]
  onPet: (id: PetKind) => void
  onHideDecor: (id: string) => void
  onMovePet: (id: string, spot: GardenSpot) => void
  onMoveDecor: (id: string, spot: GardenSpot) => void
  onHeartEnd: (id: number) => void
  onLeaveEnd: (id: string) => void
}

const DRAG_PX = 12

export function HabitatStage({
  happySky,
  yardLevel,
  pets,
  petSpots,
  decorSpots,
  petMood,
  petPatting,
  wanderPaused,
  skyItems,
  groundItems,
  leaving,
  entering,
  hearts,
  onPet,
  onHideDecor,
  onMovePet,
  onMoveDecor,
  onHeartEnd,
  onLeaveEnd,
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const ignoreTapUntil = useRef(0)
  const yardRef = useRef(yardLevel)
  const movePetRef = useRef(onMovePet)
  const moveDecorRef = useRef(onMoveDecor)
  const [drag, setDrag] = useState<DragState | null>(null)

  useEffect(() => {
    yardRef.current = yardLevel
    movePetRef.current = onMovePet
    moveDecorRef.current = onMoveDecor
  }, [yardLevel, onMovePet, onMoveDecor])
  const crowd = pets.length >= 3
  const petPx =
    pets.length >= 5
      ? Math.round(size.petPhone * 0.68)
      : crowd
        ? Math.round(size.petPhone * 0.78)
        : pets.length === 2
          ? Math.round(size.petPhone * 0.9)
          : size.petPhone
  const poses = usePetWander(pets, wanderPaused || Boolean(drag))

  useEffect(() => {
    function onMove(event: globalThis.PointerEvent) {
      const current = dragRef.current
      const scene = sceneRef.current
      if (!current || !scene) return
      const moved =
        current.moved || Math.hypot(event.clientX - current.startX, event.clientY - current.startY) >= DRAG_PX
      const rect = scene.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      const next = {
        ...current,
        moved,
        spot: clampSpot({ x: x - current.grabX, y: y - current.grabY }, current.kind, yardRef.current),
      }
      dragRef.current = next
      setDrag(next)
    }

    function onUp() {
      const current = dragRef.current
      if (!current) return
      dragRef.current = null
      setDrag(null)
      if (current.moved) {
        ignoreTapUntil.current = Date.now() + 450
        if (current.kind === 'pet') movePetRef.current(current.id, current.spot)
        else moveDecorRef.current(current.id, current.spot)
        return
      }
      if (Date.now() < ignoreTapUntil.current) return
      current.onTap()
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  function spotNow(id: string, kind: 'pet' | 'sky' | 'ground', fallback: GardenSpot): GardenSpot {
    if (drag?.id === id) return drag.spot
    if (kind === 'pet') return petSpots[id] ?? fallback
    return decorSpots[id] ?? fallback
  }

  function beginDrag(
    event: PointerEvent<HTMLButtonElement>,
    id: string,
    kind: 'pet' | 'sky' | 'ground',
    current: GardenSpot,
    onTap: () => void,
  ) {
    if (event.button !== 0) return
    const scene = sceneRef.current
    if (!scene) return
    event.preventDefault()
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // window listeners still follow the pointer
    }
    const rect = scene.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const next: DragState = {
      id,
      kind,
      spot: current,
      grabX: x - current.x,
      grabY: y - current.y,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      onTap,
    }
    dragRef.current = next
    setDrag(next)
  }

  return (
    <div className="g-theater-wrap">
      <div className="g-side-bits" aria-hidden>
        <span>⭐</span>
        <span>🌿</span>
        <span>🎀</span>
      </div>
      <div className={`g-theater is-yard-${yardLevel}`}>
        <div ref={sceneRef} className={`g-scene ${happySky ? 'is-happy' : 'is-calm'} ${drag ? 'is-hold' : ''}`}>
          <div className="g-hill g-hill-far" />
          <div className="g-hill g-hill-mid" />
          <div className="g-hill g-hill-near" />
          <div className="g-stitch" />
          {skyItems.map((id) => (
            <DecoButton
              key={id}
              id={id}
              item={decorById(id)}
              spot={spotNow(id, 'sky', { x: 50, y: 12 })}
              leaving={leaving.includes(id)}
              entering={entering.includes(id)}
              dragging={drag?.id === id}
              onPointerDown={(event, itemSpot) => beginDrag(event, id, 'sky', itemSpot, () => onHideDecor(id))}
              onTap={() => onHideDecor(id)}
              onLeaveEnd={onLeaveEnd}
            />
          ))}
          {groundItems.map((id) => (
            <DecoButton
              key={id}
              id={id}
              item={decorById(id)}
              spot={spotNow(id, 'ground', { x: 50, y: 70 })}
              leaving={leaving.includes(id)}
              entering={entering.includes(id)}
              dragging={drag?.id === id}
              onPointerDown={(event, itemSpot) => beginDrag(event, id, 'ground', itemSpot, () => onHideDecor(id))}
              onTap={() => onHideDecor(id)}
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
            pets.filter(isPetKind).map((kind) => {
              const home = spotNow(kind, 'pet', { x: 50, y: 74 })
              const pose = drag?.id === kind ? undefined : poses[kind]
              const name = PET_NAMES[kind]
              return (
                <button
                  key={kind}
                  type="button"
                  className={`g-pet ${pets.length === 1 ? 'is-solo' : ''} ${crowd ? 'is-crowd' : ''} ${drag?.id === kind ? 'is-dragging' : ''}`}
                  style={{ left: `${home.x}%`, top: `${home.y}%` }}
                  onPointerDown={(event) => beginDrag(event, kind, 'pet', home, () => onPet(kind))}
                  onClick={(event) => {
                    if (event.detail === 0) onPet(kind)
                  }}
                  aria-label={`摸一摸${name}，拖去搬位`}
                >
                  <span
                    className="g-pet-shift"
                    style={{ transform: `translate(${pose?.x ?? 0}px, ${pose?.y ?? 0}px)` }}
                  >
                    <span className="g-pet-face" style={{ transform: `scaleX(${pose?.face ?? 1})` }}>
                      <span className={petPatting ? 'pet-pat' : 'pet-idle'}>
                        <PetSprite kind={kind} mood={petMood} size={petPx} />
                      </span>
                    </span>
                  </span>
                </button>
              )
            })
          )}
          {hearts.map((heart) => {
            const petId = heart.petId ?? pets[heart.slot ?? 0]
            const home = petId ? spotNow(petId, 'pet', { x: 48, y: 74 }) : { x: 48, y: 74 }
            const pose = petId ? poses[petId] : undefined
            return (
              <i
                key={heart.id}
                className="heart-pop"
                style={{
                  left: `${home.x}%`,
                  top: `${home.y - 14}%`,
                  ['--dx' as string]: `${heart.dx + (pose?.x ?? 0)}px`,
                }}
                onAnimationEnd={() => onHeartEnd(heart.id)}
              >
                ♥
              </i>
            )
          })}
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
  item,
  spot,
  leaving,
  entering,
  dragging,
  onPointerDown,
  onTap,
  onLeaveEnd,
}: {
  id: string
  item: ShopItem | undefined
  spot: GardenSpot
  leaving: boolean
  entering: boolean
  dragging: boolean
  onPointerDown: (event: PointerEvent<HTMLButtonElement>, spot: GardenSpot) => void
  onTap: () => void
  onLeaveEnd: (id: string) => void
}) {
  if (!item) return null
  const kind = decoKind(id)
  return (
    <button
      type="button"
      className={`g-deco ${item.layer === 'sky' ? 'is-sky' : ''} ${entering ? 'deco-enter' : ''} ${leaving ? 'deco-leave' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
      onPointerDown={(event) => onPointerDown(event, spot)}
      onClick={(event) => {
        if (event.detail === 0) onTap()
      }}
      onAnimationEnd={() => {
        if (leaving) onLeaveEnd(id)
      }}
      aria-label={`拖去搬${item.name}，撳一下收起`}
    >
      <DecoSprite kind={kind} size={decoSize(kind)} />
    </button>
  )
}
