import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import BlogWritePage from "./pages/BlogWritePage";
import NavDrawer from "./components/nav/NavDrawer";
import ProfilePage from "./pages/ProfilePage";
import PersonalBlogPage from "./pages/PersonalBlogPage";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />

      <Route path="/" element={<NavDrawer />}>
        <Route path="home" element={<HomePage />} />

        <Route path="profile" element={<ProfilePage />} />

        <Route path="write" element={<BlogWritePage />} />

        <Route path="personal-blogs" element={<PersonalBlogPage />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
