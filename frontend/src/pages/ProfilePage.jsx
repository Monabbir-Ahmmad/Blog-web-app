import { Alert, Grid, LinearProgress, Paper, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPersonalBlogs } from "../actions/blogActions";
import { getUserDetails } from "../actions/userActions";
import BlogItem from "../components/blog/BlogItem";
import ProfileDetails from "../components/profile/ProfileDetails";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { loading, error, blogs } = useSelector((state) => state.personalBlogs);

  useEffect(() => {
    if (userAuthInfo?.token) {
      dispatch(getUserDetails());
    } else {
      navigate("/?page=sign-in&redirect=profile");
    }
  }, [dispatch, navigate, userAuthInfo]);

  useEffect(() => {
    dispatch(getPersonalBlogs());
  }, [dispatch]);

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      alignItems={{ xs: "center", lg: "start" }}
      spacing={3}
    >
      <Paper
        variant="outlined"
        sx={{
          maxWidth: { xs: "100%", lg: 400 },
          width: "100%",
          height: "min-content",
          position: { xs: "relative", lg: "sticky" },
          top: { xs: 0, lg: 88 },
        }}
      >
        <ProfileDetails />
      </Paper>

      <Stack width={"100%"}>
        {loading && <LinearProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={3} columns={{ xs: 1, md: 2 }}>
          {blogs.map((blog, index) => (
            <Grid key={index} item xs={1}>
              <BlogItem blog={blog} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ProfilePage;
