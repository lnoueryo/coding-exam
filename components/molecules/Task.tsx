import { css } from "@emotion/react";
import Button from "../atoms/Button";
import KebabMenu from "../atoms/KebabMenu";

interface TaskProps {
  id: number,
  title: string,
  completed: boolean,
  changeStatus: (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>) => void,
  onClickEditTask: () => void,
  onClickDeleteTask: () => void
}

const Task = ({ id, title, completed, changeStatus, onClickEditTask, onClickDeleteTask }: TaskProps) => {
  const buttons = [
    {text: "編集", color: "orange", onClick: onClickEditTask},
    {text: "削除", color: "red", onClick: onClickDeleteTask},
  ]
  return (
    <div className="centering content-list" aria-labelledby={`task-title`} aria-describedby={`task-status`}>
      <div className="centering-row" css={taskContainer}>
        <label className="centering-row" css={labelStyle} htmlFor={String(id)}>
          <input className="mr-16" type="checkbox" id={String(id)} value={id} checked={Boolean(completed)} css={checkboxStyle} onChange={(e) => changeStatus(e)} onKeyUp={(e) => e.key === "Enter" && changeStatus(e)} />
          <p className="mr-16 centering-row">
            <span className="mr-16">{id}</span>
            <span>{title}</span>
          </p>
        </label>
      </div>
      <div className="centering-row" css={buttonContainer}>
        <div css={kebabMenuStyle}>
          <KebabMenu options={buttons} />
        </div>
        <div css={buttonGroupStyle}>
          {
            buttons.map((button, index) => {
              return (
                <div className={index === 0 ? "mr-8" : undefined} key={button.text}>
                  <Button {...button}>{button.text}</Button>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

const taskContainer = css({
  width: "80%",
  "@media (max-width: 768px)": {
    width: "90%",
  },
})

const buttonContainer = css({
  width: "20%",
  justifyContent: "end",
  "@media (max-width: 768px)": {
    width: "10%",
  },
})

const checkboxStyle = css({
  minWidth: "var(--size-l)",
  minHeight: "var(--size-l)",
  cursor: "pointer"
})

const labelStyle = css({
  cursor: "pointer"
})

const kebabMenuStyle = css({
  display: "none",
  "@media (max-width: 768px)": {
    display: "block",
  },
});

const buttonGroupStyle = css({
  display: "flex",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

export default Task;