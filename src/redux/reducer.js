import changeLocalStorage from "../helpers/changeLocalStorage";
import { columnsFrom } from "../helpers/columnsList";
import * as actions from "./actionTypes";

export default function reducer(state = columnsFrom, action) {
  const { payload } = action;

  switch (action.type) {
    case actions.LOCAL_REF:
      changeLocalStorage(state);
      return state;

    case actions.TASK_ADD:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [payload.newTodo, ...state.columns[payload.key].items],
          },
        },
      };

    case actions.TASK_REFRESH:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el) => {
                if (el.id === payload.id) {
                  el = payload.newTodo;
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_TOGGLE:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el, idx) => {
                if (el.id === payload.id) {
                  el.completed = !payload.completed;
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_MINI_TOGGLE:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el, idx) => {
                if (el.id === payload.id) {
                  el.miniTasks.map((e) => {
                    if (e.id === payload.idMiniTask) {
                      e.completed = !payload.completedMiniTask;
                    }
                    return e;
                  });
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.STATE_REFRESH_TASK:
      return {
        columns: {
          ...payload,
        },
      };

    case actions.TASK_REMOVE:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: state.columns[payload.key]?.items.filter(
              (_, i) => i !== payload.index
            ),
          },
        },
      };

    case actions.TASK_REMOVE_MINI:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el, idx) => {
                if (el.id === payload.id) {
                  el.miniTasks = el.miniTasks.filter(
                    (_, i) => i !== payload.idx
                  );
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_REMOVE_FILE:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el, idx) => {
                if (el.id === payload.id) {
                  el.files = el.files.filter((_, i) => i !== payload.idx);
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_REMOVE_COMMENT:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el, idx) => {
                if (el.id === payload.id) {
                  el.comments = el.comments.filter((_, i) => i !== payload.idx);
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_ADD_MINI:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el) => {
                if (el.id === payload.id) {
                  el.miniTasks.unshift(payload.task);
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_ADD_FILE:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el) => {
                if (el.id === payload.id) {
                  el.files.unshift(payload.task);
                }
                return el;
              }),
            ],
          },
        },
      };

    case actions.TASK_ADD_COMMENT:
      return {
        columns: {
          ...state.columns,
          [payload.key]: {
            ...state.columns[payload.key],
            items: [
              ...state.columns[payload.key].items.map((el) => {
                if (el.id === payload.id) {
                  el.comments.unshift(payload.task);
                }
                return el;
              }),
            ],
          },
        },
      };

    default:
      return state;
  }
}
