# 問題同修復

呢份文件記錄已知問題、已經修過嘅問題，同計劃修復。跟進單已經開咗喺 [GitHub Issues](https://github.com/Nihil-Cyber/gmae-box/issues)。

## 已知問題

| ID | GitHub | 嚴重程度 | 問題 | 影響 | 計劃 |
| --- | --- | --- | --- | --- | --- |
| GB-1 | — | 低 | 超寬螢幕主頁左右大片留白 | 桌面瀏覽器觀感 | 之後加最大寬度內嘅裝飾或關卡地圖 |
| GB-2 | [#1](https://github.com/Nihil-Cyber/gmae-box/issues/1) | 中 | 玩家名稱寫死 Wesley | 其他小朋友用唔到個人化問候 | 加設定頁，預設仍可係 Wesley |
| GB-3 | [#2](https://github.com/Nihil-Cyber/gmae-box/issues/2) | 中 | 未有錯題本 | 答錯之後冇得集中複習 | 紀錄錯題，主頁加「再練一次」 |
| GB-4 | [#3](https://github.com/Nihil-Cyber/gmae-box/issues/3) | 低 | 數獨「提示」只填空格，唔會改正填錯嘅格 | 填錯之後靠提示都完成唔到 | 提示優先修正衝突格，再填空格 |
| GB-5 | — | 低 | 連續猛撳數獨提示，同一輪更新可能只填一格 | 自動化／連撳時 | 用 functional state update |
| GB-7 | — | 低 | 未有離線 PWA 安裝 | 加到主畫面之後重開可能要有網絡 | 加 manifest 同 service worker |
| GB-8 | [#5](https://github.com/Nihil-Cyber/gmae-box/issues/5) | 低 | 科學／邏輯遊戲仲未有 | 願景未完成 | 見 [ROADMAP.md](./ROADMAP.md) |

## 已修復

| ID | 修復版本 | 問題 | 修復 |
| --- | --- | --- | --- |
| GB-F1 | 0.1.0 | 練習中途撳返回，當局第一次答啱嘅星星唔入帳 | 每題第一次答啱即時寫入 `localStorage` |
| GB-F2 | 0.1.0 | 數獨初始化時 `puzzle` 同 `solution` 分開 `generateSudoku()`，變成兩盤題 | 改為開始遊戲先產生一盤，謎面由同一解答挖空 |
| GB-F3 | 0.1.0 | 奧數比較題用「數值碰巧相等」判斷加減定乘法，顯示可能同真正算式唔一致 | 分開記錄用左邊／右邊邊種運算 |
| GB-F4 | 0.1.0 | 答錯三次會卡住 | 第三次顯示答案並自動下一題 |
| GB-F5 | 0.1.0 | Vite 預設 README／標題同遊戲無關 | 換成 Gmae Box 文件同品牌 |
| GB-F6 | 0.1.0 | 產品改名後舊進度 key 會失效 | 讀取時兼容 `wesley-math-progress-v1`，並寫入新 key |
| GB-F7 | Unreleased | 喺 GitHub 撳 HTML 唔會行起遊戲 | 用 GitHub Pages 發布編譯後嘅 Web App：https://nihil-cyber.github.io/gmae-box/ |

## 點樣回報新問題

喺 GitHub 開 Issue，盡量寫：

1. 邊款遊戲、邊個難度
2. 預期發生咩事、實際發生咩事
3. 用緊手機、平板定電腦
4. 可重現步驟
