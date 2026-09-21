import { useState } from 'react'
import type { GameId, Screen, Stats } from './types'
import { Home } from './components/Home'
import { QuizGame } from './games/QuizGame'
import { SudokuGame } from './games/SudokuGame'
import { makeAddSub } from './lib/addSub'
import { makeMulDiv } from './lib/mulDiv'
import { makeOlympiad } from './lib/olympiad'
import { loadStats, saveStats } from './lib/storage'
import { unlockAudio } from './lib/audio'

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

  function finishRound(game: 'addsub' | 'muldiv' | 'olympiad') {
    commit((prev) => ({
      ...prev,
      [game]: { ...prev[game], rounds: prev[game].rounds + 1 },
    }))
  }

  function firstTryCorrect(game: 'addsub' | 'muldiv' | 'olympiad') {
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

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          stats={stats}
          onPlay={(id: GameId) => {
            unlockAudio()
            setScreen(id)
          }}
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

      {screen === 'sudoku' && (
        <SudokuGame
          muted={stats.muted}
          onBack={() => setScreen('home')}
          onWin={winSudoku}
        />
      )}
    </div>
  )
}
