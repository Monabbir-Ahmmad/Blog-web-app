import { Publish } from "@mui/icons-material";
import {
  Alert,
  Button,
  Input,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writeBlog } from "../actions/blogActions";
import SunEditor from "../components/sun_editor/SunEditor";

function BlogCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const editor = useRef();

  const { loading, error, success } = useSelector((state) => state.postBlog);

  useEffect(() => {
    if (success) {
      //setTimeout(() => navigate("/home"), 1000);
      setTitle("");
      editor?.current?.setContents("");
    }
  }, [navigate, success]);

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handlePublishClick = () => {
    console.log(editor?.current?.getCharCount());
    if (title && editor?.current?.getCharCount()) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", editor?.current?.getContents());

      dispatch(writeBlog(formData));
    }
  };

  return (
    <Stack spacing={4}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <Typography variant="h6">Add New Post</Typography>
        <Button
          variant="contained"
          startIcon={<Publish />}
          onClick={handlePublishClick}
        >
          Publish
        </Button>
      </Stack>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {success && <Alert severity="success">Successful</Alert>}

      <Input
        placeholder="Blog title"
        sx={{ fontSize: 24 }}
        value={title}
        onChange={handleTitleChange}
      />
      <SunEditor minHeight={600} getSunEditorInstance={getSunEditorInstance} />
    </Stack>
  );
}

export default BlogCreatePage;
