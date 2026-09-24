import { useEffect, useRef, useState } from 'react'
import type { Difficulty, Question, Tone } from '../types'
import { DIFFICULTY_LABEL } from '../types'
import { playCorrect, playTap, playWin, playWrong, unlockAudio } from '../lib/audio'
import { Confetti } from '../components/Confetti'
import { DifficultyPicker } from '../components/DifficultyPicker'
import { NumberPad } from '../components/NumberPad'

const TOTAL = 10

type Props = {
  title: string
  tone: Tone
  hints: Record<Difficulty, string>
  muted: boolean
  makeQuestion: (difficulty: Difficulty) => Question
  onBack: () => void
  onFirstTryCorrect: () => void
  onFinish: () => void
}

function praise(score: number): string {
  if (score === TOTAL) return '太厲害啦 Wesley！滿分！'
  if (score >= 8) return '好叻啊！幾乎全中！'
  if (score >= 5) return '唔錯呀，繼續加油！'
  return '慢慢嚟，多練習就會進步！'
}

export function QuizGame({
  title,
  tone,
  hints,
  muted,
  makeQuestion,
  onBack,
  onFirstTryCorrect,
  onFinish,
}: Props) {
  const [phase, setPhase] = useState<'setup' | 'play' | 'result'>('setup')
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState<Question>(() => makeQuestion('easy'))
  const [input, setInput] = useState('')
  const [tries, setTries] = useState(0)
  const [firstTry, setFirstTry] = useState(0)
  const [feedback, setFeedback] = useState<'ok' | 'bad' | 'reveal' | null>(null)
  const [shake, setShake] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  function beep(kind: 'tap' | 'ok' | 'bad' | 'win') {
    if (muted) return
    unlockAudio()
    if (kind === 'tap') playTap()
    if (kind === 'ok') playCorrect()
    if (kind === 'bad') playWrong()
    if (kind === 'win') playWin()
  }

  function nextQuestion(nextIndex: number, nextFirstTry: number) {
    if (nextIndex >= TOTAL) {
      setFirstTry(nextFirstTry)
      setPhase('result')
      setCelebrate(true)
      beep('win')
      onFinish()
      return
    }
    setIndex(nextIndex)
    setQuestion(makeQuestion(difficulty))
    setInput('')
    setTries(0)
    setFeedback(null)
    setShake(false)
  }

  function start() {
    beep('tap')
    setIndex(0)
    setQuestion(makeQuestion(difficulty))
    setInput('')
    setTries(0)
    setFirstTry(0)
    setFeedback(null)
    setPhase('play')
    setCelebrate(false)
  }

  function check(raw: string) {
    if (feedback === 'ok' || feedback === 'reveal') return
    const expected = String(question.answer)
    if (raw === expected) {
      const gained = tries === 0 ? 1 : 0
      const nextFirstTry = firstTry + gained
      setFirstTry(nextFirstTry)
      setFeedback('ok')
      beep('ok')
      if (gained) onFirstTryCorrect()
      window.setTimeout(() => nextQuestion(index + 1, nextFirstTry), 750)
      return
    }

    const nextTries = tries + 1
    setTries(nextTries)
    setShake(true)
    beep('bad')
    window.setTimeout(() => setShake(false), 400)

    if (nextTries >= 3) {
      setFeedback('reveal')
      window.setTimeout(() => nextQuestion(index + 1, firstTry), 1300)
      return
    }
    setFeedback('bad')
  }

  const checkRef = useRef(check)
  const inputRef = useRef(input)

  useEffect(() => {
    checkRef.current = check
    inputRef.current = input
  })

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (phase !== 'play' || question.input !== 'number') return
      if (event.key >= '0' && event.key <= '9') {
        setInput((cur) => {
          if (cur === '0') return event.key
          return cur.length < 4 ? cur + event.key : cur
        })
      }
      if (event.key === 'Backspace') setInput((cur) => cur.slice(0, -1))
      if (event.key === 'Enter') checkRef.current(inputRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, question.input])

  return (
    <section>
      <Confetti show={celebrate} />
      <div className="shell-head">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="返回">
          ←
        </button>
        <h2>{title}</h2>
        {phase === 'play' && (
          <div className="star-bank">
            ⭐ {firstTry}
          </div>
        )}
      </div>

      {phase === 'setup' && (
        <>
          <p className="prompt">揀難度，然後開始 10 題練習。</p>
          <DifficultyPicker value={difficulty} onChange={setDifficulty} hints={hints} />
          <button type="button" className="primary" onClick={start}>
            開始遊戲
          </button>
        </>
      )}

      {phase === 'play' && (
        <>
          <div className="progress-track">
            <div
              className={`progress-fill ${tone}`}
              style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
            />
          </div>
          <p className="rules">
            {DIFFICULTY_LABEL[difficulty]} · 第 {index + 1} / {TOTAL} 題
          </p>
          <div className={`question-card ${shake ? 'shake' : ''}`}>
            <p className="prompt">{question.prompt}</p>
            {question.speak && (
              <button
                type="button"
                className="speak-btn"
                onClick={() => {
                  if (!window.speechSynthesis || !question.speak) return
                  window.speechSynthesis.cancel()
                  const utter = new SpeechSynthesisUtterance(question.speak)
                  utter.lang = 'zh-HK'
                  utter.rate = 0.85
                  window.speechSynthesis.speak(utter)
                }}
              >
                🔊 讀出嚟
              </button>
            )}
            {question.expression && (
              <p
                className={`expression ${/[\u4e00-\u9fff]/.test(question.expression) ? 'han' : ''}`}
              >
                {question.expression}
              </p>
            )}
            {question.input === 'number' && (
              <div className={`answer-box ${input ? '' : 'caret'}`}>{input}</div>
            )}
            <div
              className={`feedback ${feedback === 'ok' ? 'ok' : ''} ${feedback === 'bad' || feedback === 'reveal' ? 'bad' : ''}`}
            >
              {feedback === 'ok' && (tries === 0 ? '答啱喇！⭐' : '答啱喇！')}
              {feedback === 'bad' && '差少少，再諗諗！'}
              {feedback === 'reveal' && `呢題答案係 ${question.answer}`}
            </div>
          </div>

          {question.input === 'number' && (
            <NumberPad
              value={input}
              onChange={(next: string) => {
                setInput(next)
                if (feedback === 'bad') setFeedback(null)
              }}
              onSubmit={() => {
                if (!input) return
                check(input)
              }}
              disabled={feedback === 'ok' || feedback === 'reveal'}
            />
          )}

          {question.input === 'compare' && (
            <div className="compare-row">
              {(['<', '=', '>'] as const).map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  className="compare-btn"
                  disabled={feedback === 'ok' || feedback === 'reveal'}
                  onClick={() => check(symbol)}
                >
                  <span>{symbol}</span>
                  <small>
                    {symbol === '<' ? '細過' : symbol === '>' ? '大過' : '等於'}
                  </small>
                </button>
              ))}
            </div>
          )}

          {question.input === 'choice' && (
            <div
              className={`choice-list ${question.choices?.every((c) => c.length <= 2) ? 'two-col' : ''}`}
            >
              {question.choices?.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={`choice-btn ${choice.length <= 2 ? 'han' : ''}`}
                  disabled={feedback === 'ok' || feedback === 'reveal'}
                  onClick={() => check(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {phase === 'result' && (
        <div className="result">
          <h2>{praise(firstTry)}</h2>
          <p className="big">⭐ {firstTry}</p>
          <p>10 題入面，有 {firstTry} 題第一次就答啱。</p>
          <div className="actions">
            <button type="button" className="ghost" onClick={onBack}>
              返主頁
            </button>
            <button type="button" className="primary" style={{ marginTop: 0 }} onClick={start}>
              再嚟一局
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
