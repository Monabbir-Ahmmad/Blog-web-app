import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import BlogCreatePage from "./pages/BlogCreatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/blogs/create" element={<BlogCreatePage />} />
    </Routes>
  );
}

export default App;
