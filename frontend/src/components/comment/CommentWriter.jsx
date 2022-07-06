import { Avatar, IconButton, InputBase, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend as SendIcon } from "react-icons/ai";
import { API_HOST } from "../../constants/apiLinks";
import { stringToColour } from "../../utils/utilities";
import { useEffect, useState } from "react";
import { writeComment } from "../../actions/commentActions";

function CommentWriter({ parentComment }) {
  const dispatch = useDispatch();

  const { userAuthInfo } = useSelector((state) => state.userLogin);
  const { blog } = useSelector((state) => state.singleBlog);

  const { success } = useSelector((state) => state.postComment);

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (success) {
      setCommentText("");
    }
  }, [success]);

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    dispatch(writeComment(blog?.id, commentText.trim(), parentComment?.id));
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
          alignSelf: "start",
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
        sx={{ alignSelf: "start" }}
        onClick={handleCommentSubmit}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default CommentWriter;
