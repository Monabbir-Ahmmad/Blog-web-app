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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { API_HOST } from "../../constants/apiLinks";
import { RiChat1Line as CommentIcon } from "react-icons/ri";
import CommentItemMenu from "./CommentItemMenu";
import CommentWriter from "./CommentWriter";
import { Link as RouterLink } from "react-router-dom";
import { deleteComment } from "../../actions/commentActions";
import moment from "moment";
import { stringToColour } from "../../utils/utilities";

function CommentItem({ comment, level = 0, parentComment }) {
  const dispatch = useDispatch();

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

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment?.id));
  };

  const handleEditComment = () => {};

  return (
    <Box sx={{ mt: 2, ml: level > 3 || level === 0 ? 0 : 2 }}>
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
              sx={{ bgcolor: stringToColour(comment?.user?.name) }}
            />
          }
          action={
            <CommentItemMenu
              handleEdit={handleEditComment}
              handleDelete={handleDeleteComment}
              comment={comment}
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

        <Typography component={"pre"} variant="body1" sx={{ mx: 2 }}>
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
