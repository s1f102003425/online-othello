# |online-othello|

フロントエンドは src ディレクトリの [Next.js](https://nextjs.org/) 、バックエンドは server ディレクトリの [frourio](https://frourio.com/) で構築された TypeScript で一気通貫開発が可能なモノレポサービス

## デモ環境リンク

https://solufa.github.io/next-frourio-starter/

## ローカル開発

### Node.js のインストール

ローカルマシンに直接インストールする

https://nodejs.org/ja/ の左ボタン、LTS をダウンロードしてインストール

### リポジトリのクローンと npm モジュールのインストール

フロントとバックエンドそれぞれに package.json があるので 2 回インストールが必要

```sh
$ npm i
$ npm i --prefix server
```

### 環境変数ファイルの作成

.env ファイルを 4 つ作成する  
prisma 用の.env には自分で起動した PostgreSQL の設定を書く

```sh
$ cp .env.example .env
$ cp server/.env.example server/.env
$ cp docker/dev/.env.example docker/dev/.env
$ echo "API_DATABASE_URL=postgresql://root:root@localhost:5432/|online-othello|" >> server/prisma/.env
```

### ミドルウェアのセットアップ

```sh
$ docker-compose up -d
```

#### Firebase Emulator

http://localhost:4000/auth

#### MinIO Console

http://localhost:9001/

#### PostgreSQL UI

```sh
$ cd server
$ npx prisma studio
```

### 開発サーバー起動

次回以降は以下のコマンドだけで開発できる

```sh
$ npm run notios
```

Web ブラウザで http://localhost:3000 を開く

開発時のターミナル表示は [notios](https://github.com/frouriojs/notios) で制御している

[Node.js モノレポ開発のターミナルログ混雑解消のための新作 CLI ツール notios](https://zenn.dev/luma/articles/nodejs-new-cli-tool-notios)

閉じるときは `Ctrl + C` を 2 回連続で入力

### 開発中のバグの早期発見

開発サーバー起動後のターミナルで `dev > [run-p] dev:* > dev:typecheckClient (あるいはtypecheckServer)` の順に開いて Enter を押すと型検査の結果が表示される  
ファイルを保存するたびに更新されるのでブラウザで動かす前に型エラーを解消するとほとんどのバグがなくなる

curl 'http://localhost:31577/api/tasks/269b6904-86ca-4ea8-8562-3eacc988ac1c' \
 -X 'DELETE' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'Accept-Language: ja,en-US;q=0.9,en;q=0.8' \
 -H 'Connection: keep-alive' \
 -H 'Cookie: \_ga=GA1.1.1888829082.1687443982; \_gid=GA1.1.467979289.1687443982; session=eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiQ2hpY2tlbiBBbGdhZSIsInBpY3R1cmUiOiJodHRwczovL2dpdGh1Yi5jb20vczFmMTAyMDAzNDI1LnBuZyIsImVtYWlsIjoiY2hpY2tlbi5hbGdhZS4xMUBleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE2ODc0NDU2NDEsInVzZXJfaWQiOiJQc0xWcGJ1SlJ3VkRkOFhMQng5a0JBNVVqUTBtIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjaGlja2VuLmFsZ2FlLjExQGV4YW1wbGUuY29tIl0sImdpdGh1Yi5jb20iOlsiMzcxMDk5NzEwMTYyMzUzOTUyMzY1MzQ1NTAyNDI3NzkyMzE3NTg2MSJdfSwic2lnbl9pbl9wcm92aWRlciI6ImdpdGh1Yi5jb20ifSwiaWF0IjoxNjg3NDUzNDk5LCJleHAiOjE2ODc4ODU0OTksImF1ZCI6ImVtdWxhdG9yIiwiaXNzIjoiaHR0cHM6Ly9zZXNzaW9uLmZpcmViYXNlLmdvb2dsZS5jb20vZW11bGF0b3IiLCJzdWIiOiJQc0xWcGJ1SlJ3VkRkOFhMQng5a0JBNVVqUTBtIn0.' \
 -H 'Origin: http://localhost:3000' \
 -H 'Referer: http://localhost:3000/' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Site: same-site' \
 -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' \
 -H 'sec-ch-ua: "Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "Windows"' \
 --compressed
