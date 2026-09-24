import type { Difficulty, Question } from '../types'
import { pick, shuffle } from './random'

type CharItem = {
  char: string
  meaning: string
  emoji: string
  level: Difficulty
}

type WordItem = {
  word: string
  meaning: string
  emoji: string
  level: Difficulty
}

const CHARS: CharItem[] = [
  { char: '人', meaning: '一個人', emoji: '🧒', level: 'easy' },
  { char: '口', meaning: '嘴巴', emoji: '👄', level: 'easy' },
  { char: '手', meaning: '一隻手', emoji: '✋', level: 'easy' },
  { char: '日', meaning: '太陽／日子', emoji: '☀️', level: 'easy' },
  { char: '月', meaning: '月亮', emoji: '🌙', level: 'easy' },
  { char: '水', meaning: '喝嘅水', emoji: '💧', level: 'easy' },
  { char: '火', meaning: '熱熱嘅火', emoji: '🔥', level: 'easy' },
  { char: '山', meaning: '高高嘅山', emoji: '⛰️', level: 'easy' },
  { char: '木', meaning: '樹木', emoji: '🌲', level: 'easy' },
  { char: '天', meaning: '天空', emoji: '🌤️', level: 'easy' },
  { char: '大', meaning: '好大', emoji: '🐘', level: 'easy' },
  { char: '小', meaning: '好細', emoji: '🐭', level: 'easy' },
  { char: '上', meaning: '喺上面', emoji: '⬆️', level: 'easy' },
  { char: '下', meaning: '喺下面', emoji: '⬇️', level: 'easy' },
  { char: '花', meaning: '一朵花', emoji: '🌸', level: 'easy' },
  { char: '魚', meaning: '游水嘅魚', emoji: '🐟', level: 'easy' },
  { char: '鳥', meaning: '會飛嘅雀', emoji: '🐦', level: 'easy' },
  { char: '車', meaning: '開嘅車', emoji: '🚗', level: 'easy' },
  { char: '門', meaning: '出入嘅門', emoji: '🚪', level: 'easy' },
  { char: '雨', meaning: '落雨', emoji: '🌧️', level: 'easy' },
  { char: '貓', meaning: '喵喵叫嘅動物', emoji: '🐱', level: 'medium' },
  { char: '狗', meaning: '旺旺叫嘅動物', emoji: '🐶', level: 'medium' },
  { char: '羊', meaning: '咩咩叫嘅動物', emoji: '🐑', level: 'medium' },
  { char: '牛', meaning: '耕田嘅動物', emoji: '🐮', level: 'medium' },
  { char: '馬', meaning: '會跑嘅動物', emoji: '🐴', level: 'medium' },
  { char: '雞', meaning: '會生蛋嘅動物', emoji: '🐔', level: 'medium' },
  { char: '樹', meaning: '高大嘅樹木', emoji: '🌳', level: 'medium' },
  { char: '河', meaning: '流動嘅河水', emoji: '🏞️', level: 'medium' },
  { char: '海', meaning: '好大片嘅海水', emoji: '🌊', level: 'medium' },
  { char: '雲', meaning: '天上嘅白雲', emoji: '☁️', level: 'medium' },
  { char: '星', meaning: '夜空嘅星星', emoji: '⭐', level: 'medium' },
  { char: '家', meaning: '屋企／家', emoji: '🏠', level: 'medium' },
  { char: '爸', meaning: '爸爸', emoji: '👨', level: 'medium' },
  { char: '媽', meaning: '媽媽', emoji: '👩', level: 'medium' },
  { char: '學', meaning: '讀書學習', emoji: '📚', level: 'medium' },
  { char: '書', meaning: '可以睇嘅書', emoji: '📖', level: 'medium' },
  { char: '筆', meaning: '寫字嘅筆', emoji: '✏️', level: 'medium' },
  { char: '球', meaning: '波／球', emoji: '⚽', level: 'medium' },
  { char: '糖', meaning: '甜甜嘅糖', emoji: '🍬', level: 'medium' },
  { char: '土', meaning: '泥土', emoji: '🟤', level: 'hard' },
  { char: '士', meaning: '武士／博士', emoji: '🛡️', level: 'hard' },
  { char: '未', meaning: '未過／未到', emoji: '⏳', level: 'hard' },
  { char: '末', meaning: '最後／末梢', emoji: '🔚', level: 'hard' },
  { char: '目', meaning: '眼睛', emoji: '👀', level: 'hard' },
  { char: '太', meaning: '太過／太陽', emoji: '🌞', level: 'hard' },
  { char: '入', meaning: '入去', emoji: '📥', level: 'hard' },
  { char: '己', meaning: '自己', emoji: '🙋', level: 'hard' },
  { char: '已', meaning: '已經', emoji: '✅', level: 'hard' },
  { char: '午', meaning: '中午', emoji: '🕛', level: 'hard' },
  { char: '千', meaning: '一千', emoji: '🔢', level: 'hard' },
  { char: '刀', meaning: '切菜嘅刀', emoji: '🔪', level: 'hard' },
  { char: '力', meaning: '力氣', emoji: '💪', level: 'hard' },
]

