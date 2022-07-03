import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX as CloseIcon } from "react-icons/fi";
import { getBlogToUpdate, updatePersonalBlog } from "../../actions/blogActions";
import { API_HOST } from "../../constants/apiLinks";
import BlogMaker from "./BlogMaker";

function BlogEditor({ dialogOpen, handleDialogClose, blogId }) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.personalBlogUpdate
  );

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [contentLen, setContentLen] = useState(0);
  const [coverImage, setCoverImage] = useState(null);

  const editor = useRef();

  useEffect(() => {
    if (dialogOpen) {
      const fetchBlogToUpdate = async () => {
        try {
          const blogData = await getBlogToUpdate(blogId);
          setBlog(blogData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBlogToUpdate();
    }
  }, [blogId, dialogOpen]);

  useEffect(() => {
    if (blog && editor?.current) {
      editor.current.setContents(blog.content);
      setTitle(blog.title);
      setContentLen(editor.current.getCharCount());

      if (blog.coverImage) {
        setCoverImage({
          image: `${API_HOST}/${blog.coverImage}`,
        });
      }
    }
  }, [blog]);

  useEffect(() => {
    if (success) {
      handleDialogClose();
    }
  }, [handleDialogClose, success]);

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

  const handleEditSubmit = () => {
    if (blogId && title && editor?.current?.getCharCount()) {
      const formData = new FormData();

      formData.append("blogId", blogId);
      formData.append("title", title?.trim());
      formData.append("content", editor?.current?.getContents());

      if (coverImage?.file) {
        formData.append("blogCoverImage", coverImage.file);
      } else if (!coverImage?.image) {
        formData.append("removeCoverImage", 1);
      }

      dispatch(updatePersonalBlog(formData));
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      scroll={"paper"}
      maxWidth={"lg"}
      fullWidth
      fullScreen={largeScreen ? false : true}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle
        component={"div"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography sx={{ flex: 1 }} variant="h6">
          Edit Blog
        </Typography>

        <IconButton color="inherit" onClick={handleDialogClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
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
      </DialogContent>
      <DialogActions sx={{ position: "relative" }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!(title && contentLen) || loading}
          onClick={handleEditSubmit}
        >
          Confirm
        </Button>
        {loading && (
          <CircularProgress
            size={26}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}

export default BlogEditor;
