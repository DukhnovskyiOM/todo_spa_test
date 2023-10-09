import React from "react";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";

const Header = ({ setActive, activeModalSet, viewTaskModal, setTaskModal }) => {
  const columnsFrom = useSelector((state) => state.columns);
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState([]);

  const addTask = () => {
    setActive(true);
    activeModalSet("addTask");
  };

  const viewTask = (e) => {
    setActive(true);
    activeModalSet("viewTask");
    viewTaskModal(e);
    setTaskModal(true);
    setText("");
  };

  const find = (columnsFrom) => {
    for (const [k, value] of Object.entries(columnsFrom)) {
      if (value?.items?.length !== 0 && k !== null) {
        const filtredItems = value.items.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        );
        setResult(filtredItems);
      }
    }
  };

  const searchEvent = (e) => {
    setText(e.target.value);
    find(columnsFrom);
  };

  return (
    <>
      <header>
        <div className={styles.logo}>
          <span>ToDo List</span>
        </div>
        <nav>
          <ul className={styles.toggle}>
            <li className={styles.search_block}>
              <input
                name="search"
                value={text}
                placeholder="Поиск"
                onChange={searchEvent}
              />
              <div className={text.length ? styles.result : styles.none}>
                {result.length ? (
                  result.map((e) => (
                    <p key={e.id} onClick={() => viewTask(e)}>
                      {e.title}
                    </p>
                  ))
                ) : (
                  <p>Результатов нет</p>
                )}
              </div>
            </li>
            <li className={styles.button} onClick={addTask}>
              Добавить
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
