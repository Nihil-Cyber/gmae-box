import { useMemo, useRef, useState } from 'react'
import type { GardenState, Stats } from '../types'
import {
  PETS,
  type ShopItem,
  decorById,
  nextSlotCost,
  nextYardCost,
  normalizeGarden,
  petById,
  petMood,
  tickGarden,
} from '../lib/garden'
import { playCorrect, playTap, playWrong, unlockAudio } from '../lib/audio'
import { CareButtons } from './garden/CareButtons'
import { CareMeters } from './garden/CareMeters'
import { GardenTabs } from './garden/GardenTabs'
import { GardenTopBar } from './garden/GardenTopBar'
import { HabitatStage } from './garden/HabitatStage'
import { PetBubble } from './garden/PetBubble'
import { ShopPanel, type ShopKind } from './garden/ShopPanel'
import { isPetKind } from './garden/ids'
import './garden/garden.css'

type Props = {
  stats: Stats
  onBack: () => void
  onChange: (updater: (garden: GardenState, stars: number) => { garden: GardenState; stars: number }) => void
}

type Heart = { id: number; dx: number; slot: number }

export function Garden({ stats, onBack, onChange }: Props) {
  const [tab, setTab] = useState<'scene' | 'shop'>('scene')
  const [shopKind, setShopKind] = useState<ShopKind>('pets')
  const [toast, setToast] = useState('')
  const [petMoodFx, setPetMoodFx] = useState<'normal' | 'happy'>('normal')
  const [patting, setPatting] = useState(false)
  const [feeding, setFeeding] = useState(false)
  const [feedShake, setFeedShake] = useState(false)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [leaving, setLeaving] = useState<string[]>([])
  const [entering, setEntering] = useState<string[]>([])
  const [flashId, setFlashId] = useState<string | null>(null)
  const [shakeId, setShakeId] = useState<string | null>(null)
  const heartSeq = useRef(0)
  const garden = useMemo(() => tickGarden(stats.garden), [stats.garden])
  const placed = garden.placedPets.filter(isPetKind)
  const muted = stats.muted

  function tap() {
    if (muted) return
    unlockAudio()
    playTap()
  }

  function beep(ok: boolean) {
    if (muted) return
    unlockAudio()
    if (ok) playCorrect()
    else playWrong()
  }

  function note(text: string) {
    setToast(text)
    window.setTimeout(() => setToast(''), 1400)
  }

  function commit(updater: (g: GardenState, stars: number) => { garden: GardenState; stars: number }) {
    onChange((g, stars) => {
      const next = updater(normalizeGarden(g), stars)
      return { garden: normalizeGarden(next.garden), stars: next.stars }
    })
  }

  function buy(item: ShopItem, kind: ShopKind) {
    if (kind === 'upgrade') {
      buyUpgrade(item.id)
      return
    }
    if (stats.stars < item.cost) {
      beep(false)
      setShakeId(item.id)
      window.setTimeout(() => setShakeId(null), 400)
      note('星星唔夠呀')
      return
    }
    commit((g, stars) => {
      if (kind === 'pets') {
        if (g.ownedPets.includes(item.id)) return { garden: g, stars }
        const canPlace = g.placedPets.length < g.petSlots
        const firstOut = g.placedPets.length === 0 && canPlace
        return {
          stars: stars - item.cost,
          garden: {
            ...g,
            ownedPets: [...g.ownedPets, item.id],
            placedPets: canPlace ? [...g.placedPets, item.id] : g.placedPets,
            activePet: canPlace ? (g.activePet ?? item.id) : g.activePet,
            hunger: firstOut ? 80 : g.hunger,
            happiness: firstOut ? 80 : g.happiness,
          },
        }
      }
      if (g.ownedDecor.includes(item.id)) return { garden: g, stars }
      return {
        stars: stars - item.cost,
        garden: {
          ...g,
          ownedDecor: [...g.ownedDecor, item.id],
          placedDecor: [...g.placedDecor, item.id],
        },
      }
    })
    if (kind === 'decor') {
      setEntering((prev) => [...prev, item.id])
      window.setTimeout(() => {
        setEntering((prev) => prev.filter((id) => id !== item.id))
      }, 520)
    }
    setFlashId(item.id)
    window.setTimeout(() => setFlashId(null), 700)
    beep(true)
    if (kind === 'pets' && garden.placedPets.length >= garden.petSlots) {
      note(`買咗${item.name}！家園位滿喇，去升級先可以帶出嚟`)
      return
    }
    note(`買咗${item.name}！`)
  }

  function buyUpgrade(id: string) {
    if (id === 'upgrade-slots') {
      const cost = nextSlotCost(garden.petSlots)
      if (cost == null) {
        note('已經係最多隻喇')
        return
      }
      if (stats.stars < cost) {
        beep(false)
        setShakeId(id)
        window.setTimeout(() => setShakeId(null), 400)
        note('星星唔夠呀')
        return
      }
      const nextSlots = garden.petSlots + 1
      commit((g, stars) => ({
        stars: stars - cost,
        garden: { ...g, petSlots: g.petSlots + 1 },
      }))
      setFlashId(id)
      window.setTimeout(() => setFlashId(null), 700)
      beep(true)
      note(`而家可以同時 ${nextSlots} 隻一齊玩！`)
      return
    }
    if (id === 'upgrade-yard') {
      const cost = nextYardCost(garden.yardLevel)
      if (cost == null) {
        note('草地已經係最大喇')
        return
      }
      if (stats.stars < cost) {
        beep(false)
        setShakeId(id)
        window.setTimeout(() => setShakeId(null), 400)
        note('星星唔夠呀')
        return
      }
      commit((g, stars) => ({
        stars: stars - cost,
        garden: { ...g, yardLevel: g.yardLevel + 1 },
      }))
      setFlashId(id)
      window.setTimeout(() => setFlashId(null), 700)
      beep(true)
      note('家園闊咗一格！')
    }
  }

  function togglePet(id: string) {
    if (garden.placedPets.includes(id)) {
      commit((g, stars) => {
        const placedPets = g.placedPets.filter((x) => x !== id)
        return {
          stars,
          garden: { ...g, placedPets, activePet: placedPets[0] ?? null },
        }
      })
      tap()
      return
    }
    if (garden.placedPets.length >= garden.petSlots) {
      beep(false)
      note(`而家最多 ${garden.petSlots} 隻一齊玩，去商店升級啦`)
      return
    }
    commit((g, stars) => {
      const firstOut = g.placedPets.length === 0
      const placedPets = [...g.placedPets, id]
      return {
        stars,
        garden: {
          ...g,
          placedPets,
          activePet: g.activePet ?? id,
          hunger: firstOut ? 80 : g.hunger,
          happiness: firstOut ? 80 : g.happiness,
        },
      }
    })
    tap()
  }

  function showDecor(id: string) {
    commit((g, stars) => {
      if (g.placedDecor.includes(id)) return { stars, garden: g }
      return { stars, garden: { ...g, placedDecor: [...g.placedDecor, id] } }
    })
    setEntering((prev) => [...prev, id])
    window.setTimeout(() => {
      setEntering((prev) => prev.filter((x) => x !== id))
    }, 520)
    tap()
  }

  function hideDecor(id: string) {
    if (leaving.includes(id)) return
    setLeaving((prev) => [...prev, id])
    tap()
  }

  function finishLeave(id: string) {
    setLeaving((prev) => prev.filter((x) => x !== id))
    commit((g, stars) => ({
      stars,
      garden: { ...g, placedDecor: g.placedDecor.filter((x) => x !== id) },
    }))
  }

  function feed() {
    if (placed.length === 0) return
    if (stats.stars < 1) {
      beep(false)
      setFeedShake(true)
      window.setTimeout(() => setFeedShake(false), 400)
      note('星星唔夠呀')
      return
    }
    setFeeding(true)
    window.setTimeout(() => {
      commit((g, stars) => ({
        stars: stars - 1,
        garden: {
          ...g,
          hunger: Math.min(100, g.hunger + 28),
          happiness: Math.min(100, g.happiness + 8),
          lastTick: Date.now(),
        },
      }))
      setFeeding(false)
      setPatting(true)
      setPetMoodFx('happy')
      window.setTimeout(() => {
        setPatting(false)
        setPetMoodFx('normal')
      }, 1200)
      beep(true)
      note('好味！')
    }, 600)
  }

  function petPlay() {
    if (placed.length === 0) return
    commit((g, stars) => ({
      stars,
      garden: {
        ...g,
        happiness: Math.min(100, g.happiness + 18),
        lastTick: Date.now(),
      },
    }))
    setPatting(true)
    setPetMoodFx('happy')
    setHearts((prev) => [
      ...prev,
      ...placed.flatMap((_, slot) => [
        { id: ++heartSeq.current, dx: -14, slot },
        { id: ++heartSeq.current, dx: 16, slot },
      ]),
    ])
    window.setTimeout(() => {
      setPatting(false)
      setPetMoodFx('normal')
    }, 1200)
    beep(true)
  }

  const skyItems = garden.placedDecor.filter((id) => decorById(id)?.layer === 'sky')
  const groundItems = garden.placedDecor.filter((id) => decorById(id)?.layer !== 'sky')
  const cheapest = PETS.filter((p) => !garden.ownedPets.includes(p.id)).sort((a, b) => a.cost - b.cost)[0]
  const canAdopt = Boolean(cheapest && stats.stars >= cheapest.cost)
  const names = placed.map((id) => petById(id)?.name).filter(Boolean) as string[]
  const bubbleName = names.length <= 1 ? (names[0] ?? '寵物') : names.length === 2 ? `${names[0]}同${names[1]}` : `${names.slice(0, -1).join('、')}同${names[names.length - 1]}`

  return (
    <section className="g-shell">
      <GardenTopBar stars={stats.stars} onBack={onBack} />
      <GardenTabs tab={tab} onTab={setTab} />

      {tab === 'scene' && (
        <>
          <HabitatStage
            happySky={garden.happiness > 70}
            yardLevel={garden.yardLevel}
            pets={placed}
            petMood={petMoodFx}
            petPatting={patting}
            skyItems={skyItems}
            groundItems={groundItems}
            leaving={leaving}
            entering={entering}
            hearts={hearts}
            onPet={() => petPlay()}
            onHideDecor={hideDecor}
            onHeartEnd={(id) => setHearts((prev) => prev.filter((h) => h.id !== id))}
            onLeaveEnd={finishLeave}
          />
          {placed.length > 0 && (
            <>
              <PetBubble name={bubbleName} line={petMood(garden)} />
              <CareMeters hunger={garden.hunger} happiness={garden.happiness} />
              <CareButtons feeding={feeding} shaking={feedShake} onPat={petPlay} onFeed={feed} />
            </>
          )}
          {placed.length === 0 && (
            <div className="g-empty-card">
              {garden.ownedPets.length > 0
                ? '寵物喺商店等你帶出嚟玩。'
                : canAdopt
                  ? `你有 ⭐${stats.stars}，夠領養${cheapest?.name}喇！`
                  : '去玩遊戲賺星星，就可以領養啦！'}
              <button
                type="button"
                className="toy-btn toy-btn--honey"
                onClick={() => {
                  if (garden.ownedPets.length > 0 || canAdopt) {
                    setTab('shop')
                    setShopKind('pets')
                    return
                  }
                  onBack()
                }}
              >
                {garden.ownedPets.length > 0 ? '去商店帶寵物出嚟' : canAdopt ? '去商店揀寵物' : '去玩遊戲賺星星'}
              </button>
            </div>
          )}
        </>
      )}

      {tab === 'shop' && (
        <ShopPanel
          shopKind={shopKind}
          stars={stats.stars}
          ownedPets={garden.ownedPets}
          ownedDecor={garden.ownedDecor}
          placedDecor={garden.placedDecor}
          placedPets={garden.placedPets}
          petSlots={garden.petSlots}
          yardLevel={garden.yardLevel}
          flashId={flashId}
          shakeId={shakeId}
          onKind={setShopKind}
          onBuy={buy}
          onUse={(item) => {
            if (shopKind === 'pets') togglePet(item.id)
            else if (garden.placedDecor.includes(item.id)) hideDecor(item.id)
            else showDecor(item.id)
          }}
        />
      )}

      {toast && <p className="g-toast toast-pop">{toast}</p>}
    </section>
  )
}
