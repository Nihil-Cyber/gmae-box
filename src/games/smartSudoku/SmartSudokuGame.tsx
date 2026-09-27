import { useEffect, useMemo, useRef, useState } from 'react'
import type { Difficulty, SmartSudokuProgress } from '../../types'
import { DIFFICULTY_LABEL } from '../../types'
import {
  checkCompletion,
  cloneBoard,
  countClues,
  DIGITS,
  emptyBoard,
  generatePuzzle,
  getCandidates,
  getHint,
  isValidMove,
  modeConfig,
  type Board,
  type Digit,
} from '../../lib/smartSudoku'
import { playPop, playTap, playWin, playWrong, unlockAudio } from '../../lib/audio'
import { Confetti } from '../../components/Confetti'
import { DifficultyPicker } from '../../components/DifficultyPicker'
import { NumberTray } from './NumberTray'
import { SudokuBoard } from './SudokuBoard'
import './smartSudoku.css'

const SETUP_HINTS: Record<Difficulty, string> = {
  easy: '已知好多格，4–5 歲都得',
  medium: '空格多啲，慢慢睇',
  hard: '已知最少，要仔細諗',
}

function givenFrom(puzzle: Board): boolean[][] {
  return puzzle.map((row) => row.map((cell) => cell !== 0))
}

function keyOf(row: number, col: number): string {
  return `${row}-${col}`
}

type Fx = 'shake' | 'bounce' | 'wave'
type Props = {
  muted: boolean
  progress: SmartSudokuProgress
  onBack: () => void
  onToggleMute: () => void
  onWin: (info: { difficulty: Difficulty; seconds: number }) => void
  onHintUsed: () => void
}

