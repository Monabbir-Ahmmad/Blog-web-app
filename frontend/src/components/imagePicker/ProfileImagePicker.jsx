import { Avatar, Box, Fab, Menu, MenuItem } from "@mui/material";

import { FaCamera as CameraIcon } from "react-icons/fa";
import { useState } from "react";

function ProfileImagePicker({
  onImageSelect,
  onImageDelete,
  image,
  size = 150,
  sx,
}) {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box
      position={"relative"}
      width={"fit-content"}
      height={"fit-content"}
      sx={sx}
    >
      <Avatar src={image} sx={{ width: size, height: size }} />
      <Fab
        size="small"
        color="primary"
        sx={{ position: "absolute", right: 0, bottom: 15 }}
        onClick={handleClick}
      >
        <CameraIcon size={20} />
      </Fab>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={"label"}>
          <input
            id="image-picker"
            type={"file"}
            name="image"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={(e) => {
              onImageSelect(e.target.files[0]);
              handleClose();
            }}
          />
          Choose image
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            onImageDelete();
            handleClose();
          }}
        >
          Remove image
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ProfileImagePicker;
