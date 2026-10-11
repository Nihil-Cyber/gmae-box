// 我嘅家園 · 原創寵物角色（純 SVG，冇外部圖檔）
// 用法：<PetSprite kind="chick" mood="happy" size={136} />
import type { JSX } from 'react';

export type PetKind =
  | 'chick' | 'rabbit' | 'cat' | 'dog' | 'panda' | 'dragon'
  | 'penguin' | 'frog' | 'hamster' | 'pig' | 'turtle' | 'owl';
export type PetMood = 'normal' | 'happy';

export const PET_NAMES: Record<PetKind, string> = {
  chick: '小雞', rabbit: '兔仔', cat: '小貓', dog: '小狗', panda: '熊貓', dragon: '小龍',
  penguin: '企鵝', frog: '青蛙', hamster: '倉鼠', pig: '豬仔', turtle: '烏龜', owl: '貓頭鷹',
};

export const PET_BLURBS: Record<PetKind, string> = {
  chick: '毛茸茸，最鍾意唱歌',
  rabbit: '跳跳跳，耳仔長長',
  cat: '好鍾意曬太陽',
  dog: '搖尾巴等你返嚟',
  panda: '慢慢食，慢慢瞓',
  dragon: '守護家園嘅好朋友',
  penguin: '企喺雪上面等你',
  frog: '跳咗出嚟打招呼',
  hamster: '揸住粒瓜子',
  pig: '圓嘟嘟，好溫柔',
  turtle: '慢慢行都追到你',
  owl: '夜晚都陪住你',
};

/** 商店卡圖示底色 */
export const PET_CARD_BG: Record<PetKind, string> = {
  chick: '#FDEBB5', rabbit: '#FBE0D6', cat: '#FCE3C4', dog: '#F3E2CC', panda: '#E4EEF2', dragon: '#D9F0E0',
  penguin: '#E4ECF4', frog: '#DDF0D2', hamster: '#FBE6C8', pig: '#FBE0DE', turtle: '#E2F0DA', owl: '#EFE3D2',
};

type Draw = (open: number, happy: number) => JSX.Element;

