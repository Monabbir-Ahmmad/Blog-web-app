import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { RiThumbUpFill as LikeIcon } from "react-icons/ri";
import { postBlogLike } from "../../actions/blogActions";
import { useSelector } from "react-redux";

function BlogLikeButton({ blog }) {
  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const [likedBy, setLikedBy] = useState(blog?.likes);
  const [hasLiked, setHasLiked] = useState(
    blog?.likes?.some((like) => like.userId === userAuthInfo?.id)
  );

  useEffect(() => {
    setHasLiked(likedBy?.some((like) => like.userId === userAuthInfo?.id));
  }, [userAuthInfo, likedBy]);

  const handleLikeClick = async () => {
    try {
      const likedBlog = await postBlogLike(blog?.id);

      setLikedBy(likedBlog.likes);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Box
      display={"flex"}
      gap={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <IconButton
        color={hasLiked ? "primary" : "default"}
        onClick={handleLikeClick}
      >
        <LikeIcon />
      </IconButton>

      <Typography variant="body2" color={"text.secondary"}>
        {likedBy?.length} likes
      </Typography>
    </Box>
  );
}

export default BlogLikeButton;
