import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import BlogCreatePage from "./pages/BlogCreatePage";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blogs/create" element={<BlogCreatePage />} />
      </Routes>
    </ThemeContextProvider>
  );
}

export default App;
