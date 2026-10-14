import type { Difficulty, QuizGameId } from '../types'
import { DIFFICULTY_LABEL } from '../types'
import { QUIZ_TITLES, canEase, maxSkill, nextSkill } from '../lib/skill'
import { IconSprite } from './IconSprite'

const GAMES: QuizGameId[] = ['addsub', 'muldiv', 'olympiad', 'readchar', 'vocab', 'shapes']

type Props = {
  skills: Record<QuizGameId, Difficulty>
  onStep: (game: QuizGameId, delta: number) => void
  onClose: () => void
}

export function SkillSettings({ skills, onStep, onClose }: Props) {
  return (
    <section>
      <div className="shell-head">
        <button type="button" className="icon-btn" onClick={onClose} aria-label="返回">
          <IconSprite kind="icon-back" size={26} />
        </button>
        <h2>難度設定</h2>
      </div>
      <p className="prompt">
        一局 10 題入面，有 8 題第一次就答啱，就會自動升一級。太難可以喺度調返容易啲。
      </p>
      <div className="skill-list">
        {GAMES.map((game) => {
          const skill = skills[game]
          return (
            <div key={game} className="skill-row">
              <div>
                <strong>{QUIZ_TITLES[game]}</strong>
                <span>
                  而家 {DIFFICULTY_LABEL[skill]}
                  {skill === maxSkill(game) ? ' · 已經最高' : ''}
                </span>
              </div>
              <div className="skill-actions">
                <button
                  type="button"
                  className="ghost"
                  disabled={!canEase(game, skill)}
                  onClick={() => onStep(game, -1)}
                >
                  容易啲
                </button>
                <button
                  type="button"
                  className="ghost"
                  disabled={!nextSkill(game, skill)}
                  onClick={() => onStep(game, 1)}
                >
                  難啲
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
