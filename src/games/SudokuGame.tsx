import { useMemo, useState } from 'react'
import type { Difficulty } from '../types'
import { DIFFICULTY_LABEL } from '../types'
import {
  findHint,
  generateSudoku,
  hasConflict,
  isComplete,
  type Grid,
} from '../lib/sudoku'
import { playCorrect, playTap, playWin, playWrong, unlockAudio } from '../lib/audio'
import { Confetti } from '../components/Confetti'
import { DifficultyPicker } from '../components/DifficultyPicker'

const CLUES: Record<Difficulty, number> = {
  easy: 10,
  medium: 8,
  hard: 6,
}

const HINTS: Record<Difficulty, string> = {
  easy: '已知數字較多，適合入門',
  medium: '空格多啲，要慢慢推理',
  hard: '已知最少，考觀察力',
}

function givenMap(puzzle: Grid): boolean[][] {
  return puzzle.map((row) => row.map((cell) => cell !== 0))
}

function blankGrid(): Grid {
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
}

function starBonus(difficulty: Difficulty): number {
  if (difficulty === 'hard') return 5
  if (difficulty === 'medium') return 4
  return 3
}

type Props = {
  muted: boolean
  onBack: () => void
  onWin: (bonus: number) => void
}

export function SudokuGame({ muted, onBack, onWin }: Props) {
  const [phase, setPhase] = useState<'setup' | 'play' | 'win'>('setup')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [solution, setSolution] = useState<Grid>(blankGrid)
  const [grid, setGrid] = useState<Grid>(blankGrid)
  const [given, setGiven] = useState<boolean[][]>(() =>
    blankGrid().map((row) => row.map(() => false)),
  )
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [message, setMessage] = useState('')

  const givenCount = useMemo(
    () => given.flat().filter(Boolean).length,
    [given],
  )

  function beep(kind: 'tap' | 'ok' | 'bad' | 'win') {
    if (muted) return
    unlockAudio()
    if (kind === 'tap') playTap()
    if (kind === 'ok') playCorrect()
    if (kind === 'bad') playWrong()
    if (kind === 'win') playWin()
  }

  function deal(nextDifficulty = difficulty) {
    const next = generateSudoku(CLUES[nextDifficulty])
    setSolution(next.solution)
    setGrid(next.puzzle.map((row) => [...row]))
    setGiven(givenMap(next.puzzle))
    setSelected(null)
    setMessage('')
    setPhase('play')
  }

  function put(n: number) {
    if (!selected) return
    const [r, c] = selected
    if (given[r]![c]) return
    const next = grid.map((row) => [...row])
    next[r]![c] = n
    setGrid(next)
    beep('tap')
    if (isComplete(next, solution)) finishWin()
  }

  function finishWin() {
    setPhase('win')
    beep('win')
    onWin(starBonus(difficulty))
  }

  function erase() {
    if (!selected) return
    const [r, c] = selected
    if (given[r]![c]) return
    const next = grid.map((row) => [...row])
    next[r]![c] = 0
    setGrid(next)
    beep('tap')
  }

  function hint() {
    const spot = findHint(grid, solution)
    if (!spot) return
    const next = grid.map((row) => [...row])
    next[spot.r]![spot.c] = spot.n
    setGrid(next)
    setSelected([spot.r, spot.c])
    setMessage('提示：幫你填咗一格')
    beep('ok')
    if (isComplete(next, solution)) finishWin()
  }

  function check() {
    let wrong = 0
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const n = grid[r]![c]!
        if (n !== 0 && n !== solution[r]![c]) wrong += 1
      }
    }
    if (wrong === 0 && grid.flat().every((n) => n !== 0)) {
      finishWin()
      return
    }
    if (wrong === 0) {
      setMessage('而家填過嘅都啱，繼續！')
      beep('ok')
      return
    }
    setMessage(`有 ${wrong} 格填錯咗，再睇睇。`)
    beep('bad')
  }

  return (
    <section>
      <Confetti show={phase === 'win'} />
      <div className="shell-head">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="返回">
          ←
        </button>
        <h2>四宮數獨</h2>
      </div>

      {phase === 'setup' && (
        <>
          <p className="prompt">每行、每列、每個 2×2 小方格都要有 1～4，而且唔可以重複。</p>
          <DifficultyPicker value={difficulty} onChange={setDifficulty} hints={HINTS} />
          <button type="button" className="primary" onClick={() => deal()}>
            開始遊戲
          </button>
        </>
      )}

      {(phase === 'play' || phase === 'win') && (
        <div className="sudoku-wrap">
          <p className="rules">
            {DIFFICULTY_LABEL[difficulty]} · 已知 {givenCount} 格
          </p>
          <div className="sudoku-grid">
            {grid.map((row, r) =>
              row.map((n, c) => {
                const isGiven = given[r]![c]
                const selectedHere = selected?.[0] === r && selected?.[1] === c
                const conflict = n !== 0 && hasConflict(grid, r, c)
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    className={[
                      'sudoku-cell',
                      n ? `n${n}` : '',
                      isGiven ? 'given' : '',
                      selectedHere ? 'selected' : '',
                      conflict ? 'conflict' : '',
                      c === 1 ? 'box-right' : '',
                      r === 1 ? 'box-bottom' : '',
                    ].join(' ')}
                    onClick={() => setSelected([r, c])}
                  >
                    {n || ''}
                  </button>
                )
              }),
            )}
          </div>

          {phase === 'play' && (
            <>
              <div className="num-row">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`sudoku-num n${n}`}
                    onClick={() => put(n)}
                  >
                    {n}
                  </button>
                ))}
                <button type="button" className="sudoku-num" onClick={erase}>
                  擦
                </button>
              </div>
              <p className="rules">{message || '撳其中一格，再揀 1～4。重複嘅數字會變紅色。'}</p>
              <div className="actions">
                <button type="button" className="ghost" onClick={hint}>
                  提示
                </button>
                <button type="button" className="ghost" onClick={check}>
                  檢查
                </button>
              </div>
              <button type="button" className="primary" onClick={() => deal()}>
                換一題
              </button>
            </>
          )}

          {phase === 'win' && (
            <div className="result" style={{ marginTop: 18, width: '100%' }}>
              <h2>完成喇！好叻啊 Wesley！</h2>
              <p className="big">⭐ +{difficulty === 'hard' ? 5 : difficulty === 'medium' ? 4 : 3}</p>
              <div className="actions">
                <button type="button" className="ghost" onClick={onBack}>
                  返主頁
                </button>
                <button
                  type="button"
                  className="primary"
                  style={{ marginTop: 0 }}
                  onClick={() => deal()}
                >
                  再嚟一局
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
