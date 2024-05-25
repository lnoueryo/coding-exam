import { css } from "@emotion/react";

const Divider = () => {
  return (
    <div css={dividerStyle}>
      <hr />
    </div>
  )
}


const dividerStyle = css({
  position: "absolute",
  padding: "0 var(--size-l)",
  width: "100%",
  bottom: "0",
})

export default Divider