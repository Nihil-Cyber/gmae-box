# GitHub 線上版風格樣本（`18c956d`）

從而家遊戲入面嘅 inline SVG 抽出嚟，**就係 Calvin 確認想用嘅簡筆圓貼紙**，唔係之後嗰套 512 繪本剪紙。

程式唔好引用呢個資料夾；只係俾 Claude Design／畫新圖用。

## 檔案

- 寵物 6×2：`pets/{chick,rabbit,cat,dog,panda,dragon}-{normal,happy}.svg`
- 新寵物／新裝飾原稿：`new/`（已搬入遊戲）
- 裝飾 21：`decor/*.svg`（果樹 id 係 `fruittree`）
- 一排總覽：`sheet-pets.svg`
- **其餘 icon（首頁、頂欄、升級）**：去 `icons/README.md`，跟同一套貼紙風交俾 Claude 重畫

畫布：寵物 `viewBox="0 0 120 120"`；裝飾 `0 0 100 100`。腳底約 y=109 有一粒淺棕落地影橢圓。

## 風格要跟住畫

**要**
- 飽滿圓身／圓塊，簡筆幾何，五官少
- 開眼：深棕橢圓 + 細白高光；開心：閉眼弧
- 實色填、少漸層；落地影係淺橢圓，唔好高斯模糊
- 遠睇剪影都分到邊隻／邊件
- 色：紙底 `#F6E7C1`、墨 `#2B2118`、太陽黃 `#F7C948`、蜜糖 `#F2B04A`、陶土 `#D9784F`、薄荷 `#9ED4AC`

**唔要**
- 寫實毛髮、有機 blob、閃粉大眼、蛋殼小雞
- 系統 emoji、Lucide／Material icon
- 3D 塑料、賽博、暗黑

## 卡底色（寵物）

| id | 名 | 卡底 |
|---|---|---|
| chick | 小雞 | `#FDEBB5` |
| rabbit | 兔仔 | `#FBE0D6` |
| cat | 小貓 | `#FCE3C4` |
| dog | 小狗 | `#F3E2CC` |
| panda | 熊貓 | `#E4EEF2` |
| dragon | 小龍 | `#D9F0E0` |

貼去 Claude Design 時，請一齊附 `sheet-pets.svg` 同 1–2 隻寵物 SVG 做風格樣本。
