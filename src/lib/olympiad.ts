import type { Difficulty, Question } from '../types'
import { pick, randInt, shuffle } from './random'

function sequenceAdd(difficulty: Difficulty): Question {
  const start = randInt(1, difficulty === 'easy' ? 10 : 16)
  const step = randInt(2, difficulty === 'hard' ? 8 : 5)
  const terms = [0, 1, 2, 3, 4].map((i) => start + i * step)
  return {
    prompt: '搵規律：問號係幾多？',
    expression: `${terms.slice(0, 4).join('，')}，？`,
    answer: terms[4]!,
    input: 'number',
  }
}

function sequenceGrow(): Question {
  const start = randInt(2, 6)
  const terms = [start]
  for (let i = 1; i <= 4; i += 1) terms.push(terms[i - 1]! + i)
  return {
    prompt: '搵規律：每次加多 1，問號係幾多？',
    expression: `${terms.slice(0, 4).join('，')}，？`,
    answer: terms[4]!,
    input: 'number',
  }
}

function sequenceMul(): Question {
  const start = randInt(2, 4)
  const terms = [start, start * 2, start * 4, start * 8, start * 16]
  return {
    prompt: '搵規律：每格乘 2，問號係幾多？',
    expression: `${terms.slice(0, 4).join('，')}，？`,
    answer: terms[4]!,
    input: 'number',
  }
}

function missingOp(difficulty: Difficulty): Question {
  const kind = pick(['+', '-', '×', '÷'] as const)
  if (kind === '+' || kind === '-') {
    const a = randInt(12, difficulty === 'easy' ? 40 : 80)
    const b = randInt(6, difficulty === 'easy' ? 20 : 40)
    if (kind === '+') {
      return {
        prompt: '空格入邊應該填幾多？',
        expression: `${a} + □ = ${a + b}`,
        answer: b,
        input: 'number',
      }
    }
    const big = a + b
    return {
      prompt: '空格入邊應該填幾多？',
      expression: `${big} − □ = ${a}`,
      answer: b,
      input: 'number',
    }
  }
  const x = randInt(2, 9)
  const y = randInt(2, difficulty === 'hard' ? 9 : 6)
  if (kind === '×') {
    return {
      prompt: '空格入邊應該填幾多？',
      expression: `${x} × □ = ${x * y}`,
      answer: y,
      input: 'number',
    }
  }
  return {
    prompt: '空格入邊應該填幾多？',
    expression: `${x * y} ÷ □ = ${x}`,
    answer: y,
    input: 'number',
  }
}

function placeValue(): Question {
  const tens = randInt(1, 9)
  const ones = randInt(0, 9)
  if (Math.random() < 0.5) {
    return {
      prompt: `一個兩位數，十位係 ${tens}，個位係 ${ones}。呢個數係幾多？`,
      answer: tens * 10 + ones,
      input: 'number',
    }
  }
  const n = tens * 10 + ones
  return {
    prompt: `數字 ${n} 嘅十位同個位相加，等於幾多？`,
    answer: tens + ones,
    input: 'number',
  }
}

function wordAddSub(difficulty: Difficulty): Question {
  const a = randInt(difficulty === 'easy' ? 12 : 20, difficulty === 'hard' ? 86 : 48)
  const b = randInt(6, difficulty === 'easy' ? 18 : 36)
  if (Math.random() < 0.5) {
    return {
      prompt: `Wesley 有 ${a} 粒貼紙，再得到 ${b} 粒。而家有幾多粒？`,
      answer: a + b,
      input: 'number',
    }
  }
  const have = a + b
  return {
    prompt: `Wesley 有 ${have} 枝顏色筆，借咗 ${b} 枝俾同學。仲餘幾多枝？`,
    answer: a,
    input: 'number',
  }
}

function wordMulDiv(difficulty: Difficulty): Question {
  const n = randInt(2, difficulty === 'hard' ? 9 : 6)
  const m = randInt(2, difficulty === 'hard' ? 8 : 5)
  if (Math.random() < 0.5) {
    return {
      prompt: `每盒有 ${n} 塊餅，${m} 盒一共有幾多塊？`,
      answer: n * m,
      input: 'number',
    }
  }
  return {
    prompt: `有 ${n * m} 粒糖，平均分給 ${n} 個小朋友。每人分到幾多粒？`,
    answer: m,
    input: 'number',
  }
}

function queue(): Question {
  const front = randInt(2, 8)
  const back = randInt(2, 8)
  return {
    prompt: `排隊嘅時候，Wesley 前面有 ${front} 個人，後面有 ${back} 個人。連佢自己，一共有幾多人？`,
    answer: front + back + 1,
    input: 'number',
  }
}

function twoStep(): Question {
  const start = randInt(18, 40)
  const spent = randInt(5, 12)
  const got = randInt(8, 20)
  return {
    prompt: `Wesley 有 ${start} 元，買咗 ${spent} 元零食，媽媽再俾 ${got} 元佢。而家有幾多錢？`,
    answer: start - spent + got,
    input: 'number',
  }
}

