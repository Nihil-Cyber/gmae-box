import type { GameId, Stats } from '../types'
import { Mascot } from './Mascot'

const GAMES: {
  id: GameId
  title: string
  desc: string
  emoji: string
  tone: 'mint' | 'coral' | 'grape' | 'sky'
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
]

type Props = {
  stats: Stats
  onPlay: (id: GameId) => void
  onToggleMute: () => void
}

export function Home({ stats, onPlay, onToggleMute }: Props) {
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
          <p>Wesley，今日嚟揀一款遊戲開始練習啦！答啱就會得到星星。</p>
        </div>
      </div>

      <div className="game-grid">
        {GAMES.map((game) => {
          const extra =
            game.id === 'sudoku'
              ? `完成 ${stats.sudoku.wins} 局`
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
      <p className="home-foot">而家由數學起步，之後會加入語文、邏輯、科學等更多有意義嘅教育遊戲。</p>
    </section>
  )
}
