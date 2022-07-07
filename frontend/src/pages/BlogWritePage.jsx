import {
  Alert,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import BlogMaker from "../components/blog/BlogMaker";
import { FiUpload as UploadIcon } from "react-icons/fi";
import { writeBlog } from "../actions/blogActions";

function BlogWritePage() {
  const dispatch = useDispatch();

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
  }, [success]);

  const getEditorInstance = (instance) => {
    editor.current = instance;
  };

  const handleTitleChange = (newValue) => {
    setTitle(newValue);
  };

  const handleCoverImageSelect = (imageFile) => {
    if (imageFile) {
      setCoverImage({
        file: imageFile,
        image: URL.createObjectURL(imageFile),
      });
    }
  };

  const handleCoverImageRemove = () => {
    setCoverImage(null);
  };

  const handleContentChange = (newValue) => {
    setContentLen(editor?.current?.getCharCount());
  };

  const handlePublishClick = () => {
    if (title && editor?.current?.getCharCount()) {
      const formData = new FormData();

      formData.append("title", title?.trim());
      formData.append("content", editor?.current?.getContents());
      formData.append("blogCoverImage", coverImage?.file);

      dispatch(writeBlog(formData));
    }
  };

  return (
    <Stack spacing={3}>
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

      <BlogMaker
        title={title}
        coverImage={coverImage?.image}
        getEditorInstance={getEditorInstance}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        onCoverImageSelect={handleCoverImageSelect}
        onCoverImageRemove={handleCoverImageRemove}
      />
    </Stack>
  );
}

export default BlogWritePage;