const WORDS: WordItem[] = [
  { word: '太陽', meaning: '天上又圓又熱嗰個', emoji: '☀️', level: 'easy' },
  { word: '月亮', meaning: '夜晚發出光嗰個', emoji: '🌙', level: 'easy' },
  { word: '星星', meaning: '夜空一閃一閃', emoji: '⭐', level: 'easy' },
  { word: '蘋果', meaning: '紅紅圓圓嘅生果', emoji: '🍎', level: 'easy' },
  { word: '香蕉', meaning: '黃黃彎彎嘅生果', emoji: '🍌', level: 'easy' },
  { word: '小狗', meaning: '會旺旺叫嘅動物', emoji: '🐶', level: 'easy' },
  { word: '小貓', meaning: '會喵喵叫嘅動物', emoji: '🐱', level: 'easy' },
  { word: '小鳥', meaning: '會飛嘅細隻動物', emoji: '🐦', level: 'easy' },
  { word: '花朵', meaning: '靚靚嘅花', emoji: '🌸', level: 'easy' },
  { word: '下雨', meaning: '天上跌水落嚟', emoji: '🌧️', level: 'easy' },
  { word: '學校', meaning: '讀書學習嘅地方', emoji: '🏫', level: 'medium' },
  { word: '老師', meaning: '教我哋讀書嘅人', emoji: '👩‍🏫', level: 'medium' },
  { word: '朋友', meaning: '一齊玩嘅人', emoji: '🤝', level: 'medium' },
  { word: '開心', meaning: '心情好好', emoji: '😄', level: 'medium' },
  { word: '洗手', meaning: '用清水洗對手', emoji: '🧼', level: 'medium' },
  { word: '吃飯', meaning: '食飯', emoji: '🍚', level: 'medium' },
  { word: '家庭', meaning: '屋企人一齊', emoji: '👨‍👩‍👧‍👦', level: 'medium' },
  { word: '公園', meaning: '有樹有草地玩嘅地方', emoji: '🛝', level: 'medium' },
  { word: '彩虹', meaning: '雨後天上七色橋', emoji: '🌈', level: 'medium' },
  { word: '遊戲', meaning: '玩嘅嘢', emoji: '🎲', level: 'medium' },
  { word: '圖書館', meaning: '好多書可以借嘅地方', emoji: '📚', level: 'hard' },
  { word: '動物園', meaning: '去睇動物嘅園', emoji: '🦁', level: 'hard' },
  { word: '消防車', meaning: '救火嗰架車', emoji: '🚒', level: 'hard' },
  { word: '冰淇淋', meaning: '冰冰甜甜嘅小食', emoji: '🍦', level: 'hard' },
  { word: '望遠鏡', meaning: '睇好遠嘅架生', emoji: '🔭', level: 'hard' },
  { word: '腳踏車', meaning: '用腳踩嘅車', emoji: '🚲', level: 'hard' },
]

