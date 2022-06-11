import { Alert, Box, LinearProgress, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog } from "../actions/blogActions";
import FullSingleBlog from "../components/blog/FullSingleBlog";

function SingleBlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const { loading, error, blog } = useSelector((state) => state.singleBlog);

  useEffect(() => {
    if (!userAuthInfo?.token) {
      navigate("/?page=sign-in&redirect=blog/" + blogId);
    }
  }, [blogId, navigate, userAuthInfo]);

  useEffect(() => {
    if (blogId) {
      dispatch(getSingleBlog(blogId));
    }
  }, [dispatch, blogId]);

  return (
    <Stack>
      {loading && <LinearProgress sx={{ width: "100%" }} />}

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <Box width={800} alignSelf={"center"} justifyContent={"center"}>
        {blog?.id && <FullSingleBlog blog={blog} />}
      </Box>
    </Stack>
  );
}

export default SingleBlogPage;
