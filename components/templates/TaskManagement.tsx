import { css } from '@emotion/react';
import Tasks from "../organisms/Tasks";
import TaskForm from "../organisms/TaskForm";
import Button from "../atoms/Button";
import CircleLoader from "../atoms/CircleLoader";
import Modal from "../wrappers/Modal";
import Snackbar from "../wrappers/Snackbar";
import TaskFormWrapper from "../wrappers/TaskFormWrapper";
import React, { useState, useRef, useEffect } from "react";

export interface Form {
  label: string;
  color: string;
  title: string;
  buttonText: string;
  onClick: () => void;
  onClickCancel: () => void;
}

interface Task {
  id: number,
  title: string,
  completed: boolean
}

const BASE_TODO_URL = "/api/todos/"

const TaskManagement = () => {

  const [taskObj, setTaskObj] = useState([] as Task[]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setProgress] = useState(false);

  const [snackbarSettings, setSnackbarSettings] = useState({
    isOpen: false,
    color: "",
    message: "",
    close: () => setSnackbarSettings({ ...snackbarSettings, isOpen: false})
  });

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
    fetchTasks();
  }, []);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const displayTaskTemplate = () => {
    return (
      tasks.map((task, index) => {
        return (
          task.label !== "完了のタスク" || task.tasks.length !== 0
          ? <div className="content-container" key={index}>
              <TaskFormWrapper label={task.label}>
                <Tasks {...task} changeStatus={changeStatus} onClickEditTask={onClickEditTask} onClickDeleteTask={onClickDeleteTask} />
              </TaskFormWrapper>
            </div>
          : <React.Fragment key={index}></React.Fragment>
        )
      })
    )
  }

  const fetchTasks = async() => {
    try {
      const res = await fetchWithTimeout(BASE_TODO_URL);
      if (!res.ok) {
        throw new Error("取得できませんでした");
      }
      const data = await res.json();
      setTaskObj(data);
    } catch (error: any) {
      console.error(error.message)
      setSnackbarSettings({ ...snackbarSettings, isOpen: true, color: "red", message: error.message })
    }
  }

  const changeStatus = async(e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLDivElement>) => {

    try {
      setProgress(true)
      let id: number;
      if ("value" in e.target) id = Number(e.target.value);
      else id = Number(e.currentTarget.getAttribute("value"));

      const task = taskObj.find(task => task.id === id);
      if (!task) throw new Error("更新できませんでした");
      const res = await fetchWithTimeout(BASE_TODO_URL + String(id), {method: "PUT", body: JSON.stringify({...task, completed: !task.completed})});
      if (!res.ok) {
        throw new Error("更新できませんでした");
      }
      await fetchTasks();
      setSnackbarSettings({ ...snackbarSettings, isOpen: true, color: "orange", message: "更新しました" })
    } catch (error: any) {
      console.error(error.message)
      setSnackbarSettings({ ...snackbarSettings, isOpen: true, color: "red", message: error.message })
    } finally {
      setProgress(false)
    }

  }

  const createTask = () => {
    snackbarSettings.close();
    setForm(Object.assign(form, {
      label: "作成",
      color: "blue",
      title: "",
      buttonText: "作成",
      onClick: async() => await taskUpdateWrapper(() => fetchWithTimeout(BASE_TODO_URL, {
        method: 'POST',
        body: JSON.stringify({ title: formRef.current.title }),
      }))
    }))
    handleOpenModal()
  }

  const onClickEditTask = (id: number) => {

    return () => {
      snackbarSettings.close();
      const task = taskObj.find(task => task.id === id);
      if (!task) throw new Error(`${formRef.current.buttonText}できませんでした`);
      setForm({
        ...form,
        label: "編集",
        color: "orange",
        title: task.title,
        buttonText: "更新",
        onClick: async() => await taskUpdateWrapper(() => fetchWithTimeout(BASE_TODO_URL + String(id), {method: "PUT", body: JSON.stringify({title: formRef.current.title})}))
      })
      handleOpenModal();
    }
  }

  const onClickDeleteTask = (id: number) => {
    return () => {
      snackbarSettings.close();
      const task = taskObj.find(task => task.id === id);
      if (!task) return;
      setForm({
        ...form,
        label: "削除",
        color: "red",
        title: task.title,
        buttonText: "削除",
        onClick: async() => await taskUpdateWrapper(() => fetchWithTimeout(BASE_TODO_URL + String(id), {method: "DELETE"}))
      })
      handleOpenModal();
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const taskUpdateWrapper = async(func: () => Promise<Response>) => {
    try {
      setProgress(true);
      if (!navigator.onLine) throw new Error("現在オフラインです");
      const res = await func();
      if (!res.ok) {
        throw new Error(`${formRef.current.buttonText}できませんでした`);
      }
      await fetchTasks();
      setSnackbarSettings({ ...snackbarSettings, isOpen: true, color: formRef.current.color, message: `${formRef.current.buttonText}しました` });
      handleCloseModal();
      setForm({...formRef.current, onClick: () => {}});
    } catch (error: any) {
      console.error(error.message)
      setSnackbarSettings({ ...snackbarSettings, isOpen: true, color: "red", message: error.message });
    } finally {
      setProgress(false);
    }
  }

  const fetchWithTimeout = async (url: string, options = {}, timeout = 5000) => {
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, { ...options, headers: {"Content-Type": "application/json"}, signal });
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new Error("通信状態が悪いようです");
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <div className="content-container centering-row" css={taskContentHeader}>
        <h2>タスク管理</h2>
        <Button color="blue" onClick={createTask}>新規作成</Button>
      </div>
      <div>
        {
          displayTaskTemplate()
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskFormWrapper label={formRef.current.label}>
          <TaskForm {...form} isOpen={isModalOpen} setForm={setForm} />
        </TaskFormWrapper>
      </Modal>
      <Snackbar { ...snackbarSettings}>
        {snackbarSettings.message}
      </Snackbar>
      {
        loading &&
        <div css={loaderContainer}>
          <CircleLoader size={48} color="#00f" />
        </div>
      }
    </>
  );
}

const taskContentHeader = css({
  justifyContent: "space-between",
  height: "var(--content-height)"
})

const loaderContainer = css({
  position: "fixed",
  width: "100%",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10
})

export default TaskManagement;