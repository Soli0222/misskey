# Polestar (PSR) 独自実装仕様

upstreamのMisskeyに存在しない、このフォーク固有の実装をまとめる。

---

## 1. ユーザーフラグ拡張

### 概要

ユーザーモデルに3つの独自フラグを追加している。

| フラグ | カラム | 用途 |
|--------|--------|------|
| isNoCat | `boolean` default `false` | ユーザーがにゃ化を望まないことを示す |
| isSheep | `boolean` default `false` | ユーザーが羊であることを示す（みゃ化対象） |
| isDsite | `boolean` default `false` | dlsize変換の対象ユーザーであることを示す |

### 関連ファイル

- **DBモデル**: `packages/backend/src/models/User.ts`
- **マイグレーション**:
  - `packages/backend/migration/1690029913007-isSheep.js`
  - `packages/backend/migration/1711454117507-isDsite.js`
  - `packages/backend/migration/1728787821440-isNoCat.js`
- **APIエンドポイント**: `packages/backend/src/server/api/endpoints/i/update.ts`
  - `isNoCat`, `isSheep`, `isDsite` パラメータを受け付ける
- **エンティティシリアライズ**: `packages/backend/src/core/entities/UserEntityService.ts`
  - APIレスポンスに3フラグを含める
- **プロフィール設定画面**: `packages/frontend/src/pages/settings/profile.vue`
  - スイッチUIで各フラグを設定可能
- **misskey-js型定義**: `packages/misskey-js/src/autogen/types.ts`

---

## 2. myaize（みゃ化）

### 概要

`isSheep` フラグを持つユーザーの投稿テキストに適用される変換。「ま」行を「みゃ」に変換する。

```
ま → みゃ  /  マ → ミャ  /  ﾏ → ﾐｬ
みや → みゃ  /  ミヤ → ミャ  /  ﾐﾔ → ﾐｬ
```

### 関連ファイル

- **実装**: `packages/misskey-js/src/myaize.ts`
- **MFMレンダラー**: `packages/frontend/src/components/global/MkMfm.ts`
  - `myaize` prop（`boolean | 'respect'`）を追加
  - `'respect'` の場合は投稿者の `isSheep` フラグを参照
- **AiScript API**: `packages/frontend/src/aiscript/api.ts`
  - `Mk:myaize(text)` 関数として利用可能

---

## 3. nonyaize（にゃ化無効化）

### 概要

`isNoCat` フラグを持つユーザーの投稿は、たとえ `isCat` であってもにゃ化されない。
MFMレンダラー内で `shouldNyaize` の判定に `!shouldNoNyaize` の条件を追加している。

### 関連ファイル

- **MFMレンダラー**: `packages/frontend/src/components/global/MkMfm.ts`
  - `nonyaize` prop（`boolean | 'respect'`）を追加
  - `shouldNyaize && !shouldNoNyaize` のAND条件でにゃ化を抑制

---

## 4. dlsize

### 概要

`isDsite` フラグを持つユーザーの投稿テキストに適用される変換。成人向けコンテンツ用語を婉曲表現に置き換える。

### 関連ファイル

- **実装**: `packages/misskey-js/src/dlsize.ts`
- **MFMレンダラー**: `packages/frontend/src/components/global/MkMfm.ts`
  - `dlsize` prop（`boolean | 'respect'`）を追加
  - `'respect'` の場合は投稿者の `isDsite` フラグを参照
- **AiScript API**: `packages/frontend/src/aiscript/api.ts`
  - `Mk:dlsize(text)` 関数として利用可能

---

## 5. denyaize（猫外し）

### 概要

にゃ化されたノートに対して、元のテキストを一時的に表示するトグル機能。ノートのメニューから「猫外し」を選ぶと、にゃ化前のテキストをノート下部に追加表示する。

### 動作

1. ノートのメニューに「猫外し」ボタン（アイコン: `ti-brush`）を追加
2. 押すと `denyaize` フラグが反転し、元テキストをMFM変換なしで表示する

### 関連ファイル

- **メニュー定義**: `packages/frontend/src/utility/get-note-menu.ts`
  - `denyaize: Ref<boolean>` を引数に追加
  - `toggleDeNyaize()` 関数を追加
- **ノートコンポーネント**: `packages/frontend/src/components/MkNote.vue`
  - `denyaize` ref の定義と表示ロジック
  - 同様に `packages/frontend/src/components/MkNoteDetailed.vue`

---

## 6. サークル投稿

### 概要

「フォロワーのみ（visibility: followers）+ 連合なし（localOnly: true）」を1クリックで設定できるボタンを投稿フォームに追加。

### 動作

- 投稿フォームのヘッダーに惑星アイコン（`ti-planet`）のボタンを追加
- アクティブ時はハートハンドシェイクアイコン（`ti-heart-handshake`）に変わり、緑色で強調表示
- チャンネル投稿時・ダイレクト投稿時は無効化
- キーボードショートカット: **Ctrl+Shift**（macOSでは Cmd+Shift）

### 関連ファイル

- **投稿フォーム**: `packages/frontend/src/components/MkPostForm.vue`
  - `toggleCircle()` 関数を追加
  - `onKeydown` に Ctrl/Cmd+Shift のショートカット追加
- **ロケール**: `locales/ja-JP.yml`
  - `_visibility.circle`: "サークル"
  - `_visibility.circleDescription`: "フォロワーのみかつ連合なしにします"

---

## 7. Spotify NowPlaying ウィジェット（WidgetSpn）

### 概要

`https://spn.soli0222.com/note` を新しいタブで開くボタンウィジェット。Spotify NowPlayingを投稿するための外部ツール連携用。

