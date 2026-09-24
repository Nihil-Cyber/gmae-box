# 而家狀態

- **產品名**：Gmae Box
- **版本**：0.2.0（2026-09-24）
- **類型**：教育 Web App（Vite + React + TypeScript）
- **第一位玩家角色**：Wesley
- **目前範圍**：數學、認字、單字、家園寵物／裝飾
- **網上玩**：https://nihil-cyber.github.io/gmae-box/

## 更新情況

| 項目 | 狀態 | 說明 |
| --- | --- | --- |
| 產品改名為 Gmae Box | 完成 | 主頁、網頁標題、套件名、進度儲存 key 已一齊改 |
| 數學四款遊戲 | 完成 | 加減、乘除、奧數、4×4 數獨 |
| 認字／單字 | 完成 | 睇圖認字、相似字、詞語配對、填缺字 |
| 家園同商店 | 完成 | 星星買寵物／裝飾，擺出收起，摸同餵 |
| 本機進度 | 完成 | 星星即時入帳；舊進度會自動遷移 |
| 文件（狀態／問題／修復／更新紀錄） | 完成 | 見本資料夾同 `CHANGELOG.md` |
| GitHub 新專案 | 完成 | https://github.com/Nihil-Cyber/gmae-box |
| 線上部署（GitHub Pages 等） | 完成 | https://nihil-cyber.github.io/gmae-box/ |
| 自訂玩家名稱 | 未開始 | 而家固定問候 Wesley |

## 技術摘要

- 前端：React 19、Vite 8、TypeScript
- 進度：`localStorage` key `gmae-box-progress-v1`
- 音效：Web Audio；認字可用系統粵語朗讀
- 數獨：4×4 填滿後再挖空，並檢查唯一解

## 點樣確認呢個版本

1. 打開 https://nihil-cyber.github.io/gmae-box/
2. 主頁有「我嘅家園」「認一認字」「單字配對」
3. 答啱題目星星會加；去商店可以買小花（4 星）或小雞（6 星）
4. 家園入面可以擺裝飾、摸寵物、花 1 星餵零食
