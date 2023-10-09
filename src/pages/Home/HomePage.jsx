import Project from "../../components/project/Project";
import { projects } from "../../helpers/projectsList";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>SPA TODO</h2>
        <ul className={styles.projects}>
          {projects.map((project, index) => {
            return (
              <Project
                key={index}
                title={project.title}
                img={project.img}
                used={project.used}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}
