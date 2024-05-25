import { css } from '@emotion/react';
import Task from '../molecules/Task'
import Divider from '../atoms/Divider'

interface TasksProps {
  tasks: {id: number, title: string, completed: boolean}[],
  changeStatus: (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>) => void,
  onClickEditTask: (id: number) => () => void,
  onClickDeleteTask: (id: number) => () => void
}

const Tasks = ({ tasks, changeStatus, onClickEditTask, onClickDeleteTask }: TasksProps) => {
  const displayTasks = tasks.map((task, index) => (
    <li key={task.id} css={index === tasks.length - 1 ? lastLiStyle : liStyle}>
      <Task {...task} changeStatus={changeStatus} onClickEditTask={onClickEditTask(task.id)} onClickDeleteTask={onClickDeleteTask(task.id)} />
      {
        index === tasks.length - 1 ||
        <Divider />
      }
    </li>
  ))
  return (
    <>
      {
        displayTasks.length !== 0
        ? <ul css={ulStyle}>
            {displayTasks}
          </ul>
        : <p className="centering" css={noTaskStyle}>タスクなし</p>
      }
    </>
  )
}

const ulStyle = css({
  listStyle: 'none',
  padding: 0,
});

const liStyle = css({
  position: "relative"
});

const lastLiStyle = css({
  marginBottom: "calc(var(--font-sectiontitle) / 2)"
});

const noTaskStyle = css({
  padding: "0 var(--size-s)",
  height: "var(--content-height)",
  fontSize: "var(--font-sectiontitle)"
})

export default Tasks