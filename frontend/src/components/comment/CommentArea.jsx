import { Alert, LinearProgress, Stack, Typography } from "@mui/material";

import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter";
import React from "react";
import { createCommentTree } from "../../utils/utilities";
import { useSelector } from "react-redux";

function CommentArea() {
  const { loading, error, comments } = useSelector(
    (state) => state.commentList
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Comments</Typography>
      <CommentWriter />

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && !comments?.length && (
        <Alert severity="info">Be the first to comment</Alert>
      )}

      <div>
        {createCommentTree(comments)?.map((comment) => (
          <CommentItem key={comment?.id} comment={comment} />
        ))}
      </div>
    </Stack>
  );
}

export default CommentArea;
