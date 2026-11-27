# TAKAHASHI SORACHI Portfolio

髙橋空知の活動、制作物、プロジェクトを紹介するポートフォリオサイトです。

## 作品を追加する

[Pages CMS](https://app.pagescms.org/)でGitHubアカウントにログインし、`T-Sorachi / portfolio-site`の`main`ブランチを開きます。

1. 「作品と活動」を開き、新しい項目を追加します。
2. 「タイトル」「メイン写真」「説明」を入力します。写真はその場でアップロードできます。
3. 必要に応じて、追加の写真、分類、期間、担当したことなどを入力し、保存します。
4. 自動公開の完了後、[公開サイト](https://t-sorachi.github.io/portfolio-site/)を開いて確認します。保存から反映までは少し時間がかかります。

既存の作品を選ぶと、同じ画面で文章や写真を編集できます。表示順は小さい数字が先頭になり、空欄や0の作品は上に追加されます。同じ表示順の新規作品同士では、新しく作った作品が先になります。先頭3件はトップページにも掲載されます。

Pages CMSのオンライン版と、公開リポジトリのGitHub Pagesを使う構成です。有料プランや新しいサーバーの契約は不要です。初回だけ、Pages CMSのGitHub Appをこのリポジトリに接続します。

### 写真と説明

- メイン写真は一覧と詳細ページの先頭に表示します。
- 追加の写真は最大30枚です。JPEG、PNG、WebP、AVIF、GIF、SVGを利用できます。
- 説明は普通の文章で入力できます。空行を入れると段落を分けられます。
- 期間、担当、使用ツール、場所などは空欄でも保存できます。

公開リポジトリのため、登録する文章や写真には公開してよい内容を使ってください。

### 保存後に反映されないとき

[公開処理の履歴](https://github.com/T-Sorachi/portfolio-site/actions/workflows/deploy-pages.yml)を確認します。写真が見つからないなどの問題がある場合は公開処理が停止し、最後に成功したサイトの表示を維持します。編集画面で写真を選び直して保存してください。

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`main`ブランチへのプッシュ時に、GitHub ActionsからGitHub Pagesへ自動デプロイします。

作品データは`content/works/*.json`、作品の写真は`public/media/works/`、編集画面の設定は`.pages.yml`です。作品を追加してもJavaScriptの編集は必要ありません。既存作品の`1.json`〜`9.json`というファイル名は、公開済みの作品URLを維持するため変更しません。

```bash
npm test
npm run lint
npm run build
```

`npm run build`では、作品データと写真の参照も検証します。
