import { css } from '@emotion/react';
import Tasks from "../organisms/Tasks";
import TaskForm from "../organisms/TaskForm";
import Button from "../atoms/Button";
import Modal from "../wrappers/Modal";
import Snackbar from "../wrappers/Snackbar";
import TaskFormWrapper from "../wrappers/TaskFormWrapper";
import { useState, useRef, useEffect } from "react";

export interface Form {
  label: string;
  color: string;
  title: string;
  buttonText: string;
  onClick: () => void;
  onClickCancel: () => void;
}

const TaskManagement = () => {

  const [taskObj, setTaskObj] = useState([
    { id: 1, title: 'testtesttesteテスト', completed: true },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: true },
    { id: 4, title: 'Task 1', completed: true },
    { id: 5, title: 'Task 2', completed: false },
    { id: 6, title: 'Task 3', completed: true },
    { id: 7, title: 'Task 1', completed: true },
    { id: 8, title: 'Task 2', completed: false },
    { id: 9, title: 'Task 3', completed: true },
  ]);

  const [taskIndex, setTaskIndex] = useState(10)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const tasks = [
    {label: "未完のタスク", tasks: taskObj.filter(task => !task.completed)},
    {label: "完了のタスク", tasks: taskObj.filter(task => task.completed)}
  ]

  const [form, setForm] = useState<Form>({
    label: "作成",
    color: "blue",
    title: "",
    buttonText: "作成",
    onClick: () => {},
    onClickCancel: () => {
      handleCloseModal();
    },
  })

  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {

    const id = Number(e.target.value);
    const newTaskObj = taskObj.map(task => {
      if (task.id === id) task.completed = !task.completed;
      return task;
    })
    setTaskObj(newTaskObj)
  }

  const createTask = () => {
    handleCloseSnackbar();
    setForm(Object.assign(form, {
      label: "作成",
      color: "blue",
      title: "",
      buttonText: "作成",
      onClick: () => {
        setTaskObj([...taskObj, { id: taskIndex, title: formRef.current.title, completed: false }]);
        setTaskIndex(taskIndex + 1);
        handleCloseModal();
        handleOpenSnackbar();
      }
    }))
    handleOpenModal()
  }

  const onClickEditTask = (id: number) => {
    return () => {
      handleCloseSnackbar()
      const task = taskObj.find(task => task.id === id);
      if (!task) return;
      setForm(Object.assign(form, {
        label: "編集",
        color: "orange",
        title: task.title,
        buttonText: "更新",
        onClick: () => {
          const newTaskObj = taskObj.map(t => {
            if (t.id === id) return { ...t, title: formRef.current.title };
            return t;
          });
          setTaskObj(newTaskObj);
          handleCloseModal();
          handleOpenSnackbar();
        }
      }))
      handleOpenModal();
    }
  }

  const onClickDeleteTask = (id: number) => {
    return () => {
      handleCloseSnackbar()
      const task = taskObj.find(task => task.id === id);
      if (!task) return;
      setForm(Object.assign(form, {
        label: "削除",
        color: "red",
        title: task.title,
        buttonText: "削除",
        onClick: () => {
          const newTaskObj = taskObj.filter(task => {
            return task.id !== id;
          })
          setTaskObj(newTaskObj);
          handleCloseModal();
          handleOpenSnackbar();
        }
      }))
      handleOpenModal();
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <div className="content-container centering-row" css={taskContentHeader}>
        <h2>タスク管理</h2>
        <Button color="blue" onClick={createTask}>新規作成</Button>
      </div>
      <div>
        {
          tasks.map(task => {
            return (
              <div className="content-container" key={task.label}>
                <TaskFormWrapper label={task.label}>
                  <Tasks {...task} changeStatus={changeStatus} onClickEditTask={onClickEditTask} onClickDeleteTask={onClickDeleteTask} />
                </TaskFormWrapper>
              </div>
            )
          })
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskFormWrapper label={form.label}>
          <TaskForm {...form} isOpen={isModalOpen} setForm={setForm} />
        </TaskFormWrapper>
      </Modal>
      <Snackbar isOpen={isSnackbarOpen} onClose={handleCloseSnackbar} color={form.color}>
        {form.buttonText}しました
      </Snackbar>
    </>
  );
}

const taskContentHeader = css({
  justifyContent: "space-between",
  height: "var(--content-height)"
})

export default TaskManagement;