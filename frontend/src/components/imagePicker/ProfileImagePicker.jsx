import { FaCamera } from "react-icons/fa";
import { Avatar, IconButton, Input, useTheme } from "@mui/material";
import styled from "@emotion/styled";

const CameraIcon = styled(FaCamera)`
  display: ${(props) => (props.editable ? "flex" : "none")};
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 0;
  z-index: 2;
  transition: opacity 500ms ease;
  :hover {
    opacity: 0.5;
  }
`;

function ProfileImagePicker({
  onImageSelect,
  image,
  defaultImage = "broken.png",
  isEditable = true,
  size = 150,
}) {
  const theme = useTheme();

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
        <CameraIcon
          editable={Number(isEditable)}
          color={theme.palette.primary.contrastText}
          size={size * 0.7}
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
