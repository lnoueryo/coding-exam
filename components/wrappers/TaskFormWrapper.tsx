import React from "react";
import { css } from "@emotion/react";

interface TaskFormWrapperProps {
  children: React.ReactNode,
  label: string,
  onEnter?: () => void
}

const TaskFormWrapper= ({ children, label }: TaskFormWrapperProps) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend css={legendStyle}>
          <h3>{label}</h3>
        </legend>
        {children}
      </fieldset>
    </form>
  )
}

const legendStyle = css({
  margin: "0 var(--size-l)",
  fontSize: "var(--font-sectiontitle)",
  lineHeight: "var(--font-sectiontitle)",
});

export default TaskFormWrapper