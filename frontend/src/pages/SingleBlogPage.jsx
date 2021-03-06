import { Alert, Box, LinearProgress, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CommentArea from "../components/comment/CommentArea";
import SingleBlogDetails from "../components/blog/SingleBlogDetails";
import { getBlogComments } from "../actions/commentActions";
import { getSingleBlog } from "../actions/blogActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleBlogPage() {
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const { loading, error, blog } = useSelector((state) => state.singleBlog);

  useEffect(() => {
    if (blogId) {
      dispatch(getSingleBlog(blogId));
      dispatch(getBlogComments(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <Stack>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <Box
        maxWidth={800}
        width={"100%"}
        display={"flex"}
        alignSelf={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={2}
      >
        {blog?.id && <SingleBlogDetails />}

        {blog?.id && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <CommentArea />
          </Paper>
        )}
      </Box>
    </Stack>
  );
}

export default SingleBlogPage;
