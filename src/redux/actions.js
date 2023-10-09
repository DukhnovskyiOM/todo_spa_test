import * as actions from "./actionTypes";

export const localRef = () => ({
  type: actions.LOCAL_REF,
  payload: "",
});

export const addTask = (newTodo, key) => ({
  type: actions.TASK_ADD,
  payload: { newTodo, key },
});

export const refreshTask = (newTodo, key, id) => ({
  type: actions.TASK_REFRESH,
  payload: { newTodo, key, id },
});

export const toggleTask = (id, key, completed) => ({
  type: actions.TASK_TOGGLE,
  payload: { id, key, completed },
});

export const toggleMiniTask = (id, key, completedMiniTask, idMiniTask) => ({
  type: actions.TASK_MINI_TOGGLE,
  payload: { id, key, completedMiniTask, idMiniTask },
});

export const removeTask = (index, key) => ({
  type: actions.TASK_REMOVE,
  payload: { index, key },
});

export const removeMiniTask = (id, key, idx) => ({
  type: actions.TASK_REMOVE_MINI,
  payload: { id, key, idx },
});

export const removeFileTask = (id, key, idx) => ({
  type: actions.TASK_REMOVE_FILE,
  payload: { id, key, idx },
});

export const removeCommentTask = (id, key, idx) => ({
  type: actions.TASK_REMOVE_COMMENT,
  payload: { id, key, idx },
});

export const addMiniTask = (id, key, task) => ({
  type: actions.TASK_ADD_MINI,
  payload: { id, key, task },
});

export const addFileTask = (id, key, task) => ({
  type: actions.TASK_ADD_FILE,
  payload: { id, key, task },
});

export const addCommentTask = (id, key, task) => ({
  type: actions.TASK_ADD_COMMENT,
  payload: { id, key, task },
});

export const refreshState = (columns) => ({
  type: actions.STATE_REFRESH_TASK,
  payload: columns,
});