function cleverAdd(): Question {
  const n = pick([12, 15, 19, 25, 50])
  const k = randInt(3, 6)
  const parts = Array.from({ length: k }, () => String(n)).join(' + ')
  return {
    prompt: '用巧算計一計（可以想成乘法）：',
    expression: `${parts} = ？`,
    answer: n * k,
    input: 'number',
  }
}

function chickenRabbit(): Question {
  const heads = randInt(5, 9)
  const rabbits = randInt(1, heads - 1)
  const chickens = heads - rabbits
  const legs = rabbits * 4 + chickens * 2
  const askRabbit = Math.random() < 0.5
  return {
    prompt: `籠裡面有雞同兔一共 ${heads} 隻，腳一共 ${legs} 隻。${askRabbit ? '兔' : '雞'}有幾多隻？`,
    answer: askRabbit ? rabbits : chickens,
    input: 'number',
  }
}

function digitPuzzle(): Question {
  const ones = randInt(1, 4)
  const tens = ones * 2
  return {
    prompt: `一個兩位數，十位數字係個位數字嘅 2 倍，個位係 ${ones}。呢個數係幾多？`,
    answer: tens * 10 + ones,
    input: 'number',
  }
}

function sumToN(): Question {
  const n = randInt(6, 10)
  const answer = (n * (n + 1)) / 2
  return {
    prompt: '由 1 加到最後一個數，總和係幾多？',
    expression: n <= 7 ? `${Array.from({ length: n }, (_, i) => i + 1).join(' + ')} = ？` : `1 + 2 + … + ${n} = ？`,
    answer,
    input: 'number',
  }
}

function countStars(difficulty: Difficulty): Question {
  const groups = randInt(2, difficulty === 'easy' ? 4 : 5)
  const per = randInt(2, difficulty === 'easy' ? 4 : 6)
  const row = Array.from({ length: per }, () => '⭐').join('')
  const expression = Array.from({ length: groups }, () => row).join('\n')
  return {
    prompt: '一共有幾多粒星？',
    expression,
    answer: groups * per,
    input: 'number',
  }
}

function compare(difficulty: Difficulty): Question {
  if (difficulty === 'easy') {
    const a = randInt(12, 80)
    let b = randInt(12, 80)
    if (b === a) b += 1
    const answer = a > b ? '>' : a < b ? '<' : '='
    return {
      prompt: '揀正確符號：左邊比右邊大、細，定係相等？',
      expression: `${a}  ○  ${b}`,
      answer,
      input: 'compare',
    }
  }

  const a = randInt(8, 36)
  const b = randInt(8, 36)
  const leftMul = randInt(2, difficulty === 'hard' ? 4 : 2)
  const useLeftAdd = Math.random() < 0.5
  const left = useLeftAdd ? a + b : a * leftMul
  const leftText = useLeftAdd ? `${a} + ${b}` : `${a} × ${leftMul}`

  const useRightAdd = Math.random() < 0.5
  const c = randInt(8, 36)
  const d = randInt(8, 36)
  const rightMul = randInt(2, difficulty === 'hard' ? 4 : 2)
  const right = useRightAdd ? c + d : difficulty === 'hard' ? c * rightMul : 40 + randInt(-8, 12)
  const rightText = useRightAdd
    ? `${c} + ${d}`
    : difficulty === 'hard'
      ? `${c} × ${rightMul}`
      : String(right)

  const answer = left > right ? '>' : left < right ? '<' : '='
  return {
    prompt: '先計兩邊，再揀正確符號。',
    expression: `${leftText}  ○  ${rightText}`,
    answer,
    input: 'compare',
  }
}

function choiceProduct(difficulty: Difficulty): Question {
  const a = randInt(difficulty === 'easy' ? 2 : 4, 9)
  const b = randInt(difficulty === 'easy' ? 2 : 4, 9)
  const product = a * b
  const correct = `${a} × ${b}`
  const options = new Set<string>([correct])
  let guard = 0
  while (options.size < 4 && guard < 40) {
    guard += 1
    const x = randInt(2, 9)
    const y = randInt(2, 9)
    if (x * y !== product) options.add(`${x} × ${y}`)
  }
  return {
    prompt: `邊個等於 ${product}？`,
    input: 'choice',
    choices: shuffle([...options]),
    answer: correct,
  }
}

type Maker = (difficulty: Difficulty) => Question

const easyMakers: Maker[] = [
  sequenceAdd,
  missingOp,
  placeValue,
  wordAddSub,
  countStars,
  compare,
]
const mediumMakers: Maker[] = [
  sequenceAdd,
  sequenceMul,
  missingOp,
  wordMulDiv,
  queue,
  compare,
  choiceProduct,
  placeValue,
]
const hardMakers: Maker[] = [
  sequenceGrow,
  chickenRabbit,
  twoStep,
  cleverAdd,
  digitPuzzle,
  compare,
  sumToN,
  wordMulDiv,
  missingOp,
]

export function makeOlympiad(difficulty: Difficulty): Question {
  const makers =
    difficulty === 'easy'
      ? easyMakers
      : difficulty === 'hard'
        ? hardMakers
        : mediumMakers
  return pick(makers)(difficulty)
}
