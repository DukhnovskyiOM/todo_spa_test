import { NavLink } from "react-router-dom";
import styles from "./Project.module.scss";

const Project = ({ title, img, used }) => {
  return (
    <NavLink to="todo">
      <li className={styles.project}>
        <img src={img} alt={title} className={styles.project_img} />
        <h3 className={styles.project_title}>{title}</h3>
        <p className={styles.project_use}>Used: {used}</p>
      </li>
    </NavLink>
  );
};

export default Project;
