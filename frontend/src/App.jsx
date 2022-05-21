import { Navigate, Route, Routes } from "react-router-dom";
import LoginRegPage from "./pages/LoginRegPage";
import HomePage from "./pages/HomePage";
import BlogCreatePage from "./pages/BlogCreatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegPage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/blogs/create" element={<BlogCreatePage />} />
    </Routes>
  );
}

export default App;
