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
import moment from "moment";
import { useSelector } from "react-redux";
import { API_HOST } from "../../constants/apiLinks";
import { stringToColour } from "../../utils/utilities";
import BlogItemMenu from "./BlogItemMenu";
import SunContentDisplayer from "../sunEditor/SunContentDisplayer";
import BlogLikeButton from "./BlogLikeButton";
import { Link as RouterLink } from "react-router-dom";

function SingleBlogDetails() {
  const { userAuthInfo } = useSelector((state) => state.userLogin);
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
        action={
          <BlogItemMenu
            isPersonal={blog?.user?.id === userAuthInfo?.id}
            blogId={blog?.id}
          />
        }
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
        subheader={moment(new Date(blog?.updatedAt)).fromNow()}
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
