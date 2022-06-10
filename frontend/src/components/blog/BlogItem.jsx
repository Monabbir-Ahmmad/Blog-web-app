import { ThumbUp } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_HOST, LIKE_BLOG } from "../../constants/apiLinks";
import { randomImageById, stringToColour } from "../../utils/utilities";
import BlogItemMenu from "./BlogItemMenu";

function BlogItem({ blog }) {
  const navigate = useNavigate();

  const [hasLiked, setHasLiked] = useState(false);
  const [likedBy, setLikedBy] = useState(
    blog?.likes?.filter((e) => e.hasLiked).map((e) => e.userId)
  );

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(
    () => setHasLiked(likedBy.includes(userAuthInfo?.id)),
    [userAuthInfo]
  );

  const onItemClick = () => {
    navigate(`/blog/${blog?.id}`);
  };

  const handleLikeClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuthInfo?.token}`,
        },
      };

      await axios.post(`${LIKE_BLOG}`, { blogId: blog?.id }, config);

      setLikedBy(
        hasLiked
          ? likedBy.filter((userId) => userId !== userAuthInfo?.id)
          : [userAuthInfo?.id, ...likedBy]
      );
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            alt={blog?.user?.name}
            src={
              blog?.user?.profileImage
                ? `${API_HOST}/${blog?.user?.profileImage}`
                : "broken.png"
            }
            sx={{ bgcolor: stringToColour(blog?.user?.name) }}
          />
        }
        action={
          <BlogItemMenu isPersonal={blog?.user?.id === userAuthInfo?.id} />
        }
        title={blog?.user?.name}
        subheader={moment(new Date(blog?.updatedAt)).fromNow()}
      />
      <CardActionArea onClick={onItemClick}>
        <CardMedia
          component="img"
          height={150}
          image={
            blog?.coverImage
              ? `${API_HOST}/${blog?.coverImage}`
              : randomImageById(blog?.id)
          }
          alt={blog?.title}
        />
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {blog?.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ gap: 1 }}>
        <IconButton
          color={hasLiked ? "primary" : "default"}
          onClick={handleLikeClick}
        >
          <ThumbUp />
        </IconButton>
        <Typography variant="body2" color={"text.secondary"}>
          {likedBy.length} likes
        </Typography>
      </CardActions>
    </Card>
  );
}

export default BlogItem;
