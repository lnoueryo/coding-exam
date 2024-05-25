import { css } from "@emotion/react";

const Header = () => {
  return (
    <header css={headerStyle}>
      <div>
        <a href="/">
          <h1 css={title}>ToDo Coding Exam</h1>
        </a>
      </div>
    </header>
  )
}

const headerStyle = css({
  height: "var(--frame-height)",
  display: "flex",
  alignItems: "center",
})

const title = css({
  fontSize: "var(--font-title)",
  lineHeight: "var(--font-title)"
})

export default Header