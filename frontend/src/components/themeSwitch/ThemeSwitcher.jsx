import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { RiSunFill as LightIcon, RiMoonFill as DarkIcon } from "react-icons/ri";

function ThemeSwitcher() {
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);

  return (
    <IconButton color="warning" onClick={() => themeContext.toggleColorMode()}>
      {theme.palette.mode === "dark" ? <DarkIcon /> : <LightIcon />}
    </IconButton>
  );
}

export default ThemeSwitcher;
