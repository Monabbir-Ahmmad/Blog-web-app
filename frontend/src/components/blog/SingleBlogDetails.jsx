import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

import { API_HOST } from "../../constants/apiLinks";
import BlogItemMenu from "./BlogItemMenu";
import BlogLikeButton from "./BlogLikeButton";
import { Link as RouterLink } from "react-router-dom";
import SunContentDisplayer from "../sunEditor/SunContentDisplayer";
import moment from "moment";
import { stringToColour } from "../../utils/utilities";
import { useSelector } from "react-redux";

function SingleBlogDetails() {
  const { blog } = useSelector((state) => state.singleBlog);

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
        subheader={`${moment(blog?.createdAt).fromNow()}${
          blog?.createdAt !== blog?.updatedAt ? `  (edited)` : ``
        }`}
      />
      <CardContent>
        <Typography variant="h4">{blog?.title}</Typography>
      </CardContent>

      {blog?.coverImage && (
        <CardMedia
          component="img"
          height={400}
          image={`${API_HOST}/${blog?.coverImage}`}
          alt={blog?.title}
        />
      )}

      <CardContent>
        <SunContentDisplayer content={blog?.content} />
      </CardContent>

      <CardActions sx={{ gap: 1 }}>
        <BlogLikeButton blog={blog} />
      </CardActions>
    </Card>
  );
}

export default SingleBlogDetails;
