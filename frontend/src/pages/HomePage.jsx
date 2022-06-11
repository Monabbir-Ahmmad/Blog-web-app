import { Alert, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogList } from "../actions/blogActions";
import BlogItem from "../components/blog/BlogItem";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, blogs } = useSelector((state) => state.blogList);

  useEffect(() => {
    dispatch(getBlogList());
  }, [dispatch]);

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userAuthInfo?.token) {
      navigate("/?page=sign-in&redirect=home");
    }
  }, [navigate, userAuthInfo, blogs]);

  return (
    <Stack>
      <Typography variant="h5" mb={2}>
        Blogs
      </Typography>

      {loading && <LinearProgress sx={{ width: "100%" }} />}

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3} columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}>
        {blogs.map((blog, index) => (
          <Grid key={index} item xs={1}>
            <BlogItem blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default HomePage;
