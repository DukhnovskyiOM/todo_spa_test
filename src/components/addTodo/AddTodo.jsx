import React from "react";
import styles from "./AddTodo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, localRef } from "../../redux/actions";

const AddTodo = ({ setActive }) => {
  const columnsFrom = useSelector((state) => state.columns);
  const dispatch = useDispatch();

  const findKey = (status, columnsFrom) => {
    let key;
    for (const [k, value] of Object.entries(columnsFrom)) {
      if (value?.name.toLowerCase() === status.toLowerCase()) {
        key = k;
      }
    }
    return { key };
  };

  const addDesk = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const text = e.target[1].value;
    const dateStart = e.target[2].value;
    const dateEnd = e.target[3].value;
    const priority = e.target[4].value;
    const status = e.target[5].value;
    const newTodo = {
      id: uuidv4(),
      completed: false,
      number: 1,
      title: title,
      text: text,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeWork: "123",
      priority: priority,
      status: status,
      files: [],
      miniTasks: [],
      comments: [],
    };
    const { key } = findKey(status, columnsFrom);
    setActive(false);
    dispatch(addTask(newTodo, key));
    dispatch(localRef());
    e.target.reset();
  };

  return (
    <div className={styles.wrap__right}>
      <h1>Новая задача</h1>
      <form onSubmit={addDesk}>
        <label>
          Заголовок:
          <input name="main" type="text" placeholder="Заголовок" required />
        </label>
        <label>
          Описание:
          <textarea name="text" type="text" placeholder="Описание" required />
        </label>
        <label>
          Начать с:
          <input type="date" required />
        </label>
        <label>
          Завершить до:
          <input type="date" required />
        </label>
        <label>
          Приоритет:
          <select name="selectedFruit">
            <option value="low">low</option>
            <option value="middle">middle</option>
            <option value="high">high</option>
          </select>
        </label>
        <label>
          Cтатус:
          <select name="selectedFruit">
            <option value="queue">Queue</option>
            <option value="development">Development</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button type="submit">сохранить</button>
      </form>
    </div>
  );
};

export default AddTodo;
