import {
  FiTrash as DeleteIcon,
  FiEdit3 as EditIcon,
  FiMoreHorizontal as MoreIcon,
} from "react-icons/fi";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";

import { useSelector } from "react-redux";
import { useState } from "react";

function CommentItemMenu({ handleEdit, handleDelete, comment }) {
  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const [isPersonal] = useState(comment?.user?.id === userAuthInfo?.id);

  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreIcon />
      </IconButton>

      {isPersonal && (
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={handleClose}
          onClick={handleClose}
          disableScrollLock={true}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon size={16} />
            </ListItemIcon>
            Edit comment
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon size={16} />
            </ListItemIcon>
            Delete comment
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default CommentItemMenu;
