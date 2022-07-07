import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import CommentWriter from "./CommentWriter";

function ReplyWriter({ parentComment, handleSubmit, hanndleCancel }) {
  const replyBoxRef = useRef();

  useEffect(() => {
    replyBoxRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <Stack ref={replyBoxRef} gap={1} pt={2}>
      <Typography>Replying to {parentComment?.user?.name}</Typography>
      <CommentWriter handleSubmit={handleSubmit} />
      <Button size="small" sx={{ alignSelf: "end" }} onClick={hanndleCancel}>
        Cancle Reply
      </Button>
    </Stack>
  );
}
export default ReplyWriter;
