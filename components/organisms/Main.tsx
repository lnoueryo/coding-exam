import { css } from '@emotion/react';

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main css={mainStyle}>
      {children}
    </main>
  )
}

const mainStyle = css({
  padding: "var(--content-height) 0"
})

export default Main