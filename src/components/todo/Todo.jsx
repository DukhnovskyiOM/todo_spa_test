import React from "react";
import styles from "./Todo.module.scss";
import icoViewUp from "../../img/icon-up.png";
import icoViewDown from "../../img/icon-down.png";
import { useDispatch, useSelector } from "react-redux";
import {
  localRef,
  removeCommentTask,
  removeFileTask,
  removeMiniTask,
  removeTask,
  toggleMiniTask,
  toggleTask,
} from "../../redux/actions";

const Todo = ({
  item,
  setActive,
  activeModalSet,
  setData,
  taskModal = false,
}) => {
  const {
    id,
    completed,
    number,
    title,
    text,
    dateStart,
    dateEnd,
    priority,
    status,
    files,
    miniTasks,
    comments,
  } = item;

  const columnsFrom = useSelector((state) => state.columns);
  const dispatch = useDispatch();
  const [openViewFiles, setOpenViewFiles] = React.useState(false);
  const [openViewComments, setOpenViewComments] = React.useState(false);
  const [openViewTask, setOpenViewTask] = React.useState(false);

  const findId = (id, columnsFrom) => {
    let index;
    let key;
    for (const [k, value] of Object.entries(columnsFrom)) {
      if (value?.items?.length !== 0) {
        const idx = value?.items?.findIndex((el) => el.id === id);
        if (idx !== -1) {
          index = idx;
          key = k;
        }
      }
    }
    return { index, key };
  };

  const file = () => {
    setActive(true);
    activeModalSet("file");
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      setData({ key, item });
    }
  };

  const task = () => {
    setActive(true);
    activeModalSet("task");
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      setData({ key, item });
    }
  };

  const comment = () => {
    setActive(true);
    activeModalSet("comment");
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      setData({ key, item });
    }
  };

  const changeTask = () => {
    setActive(true);
    activeModalSet("changeTask");
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      setData({ key, item });
    }
  };

  const delTask = () => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { index, key } = prop;
      dispatch(removeTask(index, key));
      dispatch(localRef());
    }
  };

  const delMiniTask = (idx) => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      dispatch(removeMiniTask(id, key, idx));
      dispatch(localRef());
    }
  };

  const delFileTask = (idx) => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      dispatch(removeFileTask(id, key, idx));
      dispatch(localRef());
    }
  };

  const delCommentTask = (idx) => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      dispatch(removeCommentTask(id, key, idx));
      dispatch(localRef());
    }
  };

  const togTask = () => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      dispatch(toggleTask(id, key, completed));
      dispatch(localRef());
    }
  };

  const togMiniTask = (completedMiniTask, idx) => {
    const prop = findId(id, columnsFrom);
    if (prop) {
      const { key } = prop;
      dispatch(toggleMiniTask(id, key, completedMiniTask, idx));
      dispatch(localRef());
    }
  };

  const bgColor = {
    low: "green",
    middle: "orange",
    hight: "red",
  };

  const createLabel = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  };

  const getDayPast = (start) => {
    const currentDate = Date.parse(new Date());
    const days = Math.round((currentDate - Date.parse(start)) / 86400000);
    const result = createLabel(days, ["день", "дня", "дней"]);
    return result;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div
            className={styles.id}
            style={{ backgroundColor: bgColor[priority] }}
            data-title={priority}
          >
            <i>{number}</i>
          </div>
          <div className={styles.title}>
            <label
              style={{
                textDecoration: completed ? "line-through" : "none",
                color: "white",
              }}
            >
              <input
                type="checkbox"
                name="title"
                checked={completed}
                onChange={togTask}
              />
              {title}
            </label>
          </div>
          <ul className={styles.time}>
            <li>
              <span className={styles.title}>Дата создания: </span>
              <span className={styles.text}>
                {dateStart.split("-").reverse().join(".")}
              </span>
            </li>
            <li>
              <span className={styles.title}>Дата окончания: </span>
              <span className={styles.text}>
                {dateEnd.split("-").reverse().join(".")}
              </span>
            </li>
            <li>
              <span className={styles.title}>Время в работе: </span>
              <span className={styles.text}>{getDayPast(dateStart)}</span>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <div className={styles.row}>
            <span className={styles.title}>Cтатус: </span>
            <span className={styles.text}>{status.toUpperCase()}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.title}>Приоритет: </span>
            <span className={styles.text}>{priority.toUpperCase()}</span>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.row}>
            <p className={styles.main_text}>{text}</p>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.row_title}>
              <div
                className={styles.row_title_img}
                onClick={() => setOpenViewFiles(!openViewFiles)}
              >
                <img alt="view" src={openViewFiles ? icoViewUp : icoViewDown} />
              </div>
              <div
                className={styles.row_title_text}
                onClick={() => setOpenViewFiles(!openViewFiles)}
              >
                <span>Вложенные файлы: </span>
              </div>
              <div className={styles.row_title_button}>
                {!taskModal && <button onClick={file}>+</button>}
              </div>
            </div>
            {openViewFiles && (
              <ul className={styles.files}>
                {files.length ? (
                  files.map((file, idx) => (
                    <li key={file.id} className={styles.text}>
                      <div onClick={() => window.open(file.url)}>
                        {file.name}
                      </div>
                      <span onClick={() => delFileTask(idx)}>x</span>
                    </li>
                  ))
                ) : (
                  <div className={styles.text}>Пусто</div>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.row_title}>
              <div
                className={styles.row_title_img}
                onClick={() => setOpenViewTask(!openViewTask)}
              >
                <img alt="view" src={openViewTask ? icoViewUp : icoViewDown} />
              </div>
              <div
                className={styles.row_title_text}
                onClick={() => setOpenViewTask(!openViewTask)}
              >
                <span>Подзадачи: </span>
              </div>
              <div className={styles.row_title_button}>
                {!taskModal && <button onClick={task}>+</button>}
              </div>
            </div>{" "}
            {openViewTask && (
              <ul className={styles.mini_todos}>
                {miniTasks.length ? (
                  miniTasks.map((task, idx) => (
                    <li key={task.id} className={styles.text}>
                      <div>
                        <label
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="mini_todos"
                            checked={task.completed}
                            onChange={() =>
                              togMiniTask(task.completed, task.id)
                            }
                          />
                          {task.name}
                        </label>
                      </div>
                      <span onClick={() => delMiniTask(idx)}>x</span>
                    </li>
                  ))
                ) : (
                  <div className={styles.text}>Пусто</div>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.row_title}>
              <div
                className={styles.row_title_img}
                onClick={() => setOpenViewComments(!openViewComments)}
              >
                <img
                  alt="view"
                  src={openViewComments ? icoViewUp : icoViewDown}
                />
              </div>
              <div
                className={styles.row_title_text}
                onClick={() => setOpenViewComments(!openViewComments)}
              >
                <span>Комментарии: </span>
              </div>
              <div className={styles.row_title_button}>
                {!taskModal && <button onClick={comment}>+</button>}
              </div>
            </div>{" "}
            {openViewComments && (
              <ul className={styles.comments}>
                {comments.length ? (
                  comments.map((comment, idx) => (
                    <li key={comment.id} className={styles.text}>
                      <div>{comment.name}</div>
                      <span onClick={() => delCommentTask(idx)}>x</span>
                    </li>
                  ))
                ) : (
                  <div className={styles.text}>Пусто</div>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.section}>
          {!taskModal && (
            <div className={styles.row}>
              <ul className={styles.button}>
                <li onClick={changeTask}>Изменить</li>
                <li onClick={delTask}>Удалить</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;
