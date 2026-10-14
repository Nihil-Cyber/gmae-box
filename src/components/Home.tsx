import type { GameId, QuizGameId, Stats } from '../types'
import { DIFFICULTY_LABEL } from '../types'
import { IconSprite, StarMark, type IconKind } from './IconSprite'
import { Mascot } from './Mascot'

function isQuiz(id: GameId): id is QuizGameId {
  return id !== 'sudoku' && id !== 'smartSudoku'
}

const GAMES: {
  id: GameId
  title: string
  desc: string
  icon: IconKind
  tone: 'mint' | 'coral' | 'grape' | 'sky' | 'rose' | 'amber' | 'teal' | 'indigo'
}[] = [
  {
    id: 'addsub',
    title: '加加減減',
    desc: '單數到雙位加減',
    icon: 'home-addsub',
    tone: 'mint',
  },
  {
    id: 'muldiv',
    title: '乘乘除除',
    desc: '1 到 10 乘數表同除法',
    icon: 'home-muldiv',
    tone: 'coral',
  },
  {
    id: 'olympiad',
    title: '奧數挑戰',
    desc: '規律、巧算、應用題',
    icon: 'home-olympiad',
    tone: 'grape',
  },
  {
    id: 'sudoku',
    title: '四宮數獨',
    desc: '4 × 4 入門數獨',
    icon: 'home-sudoku',
    tone: 'sky',
  },
  {
    id: 'smartSudoku',
    title: '智能數獨',
    desc: '彩色 6 × 6，一樣唔重複',
    icon: 'home-smart-sudoku',
    tone: 'indigo',
  },
  {
    id: 'shapes',
    title: '圖形一樣',
    desc: '睇兩個圖形，一樣定唔同',
    icon: 'home-shapes',
    tone: 'teal',
  },
  {
    id: 'readchar',
    title: '認一認字',
    desc: '睇圖、認字、辨相似字',
    icon: 'home-readchar',
    tone: 'rose',
  },
  {
    id: 'vocab',
    title: '單字配對',
    desc: '詞語、意思、填字',
    icon: 'home-vocab',
    tone: 'amber',
  },
]

type Props = {
  stats: Stats
  onPlay: (id: GameId) => void
  onGarden: () => void
  onSkill: () => void
  onToggleMute: () => void
}

export function Home({ stats, onPlay, onGarden, onSkill, onToggleMute }: Props) {
  const petHint = stats.garden.placedPets.length > 0 || stats.garden.activePet
    ? '寵物喺度等你摸一摸'
    : '用星星領養寵物、換裝飾'

  return (
    <section>
      <div className="topbar">
        <div className="star-bank" aria-label={`已得到 ${stats.stars} 粒星星`}>
          <StarMark size={22} />
          <span>{stats.stars}</span>
        </div>
        <div className="topbar-tools">
          <button type="button" className="pill" onClick={onSkill}>
            難度
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleMute}
            aria-label={stats.muted ? '開啟聲音' : '關閉聲音'}
          >
            <IconSprite kind={stats.muted ? 'icon-mute' : 'icon-sound'} size={26} />
          </button>
        </div>
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
          <div className="card-icon">
            <IconSprite kind="home-garden" size={64} />
          </div>
          <h2>我嘅家園</h2>
          <p>{petHint}</p>
        </div>
          <div className="meta">商店 · 寵物 · 裝飾 · 升級</div>
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
                <div className="card-icon">
                  <IconSprite kind={game.icon} size={56} />
                </div>
                <h2>{game.title}</h2>
                <p>
                  {game.desc}
                  {isQuiz(game.id) ? ` · ${DIFFICULTY_LABEL[stats[game.id].skill]}` : ''}
                </p>
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
