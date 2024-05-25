import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';

interface TitleFormProps {
  title: string,
  isOpen: boolean;
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const TitleForm = ({ title, isOpen, changeTitle }: TitleFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {inputRef.current && inputRef.current.focus()}, [isOpen]);

  return (
    <div className="w100">
      <label htmlFor="title" css={labelStyle}>
        タイトル
      </label>
      <div>
        <input css={inputStyle} className="w100" id="title" type="text" value={title} ref={inputRef} onChange={changeTitle} />
      </div>
    </div>
  )
}

const labelStyle = css({
  display: "inline-block",
  paddingBottom: "var(--size-s)"
})

const inputStyle = css({
  height: "calc(var(--content-height) / 1.5)",
  fontSize: "14px",
  padding: "4px",
  backgroundColor: "#3b3b3b",
  border: "solid 2px #858585",
  borderRadius: "3px",
  transition: "all .5s",
  "&:focus": {
    border: "solid 2px blue",
    outline: "initial"
  }
})

export default TitleForm