export function SmartSudokuGame({
  muted,
  progress,
  onBack,
  onToggleMute,
  onWin,
  onHintUsed,
}: Props) {
  const mode = modeConfig('classic')
  const [phase, setPhase] = useState<'setup' | 'play' | 'win'>('setup')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [start, setStart] = useState<Board>(() => emptyBoard())
  const [board, setBoard] = useState<Board>(() => emptyBoard())
  const [given, setGiven] = useState<boolean[][]>(() => givenFrom(emptyBoard()))
  const [history, setHistory] = useState<Board[]>([])
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [paint, setPaint] = useState<Digit | null>(null)
  const [hintCell, setHintCell] = useState<[number, number] | null>(null)
  const [hintStage, setHintStage] = useState(0)
  const [fx, setFx] = useState<Record<string, Fx | null>>({})
  const [note, setNote] = useState('')
  const startedAt = useRef(0)
  const won = useRef(false)
  const timers = useRef<number[]>([])

  const clues = useMemo(() => countClues(start), [start])

  function beep(kind: 'tap' | 'pop' | 'bad' | 'win') {
    if (muted) return
    unlockAudio()
    if (kind === 'tap') playTap()
    if (kind === 'pop') playPop()
    if (kind === 'bad') playWrong()
    if (kind === 'win') playWin()
  }

  function later(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
  }

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  function flash(row: number, col: number, kind: Fx, ms = 420) {
    const k = keyOf(row, col)
    setFx((prev) => ({ ...prev, [k]: kind }))
    later(() => {
      setFx((prev) => ({ ...prev, [k]: null }))
    }, ms)
  }

  function deal(nextDifficulty = difficulty) {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    const generated = generatePuzzle(nextDifficulty)
    const puzzle = generated.puzzle
    setDifficulty(nextDifficulty)
    setStart(puzzle)
    setBoard(cloneBoard(puzzle))
    setGiven(givenFrom(puzzle))
    setHistory([])
    setSelected(null)
    setPaint(null)
    setHintCell(null)
    setHintStage(0)
    setFx({})
    setNote('')
    setPhase('play')
    startedAt.current = Date.now()
    won.current = false
    beep('tap')
  }

  function tryPlace(row: number, col: number, digit: Digit) {
    if (phase !== 'play' || given[row]![col] || board[row]![col] !== 0) return
    if (!isValidMove(board, row, col, digit)) {
      flash(row, col, 'shake', 380)
      beep('bad')
      setNote('呢格而家放唔到呢個數字，再睇睇行同列。')
      return
    }
    const next = cloneBoard(board)
    next[row]![col] = digit
    setHistory((prev) => [...prev, cloneBoard(board)])
    setBoard(next)
    setSelected([row, col])
    setPaint(null)
    flash(row, col, 'bounce', 480)
    beep('pop')
    setNote('')
    if (hintCell && hintCell[0] === row && hintCell[1] === col) {
      setHintCell(null)
      setHintStage(0)
    }
    if (checkCompletion(next)) finish()
  }

  function finish() {
    if (won.current) return
    won.current = true
    setPhase('win')
    beep('win')
    const seconds = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000))
    onWin({ difficulty, seconds })
  }

  function onCell(row: number, col: number) {
    if (phase !== 'play') return
    beep('tap')
    setSelected([row, col])
    if (paint && !given[row]![col] && board[row]![col] === 0) {
      tryPlace(row, col, paint)
    }
  }

  function onPick(digit: Digit) {
    if (phase !== 'play') return
    beep('tap')
    if (selected) {
      const [r, c] = selected
      if (!given[r]![c] && board[r]![c] === 0) {
        tryPlace(r, c, digit)
        return
      }
    }
    setPaint((cur) => (cur === digit ? null : digit))
  }

  function undo() {
    const prev = history[history.length - 1]
    if (!prev) return
    beep('tap')
    setBoard(cloneBoard(prev))
    setHistory((list) => list.slice(0, -1))
    setNote('')
  }

  function reset() {
    beep('tap')
    setBoard(cloneBoard(start))
    setHistory([])
    setSelected(null)
    setPaint(null)
    setHintCell(null)
    setHintStage(0)
    setNote('')
    startedAt.current = Date.now()
  }

  function hint() {
    if (phase !== 'play') return
    const found = getHint(board)
    if (!found) {
      setNote('試吓撳復原，再慢慢諗。')
      beep('tap')
      return
    }
    const same = hintCell?.[0] === found.row && hintCell?.[1] === found.col
    const stage = same ? Math.min(3, hintStage + 1) : 1
    setHintCell([found.row, found.col])
    setHintStage(stage)
    setSelected([found.row, found.col])
    setPaint(null)
    onHintUsed()
    beep('tap')
    if (stage === 1) setNote('睇高亮嘅行、列同宮格，揀最容易嗰格。')
    if (stage === 2) setNote('淺色嗰啲數字而家較難放呢格。')
    if (stage === 3) {
      setNote('')
      tryPlace(found.row, found.col, found.value)
    }
  }

  const candidates =
    selected && board[selected[0]]![selected[1]] === 0 && !given[selected[0]]![selected[1]]
      ? getCandidates(board, selected[0], selected[1])
      : [...DIGITS]

  const sameDigit: Digit | 0 =
    paint ??
    (selected ? (board[selected[0]]![selected[1]] as Digit | 0) : 0)

  return (
    <section className="ss-shell">
      <Confetti show={phase === 'win'} />
      <div className="ss-top">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="返回">
          ←
        </button>
        <h2>智能數獨</h2>
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleMute}
          aria-label={muted ? '開啟聲音' : '關閉聲音'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </div>

      {phase === 'setup' && (
        <>
          <p className="prompt">每行、每列、每個 2×3 格都要有 1–6。</p>
          <DifficultyPicker value={difficulty} onChange={setDifficulty} hints={SETUP_HINTS} />
          <button type="button" className="primary" onClick={() => deal(difficulty)}>
            開始遊戲
          </button>
        </>
      )}

      {phase !== 'setup' && (
        <>
          <div className="ss-meta">
            <span className="ss-chip">⭐ {progress.completed}</span>
            <span className="ss-chip">
              {DIFFICULTY_LABEL[difficulty]} · {clues} 格
            </span>
            <button type="button" className="ss-hint-btn" onClick={hint} disabled={phase !== 'play'}>
              💡 提示
            </button>
          </div>

          <SudokuBoard
            board={board}
            given={given}
            selected={selected}
            sameDigit={sameDigit}
            hintCell={hintCell}
            fx={fx}
            waving={phase === 'win'}
            onCell={onCell}
          />

          {phase === 'play' && (
            <>
              <NumberTray
                selected={paint}
                candidates={candidates}
                strongHint={hintStage >= 2}
                disabled={false}
                showNumbers={mode.showNumbers}
                onPick={onPick}
              />
              {note ? <p className="ss-note">{note}</p> : <p className="ss-note muted">撳空格，再揀數字。</p>}
              <div className="ss-tools">
                <button type="button" className="ghost" onClick={undo} disabled={history.length === 0}>
                  復原
                </button>
                <button type="button" className="ghost" onClick={reset}>
                  重來
                </button>
              </div>
            </>
          )}

          {phase === 'win' && (
            <div className="ss-win">
              <h2>🎉 完成！</h2>
              <p>好叻啊 Wesley！</p>
              <div className="actions">
                <button type="button" className="ghost" onClick={() => deal(difficulty)}>
                  再玩一題
                </button>
                <button type="button" className="primary" style={{ marginTop: 0 }} onClick={() => deal(difficulty)}>
                  下一題
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