const LOOKALIKES: [string, string, string][] = [
  ['土', '士', '泥土嘅土'],
  ['未', '末', '未到嘅未'],
  ['日', '目', '太陽嘅日'],
  ['大', '太', '大小嘅大'],
  ['人', '入', '一個人嘅人'],
  ['己', '已', '自己嘅己'],
  ['午', '牛', '中午嘅午'],
  ['刀', '力', '刀子嘅刀'],
]

function poolChars(difficulty: Difficulty): CharItem[] {
  if (difficulty === 'easy') return CHARS.filter((c) => c.level === 'easy')
  if (difficulty === 'medium') {
    return CHARS.filter((c) => c.level === 'easy' || c.level === 'medium')
  }
  return CHARS
}

function poolWords(difficulty: Difficulty): WordItem[] {
  if (difficulty === 'easy') return WORDS.filter((w) => w.level === 'easy')
  if (difficulty === 'medium') {
    return WORDS.filter((w) => w.level === 'easy' || w.level === 'medium')
  }
  return WORDS
}

function fourChoices(correct: string, extras: string[]): string[] {
  const unique = [...new Set([correct, ...extras.filter((x) => x !== correct)])]
  while (unique.length < 4) unique.push(correct + '？')
  return shuffle(unique.slice(0, 4))
}

export function makeReadChar(difficulty: Difficulty): Question {
  if (difficulty === 'hard' && Math.random() < 0.45) {
    const [a, b, clue] = pick(LOOKALIKES)
    const others = shuffle(CHARS.map((c) => c.char).filter((c) => c !== a && c !== b)).slice(0, 2)
    return {
      prompt: `邊個先係「${clue}」？`,
      input: 'choice',
      choices: fourChoices(a, [b, ...others]),
      answer: a,
      speak: a,
    }
  }

  const set = poolChars(difficulty)
  const item = pick(set)
  const distractors = shuffle(set.filter((c) => c.char !== item.char)).slice(0, 3)

  if (Math.random() < 0.5) {
    return {
      prompt: '睇圖，邊個字先啱？',
      expression: item.emoji,
      input: 'choice',
      choices: fourChoices(item.char, distractors.map((d) => d.char)),
      answer: item.char,
      speak: item.char,
    }
  }

  return {
    prompt: '呢個字係咩意思？',
    expression: item.char,
    input: 'choice',
    choices: fourChoices(item.meaning, distractors.map((d) => d.meaning)),
    answer: item.meaning,
    speak: item.char,
  }
}

export function makeVocab(difficulty: Difficulty): Question {
  const set = poolWords(difficulty)
  const item = pick(set)
  const distractors = shuffle(set.filter((w) => w.word !== item.word)).slice(0, 3)

  if (difficulty === 'hard' && item.word.length >= 2 && Math.random() < 0.5) {
    const hideAt = Math.random() < 0.5 ? 0 : item.word.length - 1
    const shown = item.word.split('').map((ch, i) => (i === hideAt ? '□' : ch)).join('')
    const missing = item.word[hideAt]!
    const extraChars = shuffle(
      WORDS.flatMap((w) => w.word.split('')).filter((ch) => ch !== missing),
    ).slice(0, 3)
    return {
      prompt: `填返缺咗嗰個字：${item.meaning}`,
      expression: shown,
      input: 'choice',
      choices: fourChoices(missing, extraChars),
      answer: missing,
      speak: item.word,
    }
  }

  if (Math.random() < 0.5) {
    return {
      prompt: '睇圖，邊個詞先啱？',
      expression: item.emoji,
      input: 'choice',
      choices: fourChoices(item.word, distractors.map((d) => d.word)),
      answer: item.word,
      speak: item.word,
    }
  }

  return {
    prompt: `「${item.word}」係咩意思？`,
    expression: item.word,
    input: 'choice',
    choices: fourChoices(item.meaning, distractors.map((d) => d.meaning)),
    answer: item.meaning,
    speak: item.word,
  }
}
