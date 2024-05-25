import { css } from '@emotion/react';
import Button from "../atoms/Button";

interface TaskProps {
  id: number,
  title: string,
  completed: boolean,
  changeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClickEditTask: () => void,
  onClickDeleteTask: () => void
}

const Task = ({ id, title, completed, changeStatus, onClickEditTask, onClickDeleteTask }: TaskProps) => {
  return (
    <div className="centering content-list" aria-labelledby={`task-title`} aria-describedby={`task-status`}>
      <div className="centering-row" css={taskContainer}>
        <label className="centering-row" css={labelStyle} htmlFor={String(id)}>
          <input className="mr-16" type="checkbox" id={String(id)} value={id} checked={Boolean(completed)} css={checkboxStyle} onChange={(e) => changeStatus(e)} />
          <p className="mr-16">
            <span className="mr-16">{id}</span>
            <span>{title}</span>
          </p>
        </label>
      </div>
      <div className="centering-row" css={buttonContainer}>
        <div className="mr-8">
          <Button color="orange" onClick={onClickEditTask}>編集</Button>
        </div>
        <div>
          <Button color="red" onClick={onClickDeleteTask}>削除</Button>
        </div>
      </div>
    </div>
  );
};

const taskContainer = css({
  width: "80%",
})

const buttonContainer = css({
  width: "20%",
  justifyContent: "end"
})

const checkboxStyle = css({
  width: "var(--size-l)",
  height: "var(--size-l)",
  cursor: "pointer"
})

const labelStyle = css({
  cursor: "pointer"
})

export default Task;