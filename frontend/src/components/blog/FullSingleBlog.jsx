import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import { API_HOST } from "../../constants/apiLinks";
import { randomImageById, stringToColour } from "../../utils/utilities";
import BlogItemMenu from "./BlogItemMenu";
import SunContentDisplayer from "../sun_editor/SunContentDisplayer";
import BlogLikeButton from "./BlogLikeButton";

function FullSingleBlog({ blog }) {
  const { userAuthInfo } = useSelector((state) => state.userLogin);

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

      <CardContent>
        <Typography variant="h4">{blog?.title}</Typography>
      </CardContent>

      <CardMedia
        component="img"
        height={300}
        image={
          blog?.coverImage
            ? `${API_HOST}/${blog?.coverImage}`
            : randomImageById(blog?.id)
        }
        alt={blog?.title}
      />

      <CardContent>
        <SunContentDisplayer content={blog?.content} />
      </CardContent>
      <CardActions sx={{ gap: 1 }}>
        <BlogLikeButton blog={blog} />
      </CardActions>
    </Card>
  );
}

export default FullSingleBlog;
