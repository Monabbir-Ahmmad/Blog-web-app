import { Delete, Edit, MoreHoriz, MoreVert } from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function BlogItemMenu({ isPersonal }) {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isPersonal && (
          <MenuItem>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit blog
          </MenuItem>
        )}
        {isPersonal && (
          <MenuItem>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            Delete blog
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <MoreHoriz fontSize="small" />
          </ListItemIcon>
          More
        </MenuItem>
      </Menu>
    </>
  );
}

export default BlogItemMenu;
