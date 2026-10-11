// 首頁／頂欄／升級貼紙 icon（純 SVG）
import { useId, type JSX } from 'react'

export type IconKind =
  | 'home-garden'
  | 'home-addsub'
  | 'home-muldiv'
  | 'home-olympiad'
  | 'home-sudoku'
  | 'home-smart-sudoku'
  | 'home-shapes'
  | 'home-readchar'
  | 'home-vocab'
  | 'icon-star'
  | 'icon-sound'
  | 'icon-mute'
  | 'icon-back'
  | 'icon-cookie'
  | 'icon-heart'
  | 'upgrade-slots'
  | 'upgrade-yard'
  | 'mascot'
  | 'favicon'

const VIEW: Record<IconKind, string> = {
  'home-garden': '0 0 256 256',
  'home-addsub': '0 0 256 256',
  'home-muldiv': '0 0 256 256',
  'home-olympiad': '0 0 256 256',
  'home-sudoku': '0 0 256 256',
  'home-smart-sudoku': '0 0 256 256',
  'home-shapes': '0 0 256 256',
  'home-readchar': '0 0 256 256',
  'home-vocab': '0 0 256 256',
  'icon-star': '0 0 128 128',
  'icon-sound': '0 0 128 128',
  'icon-mute': '0 0 128 128',
  'icon-back': '0 0 128 128',
  'icon-cookie': '0 0 128 128',
  'icon-heart': '0 0 128 128',
  'upgrade-slots': '0 0 128 128',
  'upgrade-yard': '0 0 128 128',
  'mascot': '0 0 120 120',
  'favicon': '0 0 64 64',
}

const DEFAULT_SIZE: Record<IconKind, number> = {
  'home-garden': 56,
  'home-addsub': 56,
  'home-muldiv': 56,
  'home-olympiad': 56,
  'home-sudoku': 56,
  'home-smart-sudoku': 56,
  'home-shapes': 56,
  'home-readchar': 56,
  'home-vocab': 56,
  'icon-star': 28,
  'icon-sound': 28,
  'icon-mute': 28,
  'icon-back': 28,
  'icon-cookie': 28,
  'icon-heart': 28,
  'upgrade-slots': 28,
  'upgrade-yard': 28,
  'mascot': 92,
  'favicon': 32,
}

