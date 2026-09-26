// 我嘅家園 · 裝飾（純 SVG）
// 用法：<DecoSprite kind="flower" size={64} />
import type { JSX } from 'react';

export type DecoKind =
  | 'sun' | 'moon' | 'stars' | 'rainbow' | 'cloud'
  | 'flower' | 'tree' | 'mushroom' | 'house' | 'fountain'
  | 'lantern' | 'balloon' | 'pond' | 'fence' | 'fruittree';

export type DecoZone = 'sky' | 'ground';

export const DECO_META: Record<DecoKind, { name: string; zone: DecoZone; blurb: string }> = {
  sun:       { name: '太陽', zone: 'sky',    blurb: '暖笠笠照住大家' },
  moon:      { name: '月亮', zone: 'sky',    blurb: '夜晚陪你瞓覺' },
  stars:     { name: '星空', zone: 'sky',    blurb: '一閃一閃亮晶晶' },
  rainbow:   { name: '彩虹', zone: 'sky',    blurb: '落完雨就出現' },
  cloud:     { name: '白雲', zone: 'sky',    blurb: '軟綿綿咁飄' },
  flower:    { name: '小花', zone: 'ground', blurb: '令草地香噴噴' },
  tree:      { name: '大樹', zone: 'ground', blurb: '俾大家遮太陽' },
  mushroom:  { name: '蘑菇', zone: 'ground', blurb: '細細粒，好得意' },
  house:     { name: '小屋', zone: 'ground', blurb: '寵物可以返屋企' },
  fountain:  { name: '噴泉', zone: 'ground', blurb: '水花跳跳舞' },
  lantern:   { name: '燈籠', zone: 'ground', blurb: '夜晚都光猛猛' },
  balloon:   { name: '氣球', zone: 'ground', blurb: '輕飄飄，好開心' },
  pond:      { name: '小池', zone: 'ground', blurb: '小魚喺度游水' },
  fence:     { name: '木欄', zone: 'ground', blurb: '圍住我哋嘅花園' },
  fruittree: { name: '果樹', zone: 'ground', blurb: '結滿香甜果子' },
};

