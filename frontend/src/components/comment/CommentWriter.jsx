import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import CommentInput from "./CommentInput";

function CommentWriter({
  parentComment,
  handleSubmit,
  hanndleCancel,
  defaultValue,
}) {
  const replyBoxRef = useRef();

  useEffect(() => {
    replyBoxRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <Stack ref={replyBoxRef} gap={1} pt={2}>
      {parentComment?.user?.id && (
        <Typography>
          Replying to <strong>{parentComment?.user?.name}</strong>
        </Typography>
      )}
      <CommentInput handleSubmit={handleSubmit} defaultValue={defaultValue} />
      <Button size="small" sx={{ alignSelf: "end" }} onClick={hanndleCancel}>
        Cancle
      </Button>
    </Stack>
  );
}
export default CommentWriter;
