# 株式会社ステップバイワーク環境構築

# 1.MAMPインストール

ローカルでHTMLとかPHPとかの確認用に使う。

設定からmampのrootディレクトリをわかりやすい場所に設定する。

今後このディレクトリに案件ごとのフォルダを作成することになる

# 2.VScodeインストール

インデントはスペース2つ

拡張機能は適当に入れる

# 3.Github登録

# 4.SourceTreeインストール

[https://github.com/huesugi/sbw-codingtemplate](https://github.com/huesugi/sbw-codingtemplate)

このリポジトリをクローンできたらOK

mampのrootに「01sbw_template/src」というフォルダを作成しcloneする

# 5.Voltaインストール

[Node.jsのバージョン管理にVoltaを推したい](https://zenn.dev/taichifukumoto/articles/how-to-use-volta)

nodist等他のバージョン管理ツールが入っている場合は先にアンインストールする

[2020 年ではもう使えない Nodist はアンインストールする (Windows)](https://zenn.dev/ymasaoka/articles/note-uninstall-nodish-windows)

# 6.作業開始

「01sbw_template/src」ディレクトリをターミナルで開いて以下

> npm i
> 

インストールが完了したらgulpfile.jsの中の「rootPath」を自分の環境に合わせて変更。

下記コマンドでブラウザが開いてsassの自動更新などができればOK

> npx gulp
> 

# gulpの設定

## setting.json.defaultをコピーしてsetting.jsonにリネーム

自分のローカルのパスを入れる

## ブレイクポイントは以下

- 1024以下(tab)
- 768以下(sm)
- 500以下(min)

## JSについて

jsは圧縮するだけ。es6も大丈夫と思う

## 課題

globの仕様で画像のパス（相対パス）は../../から../に変更する必要がある
