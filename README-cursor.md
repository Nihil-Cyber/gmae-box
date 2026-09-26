# 我嘅家園（Pet Habitat）· 交俾 Cursor 嘅規格

技術棧：React 19 + TypeScript + Vite 8。目標檔案：`src/games/Garden.tsx`（重做視覺，玩法同數據邏輯不變）。

## 資料夾內容

| 檔案 | 用途 |
|---|---|
| `src/games/garden/PetSprite.tsx` | 6 隻原創寵物 SVG 元件，`kind` + `mood`（`happy` = 閉眼笑） |
| `src/games/garden/DecoSprite.tsx` | 15 款裝飾 SVG 元件 + `DECO_META`（名、天空/地面、短介紹） |
| `src/games/garden/tokens.ts` | 顏色、圓角、陰影、尺寸、字體 |
| `src/games/garden/garden.css` | 玩具掣、呼吸、摸、餵、搖、閃、擺出等動畫，已處理 reduced-motion |
| `screens/` | 請將設計畫布匯出嘅 A–E 圖放入呢度，俾 Cursor 對住做 |

字體：喺 `index.html` 加
`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@400;700;900&display=swap">`

---

## 不可以改嘅嘢

- 只有兩個 Tab：家園、商店；商店再分寵物、裝飾。
- 狀態只有「飽肚」「開心」兩條。
- 摸一摸免費加開心；餵零食扣 1 粒星星加飽肚。
- 點寵物 = 摸；點場景入面嘅裝飾 = 收起。
- 星星、擁有、擺出、出場寵物嘅 state 同儲存方式照用現有邏輯。
- 寵物唔會死、冇懲罰、冇倒數、冇紅色交叉。

---

## 家園（手機 390×844，由上到下）

1. 安全區頂 `env(safe-area-inset-top)`，最少 50px。
2. **頂欄** 56px：左邊返回（48px 圓、奶油底、下邊 4px 陰影）；中間「我嘅家園」22px/900；右邊星星膠囊 44px 高。
3. **Tab 底座**：`track` 色底、圓角 22、內距 6，兩格等寬；選中格用 `sun` 色 + `0 5px 0 sunShadow`，未選格透明、字用 `inkSoft`。
4. **劇場**：高約 46% 畫面（手機 392px），外框 `card` 色、圓角 30、內距 8、紙本陰影；內景圓角 22、`overflow:hidden`。
   - 天空底色：開心 ≥ 70 用 `skyHappy`，否則 `skyCalm`。
   - 三層剪紙山丘（遠 `hillFar`／中 `hillMid`／近 `hillNear`），每層頂邊加一條白色半透明描邊，做紙張切邊感。
   - 內圈 2px 白色虛線（縫線），`inset: 6px`。
   - 天空裝飾放上半部（有遠近：太陽大、雲細）；地面裝飾放草地，貼住底部，有自己嘅影。
   - **中間偏下永遠留俾寵物**：寵物寬 ≈ 35% 畫面，唔准有裝飾遮住。
5. **對話框**：一句，上方有小三角指向寵物，例如「小雞：好開心，想同你玩！」（名用 `clayText`）。
6. **狀態條**：左邊 icon + 文字（飽肚／開心），右邊 22px 高粗圓條；飽肚 `clay`，開心 `sun`；用 `role="meter"`。
7. **兩個主掣**並排，64px 高、圓角 22：摸一摸（`toy-btn--cream`）、餵零食 ⭐1（`toy-btn--honey`，星星用膠囊）。
8. 底部安全區最少 34px。

**空狀態（未有寵物）**：天空貼一張紙條「未有寵物。／去商店領養一隻啦！」（上面有一小段和紙膠帶）；草地中間畫一個空軟墊；收起對話框、狀態條同兩個照顧掣，換成一張卡：「你有 ⭐12，夠領養兔仔喇！」+ 64px「去商店揀寵物」蜜糖金大掣（跳去商店 › 寵物）。星星未夠最平嗰隻時，改寫「去玩遊戲賺星星，就可以領養啦！」。

## 商店

- 頂欄同 Tab 同家園一樣（商店格選中）。
- Tab 下面一條糖果舖雨篷（`#F4A58A` / `#FFF8E8` 間條 + 半圓波浪邊 + 頂部木棍 `#B5703F`），下面接 `shopPanel` 色櫃台，圓角只喺底部。
- 子 Tab：寵物／裝飾，46px 膠囊；選中用深棕底奶油字。
- 2 欄卡，卡高約 220、圓角 22、`card` 陰影；圖示區 92px 高、有底色；名 19px/900；一句 14px；按鈕 46px。
- 按鈕狀態：

