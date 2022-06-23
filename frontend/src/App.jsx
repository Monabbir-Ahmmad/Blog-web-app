import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import BlogWritePage from "./pages/BlogWritePage";
import NavDrawer from "./components/nav/NavDrawer";
import ProfilePage from "./pages/ProfilePage";
import PeoplePage from "./pages/PeoplePage";
import SingleBlogPage from "./pages/SingleBlogPage";
import { Typography } from "@mui/material";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />

      <Route path="/" element={<NavDrawer />}>
        <Route path="home" element={<HomePage />} />

        <Route path="blog/:blogId" element={<SingleBlogPage />} />

        <Route path="profile/:userId" element={<ProfilePage />} />

        <Route path="write" element={<BlogWritePage />} />

        <Route path="people" element={<PeoplePage />} />

        <Route
          path="*"
          element={<Typography variant="h4">Sorry! Page Not Found</Typography>}
        />
      </Route>
    </Routes>
  );
}

export default App;
