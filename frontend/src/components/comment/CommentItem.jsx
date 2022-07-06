import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { RiChat1Line as CommentIcon } from "react-icons/ri";
import { API_HOST } from "../../constants/apiLinks";
import { stringToColour } from "../../utils/utilities";
import CommentItemMenu from "./CommentItemMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CommentWriter from "./CommentWriter";

function CommentItem({ comment, level = 0, parentComment }) {
  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { success: postCommentSuccess } = useSelector(
    (state) => state.postComment
  );

  const [showReplies, setShowReplies] = useState(
    comment?.children?.length === 0
  );
  const [showReplyInput, setShowReplyInput] = useState(false);

  useEffect(() => {
    if (postCommentSuccess) {
      setShowReplyInput(false);
    }
  }, [postCommentSuccess]);

  const nestedComments = comment?.children?.map((comment) => (
    <CommentItem
      key={comment?.id}
      comment={comment}
      level={level + 1}
      parentComment={comment}
    />
  ));

  const handleShowReplies = () => {
    if (!showReplies) {
      setShowReplies(true);
    }
  };

  return (
    <Box sx={{ mt: 3, ml: level > 3 || level === 0 ? 0 : 2 }}>
      <Card variant="outlined">
        <CardHeader
          avatar={
            <Avatar
              alt={comment?.user?.name}
              src={
                comment?.user?.profileImage
                  ? `${API_HOST}/${comment?.user?.profileImage}`
                  : "broken.png"
              }
              variant="rounded"
              sx={{ bgcolor: stringToColour(comment?.user?.name) }}
            />
          }
          action={
            <CommentItemMenu
              isPersonal={comment?.user?.id === userAuthInfo?.id}
              commentId={comment?.id}
            />
          }
          title={
            <Link
              component={RouterLink}
              to={`/profile/${comment?.user?.id}`}
              underline="hover"
              color={"primary"}
            >
              {comment?.user?.name}
            </Link>
          }
          subheader={moment(new Date(comment?.createdAt)).fromNow()}
        />

        <Typography sx={{ mx: 2 }}>
          {parentComment?.id && (
            <Link
              component={RouterLink}
              to={`/profile/${parentComment?.user?.id}`}
              underline="none"
              color={"primary"}
            >
              @{comment?.user?.name}{" "}
            </Link>
          )}
          {comment?.text}
        </Typography>

        <CardActions>
          <Button
            size="small"
            startIcon={<CommentIcon />}
            onClick={() => setShowReplyInput(true)}
          >
            Reply
          </Button>

          {comment?.children?.length > 0 && !showReplies && (
            <Button size="small" onClick={handleShowReplies}>
              Show {comment?.children?.length} Replies
            </Button>
          )}
        </CardActions>
      </Card>
      {showReplies && nestedComments}

      {showReplyInput && (
        <Stack gap={1} pt={2}>
          <Typography>Replying to {comment?.user?.name}</Typography>
          <CommentWriter parentComment={comment} />
          <Button
            size="small"
            sx={{ alignSelf: "end" }}
            onClick={() => setShowReplyInput(false)}
          >
            Cancle Reply
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default CommentItem;
