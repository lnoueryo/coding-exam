タイムリープ株式会社のコーディング試験用のリポジトリです。

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

## library
* **@emotion**: CSS Modulesを使用するとコンポーネントの数だけ増えてしまい保守性が下がる。Inline Stylesは性能性が高いが疑似クラスにスタイルをできない。そのため、CSS-in-JSを採用する。Styled-componentsの場合、コンポーネントを作成するためスタイル用か普通のコンポーネントなのか考える必要があり、可読性が下がり、無駄にコンポーネントを作成してしまう。Emotionが一番人気があり、再利用性が下がるが、ローカルスコープ内で適用され、変数としてjsxに記述するため、可読性と保守性が高いと思われる。仮に性能性の低下が顕著に出た場合、Inline Stylesも使用する。なお、商用利用が可能であり、バージョンのアップデートも行われてる模様。