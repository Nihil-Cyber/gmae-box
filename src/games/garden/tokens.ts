// 我嘅家園 · 設計 token（同 garden.css 入面嘅 CSS 變數一一對應）
export const color = {
  paper: '#F6E7C1',        // 奶油紙底
  ink: '#2B2118',          // 暖棕文字
  inkSoft: '#5E4A36',      // 次要文字 / 未選 tab
  inkMuted: '#6B5540',     // 卡片短介紹
  card: '#FFFBF0',         // 卡面、對話框、劇場外框
  chip: '#FFF8E8',         // 返回掣、星星、次要掣
  track: '#EAD3A0',        // tab 底座、狀態條軌道
  paperShadow: '#E0C68E',  // 紙本陰影（通用）
  shopPanel: '#FCEBC8',    // 商店櫃台底

  honey: '#F2B04A',        // 主掣：餵零食、購買、去商店
  honeyShadow: '#C57F24',
  sun: '#F7C948',          // 星星、選中 tab、開心條
  sunShadow: '#D69B1C',
  clay: '#D9784F',         // 飽肚條
  clayText: '#A8522B',     // 寵物名、飽肚 icon
  mint: '#9ED4AC',         // 擺出
  mintShadow: '#5E9F6E',
  mintInk: '#1F3F29',
  ownedBg: '#DDF1E1',      // 已擁有 / 而家喺度
  ownedInk: '#2F6B45',
  shortBg: '#FFF1D6',      // 星星唔夠（保持暖色，唔好灰）
  shortShadow: '#E6CFA0',
  shortInk: '#6E5037',

  skyHappy: '#C6E5F3',     // 開心時天空
  skyCalm: '#D6EAF0',      // 空狀態 / 普通
  hillFar: '#B3DDB9',
  hillMid: '#96CDA3',
  hillNear: '#84C193',
} as const;

export const radius = { theater: 30, theaterInner: 22, button: 22, card: 22, cardButton: 16, chip: 24 } as const;

/** 紙本陰影：下邊實色色塊，唔用模糊 */
export const shadow = {
  paper: `0 6px 0 ${color.paperShadow}`,
  card: `0 5px 0 ${color.paperShadow}`,
  honey: `0 6px 0 ${color.honeyShadow}`,
  mint: `0 4px 0 ${color.mintShadow}`,
} as const;

export const size = {
  mainButton: 64,       // 摸一摸 / 餵零食（iPad 76）
  iconButton: 48,       // 返回
  starPill: 44,
  tab: 50,
  cardButton: 46,
  theaterPhone: 392,    // 約 46% 畫面高
  theaterTablet: 560,
  petPhone: 136,        // 約 35% 畫面闊
  petTablet: 200,
  safeTop: 50,
  safeBottom: 34,
} as const;

export const font = {
  family: "'Chiron GoRound TC', 'Huninn', 'PingFang TC', 'Noto Sans TC', sans-serif",
  title: 22, button: 21, body: 17, caption: 14,
} as const;
