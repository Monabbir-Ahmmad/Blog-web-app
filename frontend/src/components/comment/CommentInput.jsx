import { Avatar, IconButton, InputBase, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { API_HOST } from "../../constants/apiLinks";
import { AiOutlineSend as SendIcon } from "react-icons/ai";
import { stringToColour } from "../../utils/utilities";

function CommentInput({ parentComment, defaultValue, handleSubmit }) {
  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.commentPost);

  const [commentText, setCommentText] = useState(defaultValue || "");

  useEffect(() => {
    if (success) {
      setCommentText("");
    }
  }, [success]);

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: "2px 2px",
        display: "flex",
        alignItems: "center",
        width: 1,
      }}
    >
      <Avatar
        alt={userAuthInfo?.name}
        src={
          userAuthInfo?.profileImage
            ? `${API_HOST}/${userAuthInfo?.profileImage}`
            : "broken.png"
        }
        variant="rounded"
        sx={{
          bgcolor: stringToColour(userAuthInfo?.name),
          alignSelf: "end",
        }}
      />

      <InputBase
        placeholder={
          parentComment?.id ? "Reply to comment" : "Join the discussion"
        }
        multiline
        maxRows={10}
        value={commentText}
        sx={{ pl: 2, flex: 1 }}
        onChange={handleCommentTextChange}
      />

      <IconButton
        color={"primary"}
        disabled={!commentText?.trim()}
        sx={{ alignSelf: "end" }}
        onClick={() => handleSubmit(commentText)}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default CommentInput;
