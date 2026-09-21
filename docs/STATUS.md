# 而家狀態

- **產品名**：Gmae Box
- **版本**：0.1.0（2026-09-21）
- **類型**：H5 教育遊戲（Vite + React + TypeScript）
- **第一位玩家角色**：Wesley
- **目前範圍**：數學四款小遊戲，可喺手機／平板瀏覽器使用
- **網上玩**：https://nihil-cyber.github.io/gmae-box/

## 更新情況

| 項目 | 狀態 | 說明 |
| --- | --- | --- |
| 產品改名為 Gmae Box | 完成 | 主頁、網頁標題、套件名、進度儲存 key 已一齊改 |
| 數學四款遊戲 | 完成 | 加減、乘除、奧數、4×4 數獨 |
| 本機進度 | 完成 | 星星即時入帳；舊進度會自動遷移 |
| 文件（狀態／問題／修復／更新紀錄） | 完成 | 見本資料夾同 `CHANGELOG.md` |
| GitHub 新專案 | 完成 | https://github.com/Nihil-Cyber/gmae-box |
| 線上部署（GitHub Pages 等） | 完成 | https://nihil-cyber.github.io/gmae-box/ |
| 語文／邏輯／科學遊戲 | 未開始 | 見路線圖 |
| 自訂玩家名稱 | 未開始 | 而家固定問候 Wesley |

## 技術摘要

- 前端：React 19、Vite 8、TypeScript
- 進度：`localStorage` key `gmae-box-progress-v1`
- 音效：Web Audio，無外部音檔
- 數獨：4×4 填滿後再挖空，並檢查唯一解

## 點樣確認呢個版本

1. 打開 https://nihil-cyber.github.io/gmae-box/
2. 主頁標題係 **Gmae Box**
3. 四個遊戲都可以揀難度、開始、答題／填盤、返回
4. 答啱之後返回主頁，星星同「答啱題數／完成局數」仍然在
