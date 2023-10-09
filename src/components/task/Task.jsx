import React from "react";
import styles from "./Task.module.scss";
import { useDispatch } from "react-redux";
import { addMiniTask, localRef } from "../../redux/actions";
import { v4 as uuidv4 } from "uuid";

const Task = ({ setActive, data }) => {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch();

  const sendMessage = (e) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      name: text,
      completed: false,
    };
    setActive(false);
    dispatch(addMiniTask(data.item.id, data.key, task));
    dispatch(localRef());
    setText("");
  };

  return (
    <div className={styles.task_input}>
      <h1>Новая подзадача</h1>
      <form onSubmit={sendMessage}>
        <textarea
          name="task_input"
          placeholder="Type something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <div>
          <button>добавить</button>
        </div>
      </form>
    </div>
  );
};

export default Task;
