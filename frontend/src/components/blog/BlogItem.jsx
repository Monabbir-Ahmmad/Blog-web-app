import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../../constants/apiLinks";
import { randomImageById, stringToColour } from "../../utils/utilities";
import BlogItemMenu from "./BlogItemMenu";
import BlogLikeButton from "./BlogLikeButton";

function BlogItem({ blog }) {
  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const onItemClick = () => {
    navigate(`/blog/${blog?.id}`);
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
          <BlogItemMenu
            isPersonal={blog?.user?.id === userAuthInfo?.id}
            blogId={blog?.id}
          />
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
              height: 50,
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
        <BlogLikeButton blog={blog} />
      </CardActions>
    </Card>
  );
}

export default BlogItem;
