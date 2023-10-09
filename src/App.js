import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/HomePage";
import { HelmetProvider } from "react-helmet-async";
import TodoPage from "./pages/Todo/TodoPage";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