| 狀態 | 樣子 |
|---|---|
| 未擁有、夠星星 | 蜜糖金「⭐ N 購買」 |
| 未擁有、唔夠 | `shortBg` 暖色「⭐ N・仲差 M 粒」，**唔好灰、唔好 disabled 樣**；撳落 `soft-shake` + 輕聲一句「星星唔夠呀」 |
| 寵物已擁有、出場中 | `ownedBg` 勾「而家喺度」+ 卡面薄荷綠 3px 框 + 右上角綠勾 |
| 寵物已擁有、未出場 | 薄荷「帶出嚟」 |
| 裝飾已擺出 | 奶油「收起」+ 圖示區右上「擺咗出嚟」標記 |
| 裝飾已擁有、未擺 | 薄荷「擺出」 |

- 裝飾卡圖示區：天空物用淨藍底；地面物用上藍下草（66% 分界）；左上角細標籤「天空」／「地面」。

## iPad（768×1024）

- 劇場 600×560 置中，寵物 200px；主掣 76px 高；狀態條兩條並排。
- 劇場左右各約 84px 唔好留空：放和紙膠帶、壓花葉、星星貼紙、鈕扣、「Wesley 嘅家」名牌等（`aria-hidden`、唔可以撳）。

---

## 互動回饋

| 動作 | 效果 | class |
|---|---|---|
| 撳任何掣 | 沉落 4px | `toy-btn` |
| 寵物平時 | 2.8 秒呼吸浮動 | `pet-idle` |
| 摸（掣或點寵物） | 彈一下 + `mood="happy"` 約 1.2 秒 + 3–5 粒心心 / 白點向上飄 | `pet-pat`、`heart-pop` |
| 餵零食 | 曲奇由掣飛去寵物（600ms）→ 到咗先加飽肚、寵物彈一下、講「好味！」 | `snack-x` + `snack-y`、`meter-fill` |
| 星星唔夠 | 掣輕搖，一句「星星唔夠呀」 | `soft-shake` |
| 買成功 | 卡片閃黃光 + toast「買咗兔仔！」 | `card-flash`、`toast-pop` |
| 裝飾擺出 | 回到家園時由下彈入場景 | `deco-enter` |
| 點場景裝飾收起 | 縮細淡出 | `deco-leave` |

規則：回饋期間照樣可以再撳（粒子 `pointer-events:none`，唔好鎖掣）；動畫只用 transform / opacity；用 `onAnimationEnd` 清走粒子。

---

## 文案（粵語書面語）

我嘅家園 · 家園 · 商店 · 寵物 · 裝飾 · 摸一摸 · 餵零食 · 飽肚 · 開心 · 購買 · 帶出嚟 · 而家喺度 · 擺出 · 收起 · 擺咗出嚟 · 星星唔夠呀 · 仲差 N 粒 · 買咗{寵物}！ · 未有寵物。 · 去商店領養一隻啦！ · 去商店揀寵物 · 去玩遊戲賺星星 · 好味！

---

## 貼入 Cursor 嘅指令

> 請重做 `src/games/Garden.tsx` 嘅視覺，跟 `README-cursor.md` 同 `screens/` 入面嘅設計圖。
> 1. 先讀現有 `Garden.tsx`，列出現有 state（星星、寵物、裝飾、飽肚、開心）同 handler，**全部保留，唔好改玩法同儲存**。
> 2. 用 `src/games/garden/PetSprite.tsx`、`DecoSprite.tsx` 取代所有 emoji；顏色尺寸用 `tokens.ts`；import `garden.css` 做動畫。
> 3. 將畫面拆成細元件放 `src/games/garden/`：`GardenTopBar`、`GardenTabs`、`HabitatStage`、`PetBubble`、`CareMeters`、`CareButtons`、`ShopPanel`、`ShopCard`。
> 4. 手機直向優先，iPad（≥ 768px）用 README 嘅 iPad 版面；用 `env(safe-area-inset-*)`。
> 5. 所有可以撳嘅嘢用 `<button>`，最細 44px；icon 掣要有 `aria-label`。
> 6. 做完之後列出你改咗邊啲檔案，同埋有冇任何原本邏輯要郁先做到。
