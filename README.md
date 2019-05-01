# blackJAM v.1.0

> 「これからのブログ」を簡単に始めよう。
> インストール後、次の手順に従ってください。

## 依存パッケージをインストールする（クローンしたら最初に行ってください）

``` bash
$ npm install # Or yarn install
```

## 開発モードで起動（localhost:3000でサイトを表示できるようになります）
```bash
$ npm run dev
```

## `siteConfig.json`で基本設定を行う（公開後に設定を変更することもできます）

ロゴ、アイコン画像はテンプレートフォルダ直下の`static`内に保存した上で、`/ファイル名`のように記入します。
```json
{
  "title": "サイトのタイトル", 
  "subtitle": "サイトのサブタイトル",
  "baseURL": "サイトのトップページURL",
  "logo": "/logo.png",
  "logoWithTitles": "/logo.png",
  "logoWithTitlesSmall": "/logoSmall.png",
  "icon": "/icon.png",
  "favicon": "/icon.png",
  ...
}
```

## テンプレートフォルダをGitHubレポジトリにpushする

GitHubレポジトリを持っていない場合は、[GutHub](https://github.com/)でアカウントを作成後、レポジトリを作成してください。
```bash
$ git init
$ git add .
$ git commit -m"blackJAM initial commit"
$ git remote add origin <あなたのレポジトリのURL>
$ git push -u origin master
```

## Netlifyでサイトを公開する

[Netlify](https://www.netlify.com/)で、GitHubアカウントと連携させてアカウントを作成してください。

デプロイ設定にて、以下の通り設定を行なってください。
|Build command    | npm run generate |
|-----------------|-----------------|
|Publish directory| dist |

![netlify-deploy-setting](/static/netlify-deploy-setting.gif)

