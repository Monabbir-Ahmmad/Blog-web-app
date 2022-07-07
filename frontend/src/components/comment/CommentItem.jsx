import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { API_HOST } from "../../constants/apiLinks";
import { RiChat1Line as CommentIcon } from "react-icons/ri";
import CommentItemMenu from "./CommentItemMenu";
import { Link as RouterLink } from "react-router-dom";
import { deleteComment, writeComment } from "../../actions/commentActions";
import moment from "moment";
import { stringToColour } from "../../utils/utilities";
import ReplyWriter from "./ReplyWriter";

function CommentItem({ comment, level = 0, parentComment }) {
  const dispatch = useDispatch();

  const { success: postReplySuccess } = useSelector(
    (state) => state.postComment
  );
  const { blog } = useSelector((state) => state.singleBlog);

  const [showReplies, setShowReplies] = useState(
    comment?.children?.length === 0
  );
  const [replyMode, setReplyMode] = useState(false);

  useEffect(() => {
    if (postReplySuccess) {
      setReplyMode(false);
    }
  }, [postReplySuccess]);

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

  const handleReplySubmit = (commentText) => {
    dispatch(writeComment(blog?.id, commentText.trim(), comment?.id));
  };

  const handleReplyCancel = () => {
    setReplyMode(false);
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
            onClick={() => setReplyMode(true)}
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

      {replyMode && (
        <ReplyWriter
          parentComment={comment}
          handleSubmit={handleReplySubmit}
          hanndleCancel={handleReplyCancel}
        />
      )}
    </Box>
  );
}

export default CommentItem;
