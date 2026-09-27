import { useState } from 'react'
import type { Difficulty, GameId, QuizGameId, Screen, Stats } from './types'
import { Home } from './components/Home'
import { QuizGame } from './games/QuizGame'
import { SudokuGame } from './games/SudokuGame'
import { Garden } from './games/Garden'
import { SmartSudokuGame } from './games/smartSudoku/SmartSudokuGame'
import { makeAddSub } from './lib/addSub'
import { makeMulDiv } from './lib/mulDiv'
import { makeOlympiad } from './lib/olympiad'
import { makeReadChar, makeVocab } from './lib/words'
import { makeShapes } from './lib/shapes'
import { tickGarden } from './lib/garden'
import { loadStats, saveStats } from './lib/storage'
import { unlockAudio } from './lib/audio'

function localDay(offset = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const ADD_HINTS = {
  easy: '雙位數加減，暫時唔使進位／借位',
  medium: '有時要進位或者借位',
  hard: '幾乎每題都要進位或者借位',
}

const MUL_HINTS = {
  easy: '1 到 5 嘅乘法同除法',
  medium: '完整九九，乘除都會出現',
  hard: '6 到 9 嘅乘法同除法',
}

const OLY_HINTS = {
  easy: '搵規律、填空、簡單應用題',
  medium: '乘法應用、排隊推理、比較大小',
  hard: '雞兔同籠、巧算、兩步應用題',
}

const READ_HINTS = {
  easy: '日常單字，睇圖認字',
  medium: '更多生活用字',
  hard: '辨認相似字，好似土同士',
}

const VOCAB_HINTS = {
  easy: '太陽、蘋果呢類常見詞',
  medium: '學校、朋友等詞語',
  hard: '較長詞語，仲要填缺字',
}

const SHAPE_HINTS = {
  easy: '兩個圖形一模一樣定明顯唔同',
  medium: '同一個圖形可能轉咗方向',
  hard: '好似嘅圖形要睇真啲',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [stats, setStats] = useState<Stats>(() => loadStats())

  function commit(updater: (prev: Stats) => Stats) {
    setStats((prev) => {
      const next = updater(prev)
      saveStats(next)
      return next
    })
  }

  function finishRound(game: QuizGameId) {
    commit((prev) => ({
      ...prev,
      [game]: { ...prev[game], rounds: prev[game].rounds + 1 },
    }))
  }

  function firstTryCorrect(game: QuizGameId) {
    commit((prev) => ({
      ...prev,
      stars: prev.stars + 1,
      [game]: {
        ...prev[game],
        firstTry: prev[game].firstTry + 1,
        questions: prev[game].questions + 1,
      },
    }))
  }

  function winSudoku(bonus: number) {
    commit((prev) => ({
      ...prev,
      stars: prev.stars + bonus,
      sudoku: { wins: prev.sudoku.wins + 1 },
    }))
  }

  function winSmartSudoku(info: { difficulty: Difficulty; seconds: number }) {
    commit((prev) => {
      const today = localDay()
      const last = prev.smartSudoku.lastWinDay
      const streak =
        last === today ? Math.max(1, prev.smartSudoku.streak) : last === localDay(-1) ? prev.smartSudoku.streak + 1 : 1
      const bonus = info.difficulty === 'hard' ? 5 : info.difficulty === 'medium' ? 4 : 3
      const bestTime =
        prev.smartSudoku.bestTime == null
          ? info.seconds
          : Math.min(prev.smartSudoku.bestTime, info.seconds)
      return {
        ...prev,
        stars: prev.stars + bonus,
        smartSudoku: {
          ...prev.smartSudoku,
          completed: prev.smartSudoku.completed + 1,
          easy: prev.smartSudoku.easy + (info.difficulty === 'easy' ? 1 : 0),
          medium: prev.smartSudoku.medium + (info.difficulty === 'medium' ? 1 : 0),
          hard: prev.smartSudoku.hard + (info.difficulty === 'hard' ? 1 : 0),
          streak,
          lastWinDay: today,
          bestTime,
        },
      }
    })
  }

  function recordSmartHint() {
    commit((prev) => ({
      ...prev,
      smartSudoku: { ...prev.smartSudoku, hintsUsed: prev.smartSudoku.hintsUsed + 1 },
    }))
  }

  function openGarden() {
    unlockAudio()
    commit((prev) => ({ ...prev, garden: tickGarden(prev.garden) }))
    setScreen('garden')
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          stats={stats}
          onPlay={(id: GameId) => {
            unlockAudio()
            setScreen(id)
          }}
          onGarden={openGarden}
          onToggleMute={() => commit((prev) => ({ ...prev, muted: !prev.muted }))}
        />
      )}

      {screen === 'addsub' && (
        <QuizGame
          title="加加減減"
          tone="mint"
          hints={ADD_HINTS}
          muted={stats.muted}
          makeQuestion={makeAddSub}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('addsub')}
          onFinish={() => finishRound('addsub')}
        />
      )}

      {screen === 'muldiv' && (
        <QuizGame
          title="乘乘除除"
          tone="coral"
          hints={MUL_HINTS}
          muted={stats.muted}
          makeQuestion={makeMulDiv}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('muldiv')}
          onFinish={() => finishRound('muldiv')}
        />
      )}

      {screen === 'olympiad' && (
        <QuizGame
          title="奧數挑戰"
          tone="grape"
          hints={OLY_HINTS}
          muted={stats.muted}
          makeQuestion={makeOlympiad}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('olympiad')}
          onFinish={() => finishRound('olympiad')}
        />
      )}

      {screen === 'readchar' && (
        <QuizGame
          title="認一認字"
          tone="rose"
          hints={READ_HINTS}
          muted={stats.muted}
          makeQuestion={makeReadChar}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('readchar')}
          onFinish={() => finishRound('readchar')}
        />
      )}

      {screen === 'vocab' && (
        <QuizGame
          title="單字配對"
          tone="amber"
          hints={VOCAB_HINTS}
          muted={stats.muted}
          makeQuestion={makeVocab}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('vocab')}
          onFinish={() => finishRound('vocab')}
        />
      )}

      {screen === 'shapes' && (
        <QuizGame
          title="圖形一樣"
          tone="teal"
          hints={SHAPE_HINTS}
          muted={stats.muted}
          makeQuestion={makeShapes}
          onBack={() => setScreen('home')}
          onFirstTryCorrect={() => firstTryCorrect('shapes')}
          onFinish={() => finishRound('shapes')}
        />
      )}

      {screen === 'sudoku' && (
        <SudokuGame
          muted={stats.muted}
          onBack={() => setScreen('home')}
          onWin={winSudoku}
        />
      )}

      {screen === 'smartSudoku' && (
        <SmartSudokuGame
          muted={stats.muted}
          progress={stats.smartSudoku}
          onBack={() => setScreen('home')}
          onToggleMute={() => commit((prev) => ({ ...prev, muted: !prev.muted }))}
          onWin={winSmartSudoku}
          onHintUsed={recordSmartHint}
        />
      )}

      {screen === 'garden' && (
        <Garden
          stats={stats}
          onBack={() => setScreen('home')}
          onChange={(updater) => {
            commit((prev) => {
              const next = updater(prev.garden, prev.stars)
              return { ...prev, garden: next.garden, stars: next.stars }
            })
          }}
        />
      )}
    </div>
  )
}