const DRAW: Record<PetKind, Draw> = {
  chick: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M50 100 l-3 7 M50 100 l0 7 M50 100 l3 7 M70 100 l-3 7 M70 100 l0 7 M70 100 l3 7" stroke="#E0783A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M57 42 C52 30 58 24 62 30 C63 24 70 24 68 32 C72 30 74 36 66 42 Z" fill="#F2B632" />
      <ellipse cx="60" cy="70" rx="35" ry="33" fill="#F7C948" />
      <path d="M28 82 C36 100 84 100 92 82 C84 96 36 96 28 82 Z" fill="#E9AF2C" opacity="0.6" />
      <ellipse cx="46" cy="50" rx="11" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 46 50)" />
      <ellipse cx="27" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(25 27 76)" />
      <ellipse cx="93" cy="76" rx="7" ry="12" fill="#EDB93A" transform="rotate(-25 93 76)" />
      <ellipse cx="41" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" />
      <ellipse cx="79" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.65" />
      <g className="pet-eyes" opacity={open}><ellipse cx="49" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="50.4" cy="65.2" r="1.6" fill="#FFFFFF" /><ellipse cx="71" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="72.4" cy="65.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M44 68 Q49 62 54 68" /><path d="M66 68 Q71 62 76 68" /></g>
      <path d="M55 75 L65 75 L60 82 Z" fill="#E8783E" stroke="#E8783E" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  rabbit: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <ellipse cx="45" cy="32" rx="9.5" ry="25" fill="#FBF3EA" stroke="#DCC7B2" strokeWidth="2" transform="rotate(-12 45 32)" />
      <ellipse cx="45" cy="34" rx="4.5" ry="17" fill="#F4B6A6" transform="rotate(-12 45 34)" />
      <ellipse cx="75" cy="32" rx="9.5" ry="25" fill="#FBF3EA" stroke="#DCC7B2" strokeWidth="2" transform="rotate(12 75 32)" />
      <ellipse cx="75" cy="34" rx="4.5" ry="17" fill="#F4B6A6" transform="rotate(12 75 34)" />
      <ellipse cx="60" cy="74" rx="33" ry="31" fill="#FBF3EA" stroke="#DCC7B2" strokeWidth="2" />
      <ellipse cx="47" cy="102" rx="10" ry="5.5" fill="#FBF3EA" stroke="#DCC7B2" strokeWidth="2" />
      <ellipse cx="73" cy="102" rx="10" ry="5.5" fill="#FBF3EA" stroke="#DCC7B2" strokeWidth="2" />
      <ellipse cx="42" cy="81" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <ellipse cx="78" cy="81" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <g className="pet-eyes" opacity={open}><ellipse cx="50" cy="71" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="51.4" cy="69.2" r="1.6" fill="#FFFFFF" /><ellipse cx="70" cy="71" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="71.4" cy="69.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M45 72 Q50 66 55 72" /><path d="M65 72 Q70 66 75 72" /></g>
      <path d="M57 78 L63 78 L60 81.5 Z" fill="#E88C82" stroke="#E88C82" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 82 Q57 86 54 84 M60 82 Q63 86 66 84" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  cat: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M88 96 C108 96 110 76 100 68" stroke="#F2A765" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M34 54 L38 26 L58 42 Z" fill="#F2A765" stroke="#F2A765" strokeWidth="6" strokeLinejoin="round" />
      <path d="M39 46 L41 33 L50 41 Z" fill="#F4B6A6" />
      <path d="M86 54 L82 26 L62 42 Z" fill="#F2A765" stroke="#F2A765" strokeWidth="6" strokeLinejoin="round" />
      <path d="M81 46 L79 33 L70 41 Z" fill="#F4B6A6" />
      <ellipse cx="60" cy="72" rx="35" ry="33" fill="#F2A765" />
      <ellipse cx="60" cy="91" rx="19" ry="12" fill="#FCE3C4" />
      <path d="M54 44 v7 M60 42 v8 M66 44 v7 M27 70 h8 M27 78 h7 M93 70 h-8 M93 78 h-7" stroke="#D9784F" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="79" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <ellipse cx="80" cy="79" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <g className="pet-eyes" opacity={open}><ellipse cx="48" cy="68" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="49.4" cy="66.2" r="1.6" fill="#FFFFFF" /><ellipse cx="72" cy="68" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="73.4" cy="66.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M43 69 Q48 63 53 69" /><path d="M67 69 Q72 63 77 69" /></g>
      <path d="M57.5 76 L62.5 76 L60 79 Z" fill="#C8584C" stroke="#C8584C" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 79 Q57 83 54 81 M60 79 Q63 83 66 81" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 80 L28 78 M40 84 L29 86 M80 80 L92 78 M80 84 L91 86" stroke="#2B2118" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </>
  ),
  dog: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M90 90 C100 86 104 78 102 70" stroke="#D9A877" strokeWidth="8" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="72" rx="34" ry="33" fill="#D9A877" />
      <ellipse cx="30" cy="62" rx="10" ry="20" fill="#9C6B45" transform="rotate(18 30 62)" />
      <ellipse cx="90" cy="62" rx="10" ry="20" fill="#9C6B45" transform="rotate(-18 90 62)" />
      <ellipse cx="72" cy="63" rx="10" ry="9" fill="#C08A5C" opacity="0.85" />
      <ellipse cx="60" cy="84" rx="15" ry="11" fill="#FBEBD6" />
      <ellipse cx="41" cy="78" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <ellipse cx="79" cy="78" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <g className="pet-eyes" opacity={open}><ellipse cx="49" cy="66" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="50.4" cy="64.2" r="1.6" fill="#FFFFFF" /><ellipse cx="71" cy="66" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="72.4" cy="64.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M44 67 Q49 61 54 67" /><path d="M66 67 Q71 61 76 67" /></g>
      <ellipse cx="60" cy="79" rx="5.5" ry="4" fill="#2B2118" />
      <path d="M56 89 Q60 97 64 89 Z" fill="#F08A7E" />
      <path d="M60 83 v4 M60 87 Q56 90 53 87 M60 87 Q64 90 67 87" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  panda: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <circle cx="37" cy="44" r="11" fill="#2B2118" />
      <circle cx="83" cy="44" r="11" fill="#2B2118" />
      <ellipse cx="60" cy="74" rx="35" ry="32" fill="#FFFDF8" stroke="#D9CDBB" strokeWidth="2" />
      <ellipse cx="32" cy="92" rx="9" ry="12" fill="#2B2118" transform="rotate(20 32 92)" />
      <ellipse cx="88" cy="92" rx="9" ry="12" fill="#2B2118" transform="rotate(-20 88 92)" />
      <ellipse cx="46" cy="103" rx="10" ry="5.5" fill="#2B2118" />
      <ellipse cx="74" cy="103" rx="10" ry="5.5" fill="#2B2118" />
      <ellipse cx="47" cy="69" rx="9" ry="11" fill="#2B2118" transform="rotate(30 47 69)" />
      <ellipse cx="73" cy="69" rx="9" ry="11" fill="#2B2118" transform="rotate(-30 73 69)" />
      <ellipse cx="38" cy="83" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <ellipse cx="82" cy="83" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <g className="pet-eyes" opacity={open}><circle cx="48" cy="68" r="3.8" fill="#FFFFFF" /><circle cx="48.6" cy="68.6" r="2.1" fill="#2B2118" /><circle cx="72" cy="68" r="3.8" fill="#FFFFFF" /><circle cx="72.6" cy="68.6" r="2.1" fill="#2B2118" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round"><path d="M44 70 Q48 65 52 70" /><path d="M68 70 Q72 65 76 70" /></g>
      <ellipse cx="60" cy="79" rx="4.5" ry="3" fill="#2B2118" />
      <path d="M60 82 Q57 86 54 84 M60 82 Q63 86 66 84" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  dragon: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M86 96 C108 100 112 80 102 74" stroke="#7CC79A" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M98 70 L108 66 L104 78 Z" fill="#F7C948" stroke="#F7C948" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 60 C18 52 14 40 18 32 C26 40 34 44 40 48 Z" fill="#BFE3C6" stroke="#8CC89B" strokeWidth="2" strokeLinejoin="round" />
      <path d="M90 60 C102 52 106 40 102 32 C94 40 86 44 80 48 Z" fill="#BFE3C6" stroke="#8CC89B" strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 46 L42 32 L52 42 Z" fill="#F7C948" stroke="#F7C948" strokeWidth="3" strokeLinejoin="round" />
      <path d="M76 46 L78 32 L68 42 Z" fill="#F7C948" stroke="#F7C948" strokeWidth="3" strokeLinejoin="round" />
      <path d="M55 41 L60 33 L65 41 Z" fill="#F4A58A" stroke="#F4A58A" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="46" cy="103" rx="9" ry="5" fill="#7CC79A" />
      <ellipse cx="74" cy="103" rx="9" ry="5" fill="#7CC79A" />
      <ellipse cx="60" cy="73" rx="34" ry="32" fill="#8FD3A8" />
      <ellipse cx="46" cy="52" rx="10" ry="5.5" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 46 52)" />
      <ellipse cx="60" cy="91" rx="19" ry="13" fill="#FCEFC7" />
      <path d="M49 87 h22 M51 93 h18" stroke="#E8D39A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="39" cy="77" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <ellipse cx="81" cy="77" rx="6" ry="3.5" fill="#F29A7A" opacity="0.55" />
      <g className="pet-eyes" opacity={open}><ellipse cx="48" cy="66" rx="4.6" ry="5.8" fill="#2B2118" /><circle cx="49.6" cy="64" r="1.8" fill="#FFFFFF" /><ellipse cx="72" cy="66" rx="4.6" ry="5.8" fill="#2B2118" /><circle cx="73.6" cy="64" r="1.8" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M43 67 Q48 61 53 67" /><path d="M67 67 Q72 61 77 67" /></g>
      <circle cx="57" cy="76" r="1.4" fill="#2B2118" />
      <circle cx="63" cy="76" r="1.4" fill="#2B2118" />
      <path d="M54 80 Q60 85 66 80" stroke="#2B2118" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  penguin: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <ellipse cx="47" cy="104" rx="9" ry="4.5" fill="#F2A765" />
      <ellipse cx="73" cy="104" rx="9" ry="4.5" fill="#F2A765" />
      <ellipse cx="60" cy="71" rx="34" ry="34" fill="#4A5C78" />
      <ellipse cx="27" cy="80" rx="7" ry="14" fill="#3E4E66" transform="rotate(22 27 80)" />
      <ellipse cx="93" cy="80" rx="7" ry="14" fill="#3E4E66" transform="rotate(-22 93 80)" />
      <circle cx="49" cy="65" r="13" fill="#FFFDF8" />
      <circle cx="71" cy="65" r="13" fill="#FFFDF8" />
      <ellipse cx="60" cy="84" rx="24" ry="20" fill="#FFFDF8" />
      <ellipse cx="45" cy="45" rx="10" ry="5" fill="#FFFFFF" opacity="0.25" transform="rotate(-20 45 45)" />
      <ellipse cx="40" cy="77" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <ellipse cx="80" cy="77" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <g className="pet-eyes" opacity={open}><ellipse cx="49" cy="66" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="50.4" cy="64.2" r="1.6" fill="#FFFFFF" /><ellipse cx="71" cy="66" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="72.4" cy="64.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M44 67 Q49 61 54 67" /><path d="M66 67 Q71 61 76 67" /></g>
      <path d="M55 74 L65 74 L60 80 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
  frog: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <ellipse cx="40" cy="104" rx="12" ry="5" fill="#7CBF8C" />
      <ellipse cx="80" cy="104" rx="12" ry="5" fill="#7CBF8C" />
      <circle cx="43" cy="52" r="13" fill="#8CC89B" />
      <circle cx="77" cy="52" r="13" fill="#8CC89B" />
      <ellipse cx="60" cy="77" rx="36" ry="29" fill="#8CC89B" />
      <circle cx="43" cy="52" r="8.5" fill="#FFFDF8" />
      <circle cx="77" cy="52" r="8.5" fill="#FFFDF8" />
      <ellipse cx="60" cy="92" rx="21" ry="12" fill="#E3F2CF" />
      <circle cx="31" cy="86" r="3.5" fill="#7CBF8C" /><circle cx="89" cy="86" r="3.5" fill="#7CBF8C" /><circle cx="84" cy="94" r="2.5" fill="#7CBF8C" />
      <ellipse cx="38" cy="43" rx="5" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-25 38 43)" />
      <ellipse cx="36" cy="74" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <ellipse cx="84" cy="74" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <g className="pet-eyes" opacity={open}><ellipse cx="43" cy="53" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="44.4" cy="51.2" r="1.6" fill="#FFFFFF" /><ellipse cx="77" cy="53" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="78.4" cy="51.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M38 54 Q43 48 48 54" /><path d="M72 54 Q77 48 82 54" /></g>
      <path d="M47 75 Q60 85 73 75" stroke="#2B2118" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="68" r="1.3" fill="#2B2118" /><circle cx="64" cy="68" r="1.3" fill="#2B2118" />
    </>
  ),
  hamster: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <ellipse cx="48" cy="104" rx="7" ry="4" fill="#F4B6A6" />
      <ellipse cx="72" cy="104" rx="7" ry="4" fill="#F4B6A6" />
      <circle cx="35" cy="45" r="10" fill="#F2B04A" /><circle cx="35" cy="46" r="5.5" fill="#F4B6A6" />
      <circle cx="85" cy="45" r="10" fill="#F2B04A" /><circle cx="85" cy="46" r="5.5" fill="#F4B6A6" />
      <ellipse cx="60" cy="73" rx="37" ry="32" fill="#F2B04A" />
      <ellipse cx="60" cy="87" rx="26" ry="18" fill="#FFF4E0" />
      <ellipse cx="46" cy="52" rx="9" ry="5" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 46 52)" />
      <ellipse cx="36" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.75" />
      <ellipse cx="84" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.75" />
      <g className="pet-eyes" opacity={open}><ellipse cx="48" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="49.4" cy="65.2" r="1.6" fill="#FFFFFF" /><ellipse cx="72" cy="67" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="73.4" cy="65.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M43 68 Q48 62 53 68" /><path d="M67 68 Q72 62 77 68" /></g>
      <ellipse cx="60" cy="75" rx="3" ry="2.2" fill="#E88C82" />
      <path d="M60 77 Q57 81 54 79 M60 77 Q63 81 66 79" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="94" rx="5" ry="7" fill="#7A5A3E" /><path d="M60 88 V100" stroke="#B9946E" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="52" cy="93" rx="4.5" ry="3.5" fill="#F7D9A8" />
      <ellipse cx="68" cy="93" rx="4.5" ry="3.5" fill="#F7D9A8" />
    </>
  ),
  pig: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M92 86 C102 86 104 76 98 74 C93 73 93 80 98 80" stroke="#F29A92" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="47" cy="103" rx="9" ry="5" fill="#F29A92" />
      <ellipse cx="73" cy="103" rx="9" ry="5" fill="#F29A92" />
      <ellipse cx="36" cy="45" rx="9" ry="13" fill="#F29A92" transform="rotate(-40 36 45)" />
      <ellipse cx="84" cy="45" rx="9" ry="13" fill="#F29A92" transform="rotate(40 84 45)" />
      <ellipse cx="60" cy="73" rx="35" ry="32" fill="#F7B8B0" />
      <ellipse cx="46" cy="52" rx="10" ry="5.5" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 46 52)" />
      <ellipse cx="38" cy="80" rx="6" ry="3.5" fill="#EE7F78" opacity="0.5" />
      <ellipse cx="82" cy="80" rx="6" ry="3.5" fill="#EE7F78" opacity="0.5" />
      <g className="pet-eyes" opacity={open}><ellipse cx="47" cy="65" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="48.4" cy="63.2" r="1.6" fill="#FFFFFF" /><ellipse cx="73" cy="65" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="74.4" cy="63.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M42 66 Q47 60 52 66" /><path d="M68 66 Q73 60 78 66" /></g>
      <ellipse cx="60" cy="79" rx="12" ry="8.5" fill="#F29A92" />
      <ellipse cx="56" cy="79" rx="2" ry="3" fill="#C8645C" /><ellipse cx="64" cy="79" rx="2" ry="3" fill="#C8645C" />
      <path d="M55 91 Q60 95 65 91" stroke="#2B2118" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  turtle: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <ellipse cx="30" cy="100" rx="9" ry="5" fill="#8CC89B" />
      <ellipse cx="90" cy="100" rx="9" ry="5" fill="#8CC89B" />
      <path d="M16 92 C16 46 104 46 104 92 Z" fill="#D9A877" />
      <circle cx="29" cy="78" r="7" fill="#C08A5C" /><circle cx="91" cy="78" r="7" fill="#C08A5C" />
      <circle cx="36" cy="62" r="5.5" fill="#C08A5C" /><circle cx="84" cy="62" r="5.5" fill="#C08A5C" />
      <rect x="14" y="88" width="92" height="9" rx="4.5" fill="#B5782F" />
      <ellipse cx="47" cy="104" rx="9" ry="5" fill="#8CC89B" />
      <ellipse cx="73" cy="104" rx="9" ry="5" fill="#8CC89B" />
      <ellipse cx="60" cy="72" rx="24" ry="23" fill="#9ED4AC" />
      <ellipse cx="51" cy="57" rx="7" ry="4" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 51 57)" />
      <ellipse cx="45" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <ellipse cx="75" cy="78" rx="6" ry="3.5" fill="#F29A7A" opacity="0.6" />
      <g className="pet-eyes" opacity={open}><ellipse cx="51" cy="70" rx="3.8" ry="4.8" fill="#2B2118" /><circle cx="52.4" cy="68.2" r="1.6" fill="#FFFFFF" /><ellipse cx="69" cy="70" rx="3.8" ry="4.8" fill="#2B2118" /><circle cx="70.4" cy="68.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M46 71 Q51 65 56 71" /><path d="M64 71 Q69 65 74 71" /></g>
      <path d="M54 80 Q60 85 66 80" stroke="#2B2118" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  owl: (open, happy) => (
    <>
      <ellipse cx="60" cy="109" rx="32" ry="5.5" fill="#2B2118" opacity="0.13" />
      <path d="M50 102 l-3 6 M50 102 l0 6 M50 102 l3 6 M70 102 l-3 6 M70 102 l0 6 M70 102 l3 6" stroke="#E0783A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M34 48 L30 28 L48 40 Z" fill="#B98654" stroke="#B98654" strokeWidth="6" strokeLinejoin="round" />
      <path d="M86 48 L90 28 L72 40 Z" fill="#B98654" stroke="#B98654" strokeWidth="6" strokeLinejoin="round" />
      <ellipse cx="60" cy="71" rx="34" ry="33" fill="#B98654" />
      <ellipse cx="27" cy="80" rx="8" ry="16" fill="#9C6B45" transform="rotate(15 27 80)" />
      <ellipse cx="93" cy="80" rx="8" ry="16" fill="#9C6B45" transform="rotate(-15 93 80)" />
      <ellipse cx="60" cy="90" rx="19" ry="13" fill="#F4D3A8" />
      <path d="M52 86 l3 3 l3 -3 M62 86 l3 3 l3 -3 M57 93 l3 3 l3 -3" stroke="#D9A877" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="64" r="12" fill="#FBEBD6" />
      <circle cx="72" cy="64" r="12" fill="#FBEBD6" />
      <ellipse cx="44" cy="46" rx="9" ry="4.5" fill="#FFFFFF" opacity="0.25" transform="rotate(-20 44 46)" />
      <ellipse cx="36" cy="76" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <ellipse cx="84" cy="76" rx="6" ry="3.5" fill="#E8785E" opacity="0.45" />
      <g className="pet-eyes" opacity={open}><ellipse cx="48" cy="65" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="49.4" cy="63.2" r="1.6" fill="#FFFFFF" /><ellipse cx="72" cy="65" rx="4.2" ry="5.2" fill="#2B2118" /><circle cx="73.4" cy="63.2" r="1.6" fill="#FFFFFF" /></g>
      <g className="pet-eyes" opacity={happy} fill="none" stroke="#2B2118" strokeWidth="3" strokeLinecap="round"><path d="M43 66 Q48 60 53 66" /><path d="M67 66 Q72 60 77 66" /></g>
      <path d="M56 71 L64 71 L60 78 Z" fill="#F2B04A" stroke="#F2B04A" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  ),
};

interface PetSpriteProps {
  kind: PetKind;
  /** happy = 閉眼笑（摸完嗰陣用） */
  mood?: PetMood;
  size?: number;
  className?: string;
}

export function PetSprite({ kind, mood = 'normal', size = 160, className }: PetSpriteProps) {
  const happy = mood === 'happy' ? 1 : 0;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={PET_NAMES[kind]}
    >
      {DRAW[kind](1 - happy, happy)}
    </svg>
  );
}
