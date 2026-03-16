# Atchi - あっちへ行こう

方向と距離だけで歩く、新しい散歩体験。

ルート案内をしない地図アプリ。目的地への「あっち」だけを頼りに、自由に歩き回る。

## 使い方

1. 目的地を設定する（地図タップ or テキスト検索）
2. 「あっちへ行く」を押す
3. コンパスの矢印が示す方向へ歩く
4. 30m 以内に近づいたら到着

## 技術スタック

| 項目 | 選定 |
|---|---|
| フレームワーク | React + TypeScript |
| ビルド | Vite + SWC |
| スタイリング | Tailwind CSS v4 |
| 地図 | Leaflet + react-leaflet |
| ジオコーディング | Nominatim (OpenStreetMap) |
| PWA | vite-plugin-pwa |

## 開発

```bash
pnpm install
just dev
```

| コマンド | 説明 |
|---|---|
| `just dev` | 開発サーバー起動 |
| `just build` | プロダクションビルド |
| `just preview` | ビルドプレビュー |
| `just typecheck` | 型チェック |
| `just qr <url>` | URL の QR コード表示 |

## ライセンス

MIT
