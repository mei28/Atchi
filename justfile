# Atchi - あっちへ行こう

# 開発サーバー起動
dev:
    pnpm dev

# プロダクションビルド
build:
    pnpm build

# ビルドプレビュー
preview:
    pnpm build && pnpm preview

# 型チェック
typecheck:
    pnpm tsc -b --noEmit

# ngrok URL の QR コードを表示
qr url:
    npx -y qrcode "{{url}}"
