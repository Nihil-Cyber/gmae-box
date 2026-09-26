import { useMemo, useRef, useState } from 'react'
import type { GardenState, Stats } from '../types'
import {
  PETS,
  type ShopItem,
  decorById,
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
import { ShopPanel } from './garden/ShopPanel'
import { isPetKind } from './garden/ids'
import './garden/garden.css'

type Props = {
  stats: Stats
  onBack: () => void
  onChange: (updater: (garden: GardenState, stars: number) => { garden: GardenState; stars: number }) => void
}

export function Garden({ stats, onBack, onChange }: Props) {
  const [tab, setTab] = useState<'scene' | 'shop'>('scene')
  const [shopKind, setShopKind] = useState<'pets' | 'decor'>('pets')
  const [toast, setToast] = useState('')
  const [petMoodFx, setPetMoodFx] = useState<'normal' | 'happy'>('normal')
  const [patting, setPatting] = useState(false)
  const [feeding, setFeeding] = useState(false)
  const [feedShake, setFeedShake] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; dx: number }>>([])
  const [leaving, setLeaving] = useState<string[]>([])
  const [entering, setEntering] = useState<string[]>([])
  const [flashId, setFlashId] = useState<string | null>(null)
  const [shakeId, setShakeId] = useState<string | null>(null)
  const heartSeq = useRef(0)
  const garden = useMemo(() => tickGarden(stats.garden), [stats.garden])
  const pet = garden.activePet ? petById(garden.activePet) : undefined
  const muted = stats.muted
  const petKind = garden.activePet && isPetKind(garden.activePet) ? garden.activePet : undefined

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

  function buy(item: ShopItem, kind: 'pets' | 'decor') {
    if (stats.stars < item.cost) {
      beep(false)
      setShakeId(item.id)
      window.setTimeout(() => setShakeId(null), 400)
      note('星星唔夠呀')
      return
    }
    onChange((g, stars) => {
      if (kind === 'pets') {
        if (g.ownedPets.includes(item.id)) return { garden: g, stars }
        return {
          stars: stars - item.cost,
          garden: {
            ...g,
            ownedPets: [...g.ownedPets, item.id],
            activePet: g.activePet ?? item.id,
            hunger: g.activePet ? g.hunger : 80,
            happiness: g.activePet ? g.happiness : 80,
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
    note(`買咗${item.name}！`)
  }

  function setActivePet(id: string) {
    onChange((g, stars) => ({
      stars,
      garden: { ...g, activePet: id },
    }))
    tap()
  }

  function showDecor(id: string) {
    onChange((g, stars) => {
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
    onChange((g, stars) => ({
      stars,
      garden: { ...g, placedDecor: g.placedDecor.filter((x) => x !== id) },
    }))
  }

  function feed() {
    if (!garden.activePet) return
    if (stats.stars < 1) {
      beep(false)
      setFeedShake(true)
      window.setTimeout(() => setFeedShake(false), 400)
      note('星星唔夠呀')
      return
    }
    setFeeding(true)
    window.setTimeout(() => {
      onChange((g, stars) => ({
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
    if (!garden.activePet) return
    onChange((g, stars) => ({
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
      { id: ++heartSeq.current, dx: -18 },
      { id: ++heartSeq.current, dx: 6 },
      { id: ++heartSeq.current, dx: 22 },
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

  return (
    <section className="g-shell">
      <GardenTopBar stars={stats.stars} onBack={onBack} />
      <GardenTabs tab={tab} onTab={setTab} />

      {tab === 'scene' && (
        <>
          <HabitatStage
            happySky={garden.happiness > 70}
            empty={!pet}
            petKind={petKind}
            petMood={petMoodFx}
            petPatting={patting}
            skyItems={skyItems}
            groundItems={groundItems}
            leaving={leaving}
            entering={entering}
            hearts={hearts}
            onPet={petPlay}
            onHideDecor={hideDecor}
            onHeartEnd={(id) => setHearts((prev) => prev.filter((h) => h.id !== id))}
            onLeaveEnd={finishLeave}
          />
          {pet && petKind && (
            <>
              <PetBubble name={pet.name} line={petMood(garden)} />
              <CareMeters hunger={garden.hunger} happiness={garden.happiness} />
              <CareButtons feeding={feeding} shaking={feedShake} onPat={petPlay} onFeed={feed} />
            </>
          )}
          {!pet && (
            <div className="g-empty-card">
              {canAdopt ? `你有 ⭐${stats.stars}，夠領養${cheapest?.name}喇！` : '去玩遊戲賺星星，就可以領養啦！'}
              <button
                type="button"
                className="toy-btn toy-btn--honey"
                onClick={() => {
                  if (canAdopt) {
                    setTab('shop')
                    setShopKind('pets')
                    return
                  }
                  onBack()
                }}
              >
                {canAdopt ? '去商店揀寵物' : '去玩遊戲賺星星'}
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
          activePet={garden.activePet}
          flashId={flashId}
          shakeId={shakeId}
          onKind={setShopKind}
          onBuy={(item) => buy(item, shopKind)}
          onUse={(item) => {
            if (shopKind === 'pets') setActivePet(item.id)
            else if (garden.placedDecor.includes(item.id)) hideDecor(item.id)
            else showDecor(item.id)
          }}
        />
      )}

      {toast && <p className="g-toast toast-pop">{toast}</p>}
    </section>
  )
}
