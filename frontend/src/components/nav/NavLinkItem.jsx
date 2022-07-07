import { ListItemIcon, ListItemText, MenuItem, useTheme } from "@mui/material";

import { NavLink } from "react-router-dom";
import React from "react";

function NavLinkItem({ title, link, icon }) {
  const theme = useTheme();

  return (
    <MenuItem
      component={NavLink}
      to={link}
      sx={{
        padding: 2,
        transition: "background-color 500ms ease",
      }}
      style={({ isActive }) =>
        isActive
          ? {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.accent.main,
              borderRight: "4px solid",
              borderColor: theme.palette.primary.main,
            }
          : undefined
      }
    >
      <ListItemIcon sx={{ mx: 2, color: "inherit" }}>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </MenuItem>
  );
}

export default NavLinkItem;
