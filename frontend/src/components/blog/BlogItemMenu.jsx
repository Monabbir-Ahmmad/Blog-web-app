import {
  FiTrash as DeleteIcon,
  FiEdit3 as EditIcon,
  FiMoreVertical as MoreIcon,
} from "react-icons/fi";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import BlogEditor from "./BlogEditor";
import { deleteBlog } from "../../actions/blogActions";
import { useState } from "react";

function BlogItemMenu({ blog }) {
  const dispatch = useDispatch();
  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const [isPersonal] = useState(blog?.user?.id === userAuthInfo?.id);

  const [anchor, setAnchor] = useState(null);
  const [openBlogEditor, setOpenBlogEditor] = useState(false);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleEdit = () => {
    setOpenBlogEditor(true);
  };

  const handleBlogEditorClose = () => {
    setOpenBlogEditor(false);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog?.id));
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>

      {openBlogEditor && (
        <BlogEditor
          dialogOpen={openBlogEditor}
          handleDialogClose={handleBlogEditorClose}
          blogId={blog?.id}
        />
      )}

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
            Edit blog
          </MenuItem>

          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon size={16} />
            </ListItemIcon>
            Delete blog
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default BlogItemMenu;