const DRAW: Record<Exclude<IconKind, 'icon-cookie'>, JSX.Element> = {
  'home-garden': (
    <>
      <ellipse cx="128" cy="226" rx="108" ry="10" fill="#2B2118" opacity="0.13" />
        <rect x="140" y="56" width="20" height="44" rx="5" fill="#B5582F" />
        <rect x="36" y="112" width="136" height="112" rx="14" fill="#F4D3A8" />
        <path d="M36 196 H172 V210 Q172 224 158 224 H50 Q36 224 36 210 Z" fill="#E8C49A" />
        <path d="M22 122 L104 46 L186 122 Z" fill="#D9784F" stroke="#D9784F" strokeWidth="14" strokeLinejoin="round" />
        <ellipse cx="78" cy="78" rx="16" ry="6" fill="#FFFFFF" opacity="0.3" transform="rotate(-42 78 78)" />
        <path d="M86 224 V186 A18 18 0 0 1 122 186 V224 Z" fill="#9C6B45" />
        <circle cx="114" cy="204" r="2.8" fill="#F7C948" />
        <rect x="48" y="138" width="30" height="30" rx="8" fill="#8EC5E0" />
        <path d="M63 140 V166 M50 153 H76" stroke="#F4D3A8" strokeWidth="3" />
        <rect x="132" y="138" width="30" height="30" rx="8" fill="#8EC5E0" />
        <path d="M147 140 V166 M134 153 H160" stroke="#F4D3A8" strokeWidth="3" />
        <g transform="translate(130 118)"><path d="M50 100 l-3 7 M50 100 l0 7 M50 100 l3 7 M70 100 l-3 7 M70 100 l0 7 M70 100 l3 7" stroke="#E0783A" strokeWidth="3" strokeLinecap="round" fill="none" /><path d="M57 42 C52 30 58 24 62 30 C63 24 70 24 68 32 C72 30 74 36 66 42 Z" fill="#F2B632" /><ellipse cx="60" cy="70" rx="35" ry="33" fill="#F7C948" /><path d="M28 82 C36 100 84 100 92 82 C84 96 36 96 28 82 Z" fill="#E9AF2C" opacity="0.6" /><ellipse cx="46" cy="50" rx="11" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 46 50)" /><ellipse cx="27" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(25 27 76)" /><ellipse cx="93" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(-25 93 76)" /><ellipse cx="41" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" /><ellipse cx="79" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" /><g fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M44 68 Q49 62 54 68" /><path d="M66 68 Q71 62 76 68" /></g><path d="M55 75 L65 75 L60 82 Z" fill="#E8783E" stroke="#E8783E" strokeWidth="2.5" strokeLinejoin="round" /></g>
    </>
  ),
  'home-addsub': (
    <>
      <ellipse cx="128" cy="228" rx="96" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 8)"><rect x="87.0" y="37.0" width="50" height="150" rx="19.2" fill="#E0A92E" /><rect x="37.0" y="87.0" width="150" height="50" rx="19.2" fill="#E0A92E" /></g><rect x="87.0" y="37.0" width="50" height="150" rx="19.2" fill="#F7C948" /><rect x="37.0" y="87.0" width="150" height="50" rx="19.2" fill="#F7C948" />
        <rect x="96" y="44" width="10" height="44" rx="5" fill="#FFFFFF" opacity="0.45" />
        <g transform="translate(0 6)"><rect x="160" y="172" width="72" height="30" rx="15" fill="#E2D2B8" /></g><rect x="160" y="172" width="72" height="30" rx="15" fill="#FFFDF8" />
    </>
  ),
  'home-muldiv': (
    <>
      <ellipse cx="128" cy="228" rx="96" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 8) rotate(45 110 110)"><rect x="86.0" y="35.0" width="48" height="150" rx="18.5" fill="#E6C994" /><rect x="35.0" y="86.0" width="150" height="48" rx="18.5" fill="#E6C994" /></g>
        <g transform="rotate(45 110 110)"><rect x="86.0" y="35.0" width="48" height="150" rx="18.5" fill="#FFF4D6" /><rect x="35.0" y="86.0" width="150" height="48" rx="18.5" fill="#FFF4D6" /></g>
        <ellipse cx="72" cy="66" rx="16" ry="6" fill="#FFFFFF" opacity="0.6" transform="rotate(45 72 66)" />
        <g transform="translate(0 5)"><rect x="166" y="180" width="68" height="16" rx="8" fill="#D9A12A" /><circle cx="200" cy="160" r="9.5" fill="#D9A12A" /><circle cx="200" cy="216" r="9.5" fill="#D9A12A" /></g><rect x="166" y="180" width="68" height="16" rx="8" fill="#F7C948" /><circle cx="200" cy="160" r="9.5" fill="#F7C948" /><circle cx="200" cy="216" r="9.5" fill="#F7C948" />
    </>
  ),
  'home-olympiad': (
    <>
      <ellipse cx="128" cy="232" rx="60" ry="9" fill="#2B2118" opacity="0.13" />
        <path d="M128 18 V34 M60 44 L72 56 M196 44 L184 56 M36 110 H52 M220 110 H204" stroke="#F7C948" strokeWidth="9" strokeLinecap="round" />
        <path d="M128 44 C88 44 64 74 64 106 C64 132 80 146 92 160 C98 168 100 176 100 184 H156 C156 176 158 168 164 160 C176 146 192 132 192 106 C192 74 168 44 128 44 Z" fill="#F7C948" stroke="#F7C948" strokeWidth="6" strokeLinejoin="round" />
        <path d="M92 160 C98 168 100 176 100 184 H156 C156 176 158 168 164 160 Z" fill="#F2B04A" />
        <ellipse cx="98" cy="80" rx="16" ry="9" fill="#FFFFFF" opacity="0.5" transform="rotate(-40 98 80)" />
        <path d="M108 98 C108 80 148 78 148 100 C148 116 128 116 128 134 V140" stroke="#D9784F" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="128" cy="162" r="7.5" fill="#D9784F" />
        <rect x="98" y="184" width="60" height="14" rx="7" fill="#9C6B45" />
        <rect x="102" y="198" width="52" height="14" rx="7" fill="#7A5A3E" />
        <path d="M112 212 H144 Q140 226 128 226 Q116 226 112 212 Z" fill="#9C6B45" />
    </>
  ),
  'home-sudoku': (
    <>
      <ellipse cx="128" cy="230" rx="96" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 9)"><rect x="44" y="36" width="168" height="168" rx="24" fill="#E2D2B8" /></g><rect x="44" y="36" width="168" height="168" rx="24" fill="#FFFDF8" />
        <path d="M88 44 V196 M168 44 V196 M52 80 H204 M52 160 H204" stroke="#E2D2B8" strokeWidth="3" strokeLinecap="round" />
        <path d="M128 44 V196 M52 120 H204" stroke="#2B78B5" strokeWidth="5" strokeLinecap="round" />
        <circle cx="68" cy="60" r="4.6" fill="#E24C3B" />
        <circle cx="140" cy="52" r="4.6" fill="#5A4A8A" /><circle cx="148" cy="60" r="4.6" fill="#5A4A8A" /><circle cx="156" cy="68" r="4.6" fill="#5A4A8A" />
        <circle cx="101" cy="93" r="4.6" fill="#D9784F" /><circle cx="115" cy="93" r="4.6" fill="#D9784F" /><circle cx="101" cy="107" r="4.6" fill="#D9784F" /><circle cx="115" cy="107" r="4.6" fill="#D9784F" />
        <circle cx="181" cy="93" r="4.6" fill="#2B78B5" /><circle cx="195" cy="107" r="4.6" fill="#2B78B5" />
        <circle cx="61" cy="133" r="4.6" fill="#2B78B5" /><circle cx="75" cy="147" r="4.6" fill="#2B78B5" />
        <circle cx="141" cy="133" r="4.6" fill="#D9784F" /><circle cx="155" cy="133" r="4.6" fill="#D9784F" /><circle cx="141" cy="147" r="4.6" fill="#D9784F" /><circle cx="155" cy="147" r="4.6" fill="#D9784F" />
        <circle cx="100" cy="172" r="4.6" fill="#5A4A8A" /><circle cx="108" cy="180" r="4.6" fill="#5A4A8A" /><circle cx="116" cy="188" r="4.6" fill="#5A4A8A" />
        <circle cx="188" cy="180" r="4.6" fill="#E24C3B" />
    </>
  ),
  'home-smart-sudoku': (
    <>
      <ellipse cx="128" cy="230" rx="96" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 8)"><rect x="42" y="34" width="172" height="176" rx="26" fill="#D9C49A" /></g><rect x="42" y="34" width="172" height="176" rx="26" fill="#F6E7C1" />
        <rect x="56" y="53" width="44" height="44" rx="11" fill="#B93A2C" /><rect x="56" y="48" width="44" height="44" rx="11" fill="#E24C3B" /><rect x="63" y="54" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        <rect x="106" y="53" width="44" height="44" rx="11" fill="#C98A2E" /><rect x="106" y="48" width="44" height="44" rx="11" fill="#F2B04A" /><rect x="113" y="54" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        <rect x="156" y="53" width="44" height="44" rx="11" fill="#E2D2B8" /><rect x="156" y="48" width="44" height="44" rx="11" fill="#FFFDF8" />
        <rect x="56" y="103" width="44" height="44" rx="11" fill="#1F5A8A" /><rect x="56" y="98" width="44" height="44" rx="11" fill="#2B78B5" /><rect x="63" y="104" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        <rect x="106" y="103" width="44" height="44" rx="11" fill="#E2D2B8" /><rect x="106" y="98" width="44" height="44" rx="11" fill="#FFFDF8" />
        <rect x="156" y="103" width="44" height="44" rx="11" fill="#72AE83" /><rect x="156" y="98" width="44" height="44" rx="11" fill="#9ED4AC" /><rect x="163" y="104" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        <rect x="56" y="153" width="44" height="44" rx="11" fill="#E2D2B8" /><rect x="56" y="148" width="44" height="44" rx="11" fill="#FFFDF8" />
        <rect x="106" y="153" width="44" height="44" rx="11" fill="#3F3366" /><rect x="106" y="148" width="44" height="44" rx="11" fill="#5A4A8A" /><rect x="113" y="154" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
        <rect x="156" y="153" width="44" height="44" rx="11" fill="#C8667A" /><rect x="156" y="148" width="44" height="44" rx="11" fill="#F08A9E" /><rect x="163" y="154" width="16" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" />
    </>
  ),
  'home-shapes': (
    <>
      <ellipse cx="128" cy="194" rx="108" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 7)"><rect x="33.0" y="87.0" width="66" height="66" rx="14.5" fill="#D9A12A" transform="rotate(45 66 120)" /></g><rect x="33.0" y="87.0" width="66" height="66" rx="14.5" fill="#F7C948" transform="rotate(45 66 120)" />
        <ellipse cx="54" cy="96" rx="9" ry="4.5" fill="#FFFFFF" opacity="0.5" transform="rotate(-45 54 96)" />
        <g transform="translate(0 7)"><rect x="157.0" y="87.0" width="66" height="66" rx="14.5" fill="#D9A12A" transform="rotate(45 190 120)" /></g><rect x="157.0" y="87.0" width="66" height="66" rx="14.5" fill="#F7C948" transform="rotate(45 190 120)" />
        <ellipse cx="178" cy="96" rx="9" ry="4.5" fill="#FFFFFF" opacity="0.5" transform="rotate(-45 178 96)" />
        <g transform="translate(0 4)"><rect x="113" y="104" width="30" height="11" rx="5.5" fill="#E2D2B8" /><rect x="113" y="126" width="30" height="11" rx="5.5" fill="#E2D2B8" /></g><rect x="113" y="104" width="30" height="11" rx="5.5" fill="#FFFDF8" /><rect x="113" y="126" width="30" height="11" rx="5.5" fill="#FFFDF8" />
    </>
  ),
  'home-readchar': (
    <>
      <ellipse cx="128" cy="230" rx="96" ry="10" fill="#2B2118" opacity="0.13" />
        <g transform="rotate(-6 118 124)"><g transform="translate(0 8)"><rect x="46" y="34" width="144" height="180" rx="22" fill="#E2D2B8" /></g><rect x="46" y="34" width="144" height="180" rx="22" fill="#FFFDF8" /><rect x="58" y="46" width="120" height="156" rx="14" fill="none" stroke="#F4D3A8" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" /><path d="M120 66 C120 116 108 156 72 186" stroke="#2B2118" strokeWidth="17" fill="none" strokeLinecap="round" /><path d="M118 118 C132 154 148 172 170 184" stroke="#2B2118" strokeWidth="17" fill="none" strokeLinecap="round" /></g>
        <g transform="rotate(-50 200 176)"><rect x="150" y="160" width="96" height="30" rx="10" fill="#9C4030" transform="translate(0 5)" /><rect x="150" y="160" width="96" height="30" rx="10" fill="#E24C3B" /><rect x="176" y="160" width="40" height="30" fill="#FFF4D6" /><path d="M186 166 V184 M206 166 V184" stroke="#E24C3B" strokeWidth="3" strokeLinecap="round" /><path d="M150 164 L128 175 L150 186 Z" fill="#E24C3B" stroke="#E24C3B" strokeWidth="6" strokeLinejoin="round" /><rect x="156" y="164" width="14" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4" /></g>
    </>
  ),
  'home-vocab': (
    <>
      <ellipse cx="128" cy="222" rx="108" ry="10" fill="#2B2118" opacity="0.13" />
        <path d="M18 80 Q72 60 128 82 Q184 60 238 80 V206 Q184 188 128 210 Q72 188 18 206 Z" fill="#2B78B5" />
        <path d="M28 70 Q76 52 124 74 V196 Q76 176 28 192 Z" fill="#FFFDF8" />
        <path d="M228 70 Q180 52 132 74 V196 Q180 176 228 192 Z" fill="#FFFDF8" />
        <path d="M124 74 V196 M132 74 V196" stroke="#E2D2B8" strokeWidth="3" />
        <rect x="44" y="86" width="64" height="56" rx="10" fill="#DDF0E6" />
        <circle cx="90" cy="102" r="8" fill="#F7C948" />
        <path d="M44 132 Q62 110 80 124 Q92 116 108 128 V132 Q108 142 98 142 H54 Q44 142 44 132 Z" fill="#9ED4AC" />
        <rect x="44" y="154" width="64" height="10" rx="5" fill="#F2B04A" />
        <rect x="148" y="90" width="64" height="10" rx="5" fill="#D9784F" />
        <rect x="148" y="112" width="48" height="10" rx="5" fill="#E2D2B8" />
        <rect x="148" y="134" width="60" height="10" rx="5" fill="#E2D2B8" />
        <rect x="148" y="156" width="40" height="10" rx="5" fill="#E2D2B8" />
    </>
  ),
  'icon-star': (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <path d="M64.0 10.0 L78.7 41.8 L113.5 45.9 L87.8 69.7 L94.6 104.1 L64.0 87.0 L33.4 104.1 L40.2 69.7 L14.5 45.9 L49.3 41.8 Z" fill="#E0A92E" stroke="#E0A92E" strokeWidth="12" strokeLinejoin="round" transform="translate(0 6)" />
        <path d="M64.0 10.0 L78.7 41.8 L113.5 45.9 L87.8 69.7 L94.6 104.1 L64.0 87.0 L33.4 104.1 L40.2 69.7 L14.5 45.9 L49.3 41.8 Z" fill="#F7C948" stroke="#F7C948" strokeWidth="12" strokeLinejoin="round" />
        <path d="M64.0 38.0 L71.6 53.5 L88.7 56.0 L76.4 68.0 L79.3 85.0 L64.0 77.0 L48.7 85.0 L51.6 68.0 L39.3 56.0 L56.4 53.5 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="5" strokeLinejoin="round" />
        <ellipse cx="50" cy="40" rx="7" ry="4" fill="#FFFFFF" opacity="0.55" transform="rotate(-35 50 40)" />
    </>
  ),
  'icon-sound': (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 5)"><path d="M18 50 H36 L60 30 V94 L36 78 H18 Z" fill="#C98A2E" stroke="#C98A2E" strokeWidth="10" strokeLinejoin="round" /></g><path d="M18 50 H36 L60 30 V94 L36 78 H18 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="10" strokeLinejoin="round" />
        <rect x="18" y="52" width="12" height="5" rx="2.5" fill="#FFFFFF" opacity="0.45" />
        <g fill="none" stroke="#9ED4AC" strokeWidth="8" strokeLinecap="round"><path d="M76 52 Q84 62 76 72" /><path d="M88 42 Q102 62 88 82" /><path d="M100 32 Q120 62 100 92" /></g>
    </>
  ),
  'icon-mute': (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 5)"><path d="M18 50 H36 L60 30 V94 L36 78 H18 Z" fill="#C98A2E" stroke="#C98A2E" strokeWidth="10" strokeLinejoin="round" /></g><path d="M18 50 H36 L60 30 V94 L36 78 H18 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="10" strokeLinejoin="round" />
        <rect x="18" y="52" width="12" height="5" rx="2.5" fill="#FFFFFF" opacity="0.45" />
        <path d="M22 22 L106 106" stroke="#FFFDF8" strokeWidth="20" strokeLinecap="round" />
        <path d="M22 22 L106 106" stroke="#D9784F" strokeWidth="11" strokeLinecap="round" />
    </>
  ),
  'icon-back': (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 6)"><path d="M20 62 L56 28 V48 H96 Q108 48 108 60 V66 Q108 78 96 78 H56 V96 Z" fill="#C98A2E" stroke="#C98A2E" strokeWidth="10" strokeLinejoin="round" /></g><path d="M20 62 L56 28 V48 H96 Q108 48 108 60 V66 Q108 78 96 78 H56 V96 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="10" strokeLinejoin="round" />
        <rect x="62" y="52" width="30" height="6" rx="3" fill="#FFFFFF" opacity="0.45" />
    </>
  ),
  'icon-heart': (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 6)"><path d="M64 104 C40 88 16 70 16 46 C16 30 28 20 42 20 C52 20 60 26 64 34 C68 26 76 20 86 20 C100 20 112 30 112 46 C112 70 88 88 64 104 Z" fill="#C8584C" stroke="#C8584C" strokeWidth="6" strokeLinejoin="round" /></g><path d="M64 104 C40 88 16 70 16 46 C16 30 28 20 42 20 C52 20 60 26 64 34 C68 26 76 20 86 20 C100 20 112 30 112 46 C112 70 88 88 64 104 Z" fill="#EE7F78" stroke="#EE7F78" strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="38" cy="40" rx="9" ry="5.5" fill="#FFFFFF" opacity="0.5" transform="rotate(-40 38 40)" />
    </>
  ),
  'upgrade-slots': (
    <>
      <ellipse cx="64" cy="112" rx="58" ry="6" fill="#2B2118" opacity="0.13" />
        <g transform="translate(0 5)"><ellipse cx="36" cy="96" rx="26" ry="12" fill="#72AE83" /></g><ellipse cx="36" cy="96" rx="26" ry="12" fill="#9ED4AC" />
        <g transform="translate(0 5)"><ellipse cx="92" cy="96" rx="26" ry="12" fill="#72AE83" /></g><ellipse cx="92" cy="96" rx="26" ry="12" fill="#9ED4AC" />
        <path d="M34 50 C31 42 35 38 37 42 C38 38 42 38 41 44 C43 43 44 46 40 50 Z" fill="#C9A27A" />
        <ellipse cx="36" cy="74" rx="20" ry="20" fill="#C9A27A" />
        <g transform="translate(0 0)"><rect x="87.0" y="61.0" width="10" height="26" rx="3.8" fill="#F2B04A" /><rect x="79.0" y="69.0" width="26" height="10" rx="3.8" fill="#F2B04A" /></g>
        <path d="M92 56 V60 M92 88 V92" stroke="#000" strokeWidth="0" />
    </>
  ),
  'upgrade-yard': (
    <>
      <ellipse cx="64" cy="112" rx="58" ry="6" fill="#2B2118" opacity="0.13" />
        <path d="M8 104 Q8 92 20 88 Q64 40 108 88 Q120 92 120 104 Z" fill="#7CBF8C" />
        <path d="M24 104 Q36 62 74 66 Q100 70 108 104 Z" fill="#9ED4AC" />
        <ellipse cx="54" cy="74" rx="10" ry="4" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 54 74)" />
        <path d="M64 62 V30" stroke="#9C6B45" strokeWidth="4" strokeLinecap="round" />
        <path d="M66 30 L88 37 L66 44 Z" fill="#D9784F" stroke="#D9784F" strokeWidth="3" strokeLinejoin="round" />
        <g fill="none" stroke="#F2B04A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 60 L10 70 L20 80" /><path d="M108 60 L118 70 L108 80" /></g>
    </>
  ),
  'mascot': (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
        <path d="M50 100 l-3 7 M50 100 l0 7 M50 100 l3 7 M70 100 l-3 7 M70 100 l0 7 M70 100 l3 7" stroke="#E0783A" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="60" cy="70" rx="35" ry="33" fill="#F7C948" />
        <path d="M28 82 C36 100 84 100 92 82 C84 96 36 96 28 82 Z" fill="#E9AF2C" opacity="0.6" />
        <ellipse cx="46" cy="50" rx="11" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 46 50)" />
        <ellipse cx="27" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(25 27 76)" />
        <ellipse cx="93" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(-25 93 76)" />
        <ellipse cx="41" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" />
        <ellipse cx="79" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" />
        <ellipse cx="49" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="50.4" cy="65.2" r="1.6" fill="#FFFFFF" /><ellipse cx="71" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="72.4" cy="65.2" r="1.6" fill="#FFFFFF" />
        <path d="M55 75 L65 75 L60 82 Z" fill="#E8783E" stroke="#E8783E" strokeWidth="2.5" strokeLinejoin="round" />
        <g fill="none" stroke="#2B2118" strokeWidth="2.6"><circle cx="49" cy="67" r="9" /><circle cx="71" cy="67" r="9" /><path d="M58 66 Q60 64 62 66" strokeLinecap="round" /><path d="M40 65 L33 62 M80 65 L87 62" strokeLinecap="round" /></g>
        <rect x="45" y="32" width="30" height="12" rx="4" fill="#4A3C74" /><path d="M60 18 L90 29 L60 40 L30 29 Z" fill="#5A4A8A" stroke="#5A4A8A" strokeWidth="3" strokeLinejoin="round" /><path d="M60 20 L82 28 L60 31 Z" fill="#FFFFFF" opacity="0.15" /><path d="M60 29 L84 33 V48" stroke="#F7C948" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="84" cy="50" r="3.5" fill="#F7C948" /><circle cx="60" cy="29" r="2.5" fill="#F7C948" />
    </>
  ),
  'favicon': (
    <>
      <ellipse cx="32" cy="34" rx="27" ry="26" fill="#F7C948" />
        <ellipse cx="22" cy="20" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.45" transform="rotate(-25 22 20)" />
        <ellipse cx="17" cy="42" rx="4.5" ry="2.8" fill="#F29A7A" opacity="0.7" />
        <ellipse cx="47" cy="42" rx="4.5" ry="2.8" fill="#F29A7A" opacity="0.7" />
        <ellipse cx="24" cy="35" rx="3.4" ry="4.3" fill="#2B2118" /><circle cx="25.2" cy="33.6" r="1.3" fill="#FFFFFF" />
        <ellipse cx="40" cy="35" rx="3.4" ry="4.3" fill="#2B2118" /><circle cx="41.2" cy="33.6" r="1.3" fill="#FFFFFF" />
        <path d="M28 42 L36 42 L32 48 Z" fill="#E8783E" stroke="#E8783E" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M32 2 L56 11 L32 20 L8 11 Z" fill="#5A4A8A" stroke="#5A4A8A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 11 L52 14 V24" stroke="#F7C948" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="52" cy="26" r="3" fill="#F7C948" />
    </>
  ),
}

