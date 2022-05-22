import { PhotoCamera } from "@mui/icons-material";
import { Avatar, IconButton, Input } from "@mui/material";

function ProfileImagePicker({ onImageSelect, image }) {
  return (
    <label htmlFor="contained-button-file" style={{ alignSelf: "center" }}>
      <Input
        id="contained-button-file"
        type={"file"}
        name="image"
        accept=".png, .jpg, .jpeg"
        onChange={onImageSelect}
        sx={{ display: "none" }}
      />
      <IconButton component="span" sx={{ position: "relative" }}>
        <PhotoCamera
          sx={{
            fontSize: 100,
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
          alt="Profile Picture"
          src={image && URL.createObjectURL(image)}
          sx={{ width: 150, height: 150, alignSelf: "center" }}
        />
      </IconButton>
    </label>
  );
}

export default ProfileImagePicker;
