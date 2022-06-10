import { PhotoCamera } from "@mui/icons-material";
import { Avatar, IconButton, Input } from "@mui/material";

function ProfileImagePicker({
  onImageSelect,
  image,
  defaultImage = "broken.png",
  isEditable = true,
  size = 150,
}) {
  return (
    <label htmlFor="contained-button-file" style={{ alignSelf: "center" }}>
      <Input
        id="contained-button-file"
        type={"file"}
        name="image"
        accept=".png, .jpg, .jpeg"
        onChange={onImageSelect}
        sx={{ display: "none" }}
        disabled={!isEditable}
      />
      <IconButton component="span" sx={{ position: "relative" }}>
        <PhotoCamera
          sx={{
            display: isEditable ? "flex" : "none",
            fontSize: size * 0.7,
            color: "contrastText",
            opacity: 0,
            position: "absolute",
            left: 0,
            right: 0,
            margin: "auto",
            zIndex: 2,
            transition: "opacity 500ms ease",
            "&:hover": { opacity: 0.5 },
          }}
        />
        <Avatar
          src={(image && URL.createObjectURL(image)) || defaultImage}
          sx={{ width: size, height: size, alignSelf: "center" }}
        />
      </IconButton>
    </label>
  );
}

export default ProfileImagePicker;
