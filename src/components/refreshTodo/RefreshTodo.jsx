import React from "react";
import styles from "./RefreshTodo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { localRef, refreshTask } from "../../redux/actions";

const RefreshTodo = ({ setActive, data }) => {
  const columnsFrom = useSelector((state) => state.columns);
  const { item } = data;
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

    const newTodo = {
      id: item.id,
      completed: item.completed,
      number: 1,
      title: title,
      text: text,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeWork: "123",
      priority: priority,
      status: item.status,
      files: item.files,
      miniTasks: item.miniTasks,
      comments: item.comments,
    };
    const { key } = findKey(item.status, columnsFrom);
    setActive(false);
    dispatch(refreshTask(newTodo, key, item.id));
    dispatch(localRef());
    e.target.reset();
  };

  return (
    <div className={styles.wrap__right}>
      <h1>Новая задача</h1>
      <form onSubmit={addDesk}>
        <label>
          Заголовок:
          <input
            defaultValue={item.title}
            type="text"
            placeholder="Заголовок"
            required
          />
        </label>
        <label>
          Описание:
          <textarea
            name="item-text"
            defaultValue={item.text}
            type="text"
            placeholder="Описание"
            required
          />
        </label>
        <label>
          Начать с:
          <input defaultValue={item.dateStart} type="date" required />
        </label>
        <label>
          Завершить до:
          <input defaultValue={item.dateEnd} type="date" required />
        </label>
        <label>
          Приоритет:
          <select name="selectedFruit" defaultValue={item.priority}>
            <option value="low">low</option>
            <option value="middle">middle</option>
            <option value="hight">hight</option>
          </select>
        </label>
        <button type="submit">сохранить</button>
      </form>
    </div>
  );
};

export default RefreshTodo;
