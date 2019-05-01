# blackJAM v.1.0

> A Minimal Template for Modern Blogs with Nuxt.js & Contentful.

### 1. Install.

```bash
$ git clone https://github.com/KyoYasuhisa/blackjam-starter.git
```

### 2. Install Dependencies.

``` bash
$ npm install # Or yarn install
```


### 3. Basic Settings in `siteConfig.json`.

Save logo & icon image files in a folder named `static` and write the file names as `/fileName`.
```json
{
  "title": "Site title", 
  "subtitle": "Site subtitle",
  "baseURL": "Toppage URL",
  "logo": "/logo.png",
  "logoWithTitles": "/logo.png",
  "logoWithTitlesSmall": "/logoSmall.png",
  "icon": "/icon.png",
  "favicon": "/icon.png",
  ...
}
```


### 4. Push the template folder into your GutHub Repo.

In case you still don't have your own GitHub repository, prepare one after creating your GitHub account at [GutHub](https://github.com/).
```bash
$ git init
$ git add .
$ git commit -m"blackJAM initial commit"
$ git remote add origin <Your Repository URL>
$ git push -u origin master
```


### 5. Deploy Site via Netlify

Create your [Netlify](https://www.netlify.com/) account with your GitHub account.

Set the deploy setting as follows: 
- Build command: **npm run generate**
- Publish directory: **dist**

![netlify-deploy-setting](/static/netlify-deploy-setting.gif)



### Visit our official website for further directions.

[blackJAM](https://berryjam.icu/)

---

# blackJAM v.1.0

> 「これからのブログ」を簡単に始めよう。
> インストール後、次の手順に従ってください。


### 1. テンプレートをインストールする
```bash
$ git clone https://github.com/KyoYasuhisa/blackjam-starter.git
```


### 2. 依存パッケージをインストールする
``` bash
$ npm install # Or yarn install
```


### 3. `siteConfig.json`で基本設定を行う（公開後に設定を変更することもできます）

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


### 4. テンプレートフォルダをGitHubレポジトリにpushする

GitHubレポジトリを持っていない場合は、[GutHub](https://github.com/)でアカウントを作成後、レポジトリを作成してください。
```bash
$ git init
$ git add .
$ git commit -m"blackJAM initial commit"
$ git remote add origin <あなたのレポジトリのURL>
$ git push -u origin master
```


### 5. Netlifyでサイトを公開する

[Netlify](https://www.netlify.com/)で、GitHubアカウントと連携させてアカウントを作成してください。

デプロイ設定にて、以下の通り設定を行なってください。
- Build command: **npm run generate**
- Publish directory: **dist**

![netlify-deploy-setting](/static/netlify-deploy-setting.gif)



### その後の流れについては、公式サイトを参照してください。

[公式サイト](https://berryjam.icu/)