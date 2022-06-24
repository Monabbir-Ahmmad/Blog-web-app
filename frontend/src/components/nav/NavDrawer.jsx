import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { FiMenu as MenuIcon } from "react-icons/fi";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import NavMenu from "./NavMenu";
import AppIcon from "../icon/AppIcon";
import FloatingAlerts from "../snackbar/FloatingAlerts";
import ThemeSwitcher from "../themeSwitch/ThemeSwitcher";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

function NavDrawer({ window }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userAuthInfo?.id) {
      navigate("/?page=sign-in");
    }
  }, [navigate, userAuthInfo]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: theme.palette.backgroundColor,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          alignSelf: "flex-end",
          boxShadow: "none",
          background: theme.palette.background.paper,
          borderBottom: "1px solid",
          borderBottomColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <AppIcon sx={{ fontSize: 40 }} />
          <Typography
            variant="h6"
            color={"text.primary"}
            fontSize={26}
            mx={1}
            flexGrow={1}
          >
            Writer
          </Typography>

          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth * 0.85,
            },
          }}
        >
          <NavMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavMenu />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
        <FloatingAlerts />
      </Box>
    </Box>
  );
}

export default NavDrawer;
