import { useMemo, useState } from 'react'
import type { GardenState, Stats } from '../types'
import {
  DECOR_SPOT,
  DECORS,
  PETS,
  decorById,
  petById,
  petMood,
  tickGarden,
} from '../lib/garden'
import { playCorrect, playTap, playWrong, unlockAudio } from '../lib/audio'

type Props = {
  stats: Stats
  onBack: () => void
  onChange: (updater: (garden: GardenState, stars: number) => { garden: GardenState; stars: number }) => void
}

export function Garden({ stats, onBack, onChange }: Props) {
  const [tab, setTab] = useState<'scene' | 'shop'>('scene')
  const [shopKind, setShopKind] = useState<'pets' | 'decor'>('pets')
  const [toast, setToast] = useState('')
  const garden = useMemo(() => tickGarden(stats.garden), [stats.garden])
  const pet = garden.activePet ? petById(garden.activePet) : undefined
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

  function buy(id: string, kind: 'pets' | 'decor') {
    const item = kind === 'pets' ? petById(id) : decorById(id)
    if (!item) return
    if (stats.stars < item.cost) {
      beep(false)
      note('星星唔夠呀')
      return
    }
    onChange((g, stars) => {
      if (kind === 'pets') {
        if (g.ownedPets.includes(id)) return { garden: g, stars }
        return {
          stars: stars - item.cost,
          garden: {
            ...g,
            ownedPets: [...g.ownedPets, id],
            activePet: g.activePet ?? id,
            hunger: g.activePet ? g.hunger : 80,
            happiness: g.activePet ? g.happiness : 80,
          },
        }
      }
      if (g.ownedDecor.includes(id)) return { garden: g, stars }
      return {
        stars: stars - item.cost,
        garden: {
          ...g,
          ownedDecor: [...g.ownedDecor, id],
          placedDecor: [...g.placedDecor, id],
        },
      }
    })
    beep(true)
    note(`買咗${item.name}！`)
  }

  function setActivePet(id: string) {
    onChange((g, stars) => ({
      stars,
      garden: { ...g, activePet: id },
    }))
    tap()
    note('帶咗佢出嚟玩')
  }

  function toggleDecor(id: string) {
    onChange((g, stars) => {
      const placed = g.placedDecor.includes(id)
        ? g.placedDecor.filter((x) => x !== id)
        : [...g.placedDecor, id]
      return { stars, garden: { ...g, placedDecor: placed } }
    })
    tap()
  }

  function feed() {
    if (!garden.activePet) return
    if (stats.stars < 1) {
      beep(false)
      note('餵零食要 1 粒星')
      return
    }
    onChange((g, stars) => ({
      stars: stars - 1,
      garden: {
        ...g,
        hunger: Math.min(100, g.hunger + 28),
        happiness: Math.min(100, g.happiness + 8),
        lastTick: Date.now(),
      },
    }))
    beep(true)
    note('好好味！')
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
    beep(true)
    note('摸得佢好舒服')
  }

  const skyItems = garden.placedDecor.filter((id) => decorById(id)?.layer === 'sky')
  const groundItems = garden.placedDecor.filter((id) => decorById(id)?.layer !== 'sky')

  return (
    <section>
      <div className="shell-head">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="返回">
          ←
        </button>
        <h2>我嘅家園</h2>
        <div className="star-bank">⭐ {stats.stars}</div>
      </div>

      <div className="garden-tabs">
        <button
          type="button"
          className={`diff-btn ${tab === 'scene' ? 'active' : ''}`}
          onClick={() => setTab('scene')}
        >
          <strong>家園</strong>
          <span>寵物同裝飾</span>
        </button>
        <button
          type="button"
          className={`diff-btn ${tab === 'shop' ? 'active' : ''}`}
          onClick={() => setTab('shop')}
        >
          <strong>商店</strong>
          <span>用星星換嘢</span>
        </button>
      </div>

      {tab === 'scene' && (
        <>
          <div className="habitat" data-mood={garden.happiness > 70 ? 'happy' : 'calm'}>
            {skyItems.map((id) => {
              const item = decorById(id)
              const spot = DECOR_SPOT[id]
              if (!item || !spot) return null
              return (
                <button
                  key={id}
                  type="button"
                  className="habitat-item sky"
                  style={{ left: spot.left, top: spot.top }}
                  onClick={() => toggleDecor(id)}
                  title="撳一下收起"
                >
                  {item.emoji}
                </button>
              )
            })}
            {groundItems.map((id) => {
              const item = decorById(id)
              const spot = DECOR_SPOT[id]
              if (!item || !spot) return null
              return (
                <button
                  key={id}
                  type="button"
                  className="habitat-item ground"
                  style={{ left: spot.left, top: spot.top }}
                  onClick={() => toggleDecor(id)}
                  title="撳一下收起"
                >
                  {item.emoji}
                </button>
              )
            })}
            {pet ? (
              <button type="button" className="habitat-pet" onClick={petPlay}>
                {pet.emoji}
              </button>
            ) : (
              <p className="habitat-empty">未有寵物。去商店領養一隻啦！</p>
            )}
          </div>

          {pet && (
            <>
              <p className="rules">
                {pet.name}：{petMood(garden)}
              </p>
              <div className="meters">
                <div>
                  <span>飽肚</span>
                  <i>
                    <b style={{ width: `${garden.hunger}%` }} />
                  </i>
                </div>
                <div>
                  <span>開心</span>
                  <i>
                    <b className="happy" style={{ width: `${garden.happiness}%` }} />
                  </i>
                </div>
              </div>
              <div className="actions">
                <button type="button" className="ghost" onClick={petPlay}>
                  摸一摸
                </button>
                <button type="button" className="primary" style={{ marginTop: 0 }} onClick={feed}>
                  餵零食 ⭐1
                </button>
              </div>
            </>
          )}
          {toast && <p className="garden-toast">{toast}</p>}
        </>
      )}

      {tab === 'shop' && (
        <>
          <div className="garden-tabs tight">
            <button
              type="button"
              className={`ghost ${shopKind === 'pets' ? 'on' : ''}`}
              onClick={() => setShopKind('pets')}
            >
              寵物
            </button>
            <button
              type="button"
              className={`ghost ${shopKind === 'decor' ? 'on' : ''}`}
              onClick={() => setShopKind('decor')}
            >
              裝飾
            </button>
          </div>
          <div className="shop-grid">
            {(shopKind === 'pets' ? PETS : DECORS).map((item) => {
              const owned =
                shopKind === 'pets'
                  ? garden.ownedPets.includes(item.id)
                  : garden.ownedDecor.includes(item.id)
              const placed = garden.placedDecor.includes(item.id)
              const active = garden.activePet === item.id
              return (
                <div key={item.id} className="shop-card">
                  <div className="shop-emoji">{item.emoji}</div>
                  <strong>{item.name}</strong>
                  <span>{item.blurb}</span>
                  {!owned && (
                    <button type="button" className="primary" onClick={() => buy(item.id, shopKind)}>
                      ⭐ {item.cost} 購買
                    </button>
                  )}
                  {owned && shopKind === 'pets' && (
                    <button
                      type="button"
                      className="ghost"
                      disabled={active}
                      onClick={() => setActivePet(item.id)}
                    >
                      {active ? '而家喺度' : '帶出嚟玩'}
                    </button>
                  )}
                  {owned && shopKind === 'decor' && (
                    <button type="button" className="ghost" onClick={() => toggleDecor(item.id)}>
                      {placed ? '收起' : '擺出嚟'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          {toast && <p className="garden-toast">{toast}</p>}
        </>
      )}
    </section>
  )
}
