# CLAUDE.md

このファイルは、このディレクトリで作業する際にClaude Codeへガイダンスを提供するものです。

## これは何か

英語学習のサイト(Jekyll + just-the-docs、gitリポジトリ`shingo0321/english-study`、公開URLは`/english-study/`)。`../claude/`(`claude-study`)・`../ipa/`とは別リポジトリで、`study/`は3つをまとめる親フォルダにすぎずgitリポジトリではない。パスワードゲート(`_includes/head_custom.html`)は`claude-study`・`ipa`と同じパスワード・保存キーを使うので、変えるときは3つを合わせること。

- `toeic-quiz/` — TOEIC Part 5形式の4択クイズ。`index.md`がサイト内ページでiframeから`quiz.html`を読み込む。`quiz.html`/`app.js`/`style.css`は独立したHTMLでJekyllのレイアウト外のため、パスワードゲートは`index.md`経由のときのみ効く。
- 問題は`toeic-quiz/data/questions.js`の`window.QUESTIONS`(`{cat, q, c, a, e}`: カテゴリ`grammar`/`vocab`/`prep`・問題文・選択肢・正解の添字・解説)に追加するだけでよい。問題文は間違い復習(`localStorage`キー`toeic-quiz-wrong`)の識別キーなので重複させないこと。
- 内容は日本語で書かれている。
