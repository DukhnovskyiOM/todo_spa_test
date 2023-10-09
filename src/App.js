import Home from "./pages/Home/HomePage";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Home />
    </HelmetProvider>
  );
}

export default App;
