import {
  FiTrash as DeleteIcon,
  FiEdit3 as EditIcon,
  FiMoreHorizontal as MoreHorizIcon,
  FiMoreVertical as MoreVertIcon,
} from "react-icons/fi";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePersonalBlog } from "../../actions/blogActions";

function BlogItemMenu({ isPersonal, blogId }) {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleDelete = () => {
    dispatch(deletePersonalBlog(blogId));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
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
              <EditIcon size={16} />
            </ListItemIcon>
            Edit blog
          </MenuItem>
        )}
        {isPersonal && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon size={16} />
            </ListItemIcon>
            Delete blog
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon>
            <MoreHorizIcon size={16} />
          </ListItemIcon>
          More
        </MenuItem>
      </Menu>
    </>
  );
}

export default BlogItemMenu;
