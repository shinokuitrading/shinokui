# 月之井品牌頁視覺素材紀錄

本頁可見文案來自 `messages/zh-TW.json`、`messages/ja.json` 的 `brandIntro`，屬品牌核准文案，不得修改、刪減或重排。原有延伸閱讀文字與連結亦保留。

## 素材來源與本輪使用依據

三張真實照片由使用者放置於 `~/Downloads/tsukinoi-brand-assets/` 並明確指示用於本頁；以使用者提供及授權使用的檔案為依據，未另行從網路取圖，也不推定其他用途的授權範圍。這三張均已到齊；生活情境 B 圖的授權狀態另列如下。

- `/images/brand/tsukinoi/tsukinoi-brewery-exterior.jpg`：使用者提供的酒藏外觀，5160 × 3440。原檔直接複製；桌面使用 4:5 容器與 `object-fit: cover`，視覺中心偏右保留門面與品牌招牌；手機與平板使用原始 3:2 比例。
- `/images/brand/tsukinoi/tsukinoi-oarai-coast.jpg`：使用者提供的真實酒瓶與礫石海岸照片，700 × 700。保留正方形原圖比例及完整酒瓶，顯示寬度上限 560px，不為符合寬幅比例而裁掉瓶身。
- `/images/brand/tsukinoi/tsukinoi-koji-tray.jpg`：使用者提供的雙手與木製麹蓋照片，920 × 613。完整保留手部、米麹與器具，無人物臉部，顯示寬度上限 640px。
- `/images/彦市 純米大吟醸.jpg`、`/images/彦市純吟.jpg`：依使用者本輪指示移出「傳統之上，溫柔地前行」區域；原檔與其他頁面的商品照片均保留。
- `/images/brand/tsukinoi/moonlit-sea.jpg`：依本輪指示保留現有 Hero。這是上一輪由 image_gen 生成的非紀實月光海面氛圍圖，非特定地點或酒藏實拍。本輪不重新生成、不替換圖片。

歷史區原大型 Logo、風土區原 AI 酒器情境圖、釀造區原和の月39商品圖已從本頁版型移除；原始素材仍保留，其他使用位置不變。本輪沒有新增 AI 圖或第三方網路替代圖，也沒有新增可見圖說。

## 生活情境 B 圖：等待正式授權素材

使用者提供的構圖參考為 `~/Downloads/Brand-new！今の荻窪を感じる荻窪最新スポット｜さんたつ by 散歩の達人.jpg`，內容為月之井酒款、酒器與料理的第三方實拍。專案目前沒有其商業網站使用授權紀錄；提供參考檔不等於確認商業使用授權。因此本檔沒有複製到 public、Git 或正式站，也沒有使用 AI 或其他圖片替代。

「傳統之上，溫柔地前行」保留 4:3 暖米灰無文字圖片位置（`TsukinoiStory.tsx` 的 `daily-life` 項目），不產生圖片請求或破圖。桌面維持圖片左、原文右，手機維持原文後接圖片位置，間距 28px；原文及順序不變。

**B 圖等待正式授權素材。** 優先取得月之井提供且可用於本商業網站的相近生活情境照片；或確認 B 圖的正式授權後，再以 Next/Image 替換此位置，依正式原圖構圖調整比例，完整保留酒款、酒器與料理。不得直接把目前的第三方參考圖部署上線。

## 月光海面生成提示詞

Use case: photorealistic-natural. Asset type: wide landscape website hero, 1536x1024 or larger landscape. Create a quiet, refined, non-documentary atmospheric image of a generic moonlit open sea, no identifiable location. Low horizon in upper third, subtle silvery path of moonlight across small textured waves, charcoal blue-gray water, pearl warm-gray twilight sky, a small natural moon near upper right, softly luminous restrained contrast, fine photographic grain, mature Japanese editorial feeling, no dramatic fantasy. Balanced wide composition suitable for crop to 16:9 and 4:3; interest in center and right, calm left. No land landmarks, no torii, no buildings, no boats, no people, no products, no bottles, no labels, no text, no logos, no watermark. This is an AI atmospheric illustration, not a real photograph of any brewery or place.

## 日期

品牌資料目前沒有 `dateModified` 欄位，品牌 sitemap 項目也沒有 lastmod。此次圖片與排版更新不新增推測日期，不以 build、部署或當日日期填入。文章與其他 sitemap 日期邏輯維持原狀。
