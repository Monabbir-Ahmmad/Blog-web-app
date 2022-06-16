import {
  FiImage as AddPhotoIcon,
  FiTrash as DeleteIcon,
  FiUpload as UploadIcon,
} from "react-icons/fi";
import {
  Alert,
  Box,
  Button,
  Input,
  InputBase,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writeBlog } from "../actions/blogActions";
import AlertSnackbar from "../components/snackbar/AlertSnackbar";
import SunEditor from "../components/sun_editor/SunEditor";

function BlogCreatePage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contentLen, setContentLen] = useState(0);
  const [coverImage, setCoverImage] = useState(null);

  const editor = useRef();

  const { loading, error, success } = useSelector((state) => state.postBlog);

  useEffect(() => {
    if (success) {
      setTitle("");
      setCoverImage(null);
      setContentLen(0);
      editor?.current?.setContents("");
    }
  }, [navigate, success]);

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handlePublishClick = () => {
    if (title && editor?.current?.getCharCount()) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", editor?.current?.getContents());
      formData.append("blogCoverImage", coverImage);

      dispatch(writeBlog(formData));
    }
  };

  const handleCoverImageSelect = (e) => {
    if (e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleRemoveCoverImageClick = (e) => {
    setCoverImage(null);
  };

  const handleEditorContentChange = (newContent) => {
    setContentLen(editor?.current?.getCharCount());
  };

  return (
    <Stack spacing={4}>
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <Typography variant="h6">Add New Post</Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          disabled={!(title && contentLen)}
          onClick={handlePublishClick}
        >
          Publish
        </Button>
      </Stack>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <AlertSnackbar
        open={success}
        severity={"success"}
        message={"Blog published successfully"}
      />

      <Input
        placeholder="Blog title"
        sx={{ fontSize: 24 }}
        value={title}
        onChange={handleTitleChange}
      />

      <Box
        sx={{
          display: coverImage ? "flex" : "none",
          width: "100%",
          pt: "50%",
          position: "relative",
        }}
      >
        <img
          alt="CoverImage"
          src={coverImage && URL.createObjectURL(coverImage)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <label htmlFor="contained-button-file">
          <InputBase
            id="contained-button-file"
            type={"file"}
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleCoverImageSelect}
            sx={{ display: "none" }}
          />
          <Button
            fullWidth
            variant="outlined"
            component="span"
            startIcon={<AddPhotoIcon />}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            {coverImage ? "Change cover image" : "Add cover image"}
          </Button>
        </label>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            display: coverImage ? "flex" : "none",
            backgroundColor: theme.palette.background.paper,
          }}
          onClick={handleRemoveCoverImageClick}
        >
          Remove cover image
        </Button>
      </Stack>
      <SunEditor
        minHeight={600}
        getSunEditorInstance={getSunEditorInstance}
        onChange={handleEditorContentChange}
      />
    </Stack>
  );
}

export default BlogCreatePage;
