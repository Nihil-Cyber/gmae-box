import type { GameId, Stats } from '../types'
import { Mascot } from './Mascot'

const GAMES: {
  id: GameId
  title: string
  desc: string
  emoji: string
  tone: 'mint' | 'coral' | 'grape' | 'sky' | 'rose' | 'amber' | 'teal' | 'indigo'
}[] = [
  {
    id: 'addsub',
    title: '加加減減',
    desc: '雙位數加減法',
    emoji: '➕',
    tone: 'mint',
  },
  {
    id: 'muldiv',
    title: '乘乘除除',
    desc: '九九乘法同除法',
    emoji: '✖️',
    tone: 'coral',
  },
  {
    id: 'olympiad',
    title: '奧數挑戰',
    desc: '規律、巧算、應用題',
    emoji: '🧠',
    tone: 'grape',
  },
  {
    id: 'sudoku',
    title: '四宮數獨',
    desc: '4 × 4 入門數獨',
    emoji: '🔢',
    tone: 'sky',
  },
  {
    id: 'smartSudoku',
    title: '智能數獨',
    desc: '彩色 6 × 6，一樣唔重複',
    emoji: '🧩',
    tone: 'indigo',
  },
  {
    id: 'shapes',
    title: '圖形一樣',
    desc: '睇兩個圖形，一樣定唔同',
    emoji: '🔷',
    tone: 'teal',
  },
  {
    id: 'readchar',
    title: '認一認字',
    desc: '睇圖、認字、辨相似字',
    emoji: '📝',
    tone: 'rose',
  },
  {
    id: 'vocab',
    title: '單字配對',
    desc: '詞語、意思、填字',
    emoji: '📖',
    tone: 'amber',
  },
]

type Props = {
  stats: Stats
  onPlay: (id: GameId) => void
  onGarden: () => void
  onToggleMute: () => void
}

export function Home({ stats, onPlay, onGarden, onToggleMute }: Props) {
  const petHint = stats.garden.activePet
    ? '寵物喺度等你摸一摸'
    : '用星星領養寵物、換裝飾'

  return (
    <section>
      <div className="topbar">
        <div className="star-bank" aria-label={`已得到 ${stats.stars} 粒星星`}>
          <span>⭐</span>
          <span>{stats.stars}</span>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleMute}
          aria-label={stats.muted ? '開啟聲音' : '關閉聲音'}
        >
          {stats.muted ? '🔇' : '🔊'}
        </button>
      </div>

      <div className="hero">
        <Mascot className="mascot" />
        <div>
          <h1>Gmae Box</h1>
          <p className="tagline">有意義嘅教育遊戲盒</p>
          <p>Wesley，練習賺星星，返家園佈置同養寵物啦！</p>
        </div>
      </div>

      <button type="button" className="game-card peach wide" onClick={onGarden}>
        <div>
          <div className="emoji">🏡</div>
          <h2>我嘅家園</h2>
          <p>{petHint}</p>
        </div>
        <div className="meta">商店 · 寵物 · 裝飾</div>
      </button>

      <div className="game-grid">
        {GAMES.map((game) => {
          const extra =
            game.id === 'sudoku'
              ? `完成 ${stats.sudoku.wins} 局`
              : game.id === 'smartSudoku'
                ? `完成 ${stats.smartSudoku.completed} 局`
                : `答啱 ${stats[game.id].firstTry} 題`
          return (
            <button
              key={game.id}
              type="button"
              className={`game-card ${game.tone}`}
              onClick={() => onPlay(game.id)}
            >
              <div>
                <div className="emoji">{game.emoji}</div>
                <h2>{game.title}</h2>
                <p>{game.desc}</p>
              </div>
              <div className="meta">{extra}</div>
            </button>
          )
        })}
      </div>
      <p className="home-foot">答啱題目賺星星，去家園買裝飾、養寵物。數學、語文同圖形都可以一齊練。</p>
    </section>
  )
}
