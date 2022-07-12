import { Alert, LinearProgress, Stack, Typography } from "@mui/material";

import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import React, { useEffect, useState } from "react";
import { createCommentTree } from "../../utils/utilities";
import { useDispatch, useSelector } from "react-redux";
import { writeComment } from "../../actions/commentActions";

function CommentArea() {
  const dispatch = useDispatch();

  const { loading, error, comments } = useSelector(
    (state) => state.commentList
  );
  const { blog } = useSelector((state) => state.singleBlog);

  const [commentTree, setCommentTree] = useState([]);

  useEffect(() => {
    setCommentTree(createCommentTree(comments));
  }, [comments]);

  const handleCommentSubmit = (commentText) => {
    dispatch(writeComment(blog?.id, commentText.trim()));
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Comments ({commentTree?.length})</Typography>
      <CommentInput handleSubmit={handleCommentSubmit} />

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && !comments?.length && (
        <Alert severity="info">Be the first to comment</Alert>
      )}

      <div>
        {commentTree?.map((comment) => (
          <CommentItem key={comment?.id} comment={comment} />
        ))}
      </div>
    </Stack>
  );
}

export default CommentArea;
