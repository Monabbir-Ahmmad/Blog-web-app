import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { RiShutDownLine as LogoutIcon } from "react-icons/ri";
import { navItemsGroup } from "./navItemGroups";
import { useDispatch, useSelector } from "react-redux";
import { API_HOST } from "../../constants/apiLinks";
import { logout } from "../../actions/userActions";
import { stringToColour } from "../../utils/utilities";

function NavItems() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Stack height={"100%"}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
          gap: 2,
        }}
      >
        <Avatar
          alt={userAuthInfo?.name}
          src={
            userAuthInfo?.profileImage
              ? `${API_HOST}/${userAuthInfo?.profileImage}`
              : "broken.png"
          }
          sx={{
            width: 100,
            height: 100,
            fontSize: 60,
            bgcolor: stringToColour(userAuthInfo?.name),
          }}
        />
        <Typography variant="h6">{userAuthInfo?.name}</Typography>
      </Toolbar>

      <MenuList sx={{ flex: 1 }}>
        {navItemsGroup.map((item, index) => (
          <MenuItem
            key={index}
            component={NavLink}
            to={item.link}
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
            <ListItemIcon sx={{ mx: 2, color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </MenuItem>
        ))}
      </MenuList>

      <Button
        variant="outlined"
        size="large"
        startIcon={<LogoutIcon />}
        sx={{ m: 4 }}
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </Stack>
  );
}

export default NavItems;
