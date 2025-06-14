# 淡路島事業再構築補助金採択事例 プロジェクト概要

このプロジェクトは、淡路島における事業再構築補助金の採択事例を検索・閲覧できるWebアプリケーションです。Next.js 15.0.3、React 18.3.1、Tailwind CSS、shadcn/uiを使用したモダンなフロントエンド構成で構築されています。

## プロジェクトの特徴

- **プロジェクト名**: 淡路島事業再構築補助金採択事例
- **技術スタック**: Next.js 15.0.3, React 18.3.1, TypeScript, Tailwind CSS
- **UIライブラリ**: shadcn/ui (Radix UI ベース)
- **パッケージマネージャー**: Bun
- **データソース**: 経済産業省 中小企業庁公式発表資料（92件の採択事例）

## 主要機能

- **採択事例一覧表示**: 92件の事業再構築補助金採択事例をテーブル形式で表示
- **検索機能**: 企業名・事業内容でのテキスト検索
- **フィルター機能**: 市別・業種別・公募回別での絞り込み
- **統計情報表示**: 総件数、市別件数、業種別TOP3の表示
- **レスポンシブデザイン**: PC・タブレット・スマートフォン対応

### ディレクトリ構造
```
awaji-subsidy-cases/
├── app/                 # Next.js App Router
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
├── components/
│   └── ui/              # shadcn/ui基本コンポーネント
├── data/                # JSONデータファイル
├── lib/                 # ユーティリティ関数
├── types/               # TypeScript型定義
└── docs/                # ドキュメント・データソース
```

## 開発ガイドライン

このプロジェクトでは以下の開発ルールを厳守してください：

### 命名規則
- ファイル・フォルダ: **kebab-case** (例: `user-profile.tsx`)
- コンポーネント名: **PascalCase** (例: `UserProfile`)
- 変数名: **camelCase** (例: `isLoading`, `hasError`)
- boolean変数: `is`, `has`, `can`, `should` の接頭辞を使用

### コンポーネント設計
- **Named Export**を推奨（Default Exportは避ける）
- UI部品は `components/ui/` に配置
- 複合コンポーネントは `components/common/` に配置
- 機能固有コンポーネントは `components/features/` 内の各ディレクトリに配置

### スタイリング（Tailwind CSS）
- ユーティリティファーストアプローチ
- `globals.css` でテーマ設定を管理
- カスタムユーティリティは `@layer utilities` で定義
- shadcn/uiのデザインシステムに準拠

### TypeScript
- `strict: true` 設定
- 全関数に戻り値型を明示
- Props定義はinterfaceまたはtypeで明示
- zodを使用したAPIレスポンスバリデーション

## 知見管理システム

このプロジェクトでは以下のファイルで知見を体系的に管理しています：

### `.cursor/rules/dev-rules/`
- **コミットメッセージ規約**: 一貫性のあるコミットメッセージ書式
- **Web開発ガイドライン**: Next.js、Tailwind、shadcn/ui の使用方針
- **タスク管理ルール**: プロジェクト進捗管理の方法
- **問題解決プロセス**: 高度な問題解決アプローチ

### `docs/todo.md`
- プロジェクトのタスク管理
- 進捗状況の追跡
- 優先順位付けとスケジュール管理

## 重要な開発方針

1. **パッケージマネージャー**: **必ずbunを使用** (npmやyarnは禁止)
2. **shadcn/uiコンポーネント**: 手動実装禁止、コマンドでインストール
   ```bash
   bunx --bun shadcn@latest add [component-name]
   ```
3. **重複実装の防止**: 実装前に既存の類似機能をチェック
4. **共通化の推進**: 重複コードは積極的に共通化
5. **型安全性**: TypeScriptの型システムを最大限活用
6. **アクセシビリティ**: shadcn/ui（Radix UI）の標準に準拠
7. **パフォーマンス**: Next.js 15の最新機能を活用した最適化
8. **互換性重視**: デプロイエラーを避けるため安定版を優先
   - React 18.3.1 (React 19は避ける)
   - Next.js 15.0.3との互換性を最優先

## 開発コマンド

### 基本コマンド（必ずbunを使用）
```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun dev

# ビルド（デプロイ前に必ず実行して確認）
bun build

# 本番サーバー起動
bun start

# リンター実行
bun lint
```

### shadcn/uiコンポーネントの追加
```bash
# 初期設定（初回のみ）
bunx --bun shadcn@latest init

# コンポーネントの追加
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add card
```

### Git操作とデプロイ確認手順
```bash
# ビルドテスト（必須）
bun build

# 変更をコミット・プッシュ
git add -A
git commit -m "説明"
git push
```

## デプロイ関連の注意事項

1. **ビルドエラーの事前確認**: `bun build` で必ずエラーがないことを確認
2. **依存関係の互換性**: React 18.3.1とNext.js 15.0.3の組み合わせを維持
3. **Vercelでのデプロイ**: npmではなくbunが使用されるよう設定済み

**重要**: 新しい実装や重要な決定を行った際は、該当する知見管理ファイルを更新してください。特に新しいルールや制約事項が判明した場合は、必ずCLAUDE.mdファイルを更新してください。
