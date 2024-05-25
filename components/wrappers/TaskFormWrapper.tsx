import React from 'react';
import { css } from '@emotion/react';

const TaskFormWrapper= ({ children, label }: { children: React.ReactNode, label: string }) => {

  return (
    <form onSubmit={(e)=>{e.preventDefault()}}>
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