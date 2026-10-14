import { useState } from 'react'
import type { Difficulty, GameId, QuizGameId, Screen, Stats } from './types'
import { Home } from './components/Home'
import { SkillSettings } from './components/SkillSettings'
import { QuizGame } from './games/QuizGame'
import { SudokuGame } from './games/SudokuGame'
import { Garden } from './games/Garden'
import { SmartSudokuGame } from './games/smartSudoku/SmartSudokuGame'
import { makeAddSub } from './lib/addSub'
import { makeMulDiv } from './lib/mulDiv'
import { makeOlympiad } from './lib/olympiad'
import { makeReadChar, makeVocab } from './lib/words'
import { makeShapes } from './lib/shapes'
import { canEase, nextSkill, shouldPromote, stepSkill } from './lib/skill'
import { normalizeGarden, tickGarden } from './lib/garden'
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
  easy: '單數加減，例如 3 + 5、9 − 4',
  medium: '20 以內加減，例如 8 + 7、15 − 6',
  hard: '雙位數加減，唔使進位／借位',
  expert: '雙位數加法，有進位，用直式由個位寫起',
}

const MUL_HINTS = {
  easy: '1 到 10 嘅乘數表',
  medium: '1 到 10 乘法，同埋答案少過 25 嘅除法',
  hard: '乘除都有，除法答案少過 25',
  expert: '雙位數 × 單位數，有進位，用直式由個位寫起',
}

const OLY_HINTS = {
  easy: '搵規律、填空、簡單應用題',
  medium: '乘法應用、排隊推理、比較大小',
  hard: '雞兔同籠、巧算、兩步應用題',
  expert: '雞兔同籠、巧算、兩步應用題',
}

const READ_HINTS = {
  easy: '日常單字，睇圖認字',
  medium: '更多生活用字',
  hard: '辨認相似字，好似土同士',
  expert: '辨認相似字，好似土同士',
}

const VOCAB_HINTS = {
  easy: '太陽、蘋果呢類常見詞',
  medium: '學校、朋友等詞語',
  hard: '較長詞語，仲要填缺字',
  expert: '較長詞語，仲要填缺字',
}

const SHAPE_HINTS = {
  easy: '兩個圖形一模一樣定明顯唔同',
  medium: '同一個圖形可能轉咗方向',
  hard: '好似嘅圖形要睇真啲',
  expert: '好似嘅圖形要睇真啲',
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

  function finishRound(game: QuizGameId, firstTry: number, info: { eased: boolean }) {
    commit((prev) => {
      const current = prev[game]
      let skill = current.skill
      if (!info.eased && shouldPromote(firstTry)) {
        skill = nextSkill(game, skill) ?? skill
      }
      return {
        ...prev,
        [game]: { ...current, rounds: current.rounds + 1, skill },
      }
    })
  }

  function changeSkill(game: QuizGameId, delta: number) {
    commit((prev) => ({
      ...prev,
      [game]: { ...prev[game], skill: stepSkill(game, prev[game].skill, delta) },
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
          onSkill={() => setScreen('skill')}
          onToggleMute={() => commit((prev) => ({ ...prev, muted: !prev.muted }))}
        />
      )}

      {screen === 'skill' && (
        <SkillSettings
          skills={{
            addsub: stats.addsub.skill,
            muldiv: stats.muldiv.skill,
            olympiad: stats.olympiad.skill,
            readchar: stats.readchar.skill,
            vocab: stats.vocab.skill,
            shapes: stats.shapes.skill,
          }}
          onStep={changeSkill}
          onClose={() => setScreen('home')}
        />
      )}

      {screen === 'addsub' && (
        <QuizGame
          gameId="addsub"
          title="加加減減"
          tone="mint"
          hints={ADD_HINTS}
          skill={stats.addsub.skill}
          muted={stats.muted}
          canEase={canEase('addsub', stats.addsub.skill)}
          makeQuestion={makeAddSub}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('addsub', -1)}
          onFirstTryCorrect={() => firstTryCorrect('addsub')}
          onFinish={(score, info) => finishRound('addsub', score, info)}
        />
      )}

      {screen === 'muldiv' && (
        <QuizGame
          gameId="muldiv"
          title="乘乘除除"
          tone="coral"
          hints={MUL_HINTS}
          skill={stats.muldiv.skill}
          muted={stats.muted}
          canEase={canEase('muldiv', stats.muldiv.skill)}
          makeQuestion={makeMulDiv}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('muldiv', -1)}
          onFirstTryCorrect={() => firstTryCorrect('muldiv')}
          onFinish={(score, info) => finishRound('muldiv', score, info)}
        />
      )}

      {screen === 'olympiad' && (
        <QuizGame
          gameId="olympiad"
          title="奧數挑戰"
          tone="grape"
          hints={OLY_HINTS}
          skill={stats.olympiad.skill}
          muted={stats.muted}
          canEase={canEase('olympiad', stats.olympiad.skill)}
          makeQuestion={makeOlympiad}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('olympiad', -1)}
          onFirstTryCorrect={() => firstTryCorrect('olympiad')}
          onFinish={(score, info) => finishRound('olympiad', score, info)}
        />
      )}

      {screen === 'readchar' && (
        <QuizGame
          gameId="readchar"
          title="認一認字"
          tone="rose"
          hints={READ_HINTS}
          skill={stats.readchar.skill}
          muted={stats.muted}
          canEase={canEase('readchar', stats.readchar.skill)}
          makeQuestion={makeReadChar}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('readchar', -1)}
          onFirstTryCorrect={() => firstTryCorrect('readchar')}
          onFinish={(score, info) => finishRound('readchar', score, info)}
        />
      )}

      {screen === 'vocab' && (
        <QuizGame
          gameId="vocab"
          title="單字配對"
          tone="amber"
          hints={VOCAB_HINTS}
          skill={stats.vocab.skill}
          muted={stats.muted}
          canEase={canEase('vocab', stats.vocab.skill)}
          makeQuestion={makeVocab}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('vocab', -1)}
          onFirstTryCorrect={() => firstTryCorrect('vocab')}
          onFinish={(score, info) => finishRound('vocab', score, info)}
        />
      )}

      {screen === 'shapes' && (
        <QuizGame
          gameId="shapes"
          title="圖形一樣"
          tone="teal"
          hints={SHAPE_HINTS}
          skill={stats.shapes.skill}
          muted={stats.muted}
          canEase={canEase('shapes', stats.shapes.skill)}
          makeQuestion={makeShapes}
          onBack={() => setScreen('home')}
          onEase={() => changeSkill('shapes', -1)}
          onFirstTryCorrect={() => firstTryCorrect('shapes')}
          onFinish={(score, info) => finishRound('shapes', score, info)}
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
              return { ...prev, garden: normalizeGarden(next.garden), stars: next.stars }
            })
          }}
        />
      )}
    </div>
  )
}