const DRAW: Record<DecoKind, () => JSX.Element> = {
  sun: () => (
    <>
      <circle cx="50" cy="50" r="42" fill="#F7C948" opacity="0.2" />
      <path d="M50 8 v8 M50 84 v8 M8 50 h8 M84 50 h8 M20 20 l6 6 M74 74 l6 6 M80 20 l-6 6 M20 80 l6 -6" stroke="#F2B632" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="24" fill="#F7C948" />
      <ellipse cx="42" cy="41" rx="8" ry="5" fill="#FFFFFF" opacity="0.45" transform="rotate(-30 42 41)" />
      <path d="M38 49 Q42 45 46 49 M54 49 Q58 45 62 49 M43 56 Q50 62 57 56" stroke="#B5701F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="57" rx="3.5" ry="2" fill="#F29A7A" opacity="0.8" />
      <ellipse cx="63" cy="57" rx="3.5" ry="2" fill="#F29A7A" opacity="0.8" />
    </>
  ),
  cloud: () => (
    <>
      <path d="M22 66 C10 66 10 50 22 50 C22 36 42 32 48 44 C54 34 72 36 72 50 C86 48 90 66 78 66 Z" fill="#FFFFFF" />
      <path d="M18 61 C30 65 70 65 84 61 C86 64 82 66 78 66 L22 66 C19 66 17 64 18 61 Z" fill="#DCE9EF" />
    </>
  ),
  rainbow: () => (
    <>
      <g fill="none" strokeLinecap="round" strokeWidth="7">
      <path d="M14 74 A36 36 0 0 1 86 74" stroke="#F08A6E" />
      <path d="M21 74 A29 29 0 0 1 79 74" stroke="#F7C948" />
      <path d="M28 74 A22 22 0 0 1 72 74" stroke="#8CC89B" />
      <path d="M35 74 A15 15 0 0 1 65 74" stroke="#8EC5E0" />
      </g>
      <ellipse cx="18" cy="77" rx="13" ry="7" fill="#FFFFFF" />
      <circle cx="14" cy="72" r="6" fill="#FFFFFF" />
      <ellipse cx="82" cy="77" rx="13" ry="7" fill="#FFFFFF" />
      <circle cx="86" cy="72" r="6" fill="#FFFFFF" />
    </>
  ),
  flower: () => (
    <>
      <ellipse cx="50" cy="92" rx="22" ry="4" fill="#2B2118" opacity="0.12" />
      <path d="M50 90 C50 76 50 66 50 50" stroke="#5E9F6E" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M50 80 C40 80 34 72 36 66 C44 66 50 72 50 80 Z" fill="#7CBF8C" />
      <path d="M50 72 C60 72 66 64 64 58 C56 58 50 64 50 72 Z" fill="#8CC89B" />
      <circle cx="50" cy="29" r="9" fill="#F4907E" />
      <circle cx="60.5" cy="36.6" r="9" fill="#F4907E" />
      <circle cx="56.5" cy="49" r="9" fill="#F4907E" />
      <circle cx="43.5" cy="49" r="9" fill="#F4907E" />
      <circle cx="39.5" cy="36.6" r="9" fill="#F4907E" />
      <circle cx="50" cy="40" r="7" fill="#F7C948" />
    </>
  ),
  tree: () => (
    <>
      <ellipse cx="50" cy="93" rx="28" ry="4.5" fill="#2B2118" opacity="0.13" />
      <path d="M45 92 L46 60 L54 60 L55 92 Z" fill="#9C6B45" stroke="#9C6B45" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="35" cy="54" r="18" fill="#6FB282" />
      <circle cx="65" cy="54" r="18" fill="#6FB282" />
      <circle cx="50" cy="58" r="17" fill="#7CBF8C" />
      <circle cx="50" cy="35" r="22" fill="#94CFA2" />
      <ellipse cx="42" cy="28" rx="8" ry="5" fill="#FFFFFF" opacity="0.3" transform="rotate(-25 42 28)" />
    </>
  ),
  mushroom: () => (
    <>
      <ellipse cx="50" cy="92" rx="24" ry="4" fill="#2B2118" opacity="0.13" />
      <path d="M40 90 C40 74 42 64 44 60 L56 60 C58 64 60 74 60 90 Z" fill="#FBEBD6" stroke="#E6CDB0" strokeWidth="2" />
      <path d="M16 62 C16 34 84 34 84 62 Z" fill="#F08A6E" stroke="#F08A6E" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="36" cy="49" r="5" fill="#FFFFFF" />
      <circle cx="56" cy="43" r="6" fill="#FFFFFF" />
      <circle cx="70" cy="55" r="4" fill="#FFFFFF" />
      <circle cx="47" cy="58" r="3.5" fill="#FFFFFF" />
    </>
  ),
  house: () => (
    <>
      <ellipse cx="50" cy="93" rx="34" ry="4.5" fill="#2B2118" opacity="0.13" />
      <rect x="62" y="24" width="8" height="18" rx="2" fill="#B5582F" />
      <rect x="24" y="48" width="52" height="44" rx="6" fill="#F4D3A8" />
      <path d="M16 52 L50 20 L84 52 Z" fill="#D9784F" stroke="#D9784F" strokeWidth="6" strokeLinejoin="round" />
      <path d="M44 92 V76 A6 6 0 0 1 56 76 V92 Z" fill="#9C6B45" />
      <rect x="30" y="58" width="12" height="12" rx="3" fill="#8EC5E0" />
      <rect x="58" y="58" width="12" height="12" rx="3" fill="#8EC5E0" />
    </>
  ),
  fountain: () => (
    <>
      <ellipse cx="50" cy="94" rx="36" ry="4" fill="#2B2118" opacity="0.13" />
      <path d="M14 74 H86 C86 88 70 92 50 92 C30 92 14 88 14 74 Z" fill="#CFC6B8" />
      <ellipse cx="50" cy="74" rx="36" ry="7" fill="#8EC5E0" />
      <rect x="45" y="48" width="10" height="26" rx="3" fill="#E2DACE" />
      <path d="M34 48 H66 C66 56 58 58 50 58 C42 58 34 56 34 48 Z" fill="#CFC6B8" />
      <path d="M50 44 C50 30 40 26 32 36 M50 44 C50 30 60 26 68 36" stroke="#8EC5E0" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="42" r="2.5" fill="#8EC5E0" />
      <circle cx="70" cy="42" r="2.5" fill="#8EC5E0" />
      <circle cx="50" cy="24" r="3" fill="#8EC5E0" />
    </>
  ),
  moon: () => (
    <>
      <circle cx="50" cy="50" r="40" fill="#FFF3C4" opacity="0.35" />
      <path d="M60 16 A34 34 0 1 0 84 72 A27 27 0 1 1 60 16 Z" fill="#F7E3A1" />
      <circle cx="42" cy="40" r="4" fill="#EBCB78" opacity="0.7" />
      <circle cx="36" cy="62" r="3" fill="#EBCB78" opacity="0.7" />
      <path d="M36 52 Q40 48 44 52" stroke="#B5701F" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="58" rx="3" ry="1.8" fill="#F29A7A" opacity="0.7" />
    </>
  ),
  stars: () => (
    <>
      <path d="M30 14l4.4 9 9.9 1.4-7.2 6.9 1.8 9.8L30 36.5l-8.9 4.6 1.8-9.8-7.2-6.9 9.9-1.4z" fill="#F7C948" stroke="#F2B632" strokeWidth={2} strokeLinejoin="round" />
      <path d="M72 40l3.3 6.7 7.4 1.1-5.4 5.2 1.3 7.3-6.6-3.5-6.6 3.5 1.3-7.3-5.4-5.2 7.4-1.1z" fill="#F7C948" stroke="#F2B632" strokeWidth={2} strokeLinejoin="round" />
      <path d="M40 64 C41 70 43 72 49 73 C43 74 41 76 40 82 C39 76 37 74 31 73 C37 72 39 70 40 64 Z" fill="#FFF3C4" />
      <circle cx="60" cy="20" r="2.5" fill="#FFF3C4" />
      <circle cx="84" cy="22" r="2" fill="#FFF3C4" />
      <circle cx="18" cy="52" r="2" fill="#FFF3C4" />
      <circle cx="70" cy="80" r="2.5" fill="#FFF3C4" />
    </>
  ),
  lantern: () => (
    <>
      <ellipse cx="50" cy="94" rx="14" ry="3" fill="#2B2118" opacity="0.12" />
      <circle cx="50" cy="50" r="34" fill="#F7C948" opacity="0.18" />
      <path d="M50 6 V20" stroke="#9C6B45" strokeWidth={2.5} strokeLinecap="round" />
      <rect x="40" y="18" width="20" height="8" rx="3" fill="#B5582F" />
      <ellipse cx="50" cy="48" rx="24" ry="24" fill="#F08A6E" />
      <path d="M50 24 C38 34 38 62 50 72 M50 24 C62 34 62 62 50 72 M50 24 V72" stroke="#D9665A" strokeWidth={2} fill="none" />
      <ellipse cx="42" cy="38" rx="5" ry="8" fill="#FFFFFF" opacity="0.3" />
      <rect x="40" y="70" width="20" height="8" rx="3" fill="#B5582F" />
      <path d="M46 78 L44 90 M50 78 V92 M54 78 L56 90" stroke="#F7C948" strokeWidth={2.5} strokeLinecap="round" />
    </>
  ),
  balloon: () => (
    <>
      <ellipse cx="50" cy="94" rx="16" ry="3.5" fill="#2B2118" opacity="0.12" />
      <path d="M36 50 C38 66 46 78 50 92 M64 44 C62 62 54 78 50 92" stroke="#9C6B45" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="32" rx="16" ry="19" fill="#F08A6E" />
      <path d="M33 51 L39 51 L36 55 Z" fill="#F08A6E" />
      <ellipse cx="30" cy="24" rx="4" ry="7" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 30 24)" />
      <ellipse cx="64" cy="26" rx="15" ry="18" fill="#8EC5E0" />
      <path d="M61 44 L67 44 L64 48 Z" fill="#8EC5E0" />
      <ellipse cx="58" cy="19" rx="4" ry="6" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 58 19)" />
      <rect x="46" y="88" width="8" height="6" rx="2" fill="#9C6B45" />
    </>
  ),
  pond: () => (
    <>
      <ellipse cx="50" cy="70" rx="44" ry="20" fill="#CFC6B8" />
      <ellipse cx="50" cy="68" rx="38" ry="15" fill="#8EC5E0" />
      <ellipse cx="44" cy="64" rx="18" ry="4" fill="#FFFFFF" opacity="0.35" />
      <path d="M62 70 A8 5 0 1 1 70 74 L64 71 Z" fill="#7CBF8C" />
      <circle cx="36" cy="74" r="3" fill="#F4907E" />
      <circle cx="14" cy="72" r="5" fill="#E2DACE" />
      <circle cx="86" cy="66" r="5" fill="#E2DACE" />
      <circle cx="72" cy="86" r="4.5" fill="#E2DACE" />
    </>
  ),
  fence: () => (
    <>
      <ellipse cx="50" cy="90" rx="44" ry="4" fill="#2B2118" opacity="0.12" />
      <rect x="8" y="50" width="84" height="8" rx="4" fill="#D9A877" />
      <rect x="8" y="70" width="84" height="8" rx="4" fill="#D9A877" />
      <path d="M14 90 V40 L20 32 L26 40 V90 Z" fill="#E8C49A" stroke="#E8C49A" strokeWidth={3} strokeLinejoin="round" />
      <path d="M44 90 V40 L50 32 L56 40 V90 Z" fill="#E8C49A" stroke="#E8C49A" strokeWidth={3} strokeLinejoin="round" />
      <path d="M74 90 V40 L80 32 L86 40 V90 Z" fill="#E8C49A" stroke="#E8C49A" strokeWidth={3} strokeLinejoin="round" />
    </>
  ),
  fruittree: () => (
    <>
      <ellipse cx="50" cy="93" rx="28" ry="4.5" fill="#2B2118" opacity="0.13" />
      <path d="M45 92 L46 60 L54 60 L55 92 Z" fill="#9C6B45" stroke="#9C6B45" strokeWidth={3} strokeLinejoin="round" />
      <circle cx="35" cy="54" r="18" fill="#6FB282" />
      <circle cx="65" cy="54" r="18" fill="#6FB282" />
      <circle cx="50" cy="58" r="17" fill="#7CBF8C" />
      <circle cx="50" cy="35" r="22" fill="#94CFA2" />
      <circle cx="38" cy="40" r="5" fill="#F2A765" />
      <circle cx="60" cy="30" r="5" fill="#F2A765" />
      <circle cx="66" cy="54" r="5" fill="#F2A765" />
      <circle cx="42" cy="60" r="4.5" fill="#F08A6E" />
      <circle cx="52" cy="48" r="4.5" fill="#F08A6E" />
    </>
  ),
};

interface DecoSpriteProps {
  kind: DecoKind;
  size?: number;
  className?: string;
}

export function DecoSprite({ kind, size = 100, className }: DecoSpriteProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      {DRAW[kind]()}
    </svg>
  );
}
