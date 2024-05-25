import { css } from "@emotion/react";
import Head from "next/head";
import Header from "../../components/organisms/Header";
import Main from "../../components/organisms/Main";

function Default({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="todo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={wrapper}>
        <Header />
        <Main children={children} />
      </div>
    </>
  )
}

const wrapper = css({
  width: "100%",
  maxWidth: "1200px",
  margin: "auto",
  padding: "0 calc(var(--content-height) / 2 * 1.5)"
})

export default Default