# 更新紀錄

本檔依照 [Keep a Changelog](https://keepachangelog.com/zh-TW/1/1.0/) 格式，版本號跟 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [Unreleased]

- 用 GitHub Pages 發布 Web App：https://nihil-cyber.github.io/gmae-box/
- 每次推去 `main` 都會自動編譯靜態 HTML 並上線
- 喺 GitHub 建立公開專案 [Nihil-Cyber/gmae-box](https://github.com/Nihil-Cyber/gmae-box)
- 開咗跟進 Issue：玩家名稱、錯題本、數獨提示、更多教育遊戲類型

## [0.1.0] — 2026-09-21

Gmae Box 第一個公開版本。由「Wesley 數學樂園」重新命名，並以教育遊戲盒作為長遠方向。

### 新增

- 主頁「Gmae Box」品牌、教育遊戲盒標語同願景說明
- 加加減減：雙位數加減，初中高三級（進位／借位逐步加強）
- 乘乘除除：單位數乘除，按九九範圍分級
- 奧數挑戰：搵規律、填空、應用題、比較大小、排隊推理、巧算、雞兔同籠
- 四宮數獨：4×4 唯一解產生器、衝突提示、提示格、檢查
- 星星進度儲存在瀏覽器；答啱即時入帳，中途離開都唔會食咗星星
- 觸控數字鍵盤、對／錯音效、完成撒花
- 靜音按鈕；舊版 `wesley-math-progress-v1` 進度會自動搬去新 key

### 修復

見 [docs/ISSUES.md](./docs/ISSUES.md)「已修復」。重點包括：

- 中途返回主頁會丟失當局星星
- 數獨開局時謎面同解答來自兩盤唔同嘅題
- 奧數比較題兩邊算式有機會顯示錯運算

### 文件

- 新增 README、更新紀錄、狀態、問題同路線圖