function Cookie({ maskId }: { maskId: string }) {
  return (
    <>
      <ellipse cx="64" cy="116" rx="40" ry="6" fill="#2B2118" opacity="0.13" />
        <defs><mask id={maskId}><rect width="128" height="128" fill="#fff" /><circle cx="104" cy="28" r="17" fill="#000" /><circle cx="114" cy="48" r="11" fill="#000" /></mask></defs>
        <g mask={`url(#${maskId})`}><circle cx="64" cy="66" r="46" fill="#B9793E" /><circle cx="64" cy="60" r="46" fill="#E0A85A" /><circle cx="64" cy="60" r="38" fill="#EBB86C" /><ellipse cx="44" cy="36" rx="10" ry="5" fill="#FFFFFF" opacity="0.4" transform="rotate(-35 44 36)" /><circle cx="48" cy="58" r="5.5" fill="#6B4A32" /><circle cx="74" cy="46" r="5" fill="#6B4A32" /><circle cx="80" cy="74" r="5.5" fill="#6B4A32" /><circle cx="54" cy="84" r="4.5" fill="#6B4A32" /><circle cx="64" cy="66" r="3.5" fill="#6B4A32" /><circle cx="36" cy="76" r="3.5" fill="#6B4A32" /></g>
    </>
  )
}

type Props = {
  kind: IconKind
  size?: number
  className?: string
  label?: string
}

export function IconSprite({ kind, size, className, label }: Props) {
  const uid = useId().replace(/:/g, '')
  const px = size ?? DEFAULT_SIZE[kind]
  return (
    <svg
      className={className}
      viewBox={VIEW[kind]}
      width={px}
      height={px}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {kind === 'icon-cookie' ? <Cookie maskId={`bite-${uid}`} /> : DRAW[kind]}
    </svg>
  )
}

export function StarMark({ size = 18 }: { size?: number }) {
  return <IconSprite kind="icon-star" size={size} />
}
