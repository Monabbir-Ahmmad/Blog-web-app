import { Button, Box, Input, Stack, useTheme } from "@mui/material";
import { FiImage as AddPhotoIcon, FiTrash as DeleteIcon } from "react-icons/fi";
import SunEditor from "../sunEditor/SunEditor";

function BlogMaker({
  title,
  coverImage,
  getEditorInstance,
  onTitleChange,
  onContentChange,
  onCoverImageSelect,
  onCoverImageRemove,
}) {
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      <Input
        placeholder="Blog title"
        sx={{ fontSize: 24 }}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
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
          src={coverImage}
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
        <Button
          variant="outlined"
          component="label"
          startIcon={<AddPhotoIcon />}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <input
            type={"file"}
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => onCoverImageSelect(e.target.files[0])}
            hidden
          />
          {coverImage ? "Change cover image" : "Add cover image"}
        </Button>

        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            display: coverImage ? "flex" : "none",
            backgroundColor: theme.palette.background.paper,
          }}
          onClick={onCoverImageRemove}
        >
          Remove cover image
        </Button>
      </Stack>

      <SunEditor
        minHeight={600}
        getSunEditorInstance={getEditorInstance}
        onChange={onContentChange}
      />
    </Stack>
  );
}

export default BlogMaker;
