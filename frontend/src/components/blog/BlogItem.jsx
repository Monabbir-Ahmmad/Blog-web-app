import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { randomImageById, stringToColour } from "../../utils/utilities";

import { API_HOST } from "../../constants/apiLinks";
import BlogItemMenu from "./BlogItemMenu";
import BlogLikeButton from "./BlogLikeButton";
import moment from "moment";

function BlogItem({ blog }) {
  const navigate = useNavigate();

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
        action={<BlogItemMenu blog={blog} />}
        title={
          <Link
            component={RouterLink}
            to={`/profile/${blog?.user?.id}`}
            underline="hover"
            color={"inherit"}
          >
            {blog?.user?.name}
          </Link>
        }
        subheader={moment(new Date(blog?.createdAt)).fromNow()}
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
