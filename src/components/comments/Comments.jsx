import React from "react";
import styles from "./Comments.module.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addCommentTask, localRef } from "../../redux/actions";

const Comments = ({ setActive, data }) => {
  const [comment, setComment] = React.useState("");
  const dispatch = useDispatch();
  const sendMessage = (e) => {
    e.preventDefault();
    const today = new Date();
    const now = today.toLocaleTimeString("en-US");
    const task = {
      id: uuidv4(),
      time: now,
      name: comment,
    };
    setActive(false);
    dispatch(addCommentTask(data.item.id, data.key, task));
    dispatch(localRef());
    setComment("");
  };

  return (
    <div className={styles.comments_input}>
      <h1>Новый комментарий</h1>
      <form onSubmit={sendMessage}>
        <textarea
          name="comments_input"
          placeholder="Type something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <div>
          <button>добавить</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
