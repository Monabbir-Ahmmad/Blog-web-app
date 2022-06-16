import { RiThumbUpFill as LikeIcon } from "react-icons/ri";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postBlogLike } from "../../actions/blogActions";

function BlogLikeButton({ blog }) {
  const [hasLiked, setHasLiked] = useState(false);

  const [likedBy, setLikedBy] = useState(
    blog?.likes?.filter((e) => e.hasLiked).map((e) => e.userId)
  );
  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    setHasLiked(likedBy?.includes(userAuthInfo?.id));
  }, [userAuthInfo, likedBy]);

  const handleLikeClick = async () => {
    try {
      const likedBlog = await postBlogLike(userAuthInfo?.token, blog?.id);

      setLikedBy(
        likedBlog.likes?.filter((e) => e.hasLiked).map((e) => e.userId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Box
      display={"flex"}
      gap={2}
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
