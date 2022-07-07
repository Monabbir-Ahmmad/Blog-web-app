import { RiMoonFill as DarkIcon, RiSunFill as LightIcon } from "react-icons/ri";
import { IconButton, useTheme } from "@mui/material";

import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

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