### 設定可能プロパティ

| プロパティ | 型 | デフォルト |
|------------|-----|-----------|
| label | string | `"Spotify NowPlaying"` |
| colored | boolean | `true` |

### 関連ファイル

- **ウィジェット本体**: `packages/frontend/src/widgets/WidgetSpn.vue`
- **ウィジェット登録**: `packages/frontend/src/widgets/index.ts`
- **ロケール**: `locales/ja-JP.yml` の `_widgets.spn`

---

## 8. ノートフッターのお気に入りボタン

### 概要

ノートのフッターに直接お気に入り追加/削除ボタン（星アイコン）を表示する。
ノート表示時に `notes/state` APIを呼び出してお気に入り状態を確認し、リアクティブに反映する。

### 関連ファイル

- **ノートコンポーネント**: `packages/frontend/src/components/MkNote.vue`
  - `favorited` ref の定義と初期化
  - `checkFav()` 関数
  - `toggleFavorite()` ボタンUI
- 同様に `packages/frontend/src/components/MkNoteDetailed.vue`

---

## 9. Drop and Fusion 全期間ランキング

### 概要

バブルゲームのランキングに「全期間」タブを追加。デフォルトは直近7日間。

### バックエンド変更

- `bubble-game/ranking` エンドポイントに `alldata: boolean` パラメータを追加
- `alldata: true` の場合、`seededAt` による7日間フィルタを除去

### フロントエンド変更

- ランキングパネルに MkTab コンポーネントによるタブUIを追加
  - 「直近7日」 / 「全期間」

### 関連ファイル

- **バックエンド**: `packages/backend/src/server/api/endpoints/bubble-game/ranking.ts`
- **フロントエンド**: `packages/frontend/src/pages/drop-and-fusion.vue`
- **ロケール**: `locales/ja-JP.yml` の `allDays`

---

## 10. リバーシ フリーマッチ待機中ノートボタン

### 概要

リバーシのフリーマッチ待機画面に「ノートする」ボタンを追加。押すと「フリーマッチ待機中！」というテキストで即時投稿が行われる。

### 関連ファイル

- `packages/frontend/src/pages/reversi/index.vue`
  - `shareWaitng()` 関数（`os.post({ initialText: 'フリーマッチ待機中！', instant: true })`）

---

## 11. 絵文字パレット編集時のピッカー維持

### 概要

絵文字パレット編集画面で絵文字を追加する際、1つ選んでもピッカーが閉じずに連続して追加できる。

### 実装

- `os.pickEmoji()` に `handlers?: { onDone?: (emoji: string) => void }` 引数を追加
- `choseAndClose: false` オプションでピッカーを開いたまま維持
- `onDone` コールバックで絵文字追加処理を実行

### 関連ファイル

- **os.ts**: `packages/frontend/src/os.ts`
- **パレット編集**: `packages/frontend/src/pages/settings/emoji-palette.palette.vue`

---

## 12. アップデート後画面のキャッシュクリアボタン

### 概要

Misskeyのアップデート通知モーダル（MkUpdated）に「キャッシュクリアして閉じる(推奨)」ボタンを追加。アップデート後のキャッシュ問題を解消しやすくする。

### 関連ファイル

- `packages/frontend/src/components/MkUpdated.vue`
- **ロケール**: `locales/ja-JP.yml` の `closeandclear`

---

## 13. サーバー切断時「警告しない」オプション

### 概要

設定の「サーバーとの接続が切断されたとき」に「警告しない(非推奨)」選択肢を追加。

### 関連ファイル

- `packages/frontend/src/pages/settings/preferences.vue`
- **ロケール**: `locales/ja-JP.yml` の `_serverDisconnectedBehavior.nowarning`

---

## 14. QueueService スケジュール調整

### 概要

バックエンドのキュースケジュールを調整している。

| ジョブ | upstream | PSR |
|--------|----------|-----|
| resyncCharts | 毎日 00:00 | 毎日 03:00 |
| cleanRemoteNotes | 毎日 04:00 | 毎日 04:15 |

### 関連ファイル

- `packages/backend/src/core/QueueService.ts`

---

## 15. PWA マニフェスト変更

### 概要

WebアプリマニフェストをPolestar向けにカスタマイズしている。

| 項目 | upstream | PSR |
|------|----------|-----|
| short_name | Misskey | Polestar |
| name | Misskey | Polestar |
| theme_color | #86b300 | #7483c3 |

### 関連ファイル

- `packages/backend/src/server/web/manifest.json`

---

## 16. MeiliSearch 接続設定の修正

### 概要

MeiliSearchのホストURL構築で、ポート番号が設定されていない場合はホスト名のみで接続するよう修正。また、`indexNote` / `unindexNote` の可視性チェックを有効化している。

さらに、MeiliSearchのインデックスに `isNoCat`, `isSheep`, `isDsite` フラグをフィルタ可能属性として追加している。

---

## 17. Docker / インフラ構成

### 概要

- `docker-compose.yaml` を追加（バックエンド・フロントエンド・DB・キャッシュ等の構成）
- PostgreSQLイメージを `groonga/pgroonga:4.0.1-alpine-15` に変更（PGroonga全文検索対応）
- GitHub Actions の Docker ビルド・公開ワークフローを独自フォーク向けに整備
- 不要なupstream向けワークフロー（changelog-check, storybook, docker-develop等）を削除

---

## 18. スプラッシュ画像変更

- `packages/backend/assets/splash.png` をPolestar向けの画像に変更
- 元のsplash画像は `splash_original.png` として保存
