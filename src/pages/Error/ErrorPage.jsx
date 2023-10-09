import { useRouteError } from "react-router-dom";
import styles from "./Error.module.scss";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={styles.notfoundWrap}>
      <div className={styles.notfound}>
        <div className={styles.notfound_404}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>
          we are sorry, but the page you requested was{" "}
          {error.statusText || error.message}
        </h2>
      </div>
    </div>
  );
}

export default ErrorPage;
