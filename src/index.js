import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import App from "./App";
import ErrorPage from "./pages/Error/ErrorPage";
import TodoPage from "./pages/Todo/TodoPage";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/todo",
      element: <TodoPage />,
    },
  ],
  {
    basename: "/todo_spa_test/",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
