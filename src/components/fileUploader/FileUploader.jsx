import React, { useState } from "react";
import styles from "./FileUploader.module.scss";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addFileTask, localRef } from "../../redux/actions";

const FileUploader = ({ setActive, data }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  function handleOnChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    setFile(file);
    reader.onload = function () {
      const arrayBuffer = this.result;
      Download(arrayBuffer, file.type);
    };
    reader.readAsArrayBuffer(file);
  }

  function Download(arrayBuffer, type) {
    const blob = new Blob([arrayBuffer], { type: type });
    const url = URL.createObjectURL(blob);
    setFileUrl(url);
  }

  const addFile = (e) => {
    e.preventDefault();
    const task = {
      id: uuidv4(),
      name: file.name,
      url: fileUrl,
    };
    setActive(false);
    dispatch(addFileTask(data.item.id, data.key, task));
    dispatch(localRef());
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Загрузить новый файл</h1>
      <form className={styles.file_uploader}>
        <label htmlFor="file-loader-button" className={styles.custom_button}>
          Загрузить файл
        </label>
        <input
          id="file-loader-button"
          type="file"
          className={styles.upload_button}
          onChange={handleOnChange}
        />
        <div className={styles.file_name}>
          <span>{file ? file.name : ""}</span>
        </div>
        <button onClick={addFile}>добавить</button>
      </form>
    </div>
  );
};

export default FileUploader;
