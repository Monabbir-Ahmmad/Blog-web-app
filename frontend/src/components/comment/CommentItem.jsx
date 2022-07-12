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
import {
  deleteComment,
  updateComment,
  writeComment,
} from "../../actions/commentActions";
import moment from "moment";
import { stringToColour } from "../../utils/utilities";
import CommentWriter from "./CommentWriter";

function CommentItem({ comment, level = 0, parentComment }) {
  const dispatch = useDispatch();

  const { success: postReplySuccess } = useSelector(
    (state) => state.commentPost
  );
  const { success: commentUpdateSuccess } = useSelector(
    (state) => state.commentUpdate
  );
  const { blog } = useSelector((state) => state.singleBlog);

  const [showReplies, setShowReplies] = useState(
    comment?.children?.length === 0
  );
  const [replyMode, setReplyMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (postReplySuccess) {
      setReplyMode(false);
    }
  }, [postReplySuccess]);

  useEffect(() => {
    if (commentUpdateSuccess) {
      setEditMode(false);
    }
  }, [commentUpdateSuccess]);

  const nestedComments = comment?.children?.map((cmt) => (
    <CommentItem
      key={cmt?.id}
      comment={cmt}
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

  const handleEditComment = () => {
    setEditMode(true);
  };

  const handleEditCommentCancel = () => {
    setEditMode(false);
  };

  const handleCommentEditSubmit = (commentText) => {
    dispatch(updateComment(comment?.id, commentText.trim()));
  };

  return (
    <Box sx={{ mt: 2, ml: level > 3 || level === 0 ? 0 : 2 }}>
      {editMode && (
        <CommentWriter
          parentComment={parentComment}
          handleSubmit={handleCommentEditSubmit}
          hanndleCancel={handleEditCommentCancel}
          defaultValue={comment?.text}
        />
      )}

      {!editMode && (
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
            subheader={`${moment(comment?.createdAt).fromNow()}${
              comment?.createdAt !== comment?.updatedAt ? `  (edited)` : ``
            }`}
          />

          <Typography
            component={"pre"}
            variant="body1"
            sx={{ mx: 2, wordWrap: "break-word", whiteSpace: "pre-wrap" }}
          >
            {parentComment?.id && (
              <Link
                component={RouterLink}
                to={`/profile/${parentComment?.user?.id}`}
                underline="none"
                color={"primary"}
              >
                @{parentComment?.user?.name}{" "}
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
      )}

      {showReplies && nestedComments}

      {replyMode && (
        <CommentWriter
          parentComment={comment}
          handleSubmit={handleReplySubmit}
          hanndleCancel={handleReplyCancel}
        />
      )}
    </Box>
  );
}

export default CommentItem;
