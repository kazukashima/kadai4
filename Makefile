.PHONY: dev build deploy test

# 開発サーバー起動
dev:
	npm run dev

# 本番用ビルド
build:
	npm run build

# Firebase にデプロイ
deploy: build
	firebase deploy

# テスト実行（MVP2でJestを入れたら）
test:
	npm run test
