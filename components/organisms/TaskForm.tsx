import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import Button from "../atoms/Button";
import TitleForm from "../molecules/TitleForm";
import type{ Form } from "../templates/TaskManagement";

interface TaskFormProps {
  label: string,
  color: string,
  id?: number,
  title: string,
  buttonText: string,
  isOpen: boolean;
  onClick: () => void,
  onClickCancel: () => void,
  setForm: React.Dispatch<React.SetStateAction<Form>>
}

const TaskForm = ({ label, color, id, title, buttonText, isOpen, onClick, onClickCancel, setForm }: TaskFormProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {inputRef.current && inputRef.current.focus()}, [isOpen]);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title: string = e.target.value;
    const newForm = { label, color, id, title, buttonText, onClick, onClickCancel }
    setForm(newForm)
  }
  return (
    <>
      <div className="centering-row" css={formContent}>
        {
          label !== "削除"
          ? <TitleForm title={title} isOpen={isOpen} changeTitle={changeTitle} />
          : <p>"<span css={titleFont}>{title}</span>" を削除します。よろしいですか。</p>
        }
      </div>
      <div className="centering-row content-list mb-16" css={buttonContainer}>
        <div className="mr-8">
          <Button color="gray" type="button" onClick={onClickCancel}>キャンセル</Button>
        </div>
        <div>
          <Button type="submit" color={color} onClick={onClick} disabled={!title}>{buttonText}</Button>
        </div>
      </div>
    </>
  )
}

const buttonContainer = css({
  justifyContent: "end",
  height: "var(--content-height)"
})

const formContent = css({
  height: "var(--frame-height)",
  position: "relative",
  padding: "0 var(--size-l)"
})

const titleFont = css({
  fontWeight: "bold"
})

export default TaskForm