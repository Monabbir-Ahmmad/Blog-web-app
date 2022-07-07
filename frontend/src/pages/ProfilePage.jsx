import {
  Alert,
  Grid,
  LinearProgress,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
} from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BlogItem from "../components/blog/BlogItem";
import ProfileDetails from "../components/profile/ProfileDetails";
import { getUserBlogs } from "../actions/blogActions";
import { getUserDetails } from "../actions/userActions";
import { useEffect } from "react";

function ProfilePage() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");

  const { loading, error, blogs, pageCount } = useSelector(
    (state) => state.userBlogList
  );

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUserBlogs(userId, page));
  }, [dispatch, page, userId]);

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

      <Stack width={"100%"} rowGap={3}>
        {loading && <LinearProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && !blogs.length && (
          <Alert severity="info">Nothing To Show</Alert>
        )}

        <Grid container spacing={3} columns={{ xs: 1, md: 2 }}>
          {blogs.map((blog) => (
            <Grid key={blog?.id} item xs={1}>
              <BlogItem blog={blog} />
            </Grid>
          ))}
        </Grid>

        <Pagination
          variant="outlined"
          color="primary"
          sx={{ alignSelf: "center", my: 5 }}
          page={page}
          count={pageCount}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/profile/${userId}?page=${item.page}`}
              {...item}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}

export default ProfilePage;
