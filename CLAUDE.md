# Ezo プロジェクト概要

このプロジェクトは、不動産・リゾート関連のWebアプリケーションです。Next.js 15.3.2、React 19、Tailwind CSS v4、shadcn/uiを使用したモダンなフロントエンド構成で構築されています。

## プロジェクトの特徴

- **プロジェクト名**: Ezo
- **技術スタック**: Next.js 15.3.2, React 19, TypeScript, Tailwind CSS v4
- **UIライブラリ**: shadcn/ui (Radix UI ベース)
- **アニメーション**: GSAP
- **フォーム管理**: React Hook Form + Zod
- **多言語対応**: app/[lang] 構造を使用
- **パッケージマネージャー**: Bun

## 主要機能

### コンポーネント構成
- **Property**: 不動産物件関連機能
- **Resort**: リゾート関連機能
- **Consultation**: コンサルテーション機能
- **Contact**: お問い合わせフォーム
- **Member**: メンバー関連機能
- **FAQ**: よくある質問
- **Home**: ホームページ関連

### ディレクトリ構造
```
src/
├── app/[lang]/           # 多言語対応のApp Router
├── components/
│   ├── ui/              # shadcn/ui基本コンポーネント
│   ├── common/          # 共通コンポーネント
│   ├── layout/          # レイアウトコンポーネント
│   └── features/        # 機能別コンポーネント
├── hooks/               # カスタムフック
├── lib/                 # ユーティリティ関数
├── types/               # TypeScript型定義
├── constants/           # 定数定義
├── contexts/            # React Context
└── styles/              # グローバルスタイル
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

### スタイリング（Tailwind CSS v4）
- ユーティリティファーストアプローチ
- `globals.css` でテーマ設定を管理
- カスタムユーティリティは `@layer utilities` で定義
- prettier-plugin-tailwindcssでクラス順序を自動整列

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

1. **重複実装の防止**: 実装前に既存の類似機能をチェック
2. **共通化の推進**: 重複コードは積極的に共通化
3. **型安全性**: TypeScriptの型システムを最大限活用
4. **アクセシビリティ**: shadcn/ui（Radix UI）の標準に準拠
5. **パフォーマンス**: Next.js 15の最新機能を活用した最適化

## 開発コマンド

```bash
# 開発サーバー起動
bun dev

# ビルド
bun build

# 本番サーバー起動
bun start

# リンター実行
bun lint
```

**重要**: 新しい実装や重要な決定を行った際は、該当する知見管理ファイルを更新してください。特に `docs/todo.md` は機能実装後に必ず更新することを厳守してください。
また、プロジェクトルールに変更があった場合、CLAUDE.mdファイルを随時更新してください。
